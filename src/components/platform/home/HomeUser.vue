<template>
  <div id="q-app" class="home-external-user">
    <q-page>
      <div>
        <ExternalUserWelcomeCard
          v-if="loadUserCard && !mobile && !loadingPlanData"
          :products="products"
          :interviewSimulator="interviewSimulator"
          :isRetirementPlan="isRetirementPlan"
        />
        <ExternalUserWelcomeCardMobile
          v-else-if="loadUserCard && mobile && !loadingPlanData"
          :products="products"
          :interviewSimulator="interviewSimulator"
          :isRetirementPlan="isRetirementPlan"
        />
        <div v-if="loadingPlanData" class="skeleton-container">
          <q-skeleton height="200px" class="q-mb-md" />
        </div>
        <div :class="{ row: !mobile }">
          <UserCard
            v-if="loadUserCard"
            :class="{
              'col-3': !mobile,
              'col-12': mobile,
              'q-mb-md': mobile,
            }"
            :products="products"
            :interviewSimulator="interviewSimulator"
            :isRetirementPlan="isRetirementPlan"
            @open-mentoring-calendar="showMentoringCalendar = true"
            @close-mentoring-calendar="showMentoringCalendar = false"
          />
          <div
            :class="{
              col: true,
              'q-px-md': !mobile,
              'q-px-sm': mobile,
              'col-8': !mobile,
              'col-12': mobile,
            }"
          >
            <div
              :class="{
                'q-col-gutter-md': !mobile,
                'q-col-gutter-lg': mobile,
                'external-user-options': true,
              }"
            >
              <Schedule
                :homeType="'USER'"
                ref="schedule"
                v-if="!showMentoringCalendar"
              />
              <div v-if="showMentoringCalendar">
                <ExternalUserMentoringSchedule
                  @update-schedule="updateSchedule"
                />
              </div>
              <div
                v-else
                :class="{
                  'q-col-gutter-md': !mobile,
                  'q-col-gutter-lg': mobile,
                  'external-user-options': true,
                }"
              >
                <ExternalSurvey
                  :class="{ 'col-12': true }"
                  v-if="!surveyAnswered && !isRetirementPlan"
                />
                <div class="justify-around q-mb-sm">
                  <q-card class="row external-user-card-container q-pa-sm">
                    <ExternalUserInterviewSimulatorCard
                      :class="{
                        'col-6': !mobile,
                        'col-12': mobile,
                      }"
                    />
                    <ExternalUserMostCommonQuestions
                      :class="{
                        'col-6': !mobile,
                        'col-12': mobile,
                      }"
                    />
                  </q-card>
                </div>
                <!--  <ExternalUserKitRealocationProCard
                  v-if="!kitPro"
                <ExternalUserKitRealocationProCard
                  v-if="!kitPro && !isRetirementPlan"
                  :class="{ 'col-12': true }"
                /> -->
                <ExternalUserIndividualMentorshipCard
                  v-if="false"
                  :class="{ 'col-12': true }"
                />
                <div class="justify-around q-mb-sm" v-if="!isRetirementPlan">
                  <q-card class="row external-user-card-container q-pa-sm">
                    <ExternalUserResumeCreatorCard
                      :class="{
                        'col-6': !mobile,
                        'col-12': mobile,
                      }"
                    />
                    <ExternalUserLinkedinCover
                      :class="{
                        'col-6': !mobile,
                        'col-12': mobile,
                      }"
                    />
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-dialog v-model="showSurveySuggestion" v-if="!isRetirementPlan">
        <div class="popup-recent-demission">
          <div class="container-img">
            <img src="../../../assets/imgs/popup-recent-demission.png" />
          </div>
          <div class="container-info">
            <img src="../../../assets/imgs/passou.png" />
            <div class="sub-title">Queremos saber como foi sua experiência</div>
            <div class="detail">é rapidinho</div>
            <div class="buton" @click="answerSurvey()">
              Avalie sua antiga empresa
            </div>
          </div>
        </div>
      </q-dialog>
    </q-page>
  </div>
</template>

<script>
import ExternalUserWelcomeCard from "./externalUser/ExternalUserWelcomeCard.vue";
import ExternalUserWelcomeCardMobile from "./externalUser/ExternalUserWelcomeCardMobile.vue";
import ExternalUserKitRealocationProCard from "./externalUser/ExternalUserKitRealocationProCard.vue";
import ExternalUserInterviewSimulatorCard from "./externalUser/ExternalUserInterviewSimulatorCard.vue";
import ExternalUserResumeCreatorCard from "./externalUser/ExternalUserResumeCreatorCard.vue";
import ExternalUserIndividualMentorshipCard from "./externalUser/ExternalUserIndividualMentorshipCard.vue";

