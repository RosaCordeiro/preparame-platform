import Platform from "../../layouts/Platform.vue";

const SubsegmentsQueryCrud = () =>
  import("../../components/platform/subsegmentsCrud/SubsegmentsQueryCrud.vue");
const SubsegmentsRegisterCrud = () =>
  import("../../components/platform/subsegmentsCrud/SubsegmentsRegisterCrud.vue");

const subsegmentRoutes = [
  {
    path: "/subsegments",
    components: { site: Platform },
    children: [{ path: "", components: { content: SubsegmentsQueryCrud } }],
  },
  {
    path: "/subsegments/new",
    components: { site: Platform },
    children: [{ path: "", components: { content: SubsegmentsRegisterCrud } }],
    props: { userTypes: ["ADMIN"] },
  },
  {
    path: "/subsegments/:id",
    components: { site: Platform },
    children: [{ path: "", components: { content: SubsegmentsRegisterCrud } }],
    props: { userTypes: ["ADMIN"] },
  },
];

export { subsegmentRoutes };
