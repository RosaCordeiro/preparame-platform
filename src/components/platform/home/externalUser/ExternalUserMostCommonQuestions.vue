<template>
  <div
    :class="{
      'external-user-most-common-questions-card': true,
      'justify-around': true,
    }"
  >
    <q-card class="external-user-most-common-questions-card-container">
      <q-card-section v-if="expired" class="bg-negative text-white">
        <div>
          O uso do Simulador de Entrevista está expirado. Caso necessite
          contrate mais dias para continuar seu uso.
        </div>
      </q-card-section>
      <q-card-section
        v-else-if="expiring"
        class="bg-prepara-me-expiring text-white"
      >
        <div v-if="daysToExpireUse > 0">
          {{
            `Faltam ${(daysToExpireUse + 1).toFixed(
              0
            )} dia(s) para o uso do seu Simulador de Entrevistas ser interrompido.`
          }}
        </div>
        <div v-else-if="daysToExpirePeriodTest > 0">
          {{
            `Faltam ${(daysToExpirePeriodTest + 1).toFixed(
              0
            )} dia(s) para o período de teste do seu Simulador de Entrevistas finalizar.`
          }}
        </div>
      </q-card-section>

      <q-card-section class="external-user-most-common-questions-card-header">
        <div class="external-user-most-common-questions-card-info space-around">
          <div
            :class="{
              'external-user-most-common-questions-card-info-container': true,
              'q-mt-md': true,
              row: true,
            }"
          >
            <div class="col-10">
              <div class="external-user-most-common-questions-card-title">
                50 PERGUNTAS MAIS COMUNS
              </div>
              <div
                class="external-user-most-common-questions-card-info-container-msg q-mb-sm"
              >
                Baixe o e-book e descubra o que os recrutadores querem avaliar com cada uma delas.
              </div>
              <img
                v-if="mobile"
                :class="{
                  'external-user-most-common-questions-card-img': true,
                }"
                src="./../../../../assets/imgs/most_common_questions.png"
              />
              <div v-if="!mobile && !expired" class="q-mb-sm">
                <q-btn
                  color="secondary"
                  label="BAIXAR E-BOOK GRÁTIS"
                  @click="goURL()"
                />
              </div>
            </div>
            <div class="col-2">
              <img
                v-if="!mobile"
                :class="{
                  'external-user-most-common-questions-card-img': true,
                  'col-3': true,
                }"
                src="./../../../../assets/imgs/most_common_questions.png"
              />
            </div>
            <div v-if="mobile && !expired" class="q-my-md">
              <q-btn
                color="secondary"
                label="BAIXAR E-BOOK GRÁTIS"
                @click="goURL()"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
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
      this.$router.push({ path: `/` });
    },
  },
};
</script>

<style>
.external-user-most-common-questions-card {
  width: 100%;
}

.external-user-most-common-questions-card-container {
  border-radius: 15px;
}

.external-user-most-common-questions-card-title {
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

.external-user-most-common-questions-card-img {
  height: 80px;
}

.external-user-most-common-questions-card-btn-container {
  width: 100%;
  position: relative;
}

.external-user-most-common-questions-card-btn-know-more {
  height: 40px;
  margin: 10px auto;
}
</style>
