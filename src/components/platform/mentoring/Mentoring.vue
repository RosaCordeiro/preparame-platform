<template>
  <div id="q-app" class="mentoring">
    <q-page>
      <CrudQuery
        :title="title"
        :breadcrumbs="breadcrumbs"
        :filters="filters"
        :columns="columns"
        :url="url"
      />
    </q-page>
  </div>
</template>

<script>
import { filterCrud } from "../../general/crud/utils/filterCrud";
import { formatDateToStringWithHour } from "../../../utils/formatDate.js";
import CrudQuery from "./../../general/crud/CrudQuery.vue";

export default {
  components: {
    CrudQuery,
  },
  data() {
    return {
      mobile: false,
      title: "Mentorias",
      url: "mentoring",
      breadcrumbs: [
        {
          title: "Mentorias",
          to: "",
        },
      ],
      filters: [],
      columns: [
        {
          name: "id",
          label: "ID",
          align: "left",
          field: "id",
          sortable: true,
          visible: true,
        },
        {
          name: "title",
          label: "Títulos",
          align: "left",
          field: "title",
          sortable: true,
          visible: true,
        },
        {
          name: "date",
          label: "Data",
          align: "left",
          field: "date",
          sortable: true,
          visible: true,
          format: (val) => formatDateToStringWithHour(val),
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
  methods: {
    retrieveOrders: async function () {
      const response = await filterCrud([], "mentoring");
      this.mentoring = response.data;

      this.mentoring.map((order) => {
        order.dateFormated = formatDateToStringWithHour(order.date);

        return order;
      });

      /* this.mentoring.forEach((order) => {
        order.dateCreatedFormated = formatDateToStringMasked(
          order.dateCreated,
          "dd/mm/yyyy"
        );

        order.amountFormated = priceConvert(order.amount / 100);
      }); */
    },
  },
  created() {
    this.retrieveOrders();
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();
  },
};
</script>

<style></style>
