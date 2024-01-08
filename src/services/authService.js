import api from "@/boot/axios";
import alert from "@/plugins/alert";
import { useAuthStore } from "@/stores/authStore";
import { useUser } from "./userService";
import Cookies from "js-cookie";
import { reactive } from "vue";
import utils from "@/plugins/utils";

export function useAuth() {
  const { userState, createUser } = useUser();
  const authState = reactive({
    email: "",
    password: "",
    remember: false,
  });
  const authStore = useAuthStore();

  const login = async () => {
    try {
      const resp = await api.post("/auth/login", authState);
      const { userAuth, token } = resp.data.content;
      if (userAuth.role?.name != "admin") {
        throw {
          message: "No tienes permiso para acceder al sistema",
        };
      }
      const remember = {
        status: authState.remember,
        password: authState.remember ? authState.password : null,
        email: authState.remember ? authState.email : null,
      };
      utils.setCookies("turnRemember", JSON.stringify(remember));
      authStore.setUser({
        ...userAuth.user,
        email: userAuth.email,
        lastlogin: userAuth.lastlogin,
        role: userAuth.role,
      });
      authStore.setToken(token);
    } catch (error) {
      alert.error(error.message, 5000, "bottom-right");
      throw error;
    }
  };

  const singup = async () => {
    try {
      const resp = await api.post("/auth/register", authState);
      const auth = resp.data.content;
      userState.auth_id = auth.id;
      alert.success(
        `Se ha enviado un correo de confirmación a nl ${auth.email}`,
        60000,
        "center-middle",
        () => {
          location.replace("/admin/auth/login");
        }
      );
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
