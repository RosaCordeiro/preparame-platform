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

        <p v-if="!lessThanFive">{{ isNaN(data) ? "N/A" : data + "%" }}</p>
        <p v-else>Sem informações suficientes</p>

        <div class="emoji">
          <img
            v-if="data >= intersectionValue && !invertedColors"
            src="../../../../assets/icons/alegre.png"
            alt="before"
            width="57"
            height="57"
          />
          <img
            v-else-if="data <= intersectionValue && invertedColors"
            src="../../../../assets/icons/alegre.png"
            alt="before"
            width="57"
            height="57"
          />
          <img
            v-else
            src="../../../../assets/icons/triste.png"
            alt="before"
            width="57"
            height="57"
          />
        </div>
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
    lessThanFive: {
      type: Boolean,
      default: false,
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
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: rgba(91, 91, 91, 1);
}

.chart__row-one-emoji-expanded {
  height: 50px;
  width: 50%;
  border-radius: 5px;
  background-color: rgba(120, 120, 120, 1);
  position: relative;
}

.chart__row-one-emoji-expanded-scale {
  height: 50px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
  margin-top: 3px;
}

.chart__row-one-emoji-expanded__value {
  height: 100%;
  border-radius: 5px;
}

.chart__row-one-emoji-expanded p {
  color: #fff;
  margin: 0;
  font-size: 24px;
  line-height: 50px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  position: absolute;
  left: 15px;
  top: 0;
}

.chart__row-one-emoji-expanded .emoji {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(65%, -8%);
}
</style>
