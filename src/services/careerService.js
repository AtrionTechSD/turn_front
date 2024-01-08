import api from "@/boot/axios";
import { reactive, ref } from "vue";
import { useQuery } from "./queryService";

export function useCareer() {
  const { params, getParams, methods } = useQuery("careers");

  const career = ref({
    name: "",
    sigla: "",
    grade: "",
  });
  const careers = ref([]);
  params.value.include = "users,image";
  params.value.fields = "name,id,sigla";
  const getcareers = async () => {
    try {
      const res = await api.get(`/careers${getParams()}`);
      careers.value = res.data.content.rows;
      return res.data.content;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return { career, careers, getcareers, params, methods };
}
