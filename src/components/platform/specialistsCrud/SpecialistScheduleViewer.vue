<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 900px; max-width: 95vw;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Agenda do Especialista: {{ specialist.name }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="row q-gutter-md q-mb-md">
          <q-input
            v-model="dateBegin"
            type="date"
            label="Data Inicial"
            outlined
            dense
            class="col"
          />
          <q-input
            v-model="dateEnd"
            type="date"
            label="Data Final"
            outlined
            dense
            class="col"
          />
          <q-select
            v-model="status"
            :options="statusOptions"
            label="Status"
            outlined
            dense
            class="col"
          />
          <q-btn
            color="primary"
            label="Buscar"
            @click="loadSchedule"
            :loading="loading"
          />
          <q-btn
            color="secondary"
            label="Disponibilizar Horários"
            @click="goToProvidesTimetables"
            icon="mdi-calendar-plus"
          />
        </div>

        <q-table
          :data="scheduleData"
          :columns="columns"
          row-key="id"
          :loading="loading"
          no-data-label="Nenhum horário encontrado"
          :pagination="{ rowsPerPage: 15 }"
        >
          <template v-slot:body-cell-dateSchedule="props">
            <q-td :props="props">
              {{ formatDateTime(props.value) }}
            </q-td>
          </template>
          
          <template v-slot:body-cell-product="props">
            <q-td :props="props">
              {{ props.row.product?.name || '-' }}
            </q-td>
          </template>

          <template v-slot:body-cell-user="props">
            <q-td :props="props">
              {{ props.row.user?.name || 'Disponível' }}
            </q-td>
          </template>

          <template v-slot:body-cell-hangoutLink="props">
            <q-td :props="props">
              <q-btn
                v-if="props.value"
                color="primary"
                size="sm"
                label="Meet"
                :href="props.value"
                target="_blank"
                icon="mdi-video"
              />
              <span v-else>-</span>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from 'axios';
import { baseApiUrl, showError } from '../../../global';

export default {
  name: 'SpecialistScheduleViewer',
  props: {
    specialist: {
      type: Object,
      default: () => ({})
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: false,
      loading: false,
      scheduleData: [],
      dateBegin: new Date().toISOString().split('T')[0],
      dateEnd: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'UNAVAILABLE',
      statusOptions: [
        { label: 'Indisponível', value: 'UNAVAILABLE' },
        { label: 'Disponível', value: 'AVAILABLE' },
        { label: 'Agendado', value: 'SCHEDULED' },
        { label: 'Todos', value: '' }
      ],
      columns: [
        {
          name: 'dateSchedule',
          label: 'Data e Horário',
          align: 'left',
          field: 'dateSchedule',
          sortable: true
        },
        {
          name: 'product',
          label: 'Produto',
          align: 'left',
          field: 'product',
          sortable: false
        },
        {
          name: 'user',
          label: 'Usuário',
          align: 'left',
          field: 'user',
          sortable: false
        },
        {
          name: 'hangoutLink',
          label: 'Link da Reunião',
          align: 'center',
          field: 'hangoutLink',
          sortable: false
        }
      ]
    };
  },
  watch: {
    show(newVal) {
      this.showDialog = newVal;
      if (newVal) {
        this.loadSchedule();
      }
    },
    showDialog(newVal) {
      if (!newVal) {
        this.$emit('close');
      }
    }
  },
  methods: {
    async loadSchedule() {
      if (!this.specialist.userId && !this.specialist.user?.id) {
        showError('Especialista não possui usuário associado');
        return;
      }

      this.loading = true;
      
      try {
        const params = {
          specialistUserId: this.specialist.userId || this.specialist.user?.id,
          dateBegin: this.dateBegin,
          dateEnd: this.dateEnd
        };

        if (this.status) {
          params.status = this.status;
        }

        const response = await axios.get(`${baseApiUrl}/mentoring/schedule-list`, {
          params,
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        this.scheduleData = response.data || [];
      } catch (error) {
        showError(error);
        this.scheduleData = [];
      } finally {
        this.loading = false;
      }
    },
    
    goToProvidesTimetables() {
      this.$router.push('/providesTimetables');
      this.showDialog = false;
    },
    
    formatDateTime(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.q-card {
  max-height: 80vh;
  overflow-y: auto;
}
</style>