<template>
  <div>
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row q-gutter-md">
          <q-input
            v-model="dateBegin"
            type="date"
            label="Data Inicial"
            outlined
            dense
            class="col-md-4 col-sm-6 col-xs-12"
          />

          <q-input
            v-model="dateEnd"
            type="date"
            label="Data Final"
            outlined
            dense
            class="col-md-4 col-sm-6 col-xs-12"
          />

          <q-btn
            color="primary"
            label="Buscar Agenda"
            @click="loadSchedule"
            :loading="loading"
            class="col-md-4 col-sm-12 col-xs-12"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-table
          :data="scheduleData"
          :columns="columns"
          :row-key="getRowKey"
          :loading="loading"
          no-data-label="Nenhum horário encontrado"
          :pagination="{ rowsPerPage: 15 }"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError, showSuccess } from "../../../global";

export default {
  name: "ViewSpecialistSchedule",
  props: ["specialist"],
  data() {
    return {
      loading: false,
      scheduleData: [],
      dateBegin: new Date().toISOString().split("T")[0],
      dateEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      columns: [
        {
          name: "dateSchedule",
          label: "Data e Horário",
          align: "left",
          field: "dateSchedule",
          sortable: true,
          format: (val) => {
            if (!val) return "-";
            const date = new Date(val);
            return (
              date.toLocaleDateString("pt-BR") +
              " " +
              date.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              })
            );
          },
        },

        {
          name: "user",
          label: "Usuário",
          align: "left",
          field: "user",
          sortable: false,
          format: (val) => val?.name || "Disponível",
        },
        {
          name: "product",
          label: "Produto",
          align: "left",
          field: "product",
          sortable: false,
          format: (val) => val?.name || "-",
        },
      ],
    };
  },
  async created() {
    if (this.specialist) {
      this.loadSchedule();
    }
  },
  methods: {
    async loadSchedule() {
      if (!this.specialist) {
        console.warn("[ViewSpecialistSchedule] Nenhum especialista fornecido");
        return;
      }

      this.loading = true;

      try {
        const params = {
          specialistUserId: this.specialist.userId || this.specialist.user?.id,
          dateBegin: this.dateBegin,
          dateEnd: this.dateEnd,
        };

        const response = await axios.get(`${baseApiUrl}/specialists/schedule`, {
          params,
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        this.scheduleData = response.data || [];
        console.log(
          `[ViewSpecialistSchedule] ${this.scheduleData.length} itens carregados`
        );

        if (this.scheduleData.length === 0) {
          showSuccess(
            "Busca realizada com sucesso. Nenhum horário encontrado no período."
          );
        }
      } catch (error) {
        console.error(
          `[ViewSpecialistSchedule] Erro: ${error.response?.status} - ${error.message}`
        );
        showError("Erro ao carregar agenda do especialista");
        this.scheduleData = [];
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateString) {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("pt-BR");
    },

    formatDateTime(dateString) {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return (
        date.toLocaleDateString("pt-BR") +
        " " +
        date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      );
    },

    getRowKey(row, index) {
      return (
        row.id || `${index}-${row.dateSchedule || Date.now()}-${Math.random()}`
      );
    },
  },
};
</script>

<style scoped>
.q-card {
  border-radius: 8px;
}
</style>
