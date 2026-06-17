const EXTERNAL_OBJECTIVES_URL =
  "https://docs.google.com/spreadsheets/u/1/d/1a5cmeVaEFhiLUGiA2afVFQy9llyjy4QQJfrvNTTTbQk/edit?gid=776597408&pli=1&authuser=1";

export const menuByUserType = {
  ADMIN: {
    groups: [
      {
        icon: "mdi-folder-multiple-outline",
        label: "Cadastros",
        items: [
          { icon: "mdi-domain", label: "Empresas", url: "companies" },
          {
            icon: "mdi-account-multiple-plus-outline",
            label: "Usuários",
            url: "users",
          },
          {
            icon: "mdi-account-multiple",
            label: "Funcionários",
            url: "companies/employees",
          },
          {
            icon: "mdi-file-document-edit-outline",
            label: "Planos de Assinaturas",
            url: "subscriptionPlans",
          },
          {
            icon: "mdi-account-check",
            label: "Especialistas",
            url: "specialists",
          },
          { icon: "mdi-briefcase", label: "Produtos", url: "products" },
        ],
      },
      {
        icon: "mdi-monitor-dashboard",
        label: "Simulador",
        items: [
          {
            icon: "mdi-file-video-outline",
            label: "Grupos de Videos do Simulador",
            url: "simulatorVideosGroups",
          },
          {
            icon: "mdi-video-account",
            label: "Videos do Simulador",
            url: "simulatorVideos",
          },
        ],
      },
      {
        icon: "mdi-cog-outline",
        label: "Operações",
        items: [
          {
            icon: "mdi-account-edit",
            label: "Adicionar Produto para Usuário",
            url: "addProductToUser",
          },
          {
            icon: "laptop_mac",
            label: "Mentorias Coletivas",
            url: "mentoring",
          },
          {
            icon: "category",
            label: "Materiais Gratuitos",
            url: "materials",
          },
        ],
      },
      {
        icon: "mdi-chart-box-outline",
        label: "Consultas",
        items: [
          {
            icon: "mdi-eye",
            label: "Ver Produtos do Usuário",
            url: "viewProductsUser",
          },
          {
            icon: "open_in_new",
            label: "Ver Objetivos dos Clientes",
            url: EXTERNAL_OBJECTIVES_URL,
          },
        ],
      },
    ],
  },
  USER: {
    items: [
      {
        icon: "mdi-monitor",
        label: "Simulador de entrevistas",
        url: "interviewSimulatorPresentation",
      },
      {
        icon: "mdi-cart",
        label: "Meus Pedidos",
        url: "orders",
      },
    ],
  },
  SPECIALIST: {
    items: [
      {
        icon: "mdi-calendar-plus",
        label: "Disponibilizar Horários",
        url: "providesTimetables",
      },
      {
        icon: "mdi-eye",
        label: "Ver Produtos do Usuário",
        url: "viewProductsUser",
      },
      {
        icon: "open_in_new",
        label: "Ver Objetivos dos Clientes",
        url: EXTERNAL_OBJECTIVES_URL,
      },
    ],
  },
  COMPANY_ADMIN: {
    items: [
      {
        icon: "open_in_new",
        label: "Perguntas Qualitativas",
        url: "surveyQuestions",
      },
    ],
  },
};
