<template>
  <div id="q-app" class="schedule">
    <q-page class="q-pa-lg">
      <div class="row row-cards">
        <q-card class="my-card col-lg-2 col-md-auto">
          <q-card-section class="row justify-center title-card">
            <b>Relatório</b></q-card-section
          >
          <q-card-section class="row justify-center" style="gap: 10px">
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
              class="col-12 q-mt-sm btn"
              @click="generateReport"
            />
          </q-card-section>
        </q-card>
        <q-card
          class="my-card col-lg-2 col-md-auto card-clicks"
          v-for="click in clicks"
          :key="click.cn_name"
        >
          <q-card-section class="row justify-center q-mb-lg title-card">
            {{ click.cn_name }}
          </q-card-section>

          <div class="text-card">{{ click.count }} Cliques</div>
        </q-card>
      </div>
      <div class="row-cards">
        <div class="filtro">
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <q-btn
              style="background: #667997; color: black"
              label="Baixar respostas em excel"
              class="column btn"
              @click="downloadAnswers"
            />

            <q-btn
              style="background: #667997; color: black"
              label="Relatório visão de únicos"
              class="column btn"
              @click="downloadUsersReport"
            />

             <q-btn
              style="background: #667997; color: black"
              label="Recolocados"
              class="column btn"
              @click="goToReplacementsPage"
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
    goToReplacementsPage() {
      this.$router.push({ name: 'replacementsReport' });
    },
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
    async downloadUsersReport() {
      let config = {
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        url: `${baseApiUrl}/reports/users`,
        responseType: "blob",
      };
      this.$q.loading.show();

      try {
        const data = await axios(config);
        downloadFile(data.data, "usuarios.xlsx");
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
  border-radius: 25px;
  width: 275px;
  height: 60px;
  text-align: center;
  font-weight: 600;
  font-size: 0.8rem;
  font-weight: bold;
  box-sizing: border-box;
  padding: 10px;
  background-color: rgba(26, 39, 183, 1) !important;
  color: white !important;
  border-radius: 5px;
  font-family: "Montserrat", sans-serif;
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
  background-color: #fff;
  border-radius: 10px;
  flex: 1;
  border-radius: 5px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: relative;
}

.text-card {
  position: absolute;
  font-weight: bold;
  padding-top: 15px;
  top: 50%;
  padding: 0;
  width: 100%;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  color: rgba(91, 91, 91, 1);
  font-size: 20px;
  line-height: 20px;
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
  padding: 20px 0;
}

.filtro .text {
  font-size: 1rem;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
}

.filtro label {
  font-family: "Montserrat", sans-serif;
}

.title-card {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: rgba(26, 39, 183, 1);
}

.row-cards {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
