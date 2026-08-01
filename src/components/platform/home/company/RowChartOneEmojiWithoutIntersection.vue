<template>
  <div class="chart-row-one-emoji">
    <h1
      :style="{
        fontWeight: textBold ? '700' : '400',
      }"
    >
      {{ title }}
    </h1>

    <div>
      <div
        class="chart__row-one-emoji"
        :style="{
          width: width,
        }"
      >
        <div
          class="chart__row-one-emoji__value"
          :style="`width: ${
            isNaN(data) ? 0 : ((data - minValue) * 100) / (maxValue - minValue)
          }%;
          }; background: linear-gradient(90deg, #b8e8d8 0%, #8fd9c0 100%);`"
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
    width: {
      type: String,
      default: "100%",
    },
    data: {
      type: Number,
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
    textBold: {
      type: Boolean,
      default: true,
    },
    insufficientSample: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    displayValue() {
      if (this.insufficientSample) {
        return "Informação insuficiente";
      }

      return isNaN(this.data) ? "Sem informações" : this.data;
    },
  },
};
</script>

<style>
.chart-row-one-emoji {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chart-row-one-emoji h1 {
  font-family: "Nunito", sans-serif;
  font-size: 0.9375rem;
  line-height: 1.2;
  color: #1a2744;
}

.chart__row-one-emoji {
  height: 14px;
  border-radius: 999px;
  background-color: #eef1f5;
  position: relative;
}

.chart__row-one-emoji__value {
  height: 100%;
  border-radius: 999px;
}

.chart__row-one-emoji p {
  color: #667998;
  margin: 6px 0 0;
  font-size: 0.8125rem;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
}
</style>
