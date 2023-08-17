<template>
  <div class="product-crud">
    <CrudRegister
      :breadcrumbs="breadcrumbs"
      :title="title"
      :tables="tables"
      :registerType="registerType"
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
          <template v-slot:body-cell-actions="props">
            <q-td auto-width :props="props">
              <q-btn-group>
                <q-btn
                  color="negative"
                  icon="mdi-delete"
                  :disable="props.row.availableQuantity === 0"
                  @click="deleteProduct(props.row)"
                ></q-btn>
              </q-btn-group>
            </q-td>
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
              size: "5",
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
              visible: true,
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
              visible: true,
            },
          },
        },
      },
      breadcrumbs: [
        {
          title: "Adicionar Produtos Para Usuários",
          to: "",
        },
      ],
      title: {
        mainTable: "Adicionar Produtos Para Usuários",
      },
      products: [],
      columns: [
        {
          name: "name",
          label: "Produto",
          field: "name",
          align: "left",
          sortable: true,
        },
        /* availableQuantity */
        {
          name: "availableQuantity",
          label: "Quantidade",
          field: "availableQuantity",
        },

        {
          name: "actions",
          label: "Ações",
          field: "actions",
          align: "center",
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

      filterCrud(newFilter, "products/listProductByUser").then((res) => {
        this.products = res;
      });
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
