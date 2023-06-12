<template>
  <div class="user-crud">
    <CrudQuery
      :title="title"
      :breadcrumbs="breadcrumbs"
      :filters="filters"
      :columns="columns"
      :url="url"
      :blockCreateNew="blockCreateNew"
      :blockRemove="blockRemove"
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
      title: "Usuários",
      url: "users",
      blockCreateNew: true,
      blockRemove: false,
      breadcrumbs: [
        {
          title: "Usuários",
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
        email: {
          label: "E-Mail",
          name: "email",
          size: "6",
          row: 1,
          col: 2,
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
        status: {
          label: "Situação",
          name: "status",
          size: "3",
          row: 2,
          col: 2,
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
            {
              label: "Todos",
              value: "",
            },
          ],
        },
        type: {
          label: "Tipo",
          name: "type",
          size: "3",
          row: 2,
          col: 3,
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
            {
              label: "Todos",
              value: "",
            },
          ],
        },
        realocated: {
          label: "Realocado",
          name: "realocated",
          size: "3",
          row: 2,
          col: 4,
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
            {
              label: "Todos",
              value: "",
            },
          ],
        },
        laborRiskAlert: {
          label: "Alerta de Risco Trabalhista",
          name: "laborRiskAlert",
          size: "3",
          row: 3,
          col: 1,
          model: "",
          type: "Select",
          visible: true,
          options: [
            {
              label: "Alerta",
              value: "ALERT",
            },
            {
              label: "Normal",
              value: "NORMAL",
            },
            {
              label: "Todos",
              value: "",
            },
          ],
        },
        expiresDate: {
          label: "Data Expiração Kit Recolocação",
          name: "expiresDate",
          size: "3",
          row: 3,
          col: 2,
          model: "",
          type: "Date",
          visible: true
        }
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
          name: "email",
          align: "left",
          label: "E-Mail",
          field: "email",
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
          name: "type",
          align: "left",
          label: "Tipo",
          field: "type.label",
          sortable: true,
          visible: true,
        },
        {
          name: "status",
          align: "left",
          label: "Situação",
          field: "status.label",
          sortable: true,
          visible: true,
        },
        {
          name: "realocated",
          align: "left",
          label: "Realocado",
          field: "realocated.label",
          sortable: true,
          visible: true,
        },
        {
          name: "laborRiskAlert",
          align: "left",
          label: "Alerta de Risco Trabalhista",
          field: "laborRiskAlert.label",
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
          name: "expiryDateFormated",
          align: "center",
          label: "Data Expiração Kit Recolocação",
          field: "expiryDateFormated",
          sortable: true,
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
