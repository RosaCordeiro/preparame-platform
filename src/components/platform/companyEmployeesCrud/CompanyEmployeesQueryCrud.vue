<template>
  <div class="company-employee-crud">
    <CrudQuery
      :title="title"
      :breadcrumbs="breadcrumbs"
      :filters="filters"
      :columns="columns"
      :url="url"
    />
  </div>
</template>

<script>
import CrudQuery from "./../../general/crud/CrudQuery.vue";

export default {
  components: {
    CrudQuery,
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
          name: "userName",
          align: "left",
          label: "Usuário",
          field: "user.name",
          sortable: true,
          visible: true,
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
