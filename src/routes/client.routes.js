const clientRoutes = [
  {
    path: "/admin/clients/",
    name: "clients",
    component: () => import("@/pages/clients/ClientPage.vue"),
    meta: {
      auth: true,
      title: "Clientes",
    },
  },

  {
    path: "/admin/clients/:id",
    name: "clients_detail",
    component: () => import("@/pages/clients/ClientDetail.vue"),
    meta: {
      auth: true,
      title: "Detalle de Cliente",
    },
  },
];

export default clientRoutes;
