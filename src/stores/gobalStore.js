import Cookies from "js-cookie";
import { defineStore } from "pinia";
export const useGlobalStore = defineStore("global", {
  state: () => ({
    errorValidation: {},
    loading: false,
    menuOpened: Cookies.get("turnMenuOpened") || null,
    menuActive: Cookies.get("turnMenuActive") || null,
  }),
  getters: (state) => ({
    errorValidation: state.errorValidation || {},
    loading: state.loading,
    menuOpened: state.menuOpened,
    menuActive: state.menuActive,
  }),
  actions: {
    setErrorValidation(errors) {
      this.errorValidation = errors;
    },
    setLoading(status) {
      this.loading = status;
    },
  },
});
