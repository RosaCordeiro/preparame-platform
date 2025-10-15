<template>
  <div class="specialist-area-view-products">
    <div class="product-crud">
      <div class="crud-filter-content">
        <div class="row q-gutter-md q-mb-md">
          <q-select
            v-model="selectedUser"
            :options="userOptions"
            option-value="id"
            option-label="name"
            label="Selecionar Usuário"
            outlined
            dense
            clearable
            use-input
            @filter="filterUsers"
            @input="loadUserProducts"
            class="col-md-6 col-sm-12"
          />
        </div>

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
            title="Produtos do Usuário"
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
                    style="border-radius: 50%; object-fit: cover"
                  />
                  <div v-else>Não Atribuído</div>
                </q-td>
                <q-td key="fileStatus" :props="props">
                  <div class="row justify-center">
                    <span class="col-12" style="text-align: center">
                      {{ statusFiles(props.row) }}
                    </span>

                    <q-btn
                      v-if="props.row.countfilesuser > 0"
                      color="primary"
                      label="Visualizar Arquivos"
                      @click="viewFileDialog(props.row)"
                    />
                  </div>
                </q-td>
                <q-td key="fileUser" :props="props">
                  <div class="row justify-center">
                    <span class="col-12" style="text-align: center">
                      {{ props.row.countfilesuser }} arquivos do usuário +
                      {{ props.row.countfilesspecialist }} arquivos do
                      especialista
                    </span>
                    <q-btn
                      color="primary"
                      label="Adicionar Arquivos"
                      @click="openSearchFileDialog(props.row)"
                    />
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <div v-else-if="selectedUser" class="text-center q-pa-md">
          <q-icon name="info" size="2em" color="grey" />
          <div class="text-h6 q-mt-md">Nenhum produto encontrado para este usuário</div>
        </div>
      </div>
    </div>
    
    <SearchFileDialog
      ref="searchFileDialog"
      :identifier="`SpecialistAreaViewProductsSearchFileDialog`"
    />
    <ViewFileDialogVue ref="viewFileDialog" />
  </div>
</template>

<script>
import { filterCrud } from "../../general/crud/utils/filterCrud";
import { formatDateToStringWithHour } from "../../../utils/formatDate";
import ViewFileDialogVue from "../../ViewFileDialog.vue";
import SearchFileDialog from "../../SearchFileDialog.vue";

export default {
  name: 'SpecialistAreaViewProducts',
  components: {
    ViewFileDialogVue,
    SearchFileDialog,
  },
  props: {
    specialist: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedUser: null,
      userOptions: [],
      allUsers: [],
      products: [],
      columns: [
        {
          name: "product",
          label: "Produto",
          field: "product",
          align: "left",
          sortable: true,
        },
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
        {
          name: "fileStatus",
          label: "Status Arquivo",
          field: "fileStatus",
          align: "center",
          sortable: true,
        },
        {
          name: "fileUser",
          label: "Adicionar Arquivo ao Usuário",
          field: "fileUser",
          align: "center",
          sortable: true,
        },
      ],
    };
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        const users = await filterCrud([], "users");
        this.allUsers = users;
        this.userOptions = users.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email
        }));
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    },
    
    filterUsers(val, update) {
      update(() => {
        if (val === '') {
          this.userOptions = this.allUsers.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email
          }));
        } else {
          const needle = val.toLowerCase();
          this.userOptions = this.allUsers
            .filter(user => user.name.toLowerCase().indexOf(needle) > -1)
            .map(user => ({
              id: user.id,
              name: user.name,
              email: user.email
            }));
        }
      });
    },
    
    async loadUserProducts() {
      if (!this.selectedUser) {
        this.products = [];
        return;
      }

      try {
        const filters = [
          { name: "userId", model: this.selectedUser.id }
        ];

        const products = await filterCrud(filters, "products/listProductByUserWithSpecialist");
        this.products = products;
      } catch (error) {
        console.error('Erro ao carregar produtos do usuário:', error);
        this.products = [];
      }
    },
    
    openSearchFileDialog(data) {
      setTimeout(() => {
        this.$refs.searchFileDialog.show(data.id);
      }, 10);
    },
    
    viewFileDialog(product) {
      this.$refs.viewFileDialog.show(product.id, "ALL");
    },
    
    statusFiles(product) {
      if (product.schedule === null && product.specialist === null) {
        return "N/A";
      }

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
    
    formatDateToStringWithHour,
  },
};
</script>

<style lang="scss">
.crud-filter-content {
  padding: 20px 0;
}
</style>