<template>
  <q-page>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <div class="crud-filter-content">
      <div class="q-mt-lg">
        <h4 class="dashboard-title q-mb-lg">Contrate Open to Work</h4>

        <q-card class="filter-card">
          <q-card-section class="row justify-center title-card">
            <b>Profissionais Open to Work</b>
          </q-card-section>
          <q-card-section>
            <p class="text-body2 text-grey-8 q-mb-md">
              Profissionais de outras empresas que autorizaram aparecer no
              programa de recolocação (LinkedIn opcional).
            </p>
            <div class="row q-gutter-md q-mb-md items-end">
              <q-input
                outlined
                dense
                label="Cargo"
                v-model="openToWorkFilters.position"
                clearable
                class="col-12 col-md-3"
              />
              <q-input
                outlined
                dense
                label="Área"
                v-model="openToWorkFilters.department"
                clearable
                class="col-12 col-md-3"
              />
              <q-input
                outlined
                dense
                label="Cidade"
                v-model="openToWorkFilters.city"
                clearable
                class="col-12 col-md-2"
              />
              <q-input
                outlined
                dense
                label="Estado"
                v-model="openToWorkFilters.state"
                clearable
                class="col-12 col-md-2"
              />
              <div class="col-12 col-md-auto row q-gutter-sm">
                <q-btn
                  label="Filtrar"
                  color="primary"
                  class="btn-generate"
                  @click="loadOpenToWorkCandidates"
                  :loading="loadingOpenToWork"
                />
                <q-btn
                  label="Limpar"
                  class="btn-clear-filters"
                  @click="clearOpenToWorkFilters"
                />
              </div>
            </div>
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
                  <a
                    v-else
                    href="#"
                    class="linkedin-missing"
                    @click.prevent="notifyMissingLinkedin"
                  >
                    Ver perfil
                  </a>
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
      breadcrumbs: [{ title: "Open to Work", to: "" }],
      openToWorkFilters: {
        position: '',
        department: '',
        city: '',
        state: '',
      },
      openToWorkCandidates: [],
      loadingOpenToWork: false,
      openToWorkColumns: [
        { name: 'name', label: 'Nome', align: 'left', field: 'name' },
        { name: 'position', label: 'Cargo', align: 'left', field: 'position' },
        { name: 'department', label: 'Área', align: 'left', field: 'department' },
        { name: 'city', label: 'Cidade', align: 'left', field: 'city' },
        { name: 'state', label: 'Estado', align: 'left', field: 'state' },
        { name: 'linkedinUrl', label: 'LinkedIn', align: 'center', field: 'linkedinUrl' },
      ]
    };
  },
  methods: {
    clearOpenToWorkFilters() {
      this.openToWorkFilters = {
        position: '',
        department: '',
        city: '',
        state: '',
      };
      this.loadOpenToWorkCandidates();
    },
    notifyMissingLinkedin() {
      this.$q.notify({
        type: 'warning',
        message:
          'LinkedIn não informado. Atualize o perfil do colaborador para visualizar o link.',
        timeout: 4000,
      });
    },
    async loadOpenToWorkCandidates() {
      this.loadingOpenToWork = true;

      try {
        const params = {};
        const { position, department, city, state } = this.openToWorkFilters;
        if (position) params.position = position;
        if (department) params.department = department;
        if (city) params.city = city;
        if (state) params.state = state;

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

.dashboard-title {
  background-color: rgba(26, 39, 183, 1);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
  text-align: center;
}

.linkedin-missing {
  color: rgba(26, 39, 183, 1);
  text-decoration: underline;
  cursor: pointer;
}

@media (max-width: 768px) {
  .crud-filter-content {
    padding: 20px 15px;
  }
}
</style>
