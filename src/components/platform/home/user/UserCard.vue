<template>
  <div class="row user-card q-mx-lg q-mb-md">
    <q-card class="row col-12 user-card-container q-py-md">
      <q-card-section class="col-12 user-card-profile-level-info">
        <q-banner
          v-if="!surveyAnswered && !isRetirementPlanProp"
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
          v-if="
            !laborRiskAlert && companyId != 'null' && !isRetirementPlanFinal
          "
          rounded
          class="q-ma-sm text-white bg-negative"
        >
          <div class="user-card-banner-content row">
            <q-btn
              flat
              color="white"
              label="Tenho dúvidas sobre meu encerramento de contrato"
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
  props: ["products", "interviewSimulator", "isRetirementPlan"],
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

      planId: null,
      planName: null,
      RETIREMENT_PLAN_ID: "491e313c-a9cc-4806-9a88-8b122e212b3d",
      RETIREMENT_PLAN_NAME: "Pacote Acompanha (Aposentadoria)",
    };
  },
  created() {
    this.userAvatarUrl = localStorage.getItem("userAvatarUrl");
    this.userName = localStorage.getItem("userName");
    this.companyId = localStorage.getItem("companyId");
    this.userId = localStorage.getItem("userId");
    this.companyNameSignIn = localStorage.getItem("companyNameSignIn");
    this.companyNameSignInLogo = localStorage.getItem("companyNameSignInLogo");

    this.extractPlanInfoFromLocalStorage();
  },
  mounted() {
    console.log(this.products);

    this.productsSchedulables = Array.isArray(this.products)
      ? this.products.filter((product) => product.type === "SCHEDULED")
      : [];

    this.surveyAnswered = localStorage.getItem("surveyAnswered") == "true";
    this.laborRiskAlert = localStorage.getItem("laborRiskAlert") == "ALERT";

    this.extractPlanInfoFromLocalStorage();

    window.addEventListener("storage", this.onStorageChange);
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.onStorageChange);
  },
  computed: {
    isRetirementPlanProp() {
      if (this.isRetirementPlan === true) return true;
      if (this.isRetirementPlan === false) return false;
      if (typeof this.isRetirementPlan === "string") {
        return this.isRetirementPlan === "true";
      }
      return false;
    },

    isRetirementPlanComputed() {
      if (this.planId && this.planId === this.RETIREMENT_PLAN_ID) return true;

      if (this.planName) {
        const nm = String(this.planName).toLowerCase();
        if (
          nm === this.RETIREMENT_PLAN_NAME.toLowerCase() ||
          nm.includes("acompanha") ||
          nm.includes("aposentadoria")
        ) {
          return true;
        }
      }
      return false;
    },

    isRetirementPlanFinal() {
      const finalVal =
        this.isRetirementPlanProp || this.isRetirementPlanComputed;
      if (!this.isRetirementPlanProp && !this.planId && !this.planName) {
        console.warn(
          "[user-card] sem dados de plan detectados localmente e prop isRetirementPlan não foi informada. Banner seguirá visível por padrão."
        );
      }
      console.info("[user-card] plano detectado (final):", finalVal, {
        prop: this.isRetirementPlanProp,
        planId: this.planId,
        planName: this.planName,
      });
      return finalVal;
    },
  },
  methods: {
    goUrl: function (url) {
      this.$router.push({ path: `/${url}` });
      this.$emit("close-mentoring-calendar");
    },
    goBlank: function (url) {
      window.open(url, "_blank");
    },

    onStorageChange(e) {
      if (!e) return;
      if (
        e.key === "planId" ||
        e.key === "plan" ||
        e.key === "user" ||
        e.key === "userData" ||
        e.key === "loggedUser"
      ) {
        this.extractPlanInfoFromLocalStorage();
      }
    },

    extractPlanInfoFromLocalStorage() {
      const possibleKeys = [
        "planId",
        "plan",
        "user",
        "userData",
        "loggedUser",
        "currentUser",
      ];

      let foundId = null;
      let foundName = null;

      for (const key of possibleKeys) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;

        let parsed = null;
        try {
          parsed = JSON.parse(raw);
        } catch (err) {
          parsed = raw;
        }

        if (parsed && typeof parsed === "object") {
          if (parsed.planId) {
            if (typeof parsed.planId === "object") {
              if (parsed.planId.id) foundId = parsed.planId.id;
              if (parsed.planId.name) foundName = parsed.planId.name;
            } else if (typeof parsed.planId === "string") {
              try {
                const p = JSON.parse(parsed.planId);
                if (p && p.id) foundId = p.id;
                if (p && p.name) foundName = p.name;
              } catch (e) {
                foundId = parsed.planId;
              }
            }
          }
          if (parsed.plan) {
            if (typeof parsed.plan === "string") foundName = parsed.plan;
            else if (typeof parsed.plan === "object") {
              if (parsed.plan.id) foundId = parsed.plan.id;
              if (parsed.plan.name) foundName = parsed.plan.name;
            }
          }

          if (parsed.id && parsed.name && !foundId) {
            foundId = parsed.id;
            foundName = parsed.name;
          }
        } else if (typeof parsed === "string") {
          if (parsed.includes("-") && parsed.length >= 30) foundId = parsed;
          else foundName = parsed;
        }

        if (foundId || foundName) break;
      }

      this.planId = foundId;
      this.planName = foundName;

      console.info("[user-card] plan info extraída:", {
        planId: this.planId,
        planName: this.planName,
      });
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

      if (userUpdated && userUpdated.status == 204) {
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
