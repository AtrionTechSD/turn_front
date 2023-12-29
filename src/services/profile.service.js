import api from "@/boot/axios";
import { reactive, ref } from "vue";
import { useInstitute } from "./institute.service";
import { useQuery } from "./query.services";
import alert from "@/plugins/alert";
import { useAuthStore } from "@/stores/authStore";
import utils from "@/plugins/utils";
const { params, getParams } = useQuery();
const authStore = useAuthStore();

const getInstitutes = async () => {
  params.order = "name";
  const { rows } = await useInstitute().getInstitutes(getParams());
  return rows.map((r) => ({ value: r.id, label: `${r.sigla}- ${r.name}` }));
};
export function useProfile() {
  const userProfile = reactive({
    name: "",
    lastname: "",
    address: "",
    phone: "",
    institute_id: null,
  });

  const institutes = ref([]);

  const getProfile = async () => {
    try {
      const profile = await api.get("/profile");
      const rows = await getInstitutes();
      institutes.value = rows;
      if (profile.data.content) {
        Object.assign(userProfile, profile.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const storeProfile = async () => {
    try {
      await api.post("/profile", {
        ...userProfile,
        phone: utils.formatPhone(userProfile.phone),
      });
      const {
        data: { content },
      } = await api.get(`/profile/?include=institute`);

      getProfile();
      alert.success("Perfil actualizado exitosamente", 5000, "bottom-right");
      let user = authStore.user;
      Object.assign(user, content);
      authStore.setUser(user);
    } catch (error) {
      alert.error(error.message);
    }
  };

  return { userProfile, getProfile, storeProfile, institutes };
}
