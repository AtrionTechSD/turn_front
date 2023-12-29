const profileRoutes = [
  {
    path: "/profile/",
    name: "profile",
    component: () => import("@/pages/profile/ProfilePage.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/profile/new",
    name: "new_profile",
    component: () => import("@/pages/profile/NewProfilePage.vue"),
    meta: {
      auth: true,
      newProfile: true,
      meta: { transition: "slide-right" },
    },
  },
];

export default profileRoutes;
