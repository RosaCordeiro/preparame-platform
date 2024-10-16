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
                props.row.schedule === null && props.row.dateSchedule === null
                  ? "Não Agendado"
                  : props.row.dateSchedule === null
                  ? formatDateToStringMentoringWithHour(
                      props.row.schedule.dateSchedule
                    )
                  : formatDateToStringMentoringWithHour(props.row.dateSchedule)
              }}</q-td>
              <q-td key="specialist" :props="props">
                <img
                  v-if="props.row.specialist"
                  :src="props.row.specialist.image"
                  height="50"
                  width="50"
                  style="border-radius: 50%; object-fit: cover"
                />
                <div v-else>Não Atribuído</div>
              </q-td>
              <q-td key="availableQuantity" :props="props">
                {{ props.row.availableQuantity }}
              </q-td>
              <q-td key="fileStatus" :props="props">
                <div class="row justify-center">
                  <span
                    class="col-12"
                    style="text-align: center"
                    v-if="props.row.schedule !== null"
                  >
                    {{ statusFiles(props.row) }}
                  </span>

                  <q-btn
                    v-if="props.row.schedule !== null"
                    color="primary"
                    label="Visualizar Arquivos"
                    @click="viewFileDialog(props.row)"
                  />
                  <span class="col-12" style="text-align: center" v-else>
                    N/A
                  </span>
                </div>
              </q-td>
              <q-td key="fileUser" :props="props">
                <div class="row justify-center">
                  <span
                    class="col-12"
                    style="text-align: center"
                    v-if="props.row.schedule !== null"
                  >
                    {{ props.row.countfilesuser }} arquivos do usuário
                  </span>
                  <q-btn
                    v-if="props.row.schedule !== null"
                    color="primary"
                    label="Adicionar Arquivos"
                    @click="openSearchFileDialog(props.row)"
                  />
                  <span class="col-12" style="text-align: center" v-else>
                    N/A
                  </span>
                </div>
              </q-td>
              <q-td key="schedule" :props="props">
                <q-btn
                  color="blue"
                  label="Agendar"
                  :disable="!disableCancel(props.row)"
                  @click="goUrl(`products/schedule/${props.row.productId}?userId=${props.row.userId}`)"
                />
              </q-td>
              <q-td key="reschedule" :props="props">
                <q-btn
                  color="blue"
                  label="Reagendar"
                  :disable="disableCancel(props.row)"
                  @click="cancelProduct(props.row, true, 'REAGENDADO')"
                />
              </q-td>
              <q-td key="notAttended" :props="props">
                <q-btn
                  color="negative"
                  label="Não Compareceu"
                  :disable="disableCancel(props.row)"
                  @click="cancelProduct(props.row, false, 'NÃO COMPARECEU')"
                />
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
              <q-td key="cancel" :props="props">
                <q-btn-group>
                  <q-btn
                    color="negative"
                    icon="mdi-cancel"
                    @click="cancelProduct(props.row, true, 'CANCELADO')"
                    :disable="disableCancel(props.row)"
                  ></q-btn>
                </q-btn-group>
              </q-td>
              <q-td key="status" :props="props">
                <span>
                  {{ props.row.table }}
                </span>
              </q-td>
              <q-td key="reason" :props="props">
                <span v-if="props.row.reason">{{ props.row.reason }}</span>
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
    <SearchFileDialog
      ref="searchFileDialog"
      :identifier="`AddProductToUserRegisterCrudSearchFileDialog`"
    />
    <ViewFileDialogVue
      ref="viewFileDialog"
      :identifier="`AddProductToUserRegisterCrudViewFileDialog`"
    />
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
import { formatDateToStringMentoringWithHour } from "src/utils/formatDate";
import ViewFileDialogVue from "src/components/ViewFileDialog.vue";
import SearchFileDialog from "src/components/SearchFileDialog.vue";

export default {
  components: {
    CrudRegister,
    ViewFileDialogVue,
    SearchFileDialog,
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
          format: (val) => val,
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
          name: "fileStatus",
          label: "Status Arquivo",
          field: "fileStatus",
          align: "center",
          sortable: true,
        },
        {
          name: "fileUser",
          label: "Adicionar Produto ao Usuário",
          field: "fileUser",
          align: "center",
          sortable: true,
        },
        {
          name: "schedule",
          label: "Agendar mentoria",
          field: "schedule",
          align: "center",
          sortable: true,
        },
        {
          name: "reschedule",
          label: "Reagendar",
          field: "reschedule",
          align: "center",
        },
        {
          name: "notAttended",
          label: "Não Compareceu",
          field: "notAttended",
          align: "center",
        },
        {
          name: "actions",
          label: "Ações",
          field: "actions",
          align: "center",
        },
        /* cancel */
        {
          name: "cancel",
          label: "Cancelar",
          field: "cancel",
          align: "center",
        },
        {
          name: "status",
          label: "Status",
          field: "status",
          align: "center",
        },
        {
          name: "reason",
          label: "Razão Cancelamento",
          field: "reason",
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
  props: ["schedulesGroup", "userType"],
  created() {
    this.id = this.$router.history.current.params.id;

    openEditCrud(this.id, this.editUrl, this.tables);
  },
  methods: {
    goUrl: function (url) {    
      this.$router.push({ path: `/${url}` });
      this.$emit("close-mentoring-calendar");
    },
    openSearchFileDialog(data) {
      this.searchDialog = true;
      console.log(this.$refs.searchFileDialog);
      setTimeout(() => {
        this.$refs.searchFileDialog.show(data.id);
      }, 10);
    },
    disableCancel(row) {
      if (row.schedule === null) return true;
      if (row.schedule.dateSchedule === null) return true;

      return false;
    },

    viewFileDialog: function (product) {
      this.$refs.viewFileDialog.show(product.id, "ALL");
    },
    statusFiles(product) {
      if (product.schedule === null || product.specialist === null) {
        return "N/A";
      }

      console.log(product);

      const isBefore = new Date(product.schedule.dateSchedule) < new Date();

      if (isBefore) {
        if (product.countfilesspecialist === 0) {
          return "Relatório Não Enviado";
        }

        if (product.countfilesspecialist > 0) {
          return "Relatório Enviado";
        }
      }

      const productsName = [
        "Reconstrução de Currículo Português",
        "Reconstrução de Curriculo Português + Inglês",
        "Reconstrução de Curriculo + Relatório Perfil Link",
        "Reconstrução de Currículo em Ingles",
      ];

      if (!isBefore) {
        if (productsName.includes(product.name)) {
          if (product.countfilesuser === 0) {
            return "Currículo Não Enviado";
          }

          if (product.countfilesuser > 0) {
            return "Currículo Enviado";
          }
        }

        return "N/A";
      }
    },
    formatDateToStringMentoringWithHour,
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
    cancelProduct: async function (data, revertAvailableProduct, reason) {
      confirmDialog(
        "Atenção",
        `Deseja realmente ${reason.toLowerCase()} este produto?`,
        async () => {
          await saveCrud(
            `specialists/schedule/${data.id}/cancel`,
            { revertAvailableProduct, reason },
            "post"
          );

          showSucess("Cancelado com sucesso.");
          this.listProducts();
        }
      );
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
          console.log(res);

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
