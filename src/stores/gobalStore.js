import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    errorValidation: {},
  }),
  getters: (state) => ({
    errorValidation: state.errorValidation || {},
  }),
  actions: {
    setErrorValidation(errors) {
      this.errorValidation = errors;
    },
  },
});
