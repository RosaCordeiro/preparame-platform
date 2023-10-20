<template>
  <div id="q-app" class="schedule">
    <q-page class="q-pa-lg">
      <div class="row q-pa-lg">
        <q-card class="my-card col-lg-2 col-md-auto q-ma-sm">
          <q-card-section class="row justify-center">
            <b>Relatório</b></q-card-section
          >
          <q-card-section class="row justify-center">
            <q-input
              outlined
              dense
              label="Data Inicial"
              type="date"
              v-model="initialDate"
              placeholder="Pesquisar"
              class="col-12 date"
            />
            <q-input
              outlined
              dense
              label="Data Final"
              type="date"
              v-model="finalDate"
              placeholder="Pesquisar"
              class="col-12 date q-mt-sm"
            />
            <q-btn
              label="Gerar"
              color="blue"
              class="col-12 q-mt-sm"
              @click="generateReport"
            />
          </q-card-section>
        </q-card>
        <q-card
          class="my-card col-lg-2 col-md-auto q-ma-sm card-clicks"
          v-for="click in clicks"
          :key="click.cn_name"
        >
          <q-card-section class="row justify-center">
            <b>{{ click.count }} Cliques</b></q-card-section
          >
          <q-card-section class="row justify-center q-mb-lg">
            {{ click.cn_name }}
          </q-card-section>
        </q-card>
      </div>
      <div class="row">
        <div class="filtro">
          <div>
            <q-btn
              style="background: #667997; color: black"
              label="Baixar respostas em excel"
              class="column btn"
              @click="downloadAnswers"
            />
          </div>
          <div class="text">Filtro</div>
          <div class="column">
            <label>
              <input type="radio" v-model="selectedCompany" :value="'TUDO'" />
              Tudo
            </label>
            <label>
              <input type="radio" v-model="selectedCompany" :value="'B2B'" />
              B2B
            </label>
            <label>
              <input type="radio" v-model="selectedCompany" :value="'B2C'" />
              B2C
            </label>
            <label v-for="(option, index) in companies" :key="index">
              <input
                type="radio"
                v-model="selectedCompany"
                :value="option.id"
              />
              {{ option.name }}
            </label>
          </div>
        </div>
        <section class="dashboard">
          <DashBoardAnswers :companyId="selectedCompany" />
        </section>
      </div>

      <ConfirmScheduleDialog ref="confirmScheduleDialog" />
    </q-page>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showDeuCerto, showError } from "../../../global";
import { downloadFile } from "src/utils/downloadFile";
import DashBoardAnswers from "./templates/DashBoardAnswers.vue";
import ConfirmScheduleDialog from "src/components/ConfirmScheduleDialog.vue";

export default {
  components: {
    DashBoardAnswers,
    ConfirmScheduleDialog,
  },
  data() {
    return {
      clicks: [],
      initialDate: "",
      finalDate: "",
      companies: [],
      selectedCompany: "TUDO",
    };
  },
  methods: {
    showDeuCerto,
    async generateReport() {
      const params = {};

      if (this.initialDate && this.finalDate) {
        params.initialDate = this.initialDate;
        params.finalDate = this.finalDate;
      }

      let config = {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}/reports/schedules`,
        responseType: "blob",
        params,
      };

      this.$q.loading.show();

      try {
        const data = await axios(config);
        downloadFile(data.data, "relatorio.xlsx");
      } catch (error) {
        showError(error);
      }

      this.$q.loading.hide();
    },
    async downloadAnswers() {
      let config = {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}/reports/responses`,
        responseType: "blob",
      };
      this.$q.loading.show();

      try {
        const data = await axios(config);
        downloadFile(data.data, "respostas.xlsx");
      } catch (error) {
        showError(error);
      }

      this.$q.loading.hide();
    },
    listClicks() {
      let config = {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}/clicks`,
      };

      axios(config)
        .then(async (clicks) => {
          this.clicks = clicks.data;

          console.log(this.clicks);
        })
        .catch((err) => {
          console.log(err);
          showError(err);
        });
    },
  },
  mounted() {
    this.listClicks();
    let config = {
      method: "GET",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      url: `${baseApiUrl}/companies`,
    };

    axios(config)
      .then(async (company) => {
        this.companies = company.data;

        console.log(this.companies);
      })
      .catch((err) => {
        console.log(err);
        showError(err);
      });
  },
};
</script>

<style>
.btn {
  background-color: color(srgb red green blue);
  border-radius: 25px;
  width: 275px;
  height: 60px;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  font-weight: bold;
}

.text {
  font-size: 1rem;
  font-weight: bold;
  padding-top: 15px;
}
.schedule {
  height: 100%;
}

.my-card {
  min-height: 180px;
  width: 180px;
  background-color: #f5f5f5;
  border-radius: 10px;
  flex: 1;
}

.date .q-field__label.no-pointer-events.absolute.ellipsis {
  max-width: 133%;
  transform: translateY(-40%) scale(0.75);
  transition: transform 0.36s cubic-bezier(0.4, 0, 0.2, 1),
    max-width 0.396s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-clicks {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dashboard {
  flex: 1;
}

.filtro {
  padding: 32px;
}
</style>
