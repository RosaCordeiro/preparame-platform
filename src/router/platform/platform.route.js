import Platform from "../../layouts/Platform.vue";

const HomeDynamicTemplate = () =>
  import("../../components/platform/home/HomeDynamicTemplate.vue");
const NPSSurvey = () =>
  import("../../components/platform/NPSSurvey/NPSSurvey.vue");
const interviewSimulatorPresentation = () =>
  import("../../components/platform/interviewSimulator/InterviewSimulatorPresentation.vue");
const interviewSimulator = () =>
  import("../../components/platform/interviewSimulator/InterviewSimulator.vue");
const ReplacementsReport = () =>
  import("../../components/platform/replacementsReport/ReplacementsReport.vue");
const HomeCompany = () =>
  import("../../components/platform/home/HomeCompany.vue");

const platformRoutes = [
  {
    path: "/platform",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: HomeDynamicTemplate,
        },
        meta: {
          rhSection: "metrics",
        },
      },
    ],
  },
  {
    path: "/rh/indicadores/quantitativa",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: HomeCompany,
        },
        meta: {
          rhSection: "quantitative",
        },
      },
    ],
    props: {
      userTypes: ["COMPANY_ADMIN"],
    },
  },
  {
    path: "/rh/indicadores/qualitativa",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: HomeCompany,
        },
        meta: {
          rhSection: "qualitative",
        },
      },
    ],
    props: {
      userTypes: ["COMPANY_ADMIN"],
    },
  },
  {
    path: "/survey",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: NPSSurvey,
        },
      },
    ],
  },
  {
    path: "/interviewSimulatorPresentation",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: interviewSimulatorPresentation,
        },
      },
    ],
  },
  {
    path: "/interviewSimulator",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: interviewSimulator,
        },
      },
    ],
  },
  {
    path: "/replacementsReport",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        name: "replacementsReport",
        components: {
          content: ReplacementsReport,
        },
      },
    ],
  },
];

export { platformRoutes };
