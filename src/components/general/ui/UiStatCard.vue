<template>
  <div
    class="rh-stat-card-wrap"
    :class="{
      'rh-stat-card-wrap--clickable': clickable,
      'rh-stat-card-wrap--expanded': expanded,
    }"
    @click="handleCardClick"
  >
    <UiSectionCard
      :title="title"
      :subtitle="subtitle"
      :info-label="infoLabel"
      @info="$emit('info', $event)"
    >
    <div class="rh-stat-card__grid">
      <div
        v-for="(row, index) in displayRows"
        :key="`${row.label}-${index}`"
        class="rh-stat-card__item"
        :class="{ 'rh-stat-card__item--muted': row.muted }"
      >
        <div class="rh-stat-card__item-head">
          <span class="rh-stat-card__item-label">{{ row.label }}</span>
          <span v-if="row.subtitle" class="rh-stat-card__item-subtitle">
            {{ row.subtitle }}
          </span>
        </div>
        <span
          class="rh-stat-card__item-value"
          :class="{ 'rh-stat-card__item-value--muted': row.insufficient }"
        >
          {{ formatValue(row) }}
        </span>
      </div>
    </div>

    <slot />
    </UiSectionCard>
  </div>
</template>

<script>
import UiSectionCard from "./UiSectionCard.vue";

export default {
  components: {
    UiSectionCard,
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
        return "Informação insuficiente";
      }

      if (
        row.value === "" ||
        row.value === null ||
        row.value === undefined ||
        (typeof row.value === "number" && Number.isNaN(row.value))
      ) {
        return "N/A";
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
.rh-stat-card-wrap--clickable {
  cursor: pointer;
}

.rh-stat-card-wrap--clickable:hover :deep(.rh-section-card) {
  border-color: #c9e8dc;
  box-shadow: 0 4px 16px rgba(21, 170, 124, 0.08);
}

.rh-stat-card-wrap--expanded :deep(.rh-section-card) {
  border-color: #15aa7c;
  box-shadow: 0 6px 20px rgba(21, 170, 124, 0.12);
}

.rh-stat-card__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.rh-stat-card__item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  background: #edf9f4;
  border: 1px solid #d4f0e8;
}

.rh-stat-card__item--muted {
  background: #f3f6fb;
  border-color: #e1e7f0;

  .rh-stat-card__item-value {
    color: #4a5872;
  }
}

.rh-stat-card__item-head {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rh-stat-card__item-label {
  font-family: "Nunito", sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #667998;
}

.rh-stat-card__item-subtitle {
  font-family: "Nunito", sans-serif;
  font-size: 0.625rem;
  font-weight: 600;
  color: #99a5b8;
  line-height: 1.3;
  text-transform: none;
  letter-spacing: normal;
}

.rh-stat-card__item-value {
  font-family: "Nunito", sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  color: #128564;
  line-height: 1;
}

.rh-stat-card__item-value--muted {
  font-size: 0.875rem;
  font-weight: 600;
  color: #99a5b8;
}
</style>
