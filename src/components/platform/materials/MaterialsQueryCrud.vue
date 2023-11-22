<template>
  <div class="product-crud">
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
import CrudQuery from "../../general/crud/CrudQuery.vue";

export default {
  components: {
    CrudQuery,
  },
  methods: {},
  data() {
    return {
      title: "Materiais Gratuitos",
      url: "materials",
      breadcrumbs: [
        {
          title: "Materiais Gratuitos",
          to: "",
        },
      ],
      filters: {},
      columns: [
        {
          name: "id",
          label: "Id",
          align: "left",
          field: "id",
          sortable: true,
          visible: false,
        },
        {
          name: "slug",
          label: "Slug",
          align: "left",
          field: "slug",
          sortable: true,
          visible: true,
        },
        {
          name: "title",
          label: "Título",
          align: "left",
          field: "title",
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
