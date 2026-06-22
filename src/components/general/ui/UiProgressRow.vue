<template>
  <div class="rh-progress-row" :class="`rh-progress-row--${size}`">
    <div v-if="label || subtitle" class="rh-progress-row__label-row">
      <div class="rh-progress-row__label-wrap">
        <span v-if="label" class="rh-progress-row__label">{{ label }}</span>
        <span v-if="subtitle" class="rh-progress-row__subtitle">{{ subtitle }}</span>
      </div>
      <span
        v-if="showHeadValue"
        class="rh-progress-row__head-value"
        :class="valueToneClass"
      >
        {{ formattedValue }}
      </span>
    </div>

    <div class="rh-progress-row__track">
      <div
        class="rh-progress-row__fill"
        :class="fillToneClass"
        :style="{ width: `${percentage}%` }"
      >
        <span
          v-if="percentage >= 18 && !insufficient"
          class="rh-progress-row__value-in"
        >
          {{ formattedValue }}
        </span>
      </div>
      <span
        v-if="percentage < 18 || insufficient"
        class="rh-progress-row__value-out"
        :class="valueToneClass"
      >
        {{ formattedValue }}
      </span>
    </div>

    <div v-if="showScale" class="rh-progress-row__scale">
      <span>{{ minValue }}</span>
      <span>{{ maxValue }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    value: {
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
    insufficient: {
      type: Boolean,
      default: false,
    },
    suffix: {
      type: String,
      default: "",
    },
    showScale: {
      type: Boolean,
      default: false,
    },
    showHeadValue: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "md",
    },
  },
  computed: {
    numericValue() {
      if (this.value === null || this.value === undefined || this.value === "") {
        return NaN;
      }

      return Number(
        String(this.value)
          .replace("%", "")
          .replace(",", ".")
          .trim()
      );
    },
    isGood() {
      if (isNaN(this.numericValue)) {
        return false;
      }

      if (this.invertedColors) {
        return this.numericValue <= this.intersectionValue;
      }

      return this.numericValue >= this.intersectionValue;
    },
    percentage() {
      if (this.insufficient) {
        return 0;
      }

      if (isNaN(this.numericValue)) {
        return 0;
      }

      const range = this.maxValue - this.minValue;

      if (range === 0) {
        return 0;
      }

      return Math.min(
        100,
        Math.max(0, ((this.numericValue - this.minValue) / range) * 100)
      );
    },
    formattedValue() {
      if (this.insufficient) {
        return "Informação insuficiente";
      }

      if (isNaN(this.numericValue)) {
        return "N/A";
      }

      return `${this.numericValue}${this.suffix}`;
    },
    valueToneClass() {
      if (this.insufficient) {
        return "rh-progress-row__value--muted";
      }

      return this.isGood
        ? "rh-progress-row__value--good"
        : "rh-progress-row__value--bad";
    },
    fillToneClass() {
      if (this.insufficient) {
        return "rh-progress-row__fill--muted";
      }

      return this.isGood
        ? "rh-progress-row__fill--good"
        : "rh-progress-row__fill--bad";
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-progress-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rh-progress-row__label-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.rh-progress-row__label-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.rh-progress-row__subtitle {
  font-family: "Nunito", sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #99a5b8;
  line-height: 1.3;
}

.rh-progress-row__label {
  font-family: "Nunito", sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #4a5872;
  line-height: 1.35;
}

.rh-progress-row--sm .rh-progress-row__label {
  font-size: 0.75rem;
}

.rh-progress-row__head-value {
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-weight: 800;
  flex-shrink: 0;
}

.rh-progress-row__track {
  position: relative;
  width: 100%;
  height: 28px;
  border-radius: 999px;
  background: #eef1f5;
  overflow: hidden;
}

.rh-progress-row--sm .rh-progress-row__track {
  height: 22px;
}

.rh-progress-row__fill {
  height: 100%;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  min-width: 0;
  transition: width 0.35s ease;
}

.rh-progress-row__fill--good {
  background: linear-gradient(90deg, #b8e8d8 0%, #8fd9c0 100%);
}

.rh-progress-row__fill--bad {
  background: linear-gradient(90deg, #f8caca 0%, #f4a5a5 100%);
}

.rh-progress-row__fill--muted {
  background: #dde3ea;
}

.rh-progress-row__value-in {
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}

.rh-progress-row--sm .rh-progress-row__value-in {
  font-size: 0.6875rem;
}

.rh-progress-row__value-out {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  font-weight: 800;
}

.rh-progress-row__value--good {
  color: #128564;
}

.rh-progress-row__value--bad {
  color: #d64545;
}

.rh-progress-row__value--muted {
  color: #99a5b8;
  font-weight: 600;
}

.rh-progress-row__scale {
  display: flex;
  justify-content: space-between;
  font-family: "Nunito", sans-serif;
  font-size: 0.6875rem;
  color: #99a5b8;
}
</style>
