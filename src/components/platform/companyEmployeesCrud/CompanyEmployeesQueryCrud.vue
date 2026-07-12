<template>
  <div class="company-employee-crud">
    <CrudQuery
      :title="title"
      :breadcrumbs="breadcrumbs"
      :filters="filters"
      :columns="columns"
      :url="url"
    >
      <template #title>
        <div class="row justify-end">
          <q-btn
            color="positive"
            label="Download Modelo"
            icon="mdi-download"
            class="crud-new-button q-mr-sm"
            no-caps
            @click="downloadModelo()"
          ></q-btn>
          <q-btn
            color="primary"
            icon="mdi-upload"
            label="Importar"
            class="crud-new-button"
            no-caps
            @click="importFile()"
          ></q-btn>
        </div>
      </template>
    </CrudQuery>
  </div>
</template>

<script>
import { downloadFile } from "src/utils/downloadFile";
import CrudQuery from "./../../general/crud/CrudQuery.vue";
import axios from "axios";
import { baseApiUrl, showError } from "src/global";

export default {
  components: {
    CrudQuery,
  },
  data() {
    return {
      showDialog: true,
    };
  },
  methods: {
    importFile: function () {
      /* import file */
      let file = document.createElement("input");
      file.type = "file";
      file.accept = ".xlsx";
      file.click();

      file.onchange = async () => {
        let formData = new FormData();
        formData.append("file", file.files[0]);

        this.$q
          .dialog({
            title: "Importar",
            message: `Desseja realmente importar o arquivo ${file.files[0].name}?`,
            cancel: true,
            persistent: true,
          })
          .onOk(async () => {
            let config = {
              method: "POST",
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
              },
              url: `${baseApiUrl}/companies/employees/batch`,
              data: formData,
            };

            this.$q.loading.show();

            try {
              const data = await axios(config);
              this.$q.notify({
                color: "positive",
                message: "Importado com sucesso!",
              });

              window.location.reload(true);
            } catch (error) {
              console.log(error);

              showError(error);
            }

            this.$q.loading.hide();
          });
      };
    },
    downloadModelo: async function () {
      let config = {
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
        console.log(error);

        showError(error);
      }

      this.$q.loading.hide();
    },
  },
  data() {
    return {
      title: "Funcionários",
      url: "companies/employees",
      breadcrumbs: [
        {
          title: "Funcionários",
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
        companyId: {
          label: "Empresa",
          name: "companyId",
          size: "6",
          row: 1,
          col: 2,
          model: "",
          type: "DialogSelect",
          visible: true,
          options: {
            table: "companies",
            value: "id",
            label: "name",
          },
        },
        phone: {
          label: "Telefone",
          name: "phone",
          size: "3",
          row: 2,
          col: 2,
          model: "",
          type: "Input",
          visible: true,
        },
        email: {
          label: "E-Mail",
          name: "email",
          size: "6",
          row: 2,
          col: 3,
          model: "",
          type: "Input",
          visible: true,
        },
        documentId: {
          label: "Documento",
          name: "documentId",
          size: "3",
          row: 2,
          col: 1,
          model: "",
          type: "Input",
          visible: true,
        },
        userId: {
          label: "Usuário",
          name: "userId",
          size: "6",
          row: 3,
          col: 1,
          model: "",
          type: "DialogSelect",
          visible: true,
          options: {
            table: "users",
            value: "id",
            label: "name",
          },
        },
        easyRegister: {
          label: "Cadastro Simples",
          name: "easyRegister",
          size: "3",
          row: 3,
          col: 2,
          model: "",
          type: "Select",
          options: [
            {
              label: "Sim",
              value: "YES",
            },
            {
              label: "Não",
              value: "NO",
            },
          ],
          visible: true,
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
          name: "companyName",
          align: "left",
          label: "Empresa",
          field: "company.name",
          sortable: true,
          visible: true,
        },
        {
          name: "documentId",
          label: "Documento",
          align: "left",
          field: "documentId",
          sortable: true,
          visible: true,
        },
        {
          name: "subscribeToken",
          label: "Token",
          align: "left",
          field: "subscribeToken",
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
          name: "plan",
          align: "left",
          label: "Plano",
          field: "plan",
          sortable: true,
          visible: true,
          format: (val) => {
            return !val ? "N/A" : val;
          },
        },
        {
          name: "easyRegister",
          align: "left",
          label: "Cadastro Simples",
          field: "easyRegister.label",
          sortable: true,
          visible: true,
        },
        {
          name: "accepted",
          label: "Acolhido",
          align: "center",
          field: "accepted",
          sortable: false,
          style: "width: 10px;",
          visible: true,
        },
        {
          name: "realocate",
          label: "Realocado",
          align: "center",
          field: "realocate",
          sortable: false,
          style: "width: 10px;",
          visible: true,
        },
        {
          name: "actions",
          label: "Ações",
          align: "center",
          field: "actions",
          sortable: false,
          style: "width: 10px;",
          visible: true,
        },
      ],
    };
  },
};
</script>

<style></style>
