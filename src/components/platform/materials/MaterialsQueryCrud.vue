<template>
  <div class="product-crud">
    <CrudQuery
      :title="title"
      :breadcrumbs="breadcrumbs"
      :filters="filters"
      :columns="columns"
      :url="url"
    >
      <template>
        <q-btn
          label="Download Relatório"
          type="submit"
          color="primary"
          class="q-ma-sm q-mr-md"
          @click="downloadReport"
        />
      </template>
    </CrudQuery>
  </div>
</template>

<script>
import { filterCrud } from "src/components/general/crud/utils/filterCrud";
import CrudQuery from "../../general/crud/CrudQuery.vue";
import { downloadFile } from "src/utils/downloadFile";
import { baseApiUrl, showError } from "src/global";
import axios from "axios";

export default {
  components: {
    CrudQuery,
  },
  methods: {
    async downloadReport() {
      let config = {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}/materials/list-download`,
        responseType: "blob",
      };

      this.$q.loading.show();

      try {
        const data = await axios(config);
        downloadFile(data.data, "relatorio-materiais-gratuitos.xlsx");
      } catch (error) {
        console.log(error);

        showError(error);
      }

      this.$q.loading.hide();
    },
  },
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
          name: "clickable",
          label: "Link",
          align: "left",
          field: "clickable",
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
