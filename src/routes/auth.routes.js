import LoginPage from "@/pages/auth/LoginPage.vue";
import RegisterPage from "@/pages/auth/RegisterPage.vue";

const authRoutes = [
  {
    path: "/auth/login",
    name: "login",
    component: LoginPage,
    meta: { transition: "slide-right" },
  },
  {
    path: "/auth/register",
    name: "register",
    component: RegisterPage,
    meta: { transition: "slide-right" },
  },
];

export default authRoutes;
