<template>
  <q-card class="home-company-brand-risk-detailed-card column">
    <div class="home-company-brand-risk-detailed-card-header column">
      <div class="home-company-brand-risk-detailed-card-info-container">
        <q-card-section class="home-company-brand-risk-detailed-card-title"
          >Riscos da Marca</q-card-section
        >
      </div>
      <Bar v-if="showChart" :data="brandRiskDataChartConverted" :height="380" />
    </div>
  </q-card>
</template>

<script>
import Bar from "../../../general/charts/Bar.vue";
export default {
  components: {
    Bar,
  },
  props: ["brandRisks"],
  data() {
    return {
      brandRiskDataChartConverted: [],
      showChart: false,
    };
  },
  mounted() {
    this.converDataChart();
    this.showChart = true;
  },
  methods: {
    converDataChart: function () {
      this.brandRiskDataChartConverted.push(["Risco Trabalhista", "Soma"]);

      this.brandRisks.forEach((brandRisk) => {
        this.brandRiskDataChartConverted.push([
          brandRisk.question,
          brandRisk.count,
        ]);
      });
    },
  },
};
</script>

<style lang="scss">
.home-company-brand-risk-detailed-card {
  width: 15vw;
  height: 20vh;
  border-radius: 25px;
  box-shadow: none;
}

.home-company-brand-risk-detailed-card-title {
  color: $text-grey;
  font-size: 2.2rem;
  text-align: center;
  width: 100%;
  padding-top: 10px;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}

@media (orientation: portrait) {
  .home-company-brand-risk-detailed-card {
    width: 90vw;
    height: 20vh;
  }
}
</style>
