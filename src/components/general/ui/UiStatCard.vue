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
      <div
        v-for="(row, index) in displayRows"
        :key="`${row.label}-${index}`"
        class="rh-metric-stat-row"
        :class="{ 'rh-metric-stat-row--muted': row.muted }"
      >
        <div class="rh-metric-stat-row__text">
          <span class="rh-metric-stat-row__label" :title="row.label">
            {{ row.label }}
          </span>
          <span
            v-if="row.subtitle"
            class="rh-metric-stat-row__subtitle"
            :title="row.subtitle"
          >
            {{ row.subtitle }}
          </span>
        </div>
        <span
          class="rh-metric-stat-row__value"
          :class="{ 'rh-metric-stat-row__value--muted': row.insufficient }"
          :title="formatValue(row)"
        >
          {{ formatValue(row) }}
        </span>
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    infoLabel: {
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
      default: "",
    },
    generalValue: {
      type: [Number, String],
      default: "",
    },
    compareRows: {
      type: Array,
      default: () => [],
    },
    insufficient: {
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
    hasGeneral() {
      return (
        this.generalValue !== "" &&
        this.generalValue !== null &&
        this.generalValue !== undefined
      );
    },
    displayRows() {
      const rows = [];

      if (this.compareRows.length > 0) {
        this.compareRows.forEach((row) => {
          rows.push({
            label: row.label,
            subtitle: row.subtitle || "",
            value: row.value,
            insufficient: row.insufficient || false,
            muted: false,
          });
        });
      } else {
        rows.push({
          label: this.companyLabel,
          value: this.companyValue,
          insufficient: this.insufficient,
          muted: false,
        });
      }

      if (this.hasGeneral) {
        rows.push({
          label: this.generalLabel,
          value: this.generalValue,
          insufficient: false,
          muted: true,
        });
      }

      return rows;
    },
  },
  methods: {
    formatValue(row) {
      if (row.insufficient) {
        return "Sem informações";
      }

      if (
        row.value === "" ||
        row.value === null ||
        row.value === undefined ||
        row.value === "N/A" ||
        row.value === "Sem informações" ||
        (typeof row.value === "number" && Number.isNaN(row.value))
      ) {
        return "Sem informações";
      }

      return `${row.value}${this.suffix}`;
    },
    handleCardClick(event) {
      if (!this.clickable) {
        return;
      }

      if (event.target.closest(".q-btn")) {
        return;
      }

      this.$emit("toggle");
    },
  },
};
</script>

<style lang="scss" scoped>
/* Mesmo shell do UiMetricCard — tamanhos alinhados no grid */
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
  gap: 10px;
  flex: 1;
  min-height: 0;
  justify-content: center;
}

.rh-metric-stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 56px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #edf9f4;
  border: 1px solid #d4f0e8;
  box-sizing: border-box;
}

.rh-metric-stat-row--muted {
  background: #f3f6fb;
  border-color: #e1e7f0;
}

.rh-metric-stat-row__text {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rh-metric-stat-row__label {
  font-family: "Nunito", sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #667998;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.rh-metric-stat-row__subtitle {
  font-family: "Nunito", sans-serif;
  font-size: 0.625rem;
  font-weight: 600;
  color: #99a5b8;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.rh-metric-stat-row__value {
  flex-shrink: 0;
  font-family: "Nunito", sans-serif;
  font-size: 1.375rem;
  font-weight: 800;
  color: #128564;
  line-height: 1;
  max-width: 45%;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rh-metric-stat-row--muted .rh-metric-stat-row__value {
  color: #4a5872;
}

.rh-metric-stat-row__value--muted {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #99a5b8;
  white-space: normal;
}
</style>
