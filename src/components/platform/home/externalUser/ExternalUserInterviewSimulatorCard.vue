<template>
  <div class="q-pa-md">
    <div
      v-if="expired"
      class="bg-negative text-white q-pa-sm q-mb-sm rounded-borders"
    >
      O uso do Simulador de Entrevista está expirado. Caso necessite contrate
      mais dias para continuar seu uso.
    </div>
    <div
      v-else-if="expiring"
      class="bg-prepara-me-expiring text-white q-pa-sm q-mb-sm rounded-borders"
    >
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

    <div class="home-user-tool-title">Simulador de entrevista</div>
    <div class="row items-start">
      <div class="col home-user-tool-body">
        Simule uma entrevista com perguntas reais que você encontrará em suas
        próximas entrevistas.
        <div class="text-weight-bold q-mt-sm">
          Perca o medo e aumente sua confiança!
        </div>
        <div class="q-mt-md">
          <q-btn
            color="secondary"
            label="Acessar simulador"
            no-caps
            unelevated
            @click="goURL()"
            :disable="expired"
          />
        </div>
      </div>
      <img
        class="home-user-tool-img col-auto"
        src="./../../../../assets/imgs/mentorshipGirl.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { saveCrud } from "../../../../components/general/crud/utils/saveCrud";

export default {
  data() {
    return {
      daysToExpireUse: 0,
      daysToExpirePeriodTest: 0,
      expiring: false,
      expired: false,
    };
  },
  mounted() {
    this.daysToExpirePeriodTest =
      ((new Date() - new Date(localStorage.getItem("periodTest"))) /
        1000 /
        60 /
        60 /
        24) *
      -1;

    this.daysToExpireUse =
      ((new Date() - new Date(localStorage.getItem("expiresDate"))) /
        1000 /
        60 /
        60 /
        24) *
      -1;

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
      this.$router.push({ path: `/interviewSimulator` });
      saveCrud("clicks", {
        name: "Simulador de entrevistas",
      });
    },
  },
};
</script>
