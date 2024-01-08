const links = [
  {
    label: "Dashboard",
    path: "/admin/",
    icon: "home",
    key: "dashboard",
    index: "1",
  },
  {
    label: "Pedidos",
    path: "/admin/orders",
    icon: "task",
    key: "orders",
    index: "2",
  },
  {
    label: "Clientes",
    path: "/admin/clients",
    icon: "group",
    key: "clients",
    index: "3",
  },
  {
    label: "Universidades",
    path: "/admin/intitutes",
    icon: "apartment",
    key: "intitutes",
    index: "4",
    childs: [],
  },
  {
    label: "Carreras",
    path: "/admin/careers",
    icon: "school",
    key: "careers",
    index: "5",
    childs: [],
  },
  {
    label: "Documentos",
    path: "/admin/documents",
    icon: "description",
    key: "documents",
    index: "6",
    childs: [],
  },
  {
    label: "Ajustes",
    path: "/admin/settings",
    icon: "settings",
    key: "settings",
    index: "7",
    childs: [],
  },
  {
    label: "Perfil",
    path: "/admin/profile",
    icon: "person",
    key: "profile",
    index: "8",
    childs: [
      {
        label: "Actualizar",
        path: "/admin/profile/new",
        icon: "edit_note",
        key: "profile_update",
        index: "8",
      },
    ],
  },
];

export default links;
/*  
                   
                   
                    </router-link>
                    <router-link class="  side-menu-link ifDark " to="/admin/profile">
                        <span class="material-icons-outlined">person</span>
                        <span>Perfil</span>
                    </router-link> */
