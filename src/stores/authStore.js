import utils from "@/plugins/utils";
import Cookies from "js-cookie";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: Cookies.get("turnUser") ? JSON.parse(Cookies.get("turnUser")) : {},

    token: Cookies.get("turnToken"),
  }),
  getters: (state) => ({
    user: state.user,
    token: state.token,
  }),
  actions: {
    setUser(user) {
      utils.setCookies("turnUser", JSON.stringify(user));
      this.user = user;
    },

    setToken(token) {
      utils.setCookies("turnToken", JSON.stringify(token));
      this.token = token;
    },
  },
});
