<template>
  <div class="chart-row-no-emoji">
    <h1>{{ title }}</h1>

    <div>
      <div class="chart__row-no-emoji">
        <div
          class="chart__row-no-emoji__value"
          :style="`background: linear-gradient(180deg, #5C31AC 0%, #16AB7D 100%);`"
        ></div>

        <p v-if="!lessThanFive">{{ data }}</p>
        <p v-else>Sem informações suficientes</p>
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
    data: {
      type: String,
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
.chart-row-no-emoji {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chart-row-no-emoji h1 {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: rgba(91, 91, 91, 1);
}

.chart__row-no-emoji {
  height: 43px;
  width: 50%;
  border-radius: 5px;
  background-color: rgba(120, 120, 120, 1);
  position: relative;
}

.chart__row-no-emoji-scale {
  height: 43px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
  margin-top: 3px;
}

.chart__row-no-emoji__value {
  height: 100%;
  border-radius: 10px;
}

.chart__row-no-emoji p {
  color: #fff;
  margin: 0;
  font-size: 24px;
  line-height: 43px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  position: absolute;
  left: 15px;
  top: 0;
}
</style>
