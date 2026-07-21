<template>
  <div class="chart-row">
    <h1>{{ title }}</h1>

    <div>
      <div class="chart__row">
        <div
          class="chart__row__value"
          :style="`width: ${
            isNaN(data) ? 0 : ((data - minValue) * 100) / (maxValue - minValue)
          }%;
          }; background: ${barGradient}`"
        ></div>

        <p v-if="!insufficientSample">{{ isNaN(data) ? "Sem informações" : data }}</p>
        <p v-else>Sem informações</p>
      </div>

      <div class="chart__row-scale">
        <p>
          {{ minValue }}
        </p>
        <p>{{ maxValue }}</p>
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
      default: 10,
    },
    invertedIcons: {
      type: Boolean,
      default: false,
    },
    intersectionValue: {
      type: Number,
      default: 5,
    },
    invertedColors: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Number,
      required: true,
    },
    insufficientSample: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isPositive() {
      return this.data >= this.intersectionValue;
    },
    barGradient() {
      const positive = "linear-gradient(90deg, #b8e8d8 0%, #8fd9c0 100%)";
      const negative = "linear-gradient(90deg, #f8caca 0%, #f4a5a5 100%)";

      if (this.isPositive) {
        return this.invertedColors ? negative : positive;
      }

      return this.invertedColors ? positive : negative;
    },
  },
};
</script>

<style>
.chart-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chart-row h1 {
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: rgba(91, 91, 91, 1);
}

.chart__row {
  height: 19px;
  width: 100%;
  border-radius: 71px;
  background-color: #eef1f5;
  position: relative;
}

.chart__row-scale {
  height: 19px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
}

.chart__row-scale p {
  min-width: 25px;
  display: flex;
  justify-content: center;
}

.chart__row__value {
  height: 100%;
  border-radius: 10px;
}

.chart__row p {
  color: #1a2744;
  margin: 0;
  font-size: 12px;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  position: absolute;
  top: 0;
  right: 8px;
  width: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
