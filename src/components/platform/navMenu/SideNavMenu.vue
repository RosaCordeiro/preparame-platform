<template>
  <div id="q-app">
    <q-drawer
      v-if="menuList.length > 0"
      v-model="drawerController"
      show-if-above
      :width="300"
      :breakpoint="100"
      bordered
      overlay
      content-class="side-nav-menu"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList">
            <q-item
              :key="index"
              clickable
              v-ripple
              @click="goUrl(menuItem.url)"
              class="side-nav-menu-item"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon"></q-icon>
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
const menu = {
  ADMIN: {
    menuList: [
      {
        icon: "mdi-domain",
        label: "Empresas",
        separator: false,
        url: "companies",
      },
      {
        icon: "mdi-account-multiple-plus-outline",
        label: "Usuários",
        separator: false,
        url: "users",
      },
      {
        icon: "mdi-account-multiple",
        label: "Funcionários",
        separator: false,
        url: "companies/employees",
      },
      {
        icon: "mdi-file-document-edit-outline",
        label: "Planos de Assinaturas",
        separator: false,
        url: "subscriptionPlans",
      },
      {
        icon: "mdi-account-check",
        label: "Especialistas",
        separator: false,
        url: "specialists",
      },
      {
        icon: "mdi-briefcase",
        label: "Produtos",
        separator: false,
        url: "products",
      },
      {
        icon: "mdi-file-video-outline",
        label: "Grupos de Videos do Simulador",
        separator: false,
        url: "simulatorVideosGroups",
      },
      {
        icon: "mdi-video-account",
        label: "Videos do Simulador",
        separator: false,
        url: "simulatorVideos",
      },
      {
        icon: "mdi-account-edit",
        label: "Adicionar Produto para Usuário",
        separator: false,
        url: "addProductToUser",
      },
      {
        icon: "laptop_mac",
        label: "Mentorias Coletivas",
        separator: false,
        url: "mentoring",
      },
      {
        icon: "category",
        label: "Materiais Gratuitos",
        separator: false,
        url: "materials",
      },

      {
        icon: "open_in_new",
        label: "Ver Objetivos dos Clientes",
        separator: false,
        url: "https://docs.google.com/spreadsheets/d/1QwRXwjQPiYQnhM2-NJ9tE25JR4U7S2FzXw3rICjr2As/edit?usp=sharing",
      },
    ],
  },
  USER: {
    menuList: [
      // {
      //   icon: "mdi-file-document-edit-outline",
      //   label: "Construtor de currículo",
      //   separator: true,
      //   url: "resumeCreatorPresentation",
      // },
      {
        icon: "mdi-monitor",
        label: "Simulador de entrevistas",
        separator: true,
        url: "interviewSimulatorPresentation",
      },
      {
        icon: "mdi-cart",
        label: "Meus Pedidos",
        separator: true,
        url: "orders",
      },
    ],
  },
  SPECIALIST: {
    menuList: [
      {
        icon: "mdi-calendar",
        label: "Disponibilizar Horários",
        separator: true,
        url: "providesTimetables",
      },
      {
        icon: "open_in_new",
        label: "Ver Objetivos dos Clientes",
        separator: false,
        url: "https://docs.google.com/spreadsheets/d/1QwRXwjQPiYQnhM2-NJ9tE25JR4U7S2FzXw3rICjr2As/edit?usp=sharing",
      },
      {
        icon: "person",
        label: "Visualizar Produtos do Usuário",
        separator: false,
        url: "viewProductsUser",
      },
    ],
  },
  COMPANY_ADMIN: {
    menuList: [],
  },
};

export default {
  data() {
    return {
      menuList: [],
      drawerController: false,
    };
  },
  props: ["sideNavMenuComponent"],
  methods: {
    goUrl: function (url) {
      if (String(url).startsWith("http")) {
        this.goBlank(url);
        return;
      }

      if (this.$router.history.current.path !== `/${url}`) {
        this.$router.push({ path: `/${url}` });
      }
    },
    goBlank: function (url) {
      window.open(url, "_blank");
    },

    toogleMenu() {
      this.drawerController = !this.drawerController;
    },
  },
  mounted() {
    this.sideNavMenuComponent.$on("toogleMenu", this.toogleMenu);
  },
  created() {
    const userType = localStorage.getItem("userType");

    this.menuList = menu[userType].menuList;
  },
};
</script>

<style lang="scss">
.side-nav-menu {
  height: 100%;
  background-color: #fff;
}

.side-nav-menu-list {
  font-family: "Nunito";
  font-style: normal;
  height: 100%;
}

.side-nav-menu-item {
  font-family: "Nunito";
  font-weight: 700;
  background-color: #fff;
  color: #454545;
  transition: all 0.1s ease;
  border-right: 10px solid transparent;
}

.side-nav-menu-item:hover {
  background: rgb(210, 212, 234);
  background: linear-gradient(
    90deg,
    rgba(210, 212, 234, 1) 0%,
    rgba(217, 219, 241, 1) 100%
  );
  border-right: 10px solid #c1c3d6;
}

.side-nav-menu-item:hover > .q-item__section > .q-icon {
  background: #1a27b7;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.side-nav-menu-item:hover > .q-item__section {
  background: linear-gradient(90deg, #1a27b7 0%, #ff4690 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
