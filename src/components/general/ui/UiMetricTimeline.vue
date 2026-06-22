<template>
  <div class="rh-metric-timeline">
    <div class="rh-metric-timeline__header">
      <span class="rh-metric-timeline__title">Evolução no tempo</span>
      <span class="rh-metric-timeline__subtitle">{{ subtitle }}</span>
    </div>

    <div v-if="loading" class="rh-metric-timeline__loading">
      <q-spinner-dots color="primary" size="32px" />
    </div>

    <div v-else-if="insufficientPeriods" class="rh-metric-timeline__empty">
      {{ insufficientPeriodsMessage }}
    </div>

    <div v-else-if="!hasData" class="rh-metric-timeline__empty">
      Selecione períodos disponíveis nos filtros para visualizar a linha do tempo.
    </div>

    <ChartApex
      v-else
      type="line"
      height="280"
      :series="series"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import ChartApex from "../charts/ChartApex.vue";

export default {
  components: {
    ChartApex,
  },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    series: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    subtitle: {
      type: String,
      default: "Comparativo por período",
    },
    valueSuffix: {
      type: String,
      default: "",
    },
    minPeriods: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    insufficientPeriods() {
      return this.categories.length > 0 && this.categories.length < this.minPeriods;
    },
    insufficientPeriodsMessage() {
      return `São necessários pelo menos ${this.minPeriods} meses de demissão cadastrados para exibir a evolução. O filtro de período do painel não limita este gráfico — ele mostra todos os meses disponíveis.`;
    },
    hasData() {
      return (
        this.categories.length >= this.minPeriods &&
        this.series.some((item) => item.data.length > 0)
      );
    },
    chartOptions() {
      return {
        chart: {
          toolbar: { show: false },
          zoom: { enabled: false },
          fontFamily: "Nunito, sans-serif",
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        markers: {
          size: 4,
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: this.categories,
          labels: {
            style: {
              colors: "#667998",
              fontSize: "11px",
            },
          },
        },
        yaxis: {
          labels: {
            formatter: (value) => {
              if (value === null || value === undefined || Number.isNaN(value)) {
                return "N/A";
              }

              return `${value}${this.valueSuffix}`;
            },
            style: {
              colors: "#667998",
            },
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          fontFamily: "Nunito, sans-serif",
        },
        colors: ["#15aa7c", "#3b6cb7", "#f59e0b", "#667998"],
        grid: {
          borderColor: "#eef1f5",
        },
        tooltip: {
          y: {
            formatter: (value) => {
              if (value === null || value === undefined || Number.isNaN(value)) {
                return "N/A";
              }

              return `${value}${this.valueSuffix}`;
            },
          },
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-metric-timeline {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #dbe3ee;
}

.rh-metric-timeline__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.rh-metric-timeline__title {
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-weight: 800;
  color: #1a2744;
}

.rh-metric-timeline__subtitle {
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  color: #667998;
}

.rh-metric-timeline__loading,
.rh-metric-timeline__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  color: #667998;
  text-align: center;
  padding: 12px;
}
</style>
