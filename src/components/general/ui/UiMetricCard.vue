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
      <div class="rh-metric-card__heading">
        <h3 class="rh-metric-card__title" :title="title">{{ title }}</h3>
        <p v-if="subtitle" class="rh-metric-card__subtitle" :title="subtitle">
          {{ subtitle }}
        </p>
      </div>
      <div class="rh-metric-card__actions">
        <span v-if="comingSoon" class="rh-metric-card__soon-badge">Em breve</span>
        <q-icon
          v-if="clickable && !comingSoon"
          :name="expanded ? 'mdi-chevron-up' : 'mdi-chart-timeline-variant'"
          size="18px"
          color="grey-6"
        />
        <q-btn
          v-if="!comingSoon"
          flat
          round
          dense
          icon="mdi-information-outline"
          color="grey-6"
          @click.stop="$emit('info')"
        />
      </div>
    </div>

    <div v-if="comingSoon" class="rh-metric-card__coming-soon">
      <q-icon name="mdi-clock-outline" size="22px" color="grey-5" />
      <span>Dados em breve</span>
    </div>

    <div v-else class="rh-metric-card__rows">
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

    <slot v-if="!comingSoon" />
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
    insufficientSample: {
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
    comingSoon: {
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
          insufficient: this.insufficientSample,
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
      if (!this.clickable || this.comingSoon) {
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
  padding: 18px 20px;
  box-shadow: 0 2px 8px rgba(26, 39, 68, 0.05);
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  height: 100%;
  min-height: 268px;
  box-sizing: border-box;
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
  min-height: 268px;
}

.rh-metric-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-shrink: 0;
  min-height: 52px;
}

.rh-metric-card__heading {
  min-width: 0;
  flex: 1;
}

.rh-metric-card__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  margin-top: 1px;
}

.rh-metric-card__title {
  margin: 0;
  font-family: "Nunito", sans-serif;
  font-size: 0.9375rem;
  font-weight: 800;
  line-height: 1.25;
  color: #1a2744;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
}

.rh-metric-card__subtitle {
  margin: 4px 0 0;
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  line-height: 1.3;
  color: #667998;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
  min-height: 1.95em;
}

.rh-metric-card__rows {
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
  min-height: 0;
}

.rh-metric-card__soon-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: "Nunito", sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #667998;
  background: #f3f6fb;
  border: 1px solid #e1e7f0;
  white-space: nowrap;
}

.rh-metric-card__coming-soon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  min-height: 120px;
  border-radius: 12px;
  background: #f7f9fc;
  border: 1px dashed #d5dbe6;
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #99a5b8;
}
</style>
