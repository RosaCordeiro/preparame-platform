<template>
  <div class="row user-card q-mx-lg q-mb-md">
    <q-card class="row col-12 user-card-container q-py-md">
      <q-card-section class="col-12 user-card-profile-level-info">
        <q-banner
          v-if="!surveyAnswered"
          rounded
          class="q-ma-sm text-white bg-prepara-me-blue"
        >
          <div class="user-card-banner-content row">
            <q-btn
              flat
              color="white"
              label="Avalie sua antiga empresa"
              class="col-12"
              @click="goUrl(`survey`)"
            />
          </div>
        </q-banner>

        <q-banner
          rounded
          class="q-ma-sm text-white bg-prepara-me-pink"
          v-if="this.productsSchedulables.length > 0"
        >
          <div class="user-card-banner-content row">
            <q-btn
              flat
              color="white"
              label="PREENCHA SEUS OBJETIVOS PROFISSIONAIS"
              class="col-12"
              @click="goBlank(`https://forms.gle/jy5ymxH7X6j7Lr5Z7`)"
            />
          </div>
        </q-banner>

        <q-banner
          rounded
          class="q-ma-sm text-white"
          style="background-color: #15aa7c"
          v-if="
            userId !== '757a3d7b-d07a-4971-ab36-d4714d955e9a' &&
            userId !== '3b41ceb9-9466-42a4-b043-2e819194979c'
          "
        >
          <div class="user-card-banner-content row">
            <q-btn
              flat
              color="white"
              label="CALENDÁRIO DE MENTORIAS COLETIVAS"
              class="col-12"
              @click="$emit('open-mentoring-calendar')"
            />
          </div>
        </q-banner>

        <q-banner
          v-if="simulator"
          rounded
          class="q-ma-sm text-white bg-prepara-me"
        >
          <div class="user-card-banner-content row">
            <q-btn
              flat
              color="white"
              label="Usar Simulador de Entrevistas"
              class="col-12"
              @click="goUrl(`interviewSimulatorPresentation`)"
            />
          </div>
        </q-banner>

        <q-banner
          rounded
          :class="{
            'q-ma-sm': true,
            'text-white': true,
            'bg-green': product.scheduled,
            'bg-prepara-me': !product.scheduled,
          }"
          v-for="(product, index) in productsSchedulables"
          :key="index"
        >
          <div class="user-card-banner-content row">
            <q-btn
              v-if="!product.scheduled"
              flat
              color="white"
              :label="`Agendar ${product.name}`"
              class="col-12 tooltip"
              @click="goUrl(`products/schedule/${product.id}`)"
            >
              <span
                class="tooltiptext"
                v-if="product.name === 'Orientação de Carreira'"
                ><img src="~assets/imgs/orientacao.png" alt=""
              /></span>
            </q-btn>
            <div v-else class="text-uppercase text-center text-weight-medium">
              Agendamento {{ product.name }} realizado
            </div>

            <div class="badge">
              {{ product.availableQuantity * 1 }}
            </div>
          </div>
        </q-banner>

        <q-banner rounded class="q-ma-sm text-white bg-prepara-me-blue">
          <div class="user-card-banner-content row">
            <q-btn
              flat
              color="white"
              label="Conheça outros serviços"
              class="col-12"
              @click="goUrl(`productList`)"
            />
          </div>
        </q-banner>

        <q-banner
          rounded
          class="q-ma-sm text-white"
          style="background-color: #667998"
        >
          <div class="user-card-banner-content row">
            <q-btn
              flat
              color="white"
              label="GOSTARIA DE TROCAR ALGUM DOS SEUS SERVIÇOS? CLIQUE AQUI!"
              class="col-12"
              @click="goUrl(`mentoring/update`)"
            />
          </div>
        </q-banner>

        <section
          class="section__companyName"
          v-if="
            companyNameSignIn !== '' &&
            companyNameSignIn !== null &&
            companyNameSignIn !== 'null'
          "
        >
          <p>Mentoria Coletiva é um patrocínio da:</p>
          <img :src="companyNameSignInLogo" alt="" />
        </section>

        <q-banner
          v-if="!laborRiskAlert && companyId != 'null'"
          rounded
          class="q-ma-sm text-white bg-negative"
        >
          <div class="user-card-banner-content row">
            <q-btn
              flat
              color="white"
              label="Preciso de ajuda com pendências trabalhistas"
              class="col-12"
              @click="laborRiskAlertDialog = true"
            />
          </div>
        </q-banner>
        <div class="terms row q-pa-sm">
          Ver
          <a @click="goUrl('PrivacyTerms')">Políticas de Privacidade</a>
          e
          <a @click="goUrl('useTerms')">Termo de uso</a>
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="laborRiskAlertDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="row q-mt-sm">
            <div class="crud-title">
              Ao clicar em confirmar, entraremos em contato para esclarecer
              melhor suas pendências ou dúvidas trabalhistas com sua última
              empresa.
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn label="Cancelar" color="negative" v-close-popup />
          <q-btn
            label="Confirmar"
            color="primary"
            @click="laborRiskAlertUpdate()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { saveCrud } from "./../../../general/crud/utils/saveCrud.js";

