<template>
  <div class="company-employee-crud">
    <CrudRegister
      :breadcrumbs="breadcrumbs"
      :title="title"
      :tables="tables"
      :registerType="registerType"
    />
  </div>
</template>

<script>
import CrudRegister from "./../../general/crud/CrudRegister.vue";
import { openEditCrud } from "./../../general/crud/utils/openEditCrud.js";
import { saveCrud } from "./../../general/crud/utils/saveCrud.js";
import { showError } from "../../../global.js";
import emitter from "src/config/event-bus";

export default {
  components: {
    CrudRegister,
  },
  data: () => {
    return {
      registerType: "unique",
      editUrl: "/companies/employees",
      tables: {
        mainTable: {
          id: null,
          apiUrl: "/companies/:companyId/employees",
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
              size: "6",
              row: 1,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            company: {
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
            documentId: {
              label: "Documento",
              name: "documentId",
              size: "6",
              row: 2,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
              inputmode: "numeric",
              maxlength: 11,
              customKeydown: "filterNumbers",
            },
            subscribeToken: {
              label: "Token",
              name: "subscribeToken",
              size: "6",
              row: 2,
              col: 2,
              model: "",
              type: "Input",
              visible: true,
            },
            phone: {
              label: "Telefone",
              name: "phone",
              size: "6",
              row: 3,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            email: {
              label: "E-Mail",
              name: "email",
              size: "6",
              row: 3,
              col: 2,
              model: "",
              type: "Input",
              visible: true,
            },

            entryDate: {
              label: "Data de Entrada",
              name: "entryDate",
              size: "4",
              row: 4,
              col: 1,
              model: "",
              type: "Date",
              visible: true,
            },
            unity: {
              label: "Unidade",
              name: "unity",
              size: "4",
              row: 4,
              col: 2,
              model: "",
              type: "Input",
              visible: true,
            },
            position: {
              label: "Cargo",
              name: "position",
              size: "4",
              row: 4,
              col: 3,
              model: "",
              type: "Input",
              visible: true,
            },
            /* subarea, level */
            subarea: {
              label: "Subárea",
              name: "subarea",
              size: "6",
              row: 5,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            level: {
              label: "Nível",
              name: "level",
              size: "6",
              row: 5,
              col: 2,
              model: "",
              type: "Input",
              visible: true,
            },

            department: {
              label: "Área",
              name: "department",
              size: "6",
              row: 5,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },

            planId: {
              label: "Plano",
              name: "planId",
              size: "6",
              row: 5,
              col: 2,
              model: "",
              type: "DialogSelect",
              visible: true,
              options: {
                table: "subscriptionPlans",
                value: "id",
                label: "name",
              },
            },
            dismissalType: {
              label: "Tipo de Demissão",
              name: "dismissalType",
              size: "6",
              row: 6,
              col: 1,
              model: "",
              type: "Select",
              options: [
                {
                  label: "Voluntária",
                  value: "voluntary",
                },
                {
                  label: "Involuntária",
                  value: "involuntary",
                },
              ],
              visible: true,
            },
            easyRegister: {
              label: "Cadastro Simples",
              name: "easyRegister",
              size: "6",
              row: 6,
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
            user: {
              label: "Usuário",
              name: "userId",
              size: "6",
              row: 7,
              col: 1,
              model: null,
              type: "DialogSelect",
              visible: false,
              options: {
                table: "users",
                value: "id",
                label: "name",
              },
            },
            accepted: {
              label: "Aceito",
              name: "accepted",
              size: "6",
              row: 7,
              col: 2,
              model: "",
              type: "Input",
              visible: false,
            },
            packageDeclined: {
              label: "Pacote Recusado",
              name: "packageDeclined",
              size: "6",
              row: 6,
              col: 3,
              model: "",
              type: "Select",
              options: [
                {
                  label: "Sim",
                  value: true,
                },
                {
                  label: "Não",
                  value: false,
                },
              ],
              visible: true,
            },
            manualCompany: {
              label: "Empresa Manual",
              name: "manualCompany",
              size: "6",
              row: 7,
              col: 3,
              model: "",
              type: "Input",
              visible: true,
              editable: false,
            },
          },
        },
      },

      breadcrumbs: [
        {
          title: "Funcionarios",
          to: "/companies/employees",
        },
        {
          title: "Cadastro de Funcionários",
          to: "",
        },
      ],
      title: "Cadastro de Funcionários",
    };
  },
  created() {
    this.id = this.$router.history.current.params.id;

    openEditCrud(this.id, this.editUrl, this.tables);
  },
  methods: {
    save: async function (data) {
      try {
        if (!data.mainTable.companyId) {
          showError("Necessário informar a empresa");
          return;
        }

        const url = this.tables.mainTable.apiUrl.replace(
          ":companyId",
          data.mainTable.companyId
        );

        const companyEmployeeCreated = await saveCrud(url, data.mainTable);

        return companyEmployeeCreated;
      } catch (err) {
        showError(err);

        return false;
      }
    },
  },
  mounted() {
    console.log("id", this.$route.params.id);

    if (this.$route.params.id) {
      this.tables.mainTable.registerColumns.planId.visible = false;
    }

    emitter.on("update_model", (data) => {
      if (data.label === "Cadastro Simples") {
        this.tables.mainTable.registerColumns.user.visible =
          data.model.value === "NO";
      }
    });
  },
  destroyed() {
    try {
      emitter.off("update_model");
    } catch (error) {}
  },
};
</script>

<style></style>
