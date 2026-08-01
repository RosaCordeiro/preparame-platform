<template>
  <div class="survey-questions-crud">
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
  methods: {},
  data: () => {
    return {
      title: "Perguntas Qualitativas",
      url: "companies/surveyquestions",
      breadcrumbs: [
        {
          title: "Perguntas Qualitativas",
          to: "",
        },
      ],
      filters: [
        {
          label: "Empresa",
          name: "companyId",
          size: "6",
          row: 1,
          col: 1,
          model: "",
          type: "DialogSelect",
          visible: true,
          options: {
            table: "companies",
            value: "id",
            label: "name",
          },
        },
      ],
      columns: [
        {
          name: "questionText",
          label: "Texto da Pergunta",
          align: "left",
          field: "questionText",
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