export default {
  props: ["products", "interviewSimulator"],
  data() {
    return {
      userAvatarUrl: "",
      userName: "",
      surveyAnswered: false,
      laborRiskAlertDialog: false,
      showExchange: false,
      laborRiskAlert: false,
      simulator: false,
      productsSchedulables: [],
      companyId: "",
      userId: "",
      companyNameSignIn: "",
      companyNameSignInLogo: "",
    };
  },
  created() {
    this.userAvatarUrl = localStorage.getItem("userAvatarUrl");
    this.userName = localStorage.getItem("userName");
    this.companyId = localStorage.getItem("companyId");
    this.userId = localStorage.getItem("userId");
    this.companyNameSignIn = localStorage.getItem("companyNameSignIn");
    this.companyNameSignInLogo = localStorage.getItem("companyNameSignInLogo");
  },
  mounted() {
    console.log(this.products);

    this.productsSchedulables = this.products.filter((product) => {
      return product.type === "SCHEDULED";
    });

    this.surveyAnswered =
      localStorage.getItem("surveyAnswered") == "true" ? true : false;

    this.laborRiskAlert =
      localStorage.getItem("laborRiskAlert") == "ALERT" ? true : false;
  },
  methods: {
    goUrl: function (url) {
      this.$router.push({ path: `/${url}` });
      this.$emit("close-mentoring-calendar");
    },
    goBlank: function (url) {
      window.open(url, "_blank");
    },
    laborRiskAlertUpdate: async function () {
      const userUpdate = {
        laborRiskAlert: "ALERT",
      };

      const userUpdated = await saveCrud(
        "users/updateLaborRiskAlert",
        userUpdate,
        "put"
      );

      if (userUpdated.status == 204) {
        localStorage.setItem("laborRiskAlert", "ALERT");

        this.$q.notify({
          type: "success",
          message: "Conversa sobre conciliação solicitada.",
        });

        this.laborRiskAlert = true;
      }
    },
  },
};
</script>

<style lang="scss">
.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 400px;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 100;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.tooltiptext img {
  width: 100%;
}

.user-card-container {
  border-radius: 15px;
}

.user-card-picture {
  height: 10vh;
}

.user-card-picture > img {
  height: 10vh;
  border-radius: 50%;
}

.user-card-name {
  font-weight: 700;
  font-size: 1.5rem;
}

.user-card-access-profile {
  cursor: pointer;
}

.user-card-profile-level-label {
  font-weight: 200;
  font-size: 1rem;
  text-align: center;
}

.user-card-header.q-card__section--vert {
  padding: 16px 16px 0 16px;
}

.user-card-profile-level-info.q-card__section--vert {
  padding: 0 16px;
}

.user-card-profile-level-progress-percent {
  text-align: center;
}

.user-card-profile-level-progress-percent {
  line-height: 20px;
}

.user-card-profile-level-info {
  width: 100%;
}

.user-card-charts-profile-complete {
  height: auto;
}

.user-card-charts-profile-complete-chart {
  border-radius: 5px;
}

.echarts {
  width: 100%;
  height: 100%;
}

.user-card-charts-profile-complete-chart-title {
  display: flex;
  align-items: center;
  text-align: center;
  padding: 10px 5px;
  font-weight: 600;
  font-size: 0.9rem;
  color: $back-dis;
}

.section__companyName {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
}

.section__companyName > p {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
  max-width: 250px;
}

.section__companyName > img {
  width: 100%;
  max-width: 250px;
}

.terms {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.terms a {
  color: #667998;
  cursor: pointer;
  margin-left: 3px;
  margin-right: 3px;
}

.user-card-banner-content {
  position: relative;
}

.badge {
  position: absolute;
  top: -4px;
  right: -12px;
  border-radius: 50%;
  background-color: #fff;
  color: #1a27b7;
  font-size: 0.7rem;
  padding: 5px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  z-index: 100;
}
</style>
