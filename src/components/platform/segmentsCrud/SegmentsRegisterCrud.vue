<template>
  <div class="segments-crud">
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
    editUrl: "/segments",
    tables: {
      mainTable: {
        id: null,
        apiUrl: "/segments",
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
          name: {
            label: "Nome",
            name: "name",
            size: "12",
            row: 1,
            col: 1,
            model: "",
            type: "Input",
            visible: true,
          },
        },
      },
    },
    breadcrumbs: [
      { title: "Segmentos", to: "/segments" },
      { title: "Cadastro de Segmento", to: "" },
    ],
    title: "Cadastro de Segmento",
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
