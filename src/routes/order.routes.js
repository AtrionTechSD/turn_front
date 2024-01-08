const orderRoutes = [
  {
    path: "/admin/orders/",
    name: "orders",
    component: () => import("@/pages/orders/OrderPage.vue"),
    meta: {
      auth: true,
      title: "Pédidos y tareas",
    },
  },

  /* {
    path: "/admin/orders/:id",
    name: "orders_detail",
    component: () => import("@/pages/orders/OrderDetail.vue"),
    meta: {
      auth: true,
      title: "Detalle de Ordere",
    },
  }, */
];

export default orderRoutes;
