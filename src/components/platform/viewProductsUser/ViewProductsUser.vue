<template>
  <div class="view-products-user">
    <q-page>
      <Breadcrumbs :breadcrumbs="breadcrumbs" />
      <div class="crud-filter-content">
        <h5 class="page-title q-mb-md">Consultar dados do usuário</h5>

        <q-card class="q-mb-md">
          <q-card-section>
            <div class="row q-col-gutter-md items-end">
              <q-input
                v-model="search.documentId"
                label="CPF"
                outlined
                dense
                class="col-12 col-md-3"
                mask="###########"
                unmasked-value
                clearable
              />
              <q-input
                v-model="search.name"
                label="Nome"
                outlined
                dense
                class="col-12 col-md-3"
                clearable
              />
              <q-input
                v-model="search.companyName"
                label="Empresa"
                outlined
                dense
                class="col-12 col-md-3"
                clearable
              />
              <div class="col-12 col-md-3">
                <q-btn
                  color="primary"
                  label="Buscar"
                  icon="mdi-magnify"
                  class="full-width"
                  no-caps
                  :loading="searching"
                  @click="searchEmployees"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card v-if="searchResults.length > 0" class="q-mb-md">
          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">
              {{
                searchResults.length > 1
                  ? "Vários resultados — selecione um colaborador:"
                  : "Resultado da consulta:"
              }}
            </div>
            <q-list bordered separator>
              <q-item
                v-for="employee in searchResults"
                :key="employee.id"
                clickable
                v-ripple
                :active="selectedEmployee && selectedEmployee.id === employee.id"
                active-class="bg-blue-1"
                @click="selectEmployee(employee)"
              >
                <q-item-section>
                  <q-item-label>{{ employee.name }}</q-item-label>
                  <q-item-label caption>
                    {{ employee.documentId }} ·
                    {{ employee.company && employee.company.name }}
                  </q-item-label>
                  <q-item-label
                    v-if="employee.linkedinUrl"
                    caption
                    class="text-primary"
                  >
                    LinkedIn: {{ employee.linkedinUrl }}
                  </q-item-label>
                  <q-item-label v-else caption class="text-grey-6">
                    LinkedIn não informado
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <q-banner
          v-if="linkWarning"
          class="q-mb-md bg-orange-2 text-dark"
          rounded
          dense
        >
          <template v-slot:avatar>
            <q-icon name="mdi-alert" color="orange-9" />
          </template>
          {{ linkWarning }}
        </q-banner>

        <q-card v-if="selectedEmployee" class="q-mb-md">
          <q-card-section>
            <div class="text-h6 q-mb-md">Dados do colaborador</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7">Nome (RH)</div>
                <div>{{ selectedEmployee.name }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7">CPF (RH)</div>
                <div>{{ selectedEmployee.documentId }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7">E-mail (RH)</div>
                <div>{{ selectedEmployee.email || "N/A" }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7">Empresa</div>
                <div>
                  {{
                    selectedEmployee.company
                      ? selectedEmployee.company.name
                      : "N/A"
                  }}
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7">Cargo</div>
                <div>{{ selectedEmployee.position || "N/A" }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7">Área</div>
                <div>{{ selectedEmployee.department || "N/A" }}</div>
              </div>
              <div class="col-12">
                <q-input
                  v-model="linkedinForm.linkedinUrl"
                  label="Página do LinkedIn"
                  outlined
                  dense
                  hint="Ex.: https://www.linkedin.com/in/seu-perfil"
                />
              </div>
              <div class="col-12">
                <q-btn
                  color="primary"
                  label="Salvar LinkedIn"
                  icon="mdi-content-save"
                  no-caps
                  :loading="savingLinkedin"
                  @click="saveLinkedin"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card v-if="selectedEmployee">
          <q-card-section>
            <div class="text-h6 q-mb-md">Produtos do usuário</div>
            <q-table
              class="bg-secondary crud-table"
              :data="products"
              :columns="columns"
              row-key="id"
              table-class="bg-background"
              table-header-class="text-white bg-secondary"
              no-data-label="Nenhum produto encontrado para este usuário."
              dense
              :loading="loadingProducts"
              rows-per-page-label="Linhas por página: "
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="product" :props="props">{{ props.row.name }}</q-td>
                  <q-td key="dateSchedule" :props="props">{{
                    formatProductScheduleDate(props.row)
                  }}</q-td>
                  <q-td key="specialist" :props="props">
                    <img
                      v-if="showSpecialistImage(props.row)"
                      :src="props.row.specialist.image"
                      height="50"
                      width="50"
                      style="border-radius: 50%; object-fit: cover"
                      @error="onSpecialistImageError(props.row)"
                    />
                    <div v-else-if="props.row.specialist">
                      {{ props.row.specialist.name || "Especialista" }}
                    </div>
                    <div v-else>Não Atribuído</div>
                  </q-td>
                  <q-td key="fileStatus" :props="props">
                    <div class="row justify-center">
                      <span class="col-12" style="text-align: center">
                        {{ statusFiles(props.row) }}
                      </span>
                      <q-btn
                        v-if="props.row.schedule && props.row.countfilesuser > 0"
                        color="primary"
                        label="Visualizar Arquivos"
                        @click="viewFileDialog(props.row)"
                      />
                    </div>
                  </q-td>
                  <q-td key="fileUser" :props="props">
                    <div class="row justify-center">
                      <span class="col-12" style="text-align: center">
                        {{ props.row.countfilesuser || 0 }} arquivos do usuário +
                        {{ props.row.countfilesspecialist || 0 }} arquivos do
                        especialista
                      </span>
                      <q-btn
                        v-if="props.row.schedule"
                        color="primary"
                        label="Adicionar Arquivos"
                        @click="openSearchFileDialog(props.row)"
                      />
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </q-page>

    <SearchFileDialog
      ref="searchFileDialog"
      :identifier="`AddProductToUserRegisterCrudSearchFileDialog`"
    />
    <ViewFileDialogVue
      ref="viewFileDialog"
      :identifier="`ViewProductsUserViewFileDialog`"
    />
  </div>
</template>

<script>
import axios from "axios";
import Breadcrumbs from "../../general/Breacrumbs.vue";
import { baseApiUrl, showError, showSuccess } from "../../../global.js";
import { filterCrud } from "src/components/general/crud/utils/filterCrud";
import { formatDateToStringWithHour } from "src/utils/formatDate";
import ViewFileDialogVue from "src/components/ViewFileDialog.vue";
import SearchFileDialog from "src/components/SearchFileDialog.vue";

function normalizeDocumentId(value) {
  return String(value || "").replace(/\D/g, "");
}

export default {
  components: {
    Breadcrumbs,
    ViewFileDialogVue,
    SearchFileDialog,
  },
  data() {
    return {
      breadcrumbs: [
        {
          title: "Ver Produtos do Usuário",
          to: "",
        },
      ],
      search: {
        documentId: "",
        name: "",
        companyName: "",
      },
      searching: false,
      savingLinkedin: false,
      loadingProducts: false,
      searchResults: [],
      selectedEmployee: null,
      linkedUser: null,
      productsUserId: null,
      linkWarning: "",
      productsRequestId: 0,
      linkedinForm: {
        linkedinUrl: "",
      },
      products: [],
      columns: [
        {
          name: "product",
          label: "Produto",
          field: "name",
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
  methods: {
    formatDateToStringWithHour,
    buildSearchFilters() {
      const filters = [];

      if (this.search.documentId) {
        filters.push({
          name: "documentId",
          model: this.search.documentId.replace(/\D/g, ""),
        });
      }

      if (this.search.name) {
        filters.push({ name: "name", model: this.search.name });
      }

      if (this.search.companyName) {
        filters.push({ name: "companyName", model: this.search.companyName });
      }

      return filters;
    },
    resolveUserId(employee) {
      if (!employee) return null;
      if (employee.user && employee.user.id) return employee.user.id;
      if (employee.userId) return employee.userId;
      return null;
    },
    getLinkedUser(employee) {
      if (employee && employee.user && employee.user.id) return employee.user;
      return null;
    },
    buildLinkWarning(employee, userId, linkedUser) {
      if (!userId) {
        return "Este colaborador não tem userId. Produtos e arquivos não podem ser carregados.";
      }

      if (!linkedUser || !employee) return "";

      const employeeDoc = normalizeDocumentId(employee.documentId);
      const userDoc = normalizeDocumentId(linkedUser.documentId);

      if (employeeDoc && userDoc && employeeDoc !== userDoc) {
        return (
          `Atenção: o CPF do cadastro RH (${employee.documentId}) é diferente do CPF da conta ` +
          `vinculada pelo userId (${linkedUser.documentId} — ${linkedUser.name}). ` +
          `Produtos/arquivos seguem o userId. Se os docs parecem trocados, o vínculo userId no RH está errado.`
        );
      }

      return "";
    },
    async searchEmployees() {
      const filters = this.buildSearchFilters();

      if (!filters.length) {
        this.$q.notify({
          type: "warning",
          message: "Informe CPF, nome ou empresa para buscar.",
        });
        return;
      }

      this.searching = true;
      this.searchResults = [];
      this.selectedEmployee = null;
      this.linkedUser = null;
      this.productsUserId = null;
      this.linkWarning = "";
      this.products = [];
      this.productsRequestId += 1;

      try {
        const results = await filterCrud(filters, "companies/employees");
        this.searchResults = results || [];

        if (!this.searchResults.length) {
          this.$q.notify({
            type: "info",
            message: "Nenhum colaborador encontrado.",
          });
          return;
        }

        if (this.searchResults.length === 1) {
          await this.selectEmployee(this.searchResults[0]);
        }
      } catch (error) {
        showError(error);
      } finally {
        this.searching = false;
      }
    },
    async selectEmployee(employee) {
      this.selectedEmployee = employee;
      this.linkedinForm.linkedinUrl = employee.linkedinUrl || "";
      this.linkedUser = this.getLinkedUser(employee);
      this.productsUserId = this.resolveUserId(employee);
      this.linkWarning = this.buildLinkWarning(
        employee,
        this.productsUserId,
        this.linkedUser
      );
      this.products = [];
      await this.loadProducts();
    },
    syncEmployeeData(employee) {
      const merged = {
        ...this.selectedEmployee,
        ...employee,
        company: employee.company || this.selectedEmployee.company,
        user: employee.user || this.selectedEmployee.user,
      };

      this.selectedEmployee = merged;
      this.linkedinForm.linkedinUrl = merged.linkedinUrl || "";
      this.linkedUser = this.getLinkedUser(merged);
      this.productsUserId = this.resolveUserId(merged);
      this.linkWarning = this.buildLinkWarning(
        merged,
        this.productsUserId,
        this.linkedUser
      );

      const index = this.searchResults.findIndex((item) => item.id === merged.id);

      if (index > -1) {
        this.$set(this.searchResults, index, {
          ...this.searchResults[index],
          ...merged,
        });
      }
    },
    async saveLinkedin() {
      if (!this.selectedEmployee) return;

      this.savingLinkedin = true;

      try {
        const { data } = await axios.patch(
          `${baseApiUrl}/companies/employees/${this.selectedEmployee.id}/linkedin`,
          {
            linkedinUrl: this.linkedinForm.linkedinUrl,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        this.syncEmployeeData(data);
        showSuccess("LinkedIn atualizado com sucesso!");
      } catch (error) {
        showError(error);
      } finally {
        this.savingLinkedin = false;
      }
    },
    async loadProducts() {
      if (!this.selectedEmployee) {
        this.products = [];
        return;
      }

      const requestId = ++this.productsRequestId;
      const employeeId = this.selectedEmployee.id;
      const userId = this.resolveUserId(this.selectedEmployee);

      this.productsUserId = userId;
      this.linkedUser = this.getLinkedUser(this.selectedEmployee);
      this.linkWarning = this.buildLinkWarning(
        this.selectedEmployee,
        userId,
        this.linkedUser
      );

      if (!userId) {
        this.products = [];
        return;
      }

      this.loadingProducts = true;

      try {
        const products = await filterCrud(
          [{ name: "userId", model: userId }],
          "products/listProductByUserWithSpecialist"
        );

        if (requestId !== this.productsRequestId) return;
        if (!this.selectedEmployee || this.selectedEmployee.id !== employeeId) {
          return;
        }

        this.products = (products || []).filter(
          (row) => row.table !== "PRODUTOS CANCELADOS"
        );
      } catch (error) {
        if (requestId !== this.productsRequestId) return;
        showError(error);
        this.products = [];
      } finally {
        if (requestId === this.productsRequestId) {
          this.loadingProducts = false;
        }
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
    showSpecialistImage(product) {
      return Boolean(
        product.specialist &&
          product.specialist.image &&
          !product._imageFailed
      );
    },
    onSpecialistImageError(product) {
      this.$set(product, "_imageFailed", true);
    },
    formatProductScheduleDate(product) {
      if (product.schedule && product.schedule.dateSchedule) {
        return formatDateToStringWithHour(product.schedule.dateSchedule);
      }
      if (product.dateSchedule) {
        return formatDateToStringWithHour(product.dateSchedule);
      }
      if (product.reason) {
        return `Cancelado (${product.reason})`;
      }
      return "Não Agendado";
    },
    statusFiles(product) {
      // Cancelados / disponíveis: schedule vem null — não acessar schedule.dateSchedule
      if (!product.schedule) {
        if (product.reason) {
          return `Cancelado (${product.reason})`;
        }
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
  },
};
</script>

<style lang="scss" scoped>
.crud-filter-content {
  padding: 20px 50px;
}

.page-title {
  font-family: "Montserrat", sans-serif;
  color: rgba(26, 39, 183, 1);
  font-weight: 600;
}
</style>
