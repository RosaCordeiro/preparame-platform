import Platform from "../../layouts/Platform.vue";

const Mentoring = () =>
  import("../../components/platform/mentoring/Mentoring.vue");
const UpdateMentoring = () =>
  import("../../components/platform/updateProduct/UpdateMentoring.vue");
const MentoringRegisterCrud = () =>
  import("../../components/platform/mentoring/MentoringRegisterCrud.vue");

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
    path: "/mentoring/update",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: UpdateMentoring,
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
