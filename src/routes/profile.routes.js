const profileRoutes = [
  {
    path: "/admin/profile/",
    name: "profile",
    component: () => import("@/pages/profile/ProfilePage.vue"),
    meta: {
      auth: true,
      title: "Mi Perfil",
    },
  },
  {
    path: "/admin/profile/new",
    name: "new_profile",
    component: () => import("@/pages/profile/NewProfilePage.vue"),
    meta: {
      auth: true,
      newProfile: true,
      title: "Actualizar Perfil",
    },
  },
];

export default profileRoutes;
