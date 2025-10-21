<template>
  <div class="specialist-provides-timetables">
    <div class="row q-gutter-md q-mb-md">
      <q-btn
        color="primary"
        icon="add"
        label="Adicionar Horário"
        @click="openAddTimetableDialog"
      />
    </div>

    <q-table
      :rows="timetables"
      :columns="columns"
      row-key="id"
      :loading="loading"
      flat
      bordered
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            color="negative"
            icon="delete"
            @click="deleteTimetable(props.row)"
            size="sm"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showAddDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Adicionar Horário Disponível</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="saveTimetable" class="q-gutter-md">
            <q-input
              v-model="form.date"
              type="date"
              label="Data"
              :rules="[val => !!val || 'Data é obrigatória']"
              filled
            />

            <q-input
              v-model="form.startTime"
              type="time"
              label="Horário Início"
              :rules="[val => !!val || 'Horário de início é obrigatório']"
              filled
            />

            <q-input
              v-model="form.endTime"
              type="time"
              label="Horário Fim"
              :rules="[val => !!val || 'Horário de fim é obrigatório']"
              filled
            />

            <q-input
              v-model="form.duration"
              type="number"
              label="Duração (minutos)"
              :rules="[val => !!val || 'Duração é obrigatória']"
              filled
            />

            <div class="row q-gutter-sm">
              <q-btn
                type="submit"
                color="primary"
                label="Salvar"
                :loading="saving"
              />
              <q-btn
                flat
                label="Cancelar"
                @click="closeAddDialog"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { api } from "src/boot/axios";

export default {
  name: "SpecialistAreaProvidesTimetables",
  props: {
    specialist: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timetables: [],
      loading: false,
      saving: false,
      showAddDialog: false,
      form: {
        date: "",
        startTime: "",
        endTime: "",
        duration: 60,
      },
      columns: [
        {
          name: "date",
          label: "Data",
          align: "left",
          field: "date",
          sortable: true,
          format: (val) => this.formatDate(val),
        },
        {
          name: "startTime",
          label: "Início",
          align: "left",
          field: "startTime",
          sortable: true,
        },
        {
          name: "endTime",
          label: "Fim",
          align: "left",
          field: "endTime",
          sortable: true,
        },
        {
          name: "duration",
          label: "Duração (min)",
          align: "center",
          field: "duration",
          sortable: true,
        },
        {
          name: "status",
          label: "Status",
          align: "center",
          field: "status",
          sortable: true,
        },
        {
          name: "actions",
          label: "Ações",
          align: "center",
          field: "actions",
          sortable: false,
        },
      ],
    };
  },
  mounted() {
    this.loadTimetables();
  },
  methods: {
    async loadTimetables() {
      this.loading = true;
      try {
        const response = await api.get(`/specialist-timetables/${this.specialist.id}`);
        this.timetables = response.data;
      } catch (error) {
        console.error("Erro ao carregar horários:", error);
        this.$q.notify({
          type: "negative",
          message: "Erro ao carregar horários disponíveis",
        });
      } finally {
        this.loading = false;
      }
    },

    openAddTimetableDialog() {
      this.resetForm();
      this.showAddDialog = true;
    },

    closeAddDialog() {
      this.showAddDialog = false;
      this.resetForm();
    },

    resetForm() {
      this.form = {
        date: "",
        startTime: "",
        endTime: "",
        duration: 60,
      };
    },

    async saveTimetable() {
      this.saving = true;
      try {
        const payload = {
          ...this.form,
          specialistId: this.specialist.id,
        };

        await api.post("/specialist-timetables", payload);
        
        this.$q.notify({
          type: "positive",
          message: "Horário adicionado com sucesso!",
        });

        this.closeAddDialog();
        this.loadTimetables();
      } catch (error) {
        console.error("Erro ao salvar horário:", error);
        this.$q.notify({
          type: "negative",
          message: "Erro ao salvar horário",
        });
      } finally {
        this.saving = false;
      }
    },

    async deleteTimetable(timetable) {
      this.$q.dialog({
        title: "Confirmar exclusão",
        message: "Deseja realmente excluir este horário?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        try {
          await api.delete(`/specialist-timetables/${timetable.id}`);
          
          this.$q.notify({
            type: "positive",
            message: "Horário excluído com sucesso!",
          });

          this.loadTimetables();
        } catch (error) {
          console.error("Erro ao excluir horário:", error);
          this.$q.notify({
            type: "negative",
            message: "Erro ao excluir horário",
          });
        }
      });
    },

    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString("pt-BR");
    },
  },
};
</script>

<style scoped>
.specialist-provides-timetables {
  padding: 16px;
}
</style>