import qs from "qs";
import { ref, watch } from "vue";
import utils from "@/plugins/utils";
export function useQuery(schema) {
  let params = ref({
    order: "",
    desc: false,
    fields: "*",
    limit: "",
    page: "",
    perpage: "",
    include: "",
    filter: [],
    withTrashed: "",
    search: "",
    scopes: "",
  });

  params.value.perpage = utils.getSavedParams(schema).perpage;
  params.value.page = utils.getSavedParams(schema).page;
  const queryValues = ref({
    search: null,
    order: null,
  });

  const getParams = () => {
    const filter = params.value.filter
      .map((item) => `filter[]=${item}`)
      .join("&");
    const query = `?limit=${params.value.limit}&order=${params.value.order}&desc=${params.value.desc}&fields=${params.value.fields}&page=${params.value.page}&perpage=${params.value.perpage}&include=${params.value.include}&${filter}&withTrashed=${params.value.withTrashed}&search=${params.value.search}&scopes=${params.value.scopes}
    
    `;
    return query;
  };

  const methods = {
    search: (text) => {
      if (!text) return;
      params.value = {
        ...params.value,
        search: text,
        page: 1,
      };
    },

    order: (field) => {
      params.value = {
        ...params.value,
        order: field,
        page: 1,
      };
    },

    setDesc: (desc) => {
      params.value = {
        ...params.value,
        desc: desc,
        page: 1,
      };
    },

    setPage: (page) => {
      params.value = {
        ...params.value,
        page: page,
      };

      return params.value;
    },

    setPerpage: (perpage) => {
      params.value = {
        ...params.value,
        page: 1,
        perpage: perpage,
      };
      return params.value;
    },
  };

  return { params, getParams, methods, queryValues };
}
