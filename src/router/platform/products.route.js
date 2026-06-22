import Platform from "../../layouts/Platform.vue";

const ScheduleProductsList = () =>
  import("../../components/platform/scheduleProducts/ScheduleProductsList.vue");
const ProductsQueryCrud = () =>
  import("../../components/platform/productsCrud/ProductsQueryCrud.vue");
const ProductsRegisterCrud = () =>
  import("../../components/platform/productsCrud/ProductsRegisterCrud.vue");
const AddProductToUserRegisterCrud = () =>
  import("../../components/platform/addProductToUserCrud/AddProductToUserRegisterCrud");
const ScheduleSpecialistsList = () =>
  import("../../components/platform/scheduleProducts/ScheduleSpecialistsList.vue");
const ViewProductsUser = () =>
  import("../../components/platform/viewProductsUser/ViewProductsUser.vue");
const Orders = () => import("../../components/platform/orders/Orders.vue");

const productRoutes = [
  {
    path: "/products",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: ProductsQueryCrud,
        },
      },
    ],
  },
  {
    path: "/addProductToUser",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: AddProductToUserRegisterCrud,
        },
      },
    ],
  },
  {
    path: "/viewProductsUser",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: ViewProductsUser,
        },
      },
    ],
  },

  {
    path: "/orders",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: Orders,
        },
      },
    ],
  },
  {
    path: "/products/new",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: ProductsRegisterCrud,
        },
      },
    ],
    props: {
      userTypes: ["ADMIN"],
    },
  },
  {
    path: "/products/list",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: ScheduleProductsList,
        },
      },
    ],
  },
  {
    path: "/products/:id",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: ProductsRegisterCrud,
        },
      },
    ],
    props: {
      userTypes: ["ADMIN"],
    },
  },
  {
    path: "/products/schedule/:productId",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: ScheduleSpecialistsList,
        },
      },
    ],
  },
];

export { productRoutes };
