<template>
  <div class="interview-simulator-presentation">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <q-card
      :class="{ 'interview-simulator-presentation-header': true, row: true }"
    >
      <q-card-section
        v-if="expired"
        class="interview-simulator-presentation-header-warning bg-negative text-white col-12"
      >
        <div>
          O uso do Simulador de Entrevista está expirado. Caso necessite
          contrate mais dias para continuar seu uso.
        </div>
      </q-card-section>
      <q-card-section
        v-else-if="expiring"
        class="interview-simulator-presentation-header-warning bg-prepara-me-expiring text-white col-12"
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
      </q-card-section>
      <q-card-section class="row">
        <div
          v-if="!expired"
          :class="{
            'interview-simulator-presentation-header-info': true,
            'col-8': !mobile,
          }"
        >
          <div
            :class="{ 'interview-simulator-presentation-header-title': true }"
          >
            COMECE UMA SIMULAÇÃO DE ENTREVISTA
          </div>
          <div
            :class="{ 'interview-simulator-presentation-header-text': true }"
          >
            Inicie uma videochamada de 50 minutos para
            <b>simular uma entrevista de emprego</b> com nossa inteligência
            artificial. Iremos te orientar ao longo de todo processo para que
            você se sinta seguro e confiante para avançar as etapas da
            entrevista!
          </div>
          <q-btn
            v-if="!expired"
            flat
            label="COMEÇAR"
            v-close-popup
            @click="goURL()"
            :class="{ 'interview-simulator-presentation-header-btn': true }"
          />
        </div>
        <div
          v-else
          :class="{ 'interview-simulator-presentation-header-title': true }"
        >
          OPS, PARECE QUE VOCÊ NÃO TEM ACESSO A ESSE PRODUTO. CASO TENHA ALGUM
          PROBLEMA FAVOR ENTRAR EM CONTATO.
        </div>
        <div
          v-if="!mobile && !expired"
          :class="{
            'interview-simulator-presentation-header-img': true,
            'col-4': !mobile,
          }"
        ></div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Breadcrumbs from "../../general/Breacrumbs.vue";

export default {
  data() {
    return {
      mobile: false,
      daysToExpirePeriodTest: 0,
      daysToExpireUse: 0,
      expiring: false,
      expired: false,
      breadcrumbs: [
        {
          title: "Apresentação do Simulador de Entrevistas",
          to: "",
        },
      ],
    };
  },
  components: {
    Breadcrumbs,
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
    goURL() {
      this.$router.push({ path: `/${"interviewSimulator"}` });
    },
  },
};
</script>

<style lang="scss">
.interview-simulator-presentation {
  height: 94vh;
}

.interview-simulator-presentation-header {
  position: relative;
  width: 96vw;
  height: 50vh;
  background: linear-gradient(90deg, #dfe1f3 0%, #f6e9f2 100%);
  margin: 0 auto 0 auto;
  top: 3vh;
  border-radius: 5px;
  padding: 0 0;
  display: flex;
  flex-direction: row;
}

.interview-simulator-presentation-header-warning {
  height: 40px;
  display: flex;
  align-items: center;
}

.interview-simulator-presentation-header-title {
  background: linear-gradient(90deg, #1a27b7 0%, #ff4690 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2rem;
  font-weight: 700;
  margin-left: 2vw;
  margin-top: 3vh;
  margin-right: auto;
}

.interview-simulator-presentation-header-text {
  color: $text-dark-grey;
  font-size: 1rem;
  font-weight: 400;
  margin-left: 2vw;
  margin-top: 1vh;
  margin-right: auto;
}

.interview-simulator-presentation-header-btn {
  margin-top: 2vh;
  margin-left: 2vw;
  height: 50px;
  width: 250px;
  background-color: $prepara-me-blue;
  border-radius: 5px;
  color: $text-white;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.interview-simulator-presentation-header-img {
  position: relative;
  background-image: url("../../../assets/imgs/mentorshipGirl.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: 40%;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

@media (orientation: portrait) {
  .interview-simulator-presentation-header {
    height: 40vh;
    width: 94%;
  }

  .interview-simulator-presentation-header-title {
    font-size: 1.3rem;
    margin-left: 1vw;
    margin-top: 1vh;
  }

  .interview-simulator-presentation-header-text {
    font-size: 0.8rem;
    margin-left: 1vw;
    margin-top: 1vh;
  }

  .interview-simulator-presentation-header-btn {
    height: 40px;
    width: 150px;
    font-size: 0.8rem;
  }
}
</style>
