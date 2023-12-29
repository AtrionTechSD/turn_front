import alert from "@/plugins/alert";
import loader from "@/plugins/loader";
import axios from "axios";
import { useGlobalStore } from "@/stores/gobalStore";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
api.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

api.defaults.withCredentials = true;

api.interceptors.request.use((req) => {
  const globalStore = useGlobalStore();
  globalStore.setErrorValidation({});
  loader.showLoad("Espere, por favor");
  return req;
});

api.interceptors.response.use(
  (res) => {
    loader.stopLoad();
    if (!res.request.responseURL.includes("refreshtoken")) {
      api.post("auth/refreshtoken");
    }
    return res;
  },
  (error) => {
    const globalStore = useGlobalStore();
    loader.stopLoad();
    const status = error.response.status;
    switch (status) {
      case 422:
        globalStore.setErrorValidation(error.response.data.content || {});
        setTimeout(() => {
          globalStore.setErrorValidation({});
        }, 5000);
        alert.error("Error en los datos enviados", 5000, "bottom-right");
        break;
      case 404:
        alert.error("La ruta o recurso no se encontró");
        break;
      case 401:
        alert.error(error.response.data.content);
        Cookies.remove("turnToken");
        Cookies.remove("turnUser");
        if (!location.href.includes("auth")) {
          location.replace("/");
        }
        break;

      default:
        alert.error("Hubo un error en la solicitud");
        break;
    }

    return Promise.reject(error);
  }
);
export default api;
