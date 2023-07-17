<template>
  <q-card class="home-company-feelings-map-card column" style="flex: 1">
    <div class="home-company-feelings-map-card-header column">
      <div class="home-company-feelings-map-card-info-container">
        <q-card-section class="home-company-feelings-map-card-title">
          <h4>Mapa de Sentimentos</h4>
        </q-card-section>
      </div>

      <div class="row">
        <apexchart
          type="polarArea"
          height="400px"
          style="width: 100%; height: 100%"
          :options="chartOptions"
          :series="feelingsMapDataChartConverted.slice(1).map((c) => c[1])"
        ></apexchart>
      </div>

      <!--  {{ feelingsMapDataChartConverted.slice(1).map((c) => c[1]) }}

      <Column
        v-if="showChart"
        :data="feelingsMapDataChartConverted"
        :height="450"
      /> -->
    </div>
  </q-card>
</template>

<script>
//import Column from "./../../../general/charts/Column.vue";
export default {
  /*  components: {
    Column,
  }, */
  props: ["feelingsMap", "users"],
  data() {
    return {
      feelingsMapDataChartConverted: [],
      showChart: false,
      series: [],
      chartOptions: {},
    };
  },
  mounted() {
    this.converDataChart();
    this.showChart = true;
  },
  methods: {
    converDataChart: function () {
      this.feelingsMapDataChartConverted.push([
        "Sentimento",
        "Quantidade",
        { role: "style" },
      ]);

      this.feelingsMap.forEach((feeling) => {
        this.feelingsMapDataChartConverted.push([
          feeling.feeling,
          (feeling.count / this.users).toFixed(2),
          "color: #1a27b7",
        ]);
      });
      this.chartOptions = {
        chart: {
          type: "polarArea",
        },
        labels: this.feelingsMapDataChartConverted
          .slice(1)
          .map((c) => c[0].toString()),
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
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      };
    },
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
