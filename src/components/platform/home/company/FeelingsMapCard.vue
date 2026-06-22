<template>
  <q-card class="home-company-feelings-map-card column" style="flex: 1 0 250px">
    <div class="home-company-feelings-map-card-header column">
      <div class="home-company-feelings-map-card-info-container">
        <q-card-section class="home-company-feelings-map-card-title">
          <h4>Mapa de Sentimentos - {{ title }}</h4>
        </q-card-section>
        <q-card-section v-if="feelingMap.length !== 0">
          <ChartApex
            type="polarArea"
            height="400px"
            style="width: 100%; height: 100%"
            :options="chartOptions"
            :series="feelingMap.map((c) => c.count)"
          />
        </q-card-section>
        <q-card-section v-else class="home-company-feelings-map-card-title">
          <h4 style="text-align: center; padding-top: 100px">Não há dados!</h4>
        </q-card-section>
      </div>
    </div>
  </q-card>
</template>

<script>
import ChartApex from "../../../general/charts/ChartApex.vue";

export default {
  components: {
    ChartApex,
  },
  props: ["feelingMap", "title"],
  data() {
    return {
      showChart: false,
      chartOptions: {},
    };
  },
  watch: {
    feelingMap() {
      this.setChartOptions();
    },
  },
  methods: {
    setChartOptions() {
      this.chartOptions = {
        chart: {
          type: "polarArea",
        },
        labels: this.feelingMap.map((c) => c.feeling.toString()),
        stroke: {
          colors: ["#fff"],
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#f54890", "#35a97d", "#1a27b7", "#f54890"],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 70, 100],
            colorStops: [],
          },
        },
        yaxis: {
          show: false,
        },
        legend: {
          position: "bottom",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      };
    },
  },
  mounted() {
    this.showChart = true;

    setTimeout(() => {
      this.setChartOptions();
    }, 500);
  },
};
</script>

<style lang="scss">
.home-company-feelings-map-card {
  width: 40vw;
  min-height: 60vh;
  height: 100%;
  box-shadow: none;
  border-radius: 5%;
}

.home-company-feelings-map-card-title {
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
  .home-company-feelings-map-card {
    width: 90vw;
    height: 20vh;
  }
}

h4,
h6 {
  color: #b1b1b1;
  text-align: left;
  margin: 0;
  margin-left: 10%;
  font-size: 1.125rem;
}
</style>
