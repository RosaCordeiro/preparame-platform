<template>
  <div
    class="rh-metric-card"
    :class="{
      'rh-metric-card--clickable': clickable,
      'rh-metric-card--expanded': expanded,
    }"
    @click="handleCardClick"
  >
    <div class="rh-metric-card__header">
      <div>
        <h3 class="rh-metric-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="rh-metric-card__subtitle">{{ subtitle }}</p>
      </div>
      <div class="rh-metric-card__actions">
        <q-icon
          v-if="clickable"
          :name="expanded ? 'mdi-chevron-up' : 'mdi-chart-timeline-variant'"
          size="18px"
          color="grey-6"
        />
        <q-btn
          flat
          round
          dense
          icon="mdi-information-outline"
          color="grey-6"
          @click.stop="$emit('info')"
        />
      </div>
    </div>

    <div class="rh-metric-card__rows">
      <UiProgressRow
        v-for="(row, index) in displayRows"
        :key="`${row.label}-${index}`"
        :label="row.label"
        :subtitle="row.subtitle"
        :value="row.value"
        :min-value="minValue"
        :max-value="maxValue"
        :intersection-value="intersectionValue"
        :inverted-colors="invertedColors"
        :insufficient="row.insufficient"
        :suffix="suffix"
        :show-scale="index === displayRows.length - 1"
      />
    </div>

    <slot />
  </div>
</template>

<script>
import UiProgressRow from "./UiProgressRow.vue";

export default {
  components: {
    UiProgressRow,
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
    companyLabel: {
      type: String,
      default: "Sua Empresa",
    },
    generalLabel: {
      type: String,
      default: "Média Geral",
    },
    companyValue: {
      type: [Number, String],
      default: NaN,
    },
    generalValue: {
      type: [Number, String],
      default: NaN,
    },
    compareRows: {
      type: Array,
      default: () => [],
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
    clickable: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    displayRows() {
      const rows = [];

      if (this.compareRows.length > 0) {
        this.compareRows.forEach((row) => {
          rows.push({
            label: row.label,
            subtitle: row.subtitle || "",
            value: row.value,
            insufficient: row.insufficient || false,
          });
        });
      } else {
        rows.push({
          label: this.companyLabel,
          value: this.companyValue,
          insufficient: this.lessThanFive,
        });
      }

      rows.push({
        label: this.generalLabel,
        value: this.generalValue,
        insufficient: false,
      });

      return rows;
    },
  },
  methods: {
    handleCardClick() {
      if (!this.clickable) {
        return;
      }

      this.$emit("toggle");
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
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.rh-metric-card--clickable {
  cursor: pointer;

  &:hover {
    border-color: #c9e8dc;
    box-shadow: 0 4px 16px rgba(21, 170, 124, 0.08);
  }
}

.rh-metric-card--expanded {
  border-color: #15aa7c;
  box-shadow: 0 6px 20px rgba(21, 170, 124, 0.12);
}

.rh-metric-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.rh-metric-card__actions {
  display: flex;
  align-items: center;
  gap: 4px;
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
