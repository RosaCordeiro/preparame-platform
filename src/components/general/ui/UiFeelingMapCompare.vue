<template>
  <UiSectionCard
    :title="title"
    :subtitle="subtitle"
    :info-label="infoLabel"
    @info="$emit('info', $event)"
  >
    <div class="rh-feeling-compare">
      <div
        v-for="(chart, index) in charts"
        :key="`${chart.label}-${index}`"
        class="rh-feeling-compare__item"
      >
        <div class="rh-feeling-compare__head">
          <span class="rh-feeling-compare__label">{{ chart.label }}</span>
          <span v-if="chart.subtitle" class="rh-feeling-compare__subtitle">
            {{ chart.subtitle }}
          </span>
        </div>

        <ChartApex
          type="polarArea"
          height="280"
          style="width: 100%"
          :options="chart.options"
          :series="chart.series"
        />
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
};
</script>

<style lang="scss" scoped>
.rh-feeling-compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.rh-feeling-compare__item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.rh-feeling-compare__head {
  display: flex;
  flex-direction: column;
  gap: 4px;
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
</style>
