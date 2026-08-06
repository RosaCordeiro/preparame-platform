<template>
  <UiSectionCard
    :title="title"
    :subtitle="subtitle"
    :info-label="infoLabel"
    @info="$emit('info', $event)"
  >
    <div class="rh-feeling-compare">
      <div v-if="chartOptions.length > 1" class="rh-feeling-compare__toolbar">
        <span class="rh-feeling-compare__toolbar-label">Visualização</span>
        <q-btn-toggle
          v-model="selectedChartIndex"
          toggle-color="primary"
          unelevated
          dense
          no-caps
          :options="chartOptions"
        />
      </div>

      <div v-if="activeChart" class="rh-feeling-compare__item">
        <div class="rh-feeling-compare__head">
          <span class="rh-feeling-compare__label">{{ activeChart.label }}</span>
          <span
            v-if="activeChart.subtitle"
            class="rh-feeling-compare__subtitle"
          >
            {{ activeChart.subtitle }}
          </span>
        </div>

        <div class="rh-feeling-compare__chart">
          <ChartApex
            :key="`feeling-radar-${selectedChartIndex}`"
            type="radar"
            height="380"
            style="width: 100%"
            :options="activeChart.options"
            :series="activeChart.series"
          />
        </div>

        <ul
          v-if="activeChart.legendItems && activeChart.legendItems.length"
          class="rh-feeling-compare__legend"
          aria-label="Legenda dos sentimentos"
        >
          <li
            v-for="(item, itemIndex) in activeChart.legendItems"
            :key="`${item.label}-${itemIndex}`"
            class="rh-feeling-compare__legend-item"
          >
            <span
              class="rh-feeling-compare__swatch"
              :style="{ backgroundColor: item.color }"
              aria-hidden="true"
            />
            <span class="rh-feeling-compare__legend-label">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </UiSectionCard>
</template>

<script>
import ChartApex from "../charts/ChartApex.vue";
import UiSectionCard from "./UiSectionCard.vue";

export default {
  components: {
    ChartApex,
    UiSectionCard,
  },
  props: {
    title: {
      type: String,
      default: "Mapa de sentimentos",
    },
    subtitle: {
      type: String,
      default: "",
    },
    infoLabel: {
      type: String,
      default: "Mapa de sentimentos",
    },
    charts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedChartIndex: 0,
    };
  },
  computed: {
    chartOptions() {
      return (this.charts || []).map((chart, index) => ({
        label: chart.label,
        value: index,
      }));
    },
    activeChart() {
      if (!this.charts || !this.charts.length) {
        return null;
      }

      return this.charts[this.selectedChartIndex] || this.charts[0] || null;
    },
  },
  watch: {
    charts: {
      immediate: true,
      handler(nextCharts) {
        const maxIndex = Math.max((nextCharts || []).length - 1, 0);

        if (this.selectedChartIndex > maxIndex) {
          this.selectedChartIndex = 0;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-feeling-compare {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rh-feeling-compare__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
}

.rh-feeling-compare__toolbar-label {
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #667998;
}

.rh-feeling-compare__item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  max-width: 560px;
  width: 100%;
  margin: 0 auto;
  padding: 4px 4px 8px;
}

.rh-feeling-compare__head {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 2.5rem;
}

.rh-feeling-compare__label {
  font-family: "Nunito", sans-serif;
  font-size: 0.8125rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #15aa7c;
}

.rh-feeling-compare__subtitle {
  font-family: "Nunito", sans-serif;
  font-size: 0.6875rem;
  color: #667998;
  line-height: 1.4;
}

.rh-feeling-compare__chart {
  width: 100%;
  min-height: 380px;
}

.rh-feeling-compare__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  list-style: none;
  margin: 8px 0 0;
  padding: 12px 4px 0;
  border-top: 1px solid #eef1f5;
}

.rh-feeling-compare__legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
}

.rh-feeling-compare__swatch {
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px #fff, 0 0 0 3px rgba(26, 39, 68, 0.08);
}

.rh-feeling-compare__legend-label {
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: #1a2744;
  text-transform: none;
  line-height: 1.3;
  word-break: break-word;
}
</style>
