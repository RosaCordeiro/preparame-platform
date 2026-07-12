<template>
  <div id="q-app" class="home-external-user">
    <q-page :class="['home-user-page', mobile ? 'q-px-sm' : 'q-px-md']">
      <div class="home-user-section home-user-welcome">
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
          <q-skeleton height="200px" />
        </div>
      </div>

      <div class="row q-col-gutter-md home-user-main items-start">
        <div
          :class="{
            'col-12': mobile,
            'col-12 col-md-3': !mobile,
          }"
        >
          <UserCard
            v-if="loadUserCard"
            :products="products"
            :interviewSimulator="interviewSimulator"
            :isRetirementPlan="isRetirementPlan"
            @open-mentoring-calendar="showMentoringCalendar = true"
            @close-mentoring-calendar="showMentoringCalendar = false"
          />
        </div>

        <div
          :class="{
            'col-12': mobile,
            'col-12 col-md-9': !mobile,
          }"
        >
          <div class="home-user-section">
            <Schedule
              :homeType="'USER'"
              :compactLayout="true"
              ref="schedule"
              v-if="!showMentoringCalendar"
            />
            <ExternalUserMentoringSchedule
              v-if="showMentoringCalendar"
              @update-schedule="updateSchedule"
            />
          </div>

          <template v-if="!showMentoringCalendar">
            <div
              v-if="!surveyAnswered && !isRetirementPlan"
              class="home-user-section"
            >
              <ExternalSurvey />
            </div>

            <div v-if="!isRetirementPlan" class="home-user-section">
              <UserLinkedinSettings />
            </div>

            <div v-if="!isRetirementPlan" class="row q-col-gutter-md home-user-tools">
              <div class="col-12 col-md-4">
                <q-card class="home-user-card home-user-tool-card">
                  <ExternalUserInterviewSimulatorCard />
                </q-card>
              </div>
              <div class="col-12 col-md-4">
                <q-card class="home-user-card home-user-tool-card">
                  <ExternalUserMostCommonQuestions />
                </q-card>
              </div>
              <div class="col-12 col-md-4">
                <q-card class="home-user-card home-user-tool-card">
                  <ExternalUserResumeCreatorCard />
                </q-card>
              </div>
              <div class="col-12 col-md-4">
                <q-card class="home-user-card home-user-tool-card">
                  <ExternalUserLinkedinCover />
                </q-card>
              </div>
            </div>
          </template>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import ExternalUserWelcomeCard from "./externalUser/ExternalUserWelcomeCard.vue";
import ExternalUserWelcomeCardMobile from "./externalUser/ExternalUserWelcomeCardMobile.vue";
import ExternalUserInterviewSimulatorCard from "./externalUser/ExternalUserInterviewSimulatorCard.vue";
import ExternalUserResumeCreatorCard from "./externalUser/ExternalUserResumeCreatorCard.vue";
import ExternalUserMostCommonQuestions from "./externalUser/ExternalUserMostCommonQuestions.vue";
import ExternalUserLinkedinCover from "./externalUser/ExternalUserLinkedinCover.vue";
import ExternalUserMentoringSchedule from "./externalUser/ExternalUserMentoringSchedule.vue";
import ExternalSurvey from "./externalUser/ExternalSurvey.vue";
import UserLinkedinSettings from "./UserLinkedinSettings.vue";
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
      surveyAnswered: false,
      showMentoringCalendar: false,
      isRetirementPlan: false,
      userPlanData: null,
      loadingPlanData: true,
    };
  },
  components: {
    ExternalUserWelcomeCard,
    ExternalUserInterviewSimulatorCard,
    ExternalUserResumeCreatorCard,
    ExternalUserWelcomeCardMobile,
    ExternalUserMostCommonQuestions,
    ExternalUserLinkedinCover,
    ExternalUserMentoringSchedule,
    ExternalSurvey,
    UserLinkedinSettings,
    UserCard,
    Schedule,
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();

    this.surveyAnswered = localStorage.getItem("surveyAnswered") == "true";

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

          const response = await axios(config);

          if (response.data && response.data.length > 0) {
            this.userPlanData = response.data[0];
            this.checkRetirementPlan();
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
      if (this.userPlanData && this.userPlanData.planId) {
        const planId = this.userPlanData.planId.id;
        const planName = this.userPlanData.planId.name;
        this.isRetirementPlan =
          planId === "491e313c-a9cc-4806-9a88-8b122e212b3d" ||
          planName === "Pacote Acompanha (Aposentadoria)";
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
.home-external-user {
  --home-card-radius: 12px;
  --home-section-gap: 16px;

  height: 100%;

  .home-user-page {
    padding-bottom: var(--home-section-gap);
  }

  .home-user-section {
    margin-bottom: var(--home-section-gap);
  }

  .home-user-section:last-child,
  .home-user-tools:last-child {
    margin-bottom: 0;
  }

  .home-user-card {
    border-radius: var(--home-card-radius);
  }

  .home-user-tool-card {
    height: 100%;
  }

  .home-user-tool-title {
    font-weight: 700;
    font-size: 1.1rem;
    font-family: "Nunito", sans-serif;
    line-height: 1.3;
    color: #1a27b7;
    margin-bottom: 8px;
  }

  .home-user-tool-body {
    font-size: 0.95rem;
    line-height: 1.45;
    color: #424242;
  }

  .home-user-tool-img {
    height: 80px;
    max-width: 100%;
    object-fit: contain;
    margin: 8px auto 0;
    display: block;
  }

  .skeleton-container {
    width: 100%;
  }
}

</style>
