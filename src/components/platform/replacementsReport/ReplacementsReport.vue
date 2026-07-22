<template>
  <q-page>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="crud-filter-content">
      <div class="q-mt-lg">
        <h4 class="dashboard-title q-mb-lg">Dashboard de Recolocações</h4>
        <q-card class="filter-card q-mb-lg">
          <q-card-section class="row justify-center title-card">
            <b>Filtros do Relatório</b>
          </q-card-section>

          <q-card-section class="row q-gutter-md justify-center items-end">
            <q-input
              outlined
              dense
              label="Data Inicial"
              type="date"
              v-model="filters.startDate"
              stack-label
              class="col-12 col-md-3"
            />

            <q-input
              outlined
              dense
              label="Data Final"
              type="date"
              v-model="filters.endDate"
              stack-label
              class="col-12 col-md-3"
            />

            <q-select
              outlined
              dense
              label="Empresa"
              v-model="filters.companyId"
              :options="companyOptions"
              option-value="id"
              option-label="name"
              emit-value
              map-options
              clearable
              class="col-12 col-md-3"
            />

            <q-select
              outlined
              dense
              clearable
              label="Segmento"
              v-model="filters.segmentId"
              :options="segmentOptions"
              option-value="id"
              option-label="name"
              emit-value
              map-options
              class="col-12 col-md-3"
            />

            <q-select
              outlined
              dense
              clearable
              label="Subsegmento"
              v-model="filters.subsegmentId"
              :options="filteredSubsegmentOptions"
              option-value="id"
              option-label="name"
              emit-value
              map-options
              class="col-12 col-md-3"
            />

            <div class="row justify-center col-12 q-mt-md">
              <q-btn
                label="Gerar"
                color="primary"
                class="btn-generate q-mr-md"
                @click="applyFilters"
                :loading="loading || loadingOpenToWork"
              />
              <q-btn
                label="Limpar Filtros"
                class="btn-clear-filters"
                @click="clearFilters"
              />
            </div>
          </q-card-section>
        </q-card>


        <div class="row q-gutter-md q-mb-lg" v-if="reportData && reportData.total_entrada">
          <q-card class="metric-card col-12 col-md">
            <q-card-section class="text-center">
              <div class="metric-number">{{ reportData.total_entrada }}</div>
              <div class="metric-label">Total de Entradas</div>
            </q-card-section>
          </q-card>

          <q-card class="metric-card col-12 col-md">
            <q-card-section class="text-center">
              <div class="metric-number">{{ reportData.total_recolocados }}</div>
              <div class="metric-label">Total Recolocados</div>
            </q-card-section>
          </q-card>

          <q-card class="metric-card col-12 col-md">
            <q-card-section class="text-center">
              <div class="metric-number">{{ reportData.percentual_recolocados }}%</div>
              <div class="metric-label">Percentual de Recolocação</div>
            </q-card-section>
          </q-card>

          <q-card class="metric-card col-12 col-md">
            <q-card-section class="text-center">
              <div class="metric-number">{{ reportData.tempo_medio_recolocacao }}</div>
              <div class="metric-label">Tempo Médio (dias)</div>
            </q-card-section>
          </q-card>
        </div>

        <div v-if="monthlyRows.length > 0">
          <q-card class="filter-card q-mt-xl">
            <q-card-section class="row justify-center title-card">
              <b>Detalhamento Mensal</b>
            </q-card-section>

            <q-card-section>
              <div class="q-table__container q-table--flat">
                <table class="manual-table">
                  <thead>
                    <tr>
                      <th
                        v-for="col in monthlyColumns"
                        :key="col.name"
                        :class="'text-' + col.align"
                      >
                        {{ col.label }}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="row in monthlyRows" :key="row.mes">
                      <td class="text-left">{{ row.mes | formatMonth }}</td>
                      <td class="text-center">{{ row.total_recolocados_mes }}</td>
                      <td class="text-center">{{ row.percentual_recolocados_mes | formatPercent }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <q-card class="filter-card q-mt-xl">
          <q-card-section class="row justify-center title-card">
            <b>Profissionais Open to Work</b>
          </q-card-section>
          <q-card-section>
            <p class="text-body2 text-grey-8 q-mb-md">
              Colaboradores que autorizaram exibir o LinkedIn no programa de
              recolocação.
            </p>
            <q-table
              :data="openToWorkCandidates"
              :columns="openToWorkColumns"
              row-key="id"
              flat
              bordered
              :loading="loadingOpenToWork"
              no-data-label="Nenhum profissional disponível no momento."
            >
              <template v-slot:body-cell-linkedinUrl="props">
                <q-td :props="props">
                  <a
                    v-if="props.row.linkedinUrl"
                    :href="props.row.linkedinUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver perfil
                  </a>
                  <span v-else>N/A</span>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../../global";
import Breadcrumbs from "../../general/Breacrumbs.vue";

export default {
  name: 'ReplacementsDashboard',
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      breadcrumbs: [{ title: "Recolocações", to: "" }],
      loading: false,
      reportData: null,
      companies: [],
      segments: [],
      subsegments: [],
      filters: {
        startDate: '',
        endDate: '',
        companyId: null,
        segmentId: null,
        subsegmentId: null,
      },
      monthlyColumns: [
        { name: 'mes', label: 'Mês', align: 'left' },
        { name: 'total_recolocados_mes', label: 'Total Recolocados no Mês', align: 'center' },
        { name: 'percentual_recolocados_mes', label: '% de Recolocados no Mês', align: 'center' }
      ],
      openToWorkCandidates: [],
      loadingOpenToWork: false,
      openToWorkColumns: [
        { name: 'name', label: 'Nome', align: 'left', field: 'name' },
        { name: 'position', label: 'Cargo', align: 'left', field: 'position' },
        { name: 'department', label: 'Área', align: 'left', field: 'department' },
        { name: 'segmentName', label: 'Segmento', align: 'left', field: 'segmentName' },
        { name: 'subsegmentName', label: 'Subsegmento', align: 'left', field: 'subsegmentName' },
        { name: 'city', label: 'Cidade', align: 'left', field: 'city' },
        { name: 'state', label: 'Estado', align: 'left', field: 'state' },
        { name: 'linkedinUrl', label: 'LinkedIn', align: 'center', field: 'linkedinUrl' },
      ]
    };
  },
  computed: {
    companyOptions() {
      return [
        { id: null, name: 'Todas as empresas' },
        ...this.companies
      ];
    },
    segmentOptions() {
      return this.segments;
    },
    filteredSubsegmentOptions() {
      if (!this.filters.segmentId) {
        return this.subsegments;
      }
      return this.subsegments.filter(
        (s) => s.segmentId === this.filters.segmentId
      );
    },
    monthlyRows() {
      return this.reportData?.detalhamento_mensal || [];
    }
  },
  watch: {
    "filters.segmentId"() {
      if (
        this.filters.subsegmentId &&
        !this.filteredSubsegmentOptions.some(
          (s) => s.id === this.filters.subsegmentId
        )
      ) {
        this.filters.subsegmentId = null;
      }
      this.loadOpenToWorkCandidates();
    },
    "filters.subsegmentId"() {
      this.loadOpenToWorkCandidates();
    },
  },
  filters: {
    formatMonth(value) {
      if (!value || typeof value !== 'string') return '';
      const [year, month] = value.split('-');
      return `${month}/${year}`;
    },
    formatPercent(value) {
      const num = parseFloat(value);
      return isNaN(num) ? '0.00%' : `${num.toFixed(2)}%`;
    }
  },
  methods: {
    async loadCompanies() {
      try {
        const response = await axios.get(`${baseApiUrl}/companies`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        this.companies = response.data;
      } catch (error) {
        showError(error);
      }
    },
    async loadSegmentsAndSubsegments() {
      try {
        const headers = {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const [segmentsRes, subsegmentsRes] = await Promise.all([
          axios.get(`${baseApiUrl}/segments`, { headers }),
          axios.get(`${baseApiUrl}/subsegments`, { headers }),
        ]);
        this.segments = segmentsRes.data || [];
        this.subsegments = subsegmentsRes.data || [];
      } catch (error) {
        showError(error);
      }
    },
    async loadReplacementsData() {
      if (!this.filters.startDate || !this.filters.endDate) {
        this.$q.notify({
          type: 'negative',
          message: 'Por favor, selecione as datas inicial e final'
        });
        return;
      }

      this.loading = true;
      this.reportData = null;

      try {
        const params = {
          start_date: this.filters.startDate,
          end_date: this.filters.endDate
        };
        if (this.filters.companyId) {
          params.companyId = this.filters.companyId;
        }

        const response = await axios.get(`${baseApiUrl}/reports/replacements`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          },
          params
        });

        this.reportData = response.data;
      } catch (error) {
        showError(error);
      } finally {
        this.loading = false;
      }
    },
    applyFilters() {
      this.loadReplacementsData();
      this.loadOpenToWorkCandidates();
    },
    setDefaultDates() {
      const today = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(today.getMonth() - 6);
      this.filters.endDate = today.toISOString().split('T')[0];
      this.filters.startDate = sixMonthsAgo.toISOString().split('T')[0];
    },
    clearFilters() {
      this.filters.startDate = '';
      this.filters.endDate = '';
      this.filters.companyId = null;
      this.filters.segmentId = null;
      this.filters.subsegmentId = null;
      this.reportData = null;
      this.loadOpenToWorkCandidates();
    },
    async loadOpenToWorkCandidates() {
      this.loadingOpenToWork = true;

      try {
        const params = {};
        if (this.filters.segmentId) {
          params.segmentId = this.filters.segmentId;
        }
        if (this.filters.subsegmentId) {
          params.subsegmentId = this.filters.subsegmentId;
        }

        const response = await axios.get(
          `${baseApiUrl}/companies/employees/open-to-work`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params,
          }
        );

        this.openToWorkCandidates = response.data || [];
      } catch (error) {
        showError(error);
      } finally {
        this.loadingOpenToWork = false;
      }
    }
  },
  mounted() {
    this.loadCompanies();
    this.loadSegmentsAndSubsegments();
    this.loadOpenToWorkCandidates();
  }
};
</script>

<style scoped>
.crud-filter-content {
  padding: 20px 50px;
}

.filter-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.metric-card {
  min-height: 120px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  flex-grow: 1;
}

.metric-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: rgba(26, 39, 183, 1);
  font-family: "Montserrat", sans-serif;
}

.metric-label {
  font-size: 0.9rem;
  color: rgba(91, 91, 91, 1);
  font-family: "Montserrat", sans-serif;
  margin-top: 8px;
}

.btn-generate {
  border-radius: 5px;
  background-color: rgba(26, 39, 183, 1) !important;
  color: white !important;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
}


.btn-clear-filters {
  border-radius: 5px;
  background-color: #4CAF50 !important;
  color: white !important;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
}

.title-card {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: rgba(26, 39, 183, 1);
}

.manual-table {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
}

.manual-table th,
.manual-table td {
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.manual-table th {
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
}

.dashboard-title {
  background-color: rgba(26, 39, 183, 1);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
  text-align: center;
}

@media (max-width: 768px) {
  .crud-filter-content {
    padding: 20px 15px;
  }

  .metric-number {
    font-size: 2rem;
  }
}
</style>
