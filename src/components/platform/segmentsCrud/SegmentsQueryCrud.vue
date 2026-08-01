<template>
  <div class="segments-crud">
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
  components: { CrudQuery },
  data() {
    return {
      title: "Segmentos",
      url: "segments",
      breadcrumbs: [{ title: "Segmentos", to: "" }],
      filters: {
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
