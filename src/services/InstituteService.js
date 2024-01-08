import api from "@/boot/axios";
import { reactive, ref } from "vue";
import { useQuery } from "./queryService";

export function useInstitute() {
  const { params, getParams, methods } = useQuery("institutes");

  const institute = ref({
    name: "",
    sigla: "",
  });
  const institutes = ref([]);
  params.value.include = "users,image";
  params.value.fields = "name,id,sigla";
  const getInstitutes = async () => {
    try {
      const res = await api.get(`/institutes${getParams()}`);
      institutes.value = res.data.content.rows;
      return res.data.content;
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return { institute, institutes, getInstitutes, params, methods };
}
