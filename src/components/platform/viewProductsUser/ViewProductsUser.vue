<template>
  <div class="product-crud">
    <CrudRegister
      :breadcrumbs="breadcrumbs"
      :title="title"
      :tables="tables"
      :registerType="registerType"
      :showActionButtons="false"
    >
      <div v-if="products.length > 0">
        <q-table
          class="q-mt-md bg-secondary crud-table"
          :data="products"
          :columns="columns"
          table-class="bg-background"
          table-header-class="text-white bg-secondary"
          no-data-label="Sem dados para mostrar."
          no-results-label="Não foi encontrado nenhum dado a partir de sua pesquisa."
          dense
          title="Resultado(s) Pesquisa"
          title-class="text-white bg-secondary crud-query-title"
          rows-per-page-label="Linhas por página: "
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="product" :props="props">{{ props.row.name }}</q-td>
              <q-td key="dateSchedule" :props="props">{{
                props.row.schedule === null
                  ? "Não Agendado"
                  : formatDateToStringWithHour(props.row.schedule.dateSchedule)
              }}</q-td>
              <q-td key="specialist" :props="props">
                <img
                  v-if="props.row.specialist"
                  :src="props.row.specialist.image"
                  height="50"
                  width="50"
                  style="border-radius: 50%"
                />
                <div v-else>Não Atribuído</div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </CrudRegister>
  </div>
</template>

<script>
import CrudRegister from "../../general/crud/CrudRegister.vue";
import { openEditCrud } from "../../general/crud/utils/openEditCrud.js";
import { saveCrud } from "../../general/crud/utils/saveCrud.js";
import { showError } from "../../../global.js";
import emitter from "src/config/event-bus";
import { filterCrud } from "src/components/general/crud/utils/filterCrud";
import { removeCrud } from "src/components/general/crud/utils/removeCrud";
import { formatDateToStringWithHour } from "src/utils/formatDate";

export default {
  components: {
    CrudRegister,
  },
  data: () => {
    return {
      registerType: "unique",
      editUrl: "/users/products",
      tables: {
        mainTable: {
          id: null,
          apiUrl: "/users/products",
          registerColumns: {
            user: {
              label: "Usuário",
              name: "userId",
              size: "12",
              row: 1,
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
            product: {
              label: "Produto",
              name: "productId",
              size: "5",
              row: 1,
              col: 2,
              model: "",
              type: "DialogSelect",
              visible: false,
              options: {
                table: "products",
                value: "id",
                label: "name",
              },
            },
            availableQuantity: {
              label: "Quantidade",
              name: "availableQuantity",
              size: "1",
              row: 1,
              col: 3,
              model: "",
              type: "Integer",
              visible: false,
            },
          },
        },
      },
      breadcrumbs: [
        {
          title: "Visualizar Produtos do Usuário",
          to: "",
        },
      ],
      title: {
        mainTable: "Visualizar Produtos do Usuário",
      },
      products: [],
      columns: [
        {
          name: "product",
          label: "Produto",
          field: "product",
          align: "left",
          sortable: true,
        },

        /* dateSchedule */
        {
          name: "dateSchedule",
          label: "Data Agendamento",
          field: "dateSchedule",
          align: "left",
          sortable: true,
        },

        {
          name: "specialist",
          label: "Especialista",
          field: "specialist",
          align: "left",
          sortable: true,
        },
      ],
      filters: [
        {
          name: "userId",
          model: "",
        },
        {
          name: "productId",
          model: "",
        },
      ],
    };
  },
  created() {
    this.id = this.$router.history.current.params.id;

    openEditCrud(this.id, this.editUrl, this.tables);
  },
  methods: {
    formatDateToStringWithHour,
    save: async function (data) {
      try {
        await saveCrud(this.tables.mainTable.apiUrl, data.mainTable);
        this.listProducts();
      } catch (err) {
        showError(err);

        return false;
      }
    },
    deleteProduct: async function (data) {
      removeCrud("", `products/${data.id}/users`).then((data) => {
        console.log(data);
        this.listProducts();
      });

      //this.listProducts();
    },
    listProducts: async function () {
      console.log(this.filters);
      const newFilter = this.filters.filter((filter) => {
        return filter.model !== "";
      });

      if (newFilter.length === 0) {
        return;
      }

      if (newFilter.filter((filter) => filter.name === "userId").length === 0) {
        return;
      }

      filterCrud(newFilter, "products/listProductByUserWithSpecialist").then(
        (res) => {
          this.products = res;
        }
      );
    },
  },
  mounted() {
    emitter.on("update_model", (data) => {
      if (data.label === "Usuário") {
        this.filters[0].model = data.model.value;
      }
      if (data.label === "Produto") {
        this.filters[1].model = data.model.value;
      }
      this.listProducts();
    });

    this.listProducts();
  },
  destroyed() {
    try {
      emitter.off("update_model");
    } catch (error) {}
  },
};
</script>

<style></style>
