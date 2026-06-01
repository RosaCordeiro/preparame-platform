import SimulatorVideosGroupsQueryCrud from "../../components/platform/simulatorVideosGroupCrud/SimulatorVideosGroupQueryCrud.vue";
import SimulatorVideosGroupsRegisterCrud from "../../components/platform/simulatorVideosGroupCrud/SimulatorVideosGroupRegisterCrud.vue";
import SimulatorVideoQueryCrud from "../../components/platform/simulatorVideoCrud/SimulatorVideoQueryCrud.vue";
import SimulatorVideoRegisterCrud from "../../components/platform/simulatorVideoCrud/SimulatorVideoRegisterCrud.vue";
import Platform from "../../layouts/Platform.vue";

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
