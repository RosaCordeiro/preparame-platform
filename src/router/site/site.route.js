import ProductDetails from "../../layouts/ProductDetails.vue";
import ProductList from "../../layouts/ProductList.vue";
import ProductSchedule from "../../layouts/ProductSchedule.vue";
import HomePage from "../../layouts/novo-site/HomePage.vue";
import HomePageCompany from "../../layouts/HomePageCompany.vue";
import MateriaisGratuitos from "../../layouts/MateriaisGratuitos.vue";

import ShoppingCart from "../../layouts/ShoppingCart.vue";
import Site from "../../layouts/Site.vue";
import CompanyDetails from "../../layouts/CompanyDetails.vue";
import FAQ from "../../layouts/FAQ.vue";
import PrivacyTerms from "../../layouts/PrivacyTerms.vue";
import UseTerms from "../../layouts/UseTerms.vue";
import ResponsibleDemission from "../../layouts/ResponsibleDemission.vue";
import PageNotFound from "../../pages/PageNotFound.vue";
import KitPro from "../../components/site/kitProPage/KitProPage";
import NewLayout from "src/layouts/novo-site/NewLayout.vue";
import ClientesPage from "src/layouts/novo-site/ClientesPage.vue";
import TreinamentoPage from "src/layouts/novo-site/TreinamentoPage.vue";

const siteRoutes = [
  {
    path: "/",
    components: {
      site: NewLayout,
    },
    children: [
      {
        path: "/",
        components: {
          content: HomePage,
        },
      },
      {
        path: "/clientes",
        components: {
          content: ClientesPage,
        },
      },
      {
        path: "/treinamento",
        components: {
          content: TreinamentoPage,
        },
      },
    ],
  },
  {
    path: "/patrocinio/:companyName",
    components: {
      site: HomePageCompany,
    },
  },
  {
    path: "/MateriaisGratuitos/:materialName",
    components: {
      site: MateriaisGratuitos,
    },
  },
  {
    path: "/ProductDetails",
    components: {
      site: Site,
    },
    children: [
      {
        path: "/",
        components: {
          content: ProductDetails,
        },
      },
    ],
  },
  {
    path: "/KitRecolocacao",
    components: {
      site: Site,
    },
    children: [
      {
        path: "/",
        components: {
          content: KitPro,
        },
      },
    ],
  },
  {
    path: "/demissaohumanizada",
    components: {
      site: Site,
    },
    children: [
      {
        path: "/",
        components: {
          content: ResponsibleDemission,
        },
      },
    ],
  },
  {
    path: "/ProductList",
    components: {
      site: Site,
    },
    children: [
      {
        path: "/",
        components: {
          content: ProductList,
        },
      },
    ],
  },
  {
    path: "/ProductSchedule",
    components: {
      site: Site,
    },
    children: [
      {
        path: "/",
        components: {
          content: ProductSchedule,
        },
      },
    ],
  },
  {
    path: "/ShoppingCart",
    components: {
      site: Site,
    },
    children: [
      {
        path: "/",
        components: {
          content: ShoppingCart,
        },
      },
    ],
  },
  {
    path: "/CompanyDetails",
    components: {
      site: Site,
    },
    children: [
      {
        path: "/",
        components: {
          content: CompanyDetails,
        },
      },
    ],
  },
  {
    path: "/FAQ",
    components: {
      site: Site,
    },
    children: [
      {
        path: "/",
        components: {
          content: FAQ,
        },
      },
    ],
  },
  {
    path: "/PrivacyTerms",
    components: {
      site: Site,
    },
    children: [
      {
        path: "/",
        components: {
          content: PrivacyTerms,
        },
      },
    ],
  },
  {
    path: "/UseTerms",
    components: {
      site: Site,
    },
    children: [
      {
        path: "/",
        components: {
          content: UseTerms,
        },
      },
    ],
  },
  {
    path: "*",
    components: {
      site: Site,
    },
    children: [
      {
        path: "/",
        components: {
          content: PageNotFound,
        },
      },
    ],
  },
];

export { siteRoutes };
