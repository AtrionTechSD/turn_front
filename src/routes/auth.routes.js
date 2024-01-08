import LoginPage from "@/pages/auth/LoginPage.vue";
import RegisterPage from "@/pages/auth/RegisterPage.vue";

const authRoutes = [
  {
    path: "/admin/auth/login",
    name: "login",
    component: LoginPage,
    meta: { transition: "slide-right" },
  },
  {
    path: "/admin/auth/register",
    name: "register",
    component: RegisterPage,
    meta: { transition: "slide-right" },
  },
];

export default authRoutes;