import ExternalUserMostCommonQuestions from "./externalUser/ExternalUserMostCommonQuestions.vue";
import ExternalUserLinkedinCover from "./externalUser/ExternalUserLinkedinCover.vue";
import ExternalUserMentoringSchedule from "./externalUser/ExternalUserMentoringSchedule.vue";
import ExternalSurvey from "./externalUser/ExternalSurvey.vue";

import Schedule from "./templates/Schedule.vue";
import UserCard from "./user/UserCard.vue";
import axios from "axios";
import { mapActions } from "vuex";
import { baseApiUrl, showError } from "../../../../src/global.js";

import { filterCrud } from "./../../general/crud/utils/filterCrud";

export default {
  data() {
    return {
      products: [],
      loadUserCard: false,
      mobile: false,
      interviewSimulator: false,
      periodTest: false,
      kitPro: false,
      daysToExpirePeriodTest: 0,
      daysToExpireUse: 0,
      b2cUser: false,
      surveyAnswered: false,
      showSurveySuggestion: false,
      surveyPopupShowed: false,
      showMentoringCalendar: false,
      isRetirementPlan: false,
      userPlanData: null,
      loadingPlanData: true,
    };
  },
  components: {
    ExternalUserWelcomeCard,
    /* ExternalUserKitRealocationProCard, */
    ExternalUserInterviewSimulatorCard,
    ExternalUserResumeCreatorCard,
    ExternalUserIndividualMentorshipCard,
    ExternalUserWelcomeCardMobile,
    ExternalUserMostCommonQuestions,
    ExternalUserLinkedinCover,
    ExternalUserMentoringSchedule,
    ExternalSurvey,
    UserCard,
    Schedule,
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();

    this.b2cUser = localStorage.getItem("companyId") ? true : false;
    this.surveyAnswered = localStorage.getItem("surveyAnswered") == "true";
    this.surveyPopupShowed =
      localStorage.getItem("surveyPopupShowed") == "true";

    this.showSurveySuggestion = false;

    const userId = localStorage.getItem("userId");

    let config = {
      method: "GET",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      url: `${baseApiUrl}/users/${userId}`,
    };

    axios(config)
      .then(async (user) => {
        await this.setUserDates(user.data[0]);
        this.getExpiresDate();
        this.fetchCompanyUserData();
      })
      .catch((err) => {
        console.log(err);
        showError(err);
      });
  },
  async created() {
    const filters = [
      {
        name: "userId",
        model: localStorage.getItem("userId"),
      },
    ];

    const userProducts = await filterCrud(filters, "users/products");

    userProducts.forEach((userProduct) => {
      if (userProduct.availableQuantity > 0) {
        userProduct.scheduled = false;
      } else {
        userProduct.scheduled = true;
      }

      userProduct.product.availableQuantity = userProduct.availableQuantity;

      this.products.push(userProduct.product);
    });

    this.products = this.unirProdutos(this.products);

    this.loadUserCard = true;

    this.getExpiresDate();
  },
  methods: {
    ...mapActions("users", ["setUserDates"]),
    goUrl: function (url) {
      this.$router.push({ path: `${url}/${this.product.id}` });
    },
    unirProdutos(array) {
      const produtosUnicos = {};

      array.forEach((produto) => {
        if (produtosUnicos[produto.id]) {
          produtosUnicos[produto.id].availableQuantity +=
            produto.availableQuantity;
        } else {
          produtosUnicos[produto.id] = produto;
        }
      });

      return Object.values(produtosUnicos);
    },
    updateSchedule() {
      try {
        this.$refs.schedule.init();
      } catch (e) {
        console.log(e);
      }
    },
    answerSurvey: function () {
      this.$router.push({ path: `/survey` });
    },
    async fetchCompanyUserData() {
      const companyId = localStorage.getItem("companyId");
      const userId = localStorage.getItem("userId");

      if (companyId && companyId !== "null") {
        try {
          const config = {
            method: "GET",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            url: `${baseApiUrl}/companies/employees?userId=${userId}`,
          };

          console.log("Fazendo requisição filtrada para userId:", userId);
          const response = await axios(config);
          console.log("Resposta completa da API filtrada:", response.data);

          if (response.data && response.data.length > 0) {
            const currentUser = response.data[0];
            console.log("Dados do usuário encontrado:", currentUser);
            console.log("PlanId completo:", currentUser.planId);
            console.log("Nome do plano:", currentUser.plan);

            this.userPlanData = currentUser;
            this.checkRetirementPlan();
          } else {
            console.log("Nenhum usuário encontrado na resposta filtrada");
          }
        } catch (err) {
          console.log("Erro ao buscar dados do usuário da empresa:", err);
        } finally {
          this.loadingPlanData = false;
        }
      } else {
        this.loadingPlanData = false;
      }
    },
    checkRetirementPlan() {
      console.log("Executando checkRetirementPlan", this.userPlanData);
      if (this.userPlanData && this.userPlanData.planId) {
        const planId = this.userPlanData.planId.id;
        const planName = this.userPlanData.planId.name;
        this.isRetirementPlan =
          planId === "491e313c-a9cc-4806-9a88-8b122e212b3d" ||
          planName === "Pacote Acompanha (Aposentadoria)";
        console.log("Plan check:", {
          planId,
          planName,
          isRetirementPlan: this.isRetirementPlan,
        });

        if (!this.isRetirementPlan) {
          this.showSurveySuggestion =
            this.b2cUser && !this.surveyAnswered && !this.surveyPopupShowed;
          if (this.showSurveySuggestion) {
            localStorage.setItem("surveyPopupShowed", true);
          }
        }
      } else {
        console.log("PlanId não encontrado ou userPlanData inválido");
      }
    },
    getExpiresDate: function () {
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

      this.periodTest = this.daysToExpirePeriodTest > 0;
      this.kitPro = this.daysToExpireUse > 0;
    },
  },
};
</script>

