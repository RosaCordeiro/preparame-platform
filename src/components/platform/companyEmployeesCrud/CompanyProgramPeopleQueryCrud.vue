<template>
  <div class="company-program-people-crud">
    <CrudQuery
      :title="title"
      :breadcrumbs="breadcrumbs"
      :filters="filters"
      :columns="columns"
      :url="url"
      block-create-new
      block-remove
    >
      <template #title>
        <div class="row justify-end">
          <q-btn
            color="positive"
            label="Download"
            icon="mdi-download"
            class="crud-new-button"
            no-caps
            @click="downloadModelo()"
          />
        </div>
      </template>
    </CrudQuery>
  </div>
</template>

<script>
import { downloadFile } from "src/utils/downloadFile";
import CrudQuery from "../../general/crud/CrudQuery.vue";
import axios from "axios";
import { baseApiUrl, showError } from "src/global";

const DISMISSAL_TYPE_LABELS = {
  voluntary: "Voluntária",
  involuntary: "Involuntária",
};

export default {
  components: {
    CrudQuery,
  },
  data() {
    return {
      title: "Pessoas do Programa",
      url: "companies/employees",
      breadcrumbs: [
        {
          title: "Pessoas do Programa",
          to: "",
        },
      ],
      filters: {
        name: {
          label: "Nome",
          name: "name",
          size: "6",
          row: 1,
          col: 1,
          model: "",
          type: "Input",
          visible: true,
        },
        phone: {
          label: "Telefone",
          name: "phone",
          size: "3",
          row: 1,
          col: 2,
          model: "",
          type: "Input",
          visible: true,
        },
        email: {
          label: "E-Mail",
          name: "email",
          size: "6",
          row: 1,
          col: 3,
          model: "",
          type: "Input",
          visible: true,
        },
        department: {
          label: "Área",
          name: "department",
          size: "4",
          row: 2,
          col: 1,
          model: "",
          type: "Input",
          visible: true,
        },
        unity: {
          label: "Unidade",
          name: "unity",
          size: "4",
          row: 2,
          col: 2,
          model: "",
          type: "Input",
          visible: true,
        },
        dismissalType: {
          label: "Tipo de Demissão",
          name: "dismissalType",
          size: "4",
          row: 2,
          col: 3,
          model: "",
          type: "Select",
          options: [
            { label: "Todos", value: "" },
            { label: "Voluntária", value: "voluntary" },
            { label: "Involuntária", value: "involuntary" },
          ],
          visible: true,
        },
        companyId: {
          label: "Empresa",
          name: "companyId",
          size: "6",
          row: 3,
          col: 1,
          model: localStorage.getItem("companyId") || "",
          type: "Input",
          visible: false,
          locked: true,
        },
      },
      columns: [
        {
          name: "name",
          label: "Nome",
          align: "left",
          field: "name",
          sortable: true,
          visible: true,
        },
        {
          name: "phone",
          label: "Telefone",
          align: "left",
          field: "phone",
          sortable: true,
          visible: true,
        },
        {
          name: "email",
          label: "E-Mail",
          align: "left",
          field: "email",
          sortable: true,
          visible: true,
        },
        {
          name: "linkedinUrl",
          label: "Página do LinkedIn",
          align: "left",
          field: "linkedinUrl",
          sortable: true,
          visible: true,
          format: (val) => {
            if (!val) return "N/A";

            return val;
          },
        },
        {
          name: "userName",
          align: "left",
          label: "Usuário",
          field: "user.name",
          sortable: true,
          visible: true,
        },
        {
          name: "position",
          label: "Cargo",
          align: "left",
          field: "position",
          sortable: true,
          visible: true,
        },
        {
          name: "department",
          label: "Área",
          align: "left",
          field: "department",
          sortable: true,
          visible: true,
        },
        {
          name: "unity",
          label: "Unidade",
          align: "left",
          field: "unity",
          sortable: true,
          visible: true,
        },
        {
          name: "subarea",
          label: "Subárea",
          align: "left",
          field: "subarea",
          sortable: true,
          visible: true,
        },
        {
          name: "level",
          label: "Nível",
          align: "left",
          field: "level",
          sortable: true,
          visible: true,
        },
        {
          name: "city",
          label: "Cidade",
          align: "left",
          field: "city",
          sortable: true,
          visible: true,
        },
        {
          name: "state",
          label: "Estado",
          align: "left",
          field: "state",
          sortable: true,
          visible: true,
        },
        {
          name: "entryDate",
          label: "Data de Entrada",
          align: "left",
          field: "entryDate",
          sortable: true,
          visible: true,
          format: (val) => {
            if (!val) return "N/A";

            const date = new Date(val);
            return Number.isNaN(date.getTime())
              ? val
              : date.toLocaleDateString("pt-BR");
          },
        },
        {
          name: "dismissalType",
          label: "Tipo de Demissão",
          align: "left",
          field: "dismissalType",
          sortable: true,
          visible: true,
          format: (val) => {
            if (!val) return "N/A";

            return DISMISSAL_TYPE_LABELS[val] || val;
          },
        },
        {
          name: "gender",
          label: "Gênero",
          align: "left",
          field: "gender",
          sortable: true,
          visible: true,
        },
        {
          name: "etnia",
          label: "Etnia",
          align: "left",
          field: "etnia",
          sortable: true,
          visible: true,
        },
        {
          name: "pcd",
          label: "PCD",
          align: "left",
          field: "pcd",
          sortable: true,
          visible: true,
          format: (val) => {
            if (val === true || val === "true") return "Sim";
            if (val === false || val === "false") return "Não";

            return "N/A";
          },
        },
      ],
    };
  },
  methods: {
    downloadModelo: async function () {
      const config = {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}/companies/employees/batch/download`,
        responseType: "blob",
      };

      this.$q.loading.show();

      try {
        const data = await axios(config);
        downloadFile(data.data, "Modelo Funcionários.xlsx");
      } catch (error) {
        showError(error);
      }

      this.$q.loading.hide();
    },
  },
  created() {
    this.filters.companyId.model = localStorage.getItem("companyId") || "";
  },
};
</script>
