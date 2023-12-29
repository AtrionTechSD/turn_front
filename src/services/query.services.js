import { reactive } from "vue";

export function useQuery() {
  const params = reactive({
    order: "",
    desc: "",
    fields: "*",
    limit: "",
    page: "",
    perpage: "",
    include: "",
    filter: [],
    withTrashed: "",
    search: "",
  });

  const getParams = () => {
    const query = `?limit=${params.limit}&order=${params.order}&desc=${params.desc}&fields=${params.fields}&page=${params.page}&perpage=${params.perpage}&include=${params.include}&filter=${params.filter}&withTrashed=${params.withTrashed}&search=${params.search}
    
    `;
    return query;
  };

  return { params, getParams };
}
