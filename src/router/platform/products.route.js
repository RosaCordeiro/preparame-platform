import ScheduleProductsList from "../../components/platform/scheduleProducts/ScheduleProductsList.vue";
import ProductsQueryCrud from "../../components/platform/productsCrud/ProductsQueryCrud.vue";
import ProductsRegisterCrud from "../../components/platform/productsCrud/ProductsRegisterCrud.vue";
import AddProductToUserRegisterCrud from "../../components/platform/addProductToUserCrud/AddProductToUserRegisterCrud";
import ScheduleSpecialistsList from "../../components/platform/scheduleProducts/ScheduleSpecialistsList.vue";
import ViewProductsUser from "../../components/platform/viewProductsUser/ViewProductsUser.vue";
import Orders from "../../components/platform/orders/Orders.vue";
import Platform from "../../layouts/Platform.vue";

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
