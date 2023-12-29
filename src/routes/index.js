import { createWebHistory, createRouter } from "vue-router";

import appRoutes from "./app.routes";
import Cookies from "js-cookie";
import authRoutes from "./auth.routes";

const routes = [...appRoutes, ...authRoutes];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const auth = () => {
  const token = Cookies.get("turnToken");
  return Boolean(token);
};

const hasProfile = () => {
  const user =
    Cookies.get("turnUser") != null ? JSON.parse(Cookies.get("turnUser")) : {};
  return Boolean(user?.name);
};

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  const isAuth = auth();
  const isProfile = hasProfile();
  if (isAuth && to.fullPath.includes("auth")) {
    next("/");
    return;
  }
  if (!isAuth && to.meta.auth) {
    next("/auth/login");
    return;
  }
  if (isAuth && !isProfile && !to.meta.newProfile) {
    next("/profile/new");
    return;
  }
  next();
  return;
});
export default router;
