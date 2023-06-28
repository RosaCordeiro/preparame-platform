<template>
  <q-card class="home-company-labor-risk-detailed-card column q-pb-md q-px-md">
    <div class="home-company-labor-risk-detailed-card-header column">
      <div class="home-company-labor-risk-detailed-card-info-container">
        <q-card-section class="home-company-labor-risk-detailed-card-title">
          <h4>Pesquisa de Desligamento</h4>
          <h6>Notas de 1 a 10</h6>
        </q-card-section>
      </div>
      <!-- <Column v-if="showChart" :data="laborRiskDataChartConverted" :height="450" /> -->

      <div class=""></div>
    </div>
  </q-card>
</template>

<script>
//import Column from "./../../../general/charts/Column.vue";
export default {
  /*   components: {
    Column,
  }, */
  props: ["laborRisks"],
  data() {
    return {
      laborRiskDataChartConverted: [],
      showChart: false,
    };
  },
  mounted() {
    this.converDataChart();
    this.showChart = true;
  },
  methods: {
    converDataChart: function () {
      this.laborRiskDataChartConverted.push([
        "Risco Trabalhista",
        "Soma",
        { role: "style" },
      ]);

      this.laborRisks.forEach((laborRisk) => {
        this.laborRiskDataChartConverted.push([
          laborRisk.question,
          laborRisk.count,
          "color: #ff4690",
        ]);
      });
    },
  },
};
</script>

<style lang="scss">
.home-company-labor-risk-detailed-card {
  width: 40vw;
  height: 60vh;
  box-shadow: none;
  border-radius: 5%;
}

.home-company-labor-risk-detailed-card-title {
  color: $text-dark-grey;
  font-size: 2.2rem;
  text-align: center;
  width: 100%;
  padding-top: 10px;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}

@media (orientation: portrait) {
  .home-company-labor-risk-detailed-card {
    width: 90vw;
    height: 20vh;
  }
}
</style>
