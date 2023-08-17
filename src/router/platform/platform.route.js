import Platform from "../../layouts/Platform.vue";
import HomeDynamicTemplate from "../../components/platform/home/HomeDynamicTemplate.vue";
import NPSSurvey from "../../components/platform/NPSSurvey/NPSSurvey.vue";
import interviewSimulatorPresentation from "../../components/platform/interviewSimulator/InterviewSimulatorPresentation.vue";
import interviewSimulator from "../../components/platform/interviewSimulator/InterviewSimulator.vue";

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
      },
    ],
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
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next({
          path: "/login",
          query: {
            redirect: "pesquisa",
          },
        });
      }
    },
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
];

export { platformRoutes };
