import api from "@/boot/axios";
import { reactive } from "vue";

export function useInstitute() {
  const institute = reactive({
    name: "",
    sigla: "",
  });

  const getInstitutes = async (params = "") => {
    try {
      const res = await api.get(`/institutes/${params}`);
      return res.data.content;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return { institute, getInstitutes };
}
