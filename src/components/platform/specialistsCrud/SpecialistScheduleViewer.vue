<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 800px; max-width: 90vw;">
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
        </div>

        <q-table
          :data="scheduleData"
          :columns="columns"
          row-key="id"
          :loading="loading"
          no-data-label="Nenhum horário encontrado"
          :pagination="{ rowsPerPage: 10 }"
        >
          <template v-slot:body-cell-date="props">
            <q-td :props="props">
              {{ formatDate(props.value) }}
            </q-td>
          </template>
          
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-chip
                :color="getStatusColor(props.value)"
                text-color="white"
                :label="getStatusLabel(props.value)"
              />
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
          name: 'date',
          label: 'Data',
          align: 'left',
          field: 'date',
          sortable: true
        },
        {
          name: 'time',
          label: 'Horário',
          align: 'left',
          field: 'time',
          sortable: true
        },
        {
          name: 'status',
          label: 'Status',
          align: 'center',
          field: 'status',
          sortable: true
        },
        {
          name: 'user',
          label: 'Usuário Agendado',
          align: 'left',
          field: row => row.user?.name || '-',
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
    
    formatDate(dateString) {
      if (!dateString) return '-';
      return new Date(dateString).toLocaleDateString('pt-BR');
    },
    
    getStatusColor(status) {
      const colors = {
        'AVAILABLE': 'green',
        'UNAVAILABLE': 'red',
        'SCHEDULED': 'blue'
      };
      return colors[status] || 'grey';
    },
    
    getStatusLabel(status) {
      const labels = {
        'AVAILABLE': 'Disponível',
        'UNAVAILABLE': 'Indisponível',
        'SCHEDULED': 'Agendado'
      };
      return labels[status] || status;
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