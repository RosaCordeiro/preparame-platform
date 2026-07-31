import Platform from "../../layouts/Platform.vue";

const SegmentsQueryCrud = () =>
  import("../../components/platform/segmentsCrud/SegmentsQueryCrud.vue");
const SegmentsRegisterCrud = () =>
  import("../../components/platform/segmentsCrud/SegmentsRegisterCrud.vue");

const segmentRoutes = [
  {
    path: "/segments",
    components: { site: Platform },
    children: [{ path: "", components: { content: SegmentsQueryCrud } }],
  },
  {
    path: "/segments/new",
    components: { site: Platform },
    children: [{ path: "", components: { content: SegmentsRegisterCrud } }],
    props: { userTypes: ["ADMIN"] },
  },
  {
    path: "/segments/:id",
    components: { site: Platform },
    children: [{ path: "", components: { content: SegmentsRegisterCrud } }],
    props: { userTypes: ["ADMIN"] },
  },
];

export { segmentRoutes };
