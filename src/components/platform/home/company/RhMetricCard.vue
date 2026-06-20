<template>
  <div class="rh-metric-card">
    <div class="rh-metric-card__header">
      <div>
        <h3 class="rh-metric-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="rh-metric-card__subtitle">{{ subtitle }}</p>
      </div>
      <q-btn
        flat
        round
        dense
        icon="mdi-information-outline"
        color="grey-6"
        @click="$emit('info')"
      />
    </div>

    <div class="rh-metric-card__rows">
      <RhProgressRow
        label="Sua Empresa"
        :value="companyValue"
        :min-value="minValue"
        :max-value="maxValue"
        :intersection-value="intersectionValue"
        :inverted-colors="invertedColors"
        :insufficient="lessThanFive"
        :suffix="suffix"
        show-scale
      />

      <RhProgressRow
        label="Média Geral"
        :value="generalValue"
        :min-value="minValue"
        :max-value="maxValue"
        :intersection-value="intersectionValue"
        :inverted-colors="invertedColors"
        :suffix="suffix"
        show-scale
      />
    </div>
  </div>
</template>

<script>
import RhProgressRow from "./RhProgressRow.vue";

export default {
  components: {
    RhProgressRow,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    companyValue: {
      type: [Number, String],
      default: NaN,
    },
    generalValue: {
      type: [Number, String],
      default: NaN,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 100,
    },
    intersectionValue: {
      type: Number,
      default: 0,
    },
    invertedColors: {
      type: Boolean,
      default: false,
    },
    lessThanFive: {
      type: Boolean,
      default: false,
    },
    suffix: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-metric-card {
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(26, 39, 68, 0.05);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.rh-metric-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.rh-metric-card__title {
  margin: 0;
  font-family: "Nunito", sans-serif;
  font-size: 1.0625rem;
  font-weight: 800;
  color: #1a2744;
}

.rh-metric-card__subtitle {
  margin: 4px 0 0;
  font-family: "Nunito", sans-serif;
  font-size: 0.8125rem;
  color: #667998;
}

.rh-metric-card__rows {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>
