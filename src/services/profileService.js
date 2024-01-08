import api from "@/boot/axios";
import { reactive, ref } from "vue";
import { useInstitute } from "./InstituteService";
import { useQuery } from "./queryService";
import alert from "@/plugins/alert";
import { useAuthStore } from "@/stores/authStore";
import utils from "@/plugins/utils";
import loader from "@/plugins/loader";
const authStore = useAuthStore();
const { institutes, getInstitutes } = useInstitute();

const loadInstitutes = async () => {
  await getInstitutes();
  console.log(institutes.value);
  institutes.value = institutes.value.map((r) => ({
    value: r.id,
    label: `${r.sigla}- ${r.name}`,
  }));
};
export function useProfile() {
  const userProfile = ref({
    name: "",
    lastname: "",
    address: "",
    phone: "",
    institute_id: null,
  });

  const getProfile = async () => {
    try {
      const { params, getParams } = useQuery();
      params.include = "image,institute";
      const profile = await api.get(`/profile${getParams()}`);
      await loadInstitutes();
      if (profile.data.content) {
        const storedProfile = authStore.user;
        Object.assign(storedProfile, profile.data.content);
        authStore.setUser(storedProfile);
        userProfile.value = storedProfile;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const storeProfile = async () => {
    try {
      await api.post("/profile", {
        ...userProfile.value,
        phone: utils.formatPhone(userProfile.value.phone),
      });
      const {
        data: { content },
      } = await api.get(`/profile/?include=institute`);

      getProfile();
      let user = authStore.user;
      Object.assign(user, content);
      authStore.setUser(user);
      alert.success(
        "Perfil actualizado exitosamente",
        2000,
        "bottom-right",
        () => {
          location.replace("/admin/profile");
        }
      );
    } catch (error) {
      alert.error(error.message);
    }
  };
  const updateImage = async (image) => {
    try {
      loader.showLoad();
      const imageURL = await utils.sendToCloud(image);
      const {
        data: { content },
      } = await api.post("/profile/image", {
        url: imageURL,
        caption: "Foto de perfil",
      });
      let user = authStore.user;

      user.image = content;
      authStore.setUser(user);
    } catch (error) {
      loader.stopLoad();
      throw error;
    }
  };

  return { userProfile, getProfile, storeProfile, institutes, updateImage };
}
