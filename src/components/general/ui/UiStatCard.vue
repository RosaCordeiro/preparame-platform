<template>
  <UiSectionCard
    :title="title"
    :subtitle="subtitle"
    :info-label="infoLabel"
    @info="$emit('info', $event)"
  >
    <div class="rh-stat-card__grid">
      <div class="rh-stat-card__item">
        <span class="rh-stat-card__item-label">{{ companyLabel }}</span>
        <span
          class="rh-stat-card__item-value"
          :class="{ 'rh-stat-card__item-value--muted': insufficient }"
        >
          {{ displayCompanyValue }}
        </span>
      </div>

      <div v-if="hasGeneral" class="rh-stat-card__item rh-stat-card__item--muted">
        <span class="rh-stat-card__item-label">{{ generalLabel }}</span>
        <span class="rh-stat-card__item-value">{{ displayGeneralValue }}</span>
      </div>
    </div>
  </UiSectionCard>
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
    insufficient: {
      type: Boolean,
      default: false,
    },
    suffix: {
      type: String,
      default: "",
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
    displayCompanyValue() {
      if (this.insufficient) {
        return "Informação insuficiente";
      }

      if (this.companyValue === "" || this.companyValue === null) {
        return "N/A";
      }

      return `${this.companyValue}${this.suffix}`;
    },
    displayGeneralValue() {
      if (this.generalValue === "" || this.generalValue === null) {
        return "N/A";
      }

      return `${this.generalValue}${this.suffix}`;
    },
  },
};
</script>

<style lang="scss" scoped>
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

.rh-stat-card__item-label {
  font-family: "Nunito", sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #667998;
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
