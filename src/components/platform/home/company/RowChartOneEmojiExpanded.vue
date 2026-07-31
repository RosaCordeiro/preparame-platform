<template>
  <div class="chart-row-one-emoji-expanded">
    <h1>{{ title }}</h1>

    <div>
      <div class="chart__row-one-emoji-expanded">
        <div
          class="chart__row-one-emoji-expanded__value"
          :style="`width: ${
            isNaN(data) ? 0 : ((data - minValue) * 100) / (maxValue - minValue)
          }%;
          }; background: ${barGradient}`"
        ></div>

        <p>{{ displayValue }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 100,
    },
    data: {
      type: Number,
      required: true,
    },
    intersectionValue: {
      type: Number,
      default: 98,
    },
    invertedColors: {
      type: Boolean,
      default: false,
    },
    insufficientSample: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isPositive() {
      if (this.invertedColors) {
        return this.data <= this.intersectionValue;
      }

      return this.data >= this.intersectionValue;
    },
    barGradient() {
      const positive = "linear-gradient(90deg, #b8e8d8 0%, #8fd9c0 100%)";
      const negative = "linear-gradient(90deg, #f8caca 0%, #f4a5a5 100%)";

      if (this.data >= this.intersectionValue) {
        return this.invertedColors ? negative : positive;
      }

      return this.invertedColors ? positive : negative;
    },
    displayValue() {
      if (this.insufficientSample) {
        return "Informação insuficiente";
      }

      return isNaN(this.data) ? "Sem informações" : `${this.data}%`;
    },
  },
};
</script>

<style>
.chart-row-one-emoji-expanded {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chart-row-one-emoji-expanded h1 {
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 0.9375rem;
  line-height: 1.2;
  color: #1a2744;
}

.chart__row-one-emoji-expanded {
  height: 36px;
  width: 100%;
  border-radius: 10px;
  background-color: #eef1f5;
  position: relative;
}

.chart__row-one-emoji-expanded__value {
  height: 100%;
  border-radius: 10px;
}

.chart__row-one-emoji-expanded p {
  color: #1a2744;
  margin: 0;
  font-size: 0.875rem;
  font-family: "Nunito", sans-serif;
  font-weight: 800;
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
