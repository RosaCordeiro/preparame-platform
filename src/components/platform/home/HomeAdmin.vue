<template>
  <div id="q-app" class="schedule">
    <q-page class="q-pa-lg">
      <div class="row">
        <q-card class="my-card col-2 q-ma-sm">
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
          class="my-card col-2 q-ma-sm card-clicks"
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
    </q-page>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "../../../global";
import { downloadFile } from "src/utils/downloadFile";

export default {
  components: {},
  data() {
    return {
      clicks: [],
      initialDate: "",
      finalDate: "",
    };
  },
  methods: {
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
  },
};
</script>

<style>
.schedule {
  height: 100%;
}

.my-card {
  height: 180px;
  width: 180px;
  background-color: #f5f5f5;
  border-radius: 10px;
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
</style>
