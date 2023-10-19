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
              <q-td key="availableQuantity" :props="props">
                {{ props.row.availableQuantity }}
              </q-td>
              <q-td key="actions" :props="props">
                <q-btn-group>
                  <q-btn
                    color="negative"
                    icon="mdi-delete"
                    :disable="props.row.availableQuantity === 0"
                    @click="deleteProduct(props.row)"
                  ></q-btn>
                </q-btn-group>
              </q-td>
            </q-tr>
          </template>
          <!-- <template v-slot:body-cell-actions="props">
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
          </template> -->
        </q-table>
      </div>
    </CrudRegister>
  </div>
</template>

<script>
import CrudRegister from "../../general/crud/CrudRegister.vue";
import { openEditCrud } from "../../general/crud/utils/openEditCrud.js";
import { saveCrud } from "../../general/crud/utils/saveCrud.js";
import { confirmDialog, showError, showSucess } from "../../../global.js";
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
        /* availableQuantity */
        {
          name: "availableQuantity",
          label: "Quantidade",
          field: "availableQuantity",
          align: "left",
          sortable: true,
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
    formatDateToStringWithHour,
    save: async function (data) {
      try {
        await saveCrud(this.tables.mainTable.apiUrl, data.mainTable);
        showSucess("Salvo com sucesso.");

        this.listProducts();
      } catch (err) {
        showError(err);

        return false;
      }
    },
    deleteProduct: async function (data) {
      confirmDialog(
        "Atenção",
        "Deseja realmente remover este produto?",
        async () => {
          await removeCrud("", `products/${data.id}/users`);
          this.listProducts();

          showSucess("Removido com sucesso.");
          this.listProducts();
        }
      );
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
