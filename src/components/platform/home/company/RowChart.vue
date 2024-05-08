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
          }; background: ${
            data >= intersectionValue
              ? invertedColors
                ? 'linear-gradient(180deg, #5C31AC 0%, #B73D9D 100%);'
                : 'linear-gradient(180deg, #5C31AC 0%, #16AB7D 100%);'
              : invertedColors
              ? 'linear-gradient(180deg, #5C31AC 0%, #16AB7D 100%);'
              : 'linear-gradient(180deg, #5C31AC 0%, #B73D9D 100%);'
          }`"
        ></div>

        <p v-if="!lessThanFive">{{ isNaN(data) ? "N/A" : data }}</p>
        <p v-else>Sem informações suficientes</p>

        <div class="first-emoji">
          <img
            v-if="invertedIcons"
            src="../../../../assets/icons/alegre.png"
            alt="before"
            width="24"
            height="24"
          />
          <img
            v-else
            src="../../../../assets/icons/triste.png"
            alt="before"
            width="24"
            height="24"
          />
        </div>

        <div class="last-emoji">
          <img
            v-if="invertedIcons"
            src="../../../../assets/icons/triste.png"
            alt="before"
            width="24"
            height="24"
          />
          <img
            v-else
            src="../../../../assets/icons/alegre.png"
            alt="before"
            width="24"
            height="24"
          />
        </div>
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
  data() {
    return {
      beforeIcon: "../../../../assets/icons/triste.png",
      afterIcon: "../../../../assets/icons/alegre.png",
    };
  },
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
    lessThanFive: {
      type: Boolean,
      default: false,
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
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: rgba(91, 91, 91, 1);
}

.chart__row {
  height: 19px;
  width: 70%;
  border-radius: 71px;
  background-color: rgba(120, 120, 120, 1);
  position: relative;
}

.chart__row-scale {
  height: 19px;
  width: 70%;
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
  color: #fff;
  margin: 0;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.first-emoji,
.last-emoji {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(0%, -10%);
}

.first-emoji {
  left: 0;
  top: 0;
}

.last-emoji {
  right: 0;
  top: 0;
}
</style>