<style lang="scss">
h2 {
  font-size: 50px;
  color: black;
  text-align: center;
}

h2 span {
  background-color: #16a085;
  padding: 8px 30px;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  border-radius: 25px;
  line-height: 1.3;
}

h2 span:last-child {
  border-radius: 0 0 25px 25px;
  position: relative;
}

h2 span:last-child:before {
  z-index: -1;
  content: "";
  position: absolute;
  left: -30px;
  top: -11px;
  width: 50px;
  height: 50px;
  background-color: #16a085;
  border-radius: 25px;
  -webkit-mask-image: radial-gradient(
    circle 1px at 0px 50px,
    transparent 0,
    transparent 30px,
    black 21px
  );
  mask-image: radial-gradient(
    circle 1px at 0px 50px,
    transparent 0,
    transparent 30px,
    black 21px
  );
}

h2 span:last-child:after {
  z-index: -1;
  content: "";
  position: absolute;
  right: -30px;
  top: -11px;
  width: 50px;
  height: 50px;
  background-color: #16a085;
  border-radius: 25px;
  -webkit-mask-image: radial-gradient(
    circle 1px at 50px 50px,
    transparent 0,
    transparent 30px,
    black 21px
  );
  mask-image: radial-gradient(
    circle 1px at 50px 50px,
    transparent 0,
    transparent 30px,
    black 21px
  );
}

.home-external-user {
  height: 100%;
}

.popup-recent-demission {
  background-color: $prepara-me;
  height: 45vh;
  width: 60vw;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: row;

  .container-img {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 50%;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .container-img img {
    height: 80%;
    width: 80%;
    object-fit: contain;
  }

  .container-info {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: white;
    width: 50%;
    justify-content: center;
    padding: 10px;

    .title {
      font-weight: bold;
      font-size: 1.8rem;
      text-align: center;
      width: 80%;
      margin: 0 auto 0 auto;
      background-color: $prepara-me;
      border-radius: 20px;
      margin-bottom: 20px;
    }

    .sub-title {
      font-weight: bold;
      font-size: 1.1rem;
      text-align: center;
      width: 80%;
      margin: 0 auto 0 auto;
    }

    .detail {
      font-weight: bold;
      font-size: 0.8rem;
      text-align: center;
      width: 80%;
      margin: 0 auto 10px auto;
    }

    .buton {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      font-weight: bold;
      font-size: 1.3rem;
      text-align: center;
      width: 80%;
      margin: 0 auto 0 auto;
      background-color: $accent;
      border-radius: 20px;
      height: 8vh;
      cursor: pointer;
      user-select: none;
    }
  }

  @media screen and (max-width: 750px) {
    .container-img {
      height: auto;
      width: 100%;
    }
    .container-info {
      width: 100%;
    }
  }
}

@media screen and (max-width: 750px) {
  .popup-recent-demission {
    height: 80vh;
    flex-direction: column;
    width: 90%;
  }
}

.external-user-options {
  display: flex;
  flex-direction: column;
}

.external-user-card-container {
  border-radius: 15px;
}

.skeleton-container {
  width: 100%;
  padding: 20px;
}
</style>
