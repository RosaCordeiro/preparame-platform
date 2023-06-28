<template>
  <div class="user-crud">
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

export default {
  components: {
    CrudRegister,
  },
  data: () => {
    return {
      registerType: "unique",
      editUrl: "/users",
      tables: {
        mainTable: {
          id: null,
          apiUrl: "/users",
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
            documentId: {
              label: "Documento",
              name: "documentId",
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
              row: 2,
              col: 1,
              model: "",
              type: "Input",
              visible: true,
            },
            status: {
              label: "Situação",
              name: "status",
              size: "3",
              row: 1,
              col: 3,
              model: "",
              type: "Select",
              visible: true,
              options: [
                {
                  label: "Ativo",
                  value: "ACTIVE",
                },
                {
                  label: "Inativo",
                  value: "INACTIVE",
                },
              ],
            },
            type: {
              label: "Tipo",
              name: "type",
              size: "6",
              row: 2,
              col: 2,
              model: "",
              type: "Select",
              visible: true,
              options: [
                {
                  label: "Administrador",
                  value: "ADMIN",
                },
                {
                  label: "Especialista",
                  value: "SPECIALIST",
                },
                {
                  label: "Usuário",
                  value: "USER",
                },
                {
                  label: "Empresa",
                  value: "COMPANY_ADMIN",
                },
              ],
            },
            company: {
              label: "Empresa",
              name: "companyId",
              size: "3",
              row: 3,
              col: 1,
              model: null,
              type: "DialogSelect",
              visible: true,
              options: {
                table: "companies",
                value: "id",
                label: "name",
              },
            },
            realocated: {
              label: "Realocado",
              name: "realocated",
              size: "3",
              row: 3,
              col: 2,
              model: "",
              type: "Select",
              visible: true,
              options: [
                {
                  label: "Realocado",
                  value: "REALOCATED",
                },
                {
                  label: "Não Realocado",
                  value: "NOT_REALOCATED",
                },
              ],
            },
            subscribeToken: {
              label: "Token",
              name: "subscribeToken",
              size: "3",
              row: 3,
              col: 3,
              model: "",
              type: "Input",
              visible: true,
            },
            expiresDate: {
              label: "Data de Expiração do Kit de Recolocação",
              name: "expiresDate",
              size: "3",
              row: 3,
              col: 4,
              model: "",
              type: "Date",
              visible: true,
            },
          },
        },
      },
      breadcrumbs: [
        {
          title: "Usuários",
          to: "/users",
        },
        {
          title: "Cadastro de Usuários",
          to: "",
        },
      ],
      title: "Cadastro de Usuários",
    };
  },
  created() {
    this.id = this.$router.history.current.params.id;

    openEditCrud(this.id, this.editUrl, this.tables);
  },
  methods: {
    save: async function (data) {
      try {
        const url = this.tables.mainTable.apiUrl.replace(
          ":userId",
          data.mainTable.userId
        );

        console.log(url);

        const userCreated = await saveCrud(url, data.mainTable);

        return userCreated;
      } catch (err) {
        showError(err);

        return false;
      }
    },
  },
};
</script>

<style></style>
