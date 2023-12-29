import api from "@/boot/axios";
import alert from "@/plugins/alert";
import { reactive } from "vue";

export function useUser() {
  const userState = reactive({
    name: "",
    lastName: "",
    phone: "(809) 000-000",
    address: "",
    auth_id: "",
  });

  const createUser = async () => {
    try {
      const resp = await api.post("/users", userState);
      return resp;
    } catch (error) {
      alert.error(error.message);
      return Promise.reject(error.message);
    }
  };

  return { userState, createUser };
}
