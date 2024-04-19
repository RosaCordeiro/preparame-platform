<template>
  <div class="chart-row-one-emoji">
    <h1>{{ title }}</h1>

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

        <p>{{ isNaN(data) ? "N/A" : data }}</p>

        <div class="emoji">
          <img
            v-if="icon"
            :src="getIcon(icon)"
            alt="before"
            width="24"
            height="24"
          />

          <img
            v-else-if="data >= intersectionValue"
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
    width: {
      type: String,
      default: "50%",
    },
    data: {
      type: Number,
      required: true,
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
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 100,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  methods: {
    getIcon(icon) {
      return require(`../../../../assets/icons/${icon}.png`);
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
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: rgba(91, 91, 91, 1);
}

.chart__row-one-emoji {
  height: 19px;
  border-radius: 71px;
  background-color: rgba(120, 120, 120, 1);
  position: relative;
}

.chart__row-one-emoji-scale {
  height: 19px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
  margin-top: 3px;
}

.chart__row-one-emoji__value {
  height: 100%;
  border-radius: 10px;
}

.chart__row-one-emoji p {
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

.chart__row-one-emoji .emoji {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(45%, -8%);
}
</style>
