<template>
  <div>
    <div v-if="expired" class="bg-negative text-white">
      <div>
        O uso do Simulador de Entrevista está expirado. Caso necessite contrate
        mais dias para continuar seu uso.
      </div>
    </div>
    <div v-else-if="expiring" class="bg-prepara-me-expiring text-white">
      <div v-if="daysToExpireUse > 0">
        {{
          `Faltam ${daysToExpireUse.toFixed(
            0
          )} dia(s) para o uso do seu Simulador de Entrevistas ser interrompido.`
        }}
      </div>
      <div v-else-if="daysToExpirePeriodTest > 0">
        {{
          `Faltam ${daysToExpirePeriodTest.toFixed(
            0
          )} dia(s) para o período de teste do seu Simulador de Entrevistas finalizar.`
        }}
      </div>
    </div>
    <div>
      <div class="q-ma-md">
        <div class="external-user-most-common-questions-card-title">
          SIMULADOR DE ENTREVISTA
        </div>
        <div class="row col-12">
          <div class="q-mt-sm col-9">
            Simule uma entrevista com perguntas reais que você encontrará em
            suas próximas entrevistas.
            <div>
              <b><br />Perca o medo e aumente sua confiança!</b>
            </div>
            <div v-if="!mobile" class="q-my-sm">
              <q-btn
                color="secondary"
                label="ACESSAR SIMULADOR"
                @click="goURL()"
              />
            </div>
            <div v-if="mobile" class="q-my-sm">
              <q-btn
                color="secondary"
                label="ACESSAR SIMULADOR"
                @click="goURL()"
              />
            </div>
          </div>
          <img
            v-if="!mobile"
            class="external-user-most-common-questions-card-img col-3"
            src="./../../../../assets/imgs/mentorshipGirl.png"
          />
          <img
            v-if="mobile"
            class="external-user-most-common-questions-card-img col-3"
            src="./../../../../assets/imgs/mentorshipGirl.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveCrud } from "../../../../components/general/crud/utils/saveCrud";

export default {
  data() {
    return {
      mobile: false,
      daysToExpireUse: 0,
      daysToExpirePeriodTest: 0,
      expiring: false,
      expired: false,
    };
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();

    this.daysToExpirePeriodTest =
      ((new Date() - new Date(localStorage.getItem("periodTest"))) /
        1000 /
        60 /
        60 /
        24) *
      -1;

    console.log(this.daysToExpirePeriodTest);

    this.daysToExpireUse =
      ((new Date() - new Date(localStorage.getItem("expiresDate"))) /
        1000 /
        60 /
        60 /
        24) *
      -1;

    console.log(this.daysToExpireUse);
    if (this.daysToExpireUse > 0) {
      this.expiring = this.daysToExpireUse < 7;
    } else if (this.daysToExpirePeriodTest > 0) {
      this.expiring = true;
    } else {
      this.expired = true;
    }
  },
  methods: {
    goURL: function () {
      this.$router.push({ path: `/interviewSimulatorPresentation` });
      saveCrud("clicks", {
        name: "Simulador de entrevistas",
      });
    },
  },
};
</script>

<style>
.external-user-interview-simulator-card-title {
  font-weight: 700;
  font-size: 1.5rem;
  font-family: "Nunito";
  font-style: normal;
  background: linear-gradient(90deg, #1a27b7 0%, #ff4690 40%);
  opacity: 1;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.external-user-interview-simulator-card-img {
  height: 100px;
}
</style>
