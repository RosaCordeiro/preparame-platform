<template>
  <q-card class="home-company-realocated-card q-ma-md">
    <div class="home-company-realocated-card-header">
      <div class="home-company-realocated-card-info-container">
        <q-card-section class="home-company-realocated-card-title"
          >NPS</q-card-section
        >
        <q-card-section class="home-company-realocated-card-realocated">{{
          nps
        }}</q-card-section>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  props: ["nps"],
  data() {
    return {
      npsPercent: 0,
    };
  },
  mounted() {
    this.npsPercent = (this.nps * 10).toFixed(2);
  },
};
</script>

<style lang="scss">
.home-company-nps-card {
  width: 18vw;
  height: 20vh;
  border-radius: 15%;
  box-shadow: none;
}

.home-company-nps-card-header {
  height: 16vh;
}

.home-company-nps-card-info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 100%;
}

.home-company-nps-card-title {
  display: flex;
  justify-content: center;
  align-content: center;
  vertical-align: center;
  color: $text-dark-grey;
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
  line-height: 1.2rem;
  height: 4rem;
}

.home-company-nps-card-nps {
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

.home-company-nps-card-bar-container {
  padding: 0;
}

.home-company-nps-card-indicator {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.home-company-nps-card-progress-bar-container {
  height: 10px !important;
  background: $background-grey;
  position: relative;
  border-radius: 5px;
}

.home-company-nps-card-progress-bar-indicator {
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  -webkit-mask: linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0);
}

.home-company-nps-card-progress-bar-indicator::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
    to right,
    #e5405e 0%,
    #ffdb3a 45%,
    rgb(0, 170, 0) 100%
  );
}

@media (orientation: portrait) {
  .home-company-nps-card {
    width: 90vw;
    height: 20vh;
  }
}
</style>
