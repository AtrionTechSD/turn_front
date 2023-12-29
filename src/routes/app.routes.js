import AppLayout from "@/layouts/AppLayout.vue";
import Dashboard from "@/pages/DashboardPage.vue";
import NotFound from "@/pages/NotFound.vue";
import profileRoutes from "./profile.routes";

const appRoutes = [
  {
    path: "/",
    redirect: "/dashboard",
  },

  {
    path: "/",
    component: AppLayout,
    meta: {
      auth: true,
      transition: "slide-right",
    },
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
      },
      ...profileRoutes,
    ],
  },
];

export default appRoutes;
