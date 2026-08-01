<template>
  <div class="subsegments-crud">
    <CrudRegister
      :breadcrumbs="breadcrumbs"
      :title="title"
      :tables="tables"
    />
  </div>
</template>

<script>
import CrudRegister from "./../../general/crud/CrudRegister.vue";
import { openEditCrud } from "./../../general/crud/utils/openEditCrud.js";
import { saveCrud } from "./../../general/crud/utils/saveCrud.js";
import { showError } from "../../../global.js";

export default {
  components: { CrudRegister },
  data: () => ({
    editUrl: "/subsegments",
    tables: {
      mainTable: {
        id: null,
        apiUrl: "/subsegments",
        registerColumns: {
          id: {
            label: "Id",
            name: "id",
            size: "12",
            row: 1,
            col: 1,
            model: "",
            type: "Input",
            visible: false,
          },
          segmentId: {
            label: "Segmento",
            name: "segmentId",
            size: "6",
            row: 1,
            col: 1,
            model: "",
            type: "DialogSelect",
            visible: true,
            options: {
              table: "segments",
              value: "id",
              label: "name",
              editFieldLabel: "segment",
              editFieldValue: "segmentId",
            },
          },
          name: {
            label: "Nome",
            name: "name",
            size: "6",
            row: 1,
            col: 2,
            model: "",
            type: "Input",
            visible: true,
          },
        },
      },
    },
    breadcrumbs: [
      { title: "Subsegmentos", to: "/subsegments" },
      { title: "Cadastro de Subsegmento", to: "" },
    ],
    title: "Cadastro de Subsegmento",
  }),
  async created() {
    this.id = this.$router.history.current.params.id;
    openEditCrud(this.id, this.editUrl, this.tables);
  },
  methods: {
    save: async function (data) {
      try {
        return await saveCrud(this.tables.mainTable.apiUrl, data.mainTable);
      } catch (err) {
        showError(err);
        return false;
      }
    },
  },
};
</script>
