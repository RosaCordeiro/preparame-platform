import Platform from "../../layouts/Platform.vue";

const MaterialsQueryCrud = () =>
  import("../../components/platform/materials/MaterialsQueryCrud.vue");
const MaterialsRegisterCrud = () =>
  import("../../components/platform/materials/MaterialsRegisterCrud.vue");

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
