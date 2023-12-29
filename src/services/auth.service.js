import api from "@/boot/axios";
import alert from "@/plugins/alert";
import { useAuthStore } from "@/stores/authStore";
import { useUser } from "./user.service";
import Cookies from "js-cookie";
import { reactive } from "vue";

export function useAuth() {
  const { userState, createUser } = useUser();
  const authState = reactive({
    email: "",
    password: "",
    role: "",
    remember: false,
  });
  const authStore = useAuthStore();

  const login = async () => {
    try {
      const resp = await api.post("/auth/login", authState);
      const { userAuth, token } = resp.data.content;
      const remember = {
        status: authState.remember,
        password: authState.remember ? authState.password : null,
        email: authState.remember ? authState.email : null,
      };
      Cookies.set("turnRemember", JSON.stringify(remember));
      authStore.setUser({
        ...userAuth.user,
        email: userAuth.email,
        lastlogin: userAuth.lastlogin,
      });
      authStore.setToken(token);
    } catch (error) {
      alert.error(error.message, 5000, "bottom-right");
      throw error;
    }
  };

  const singup = async () => {
    try {
      if (authState.email.includes("atriontechsd")) {
        authState.role = "admin";
      } else {
        authState.role = "client";
      }
      const resp = await api.post("/auth/register", authState);
      const auth = resp.data.message;
      userState.auth_id = auth.id;
      await login();
      try {
        await createUser();
        location.replace("/");
      } catch (error) {
        throw error;
      }
    } catch (error) {
      alert.error(error.message);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("turnToken");
    Cookies.remove("turnUser");
    return true;
  };

  return {
    authState,
    userState,
    createUser,
    login,
    logout,
    singup,
  };
}
