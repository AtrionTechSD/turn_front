import AppLayout from "@/layouts/AppLayout.vue";
import Dashboard from "@/pages/DashboardPage.vue";
import NotFound from "@/pages/NotFound.vue";
import profileRoutes from "./profile.routes";
import clientRoutes from "./client.routes";
import orderRoutes from "./order.routes";

const appRoutes = [
  {
    path: "/admin/",
    redirect: "/dashboard",
  },

  {
    path: "/admin/",
    component: AppLayout,
    meta: {
      auth: true,
    },
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
        meta: {
          title: "Dashboard",
        },
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
        meta: {
          title: "Página no Encontrada",
        },
      },
      ...profileRoutes,
      ...clientRoutes,
      ...orderRoutes,
    ],
  },
];

export default appRoutes;
