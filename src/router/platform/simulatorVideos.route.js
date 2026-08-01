import Platform from "../../layouts/Platform.vue";

const SimulatorVideosGroupsQueryCrud = () =>
  import("../../components/platform/simulatorVideosGroupCrud/SimulatorVideosGroupQueryCrud.vue");
const SimulatorVideosGroupsRegisterCrud = () =>
  import("../../components/platform/simulatorVideosGroupCrud/SimulatorVideosGroupRegisterCrud.vue");
const SimulatorVideoQueryCrud = () =>
  import("../../components/platform/simulatorVideoCrud/SimulatorVideoQueryCrud.vue");
const SimulatorVideoRegisterCrud = () =>
  import("../../components/platform/simulatorVideoCrud/SimulatorVideoRegisterCrud.vue");

const simulatorVideosGroupRoutes = [
  {
    path: "/simulatorVideosGroups",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: SimulatorVideosGroupsQueryCrud,
        },
      },
    ],
  },
  {
    path: "/simulatorVideosGroups/new",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: SimulatorVideosGroupsRegisterCrud,
        },
      },
    ],
    props: {
      userTypes: ["ADMIN"],
    },
  },
  {
    path: "/simulatorVideosGroups/:id",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: SimulatorVideosGroupsRegisterCrud,
        },
      },
    ],
    props: {
      userTypes: ["ADMIN"],
    },
  },
  {
    path: "/simulatorVideos",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: SimulatorVideoQueryCrud,
        },
      },
    ],
  },
  {
    path: "/simulatorVideos/new",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: SimulatorVideoRegisterCrud,
        },
      },
    ],
    props: {
      userTypes: ["ADMIN"],
    },
  },
  {
    path: "/simulatorVideos/:id",
    components: {
      site: Platform,
    },
    children: [
      {
        path: "/",
        components: {
          content: SimulatorVideoRegisterCrud,
        },
      },
    ],
    props: {
      userTypes: ["ADMIN"],
    },
  },
];

export { simulatorVideosGroupRoutes };
