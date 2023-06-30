<template>
  <q-card
    class="home-company-labor-risk-detailed-card column q-pa-md"
    style="width: 100%"
  >
    <div class="home-company-labor-risk-detailed-card-header column">
      <div class="home-company-labor-risk-detailed-card-info-container">
        <q-card-section
          class="home-company-labor-risk-detailed-card-title"
          style="height: 65px"
        >
          <h4>Pesquisa de Desligamento</h4>
          <h6>Notas de 1 a 10</h6>
        </q-card-section>
      </div>
      <Column v-if="false" :data="laborRiskDataChartConverted" :height="450" />

      <div class="q-mt-lg card">
        <div
          class="chart-card"
          v-for="(l, index) in laborRiskDataChartConverted.slice(1)"
          :key="index"
        >
          <div class="chart__row-title">
            <div
              class="chart__row-label"
              :style="`min-width: 80px; width: ${l[1] * 10}%; `"
            >
              <p>Pergunta {{ index + 1 }}</p>
              <p v-if="l[1] > 4">{{ l[1] }}</p>
            </div>
          </div>
          <div class="chart__row" :id="formatId(l[0])">
            <div
              class="chart__row__value"
              :style="`width: ${
                l[1] * 10
              }%; background: linear-gradient(90deg, #1a27b7 0%, ${
                l[1] >= 7 ? '#34a67c' : '#ff4690'
              } 100%);`"
            >
              <q-tooltip
                transition-show="scale"
                transition-hide="scale"
                class="bg-purple text-body1"
                :offset="[20, 20]"
              >
                <div class="tooltip-text">
                  Pergunta {{ index + 1 + " - " + l[0] + " - (" + l[1] }})
                </div>
              </q-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import Column from "./../../../general/charts/Column.vue";
export default {
  components: {
    Column,
  },
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
    formatId(name) {
      const format = (str) => {
        return str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/([^\w]+|\s+)/g, "-")
          .replace(/\-\-+/g, "-")
          .replace(/(^-+|-+$)/, "");
      };

      return "chart__row-" + format(name);
    },

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

.chart-card {
  height: auto;
}

.chart__row-title {
  width: 80%;
  margin: 0 auto;
}

.chart__row {
  height: 15px;
  width: 80%;
  border-radius: 10px;
  background-color: #e1e1e1;
  margin: 0 auto;
}

.chart__row__value {
  height: 15px;
  border-radius: 10px;
}

.chart__row__value:hover {
  cursor: pointer;
}

.card {
  display: flex;
  flex-direction: column;
}

.chart__row-label p {
  margin: 0px;
  margin-top: 15px;
}

.chart__row-label {
  position: relative;
  display: flex;
  justify-content: space-between;
  color: #b1b1b1;
}

h4,
h6 {
  color: #b1b1b1;
  text-align: left;
  margin: 0;
  margin-left: 10%;
  font-size: 1.125rem;
}

.tooltip-text {
  color: #fff;
  font-size: 1.125rem;
  text-align: center;
  margin: 0;
}
</style>
