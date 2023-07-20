<template>
  <q-card class="home-company-labor-risk-card q-ma-md">
    <div class="home-company-labor-risk-card-header">
      <div class="home-company-labor-risk-card-info-container">
        <q-card-section class="home-company-labor-risk-card-title"
          >Cálculos da rescisão estão corretos?</q-card-section
        >
        <q-card-section class="home-company-labor-risk-card-nps">{{
          value
        }}</q-card-section>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  props: ["lastAnswers", "countUsers"],
  data() {
    return {
      value: 0,
    };
  },
  mounted() {
    this.value =
      (
        (this.lastAnswers.reduce((acc, curr) => {
          return acc + curr.answer;
        }, 0) /
          this.countUsers) *
        10
      ).toFixed(2) + "%";
  },
};
</script>

<style lang="scss">
.home-company-labor-risk-card {
  width: 18vw;
  height: 20vh;
  border-radius: 25px;
  box-shadow: none;
}

.home-company-labor-risk-card-header {
  height: 16vh;
}

.home-company-labor-risk-card-title {
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: center;
  color: $text-dark-grey;
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
  line-height: 1.2rem;
  height: 4rem;
}

.home-company-labor-risk-card-nps {
  background: linear-gradient(90deg, #1a27b7 0%, #ff4690 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  width: 100%;
  font-size: 3.5rem;
  text-align: center;
  padding: 0;
  letter-spacing: 0;
}

.home-company-labor-risk-card-bar-container {
  padding: 0;
}

.home-company-labor-risk-card-indicator {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.home-company-labor-risk-card-progress-bar-container {
  height: 10px !important;
  background: $background-grey;
  position: relative;
  border-radius: 5px;
}

.home-company-labor-risk-card-progress-bar-indicator {
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  -webkit-mask: linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0);
}

.home-company-labor-risk-card-progress-bar-indicator::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
    to right,
    rgb(0, 170, 0) 0%,
    #ffdb3a 45%,
    #e5405e 100%
  );
}

@media (orientation: portrait) {
  .home-company-labor-risk-card {
    width: 90vw;
    height: 20vh;
  }
}
</style>
