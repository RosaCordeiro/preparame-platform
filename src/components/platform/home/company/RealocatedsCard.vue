<template>
  <q-card class="home-company-realocated-card q-ma-md">
    <div class="home-company-realocated-card-header">
      <div class="home-company-realocated-card-info-container">
        <q-card-section class="home-company-realocated-card-title"
          >Realocados</q-card-section
        >
        <q-card-section class="home-company-nps-card-geral">
          -
        </q-card-section>
        <q-card-section class="home-company-nps-card-company">
          Sua empresa:
        </q-card-section>
        <q-card-section class="home-company-realocated-card-realocated" style="font-weight: bold"
          >{{ realocateds }}</q-card-section
        >
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  props: ["realocateds", "realocatedsGeneral"],
};
</script>

<style lang="scss">
.home-company-realocated-card {
  width: 18vw;
  border-radius: 25px;
  box-shadow: none;
}

.home-company-realocated-card-header {
}

.home-company-realocated-card-title {
  display: flex;
  justify-content: center;
  align-content: center;
  vertical-align: center;
  color: $text-dark-grey;
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
  line-height: 1.2rem;
}

.home-company-realocated-card-realocated {
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

.home-company-realocated-card-bar-container {
  padding: 0;
}

.home-company-realocated-card-indicator {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.home-company-realocated-card-progress-bar-container {
  height: 10px !important;
  background: $background-grey;
  position: relative;
  border-radius: 5px;
}

.home-company-realocated-card-progress-bar-indicator {
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  -webkit-mask: linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0);
}

.home-company-realocated-card-progress-bar-indicator::before {
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
  .home-company-realocated-card {
    width: 90vw;
  }
}
</style>
