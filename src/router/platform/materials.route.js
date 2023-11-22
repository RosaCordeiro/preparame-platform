import MaterialsQueryCrud from "../../components/platform/materials/MaterialsQueryCrud.vue";
import MaterialsRegisterCrud from "../../components/platform/materials/MaterialsRegisterCrud.vue";
import Platform from "../../layouts/Platform.vue";

const materialsRoutes = [
  {
    path: "/materials",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: MaterialsQueryCrud,
        },
      },
    ],
    props: {
      userTypes: ["ADMIN"],
    },
  },

  {
    path: "/materials/new",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: MaterialsRegisterCrud,
        },
      },
    ],
    props: {
      userTypes: ["ADMIN"],
    },
  },
  {
    path: "/materials/:id",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: MaterialsRegisterCrud,
        },
      },
    ],
    props: {
      userTypes: ["ADMIN"],
    },
  },
];

export { materialsRoutes };
