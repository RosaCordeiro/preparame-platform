import Mentoring from "../../components/platform/mentoring/Mentoring.vue";
import MentoringRegisterCrud from "../../components/platform/mentoring/MentoringRegisterCrud.vue";
import Platform from "../../layouts/Platform.vue";

const mentoringRoutes = [
  {
    path: "/mentoring",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: Mentoring,
        },
      },
    ],
  },
  {
    path: "/mentoring/new",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: MentoringRegisterCrud,
        },
      },
    ],
    props: {
      userTypes: ["ADMIN"],
    },
  },
  {
    path: "/mentoring/:id",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: MentoringRegisterCrud,
        },
      },
    ],
    props: {
      userTypes: ["ADMIN"],
    },
  },
];

export { mentoringRoutes };
