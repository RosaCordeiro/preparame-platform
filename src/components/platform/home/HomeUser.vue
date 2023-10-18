<template>
  <div id="q-app" class="home-external-user">
    <q-page>
      <div>
        <ExternalUserWelcomeCard
          v-if="loadUserCard && !mobile"
          :products="products"
          :interviewSimulator="interviewSimulator"
        />
        <ExternalUserWelcomeCardMobile
          v-else-if="loadUserCard && mobile"
          :products="products"
          :interviewSimulator="interviewSimulator"
        />
        <div :class="{ row: !mobile }">
          <UserCard
            v-if="loadUserCard"
            class="col-3"
            :products="products"
            :interviewSimulator="interviewSimulator"
            @open-mentoring-calendar="showMentoringCalendar = true"
            @close-mentoring-calendar="showMentoringCalendar = false"
          />
          <div
            :class="{
              col: true,
              'q-px-md': !mobile,
              'q-px-lg': mobile,
              'col-8': true,
            }"
          >
            <div
              :class="{
                'q-col-gutter-md': !mobile,
                'q-col-gutter-lg': mobile,
                'external-user-options': true,
              }"
            >
              <Schedule :homeType="'USER'" ref="schedule" />
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
                  v-if="!surveyAnswered"
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
                <ExternalUserKitRealocationProCard
                  v-if="!kitPro"
                  :class="{ 'col-12': true }"
                />
                <ExternalUserIndividualMentorshipCard
                  v-if="false"
                  :class="{ 'col-12': true }"
                />
                <div class="justify-around q-mb-sm">
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
      <q-dialog v-model="showSurveySuggestion">
        <div class="popup-recent-demission">
          <div class="container-img">
            <img src="../../../assets/imgs/popup-recent-demission.png" />
          </div>
          <div class="container-info">
            <div class="title">Foi demitida(o) em 2023?</div>
            <div class="sub-title">Queremos saber como foi sua experiência</div>
            <div class="detail">é bem rapidinho</div>
            <div class="buton" @click="answerSurvey()">Responder Pesquisa</div>
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
    };
  },
  components: {
    ExternalUserWelcomeCard,
    ExternalUserKitRealocationProCard,
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

    this.showSurveySuggestion =
      this.b2cUser && !this.surveyAnswered && !this.surveyPopupShowed;

    localStorage.setItem("surveyPopupShowed", true);

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

      this.products.push(userProduct.product);
    });

    this.loadUserCard = true;

    this.getExpiresDate();
  },
  methods: {
    ...mapActions("users", ["setUserDates"]),
    goUrl: function (url) {
      this.$router.push({ path: `${url}/${this.product.id}` });
    },
    updateSchedule() {
      try {
        this.$refs.schedule.init();
      } catch (e) {
        console.log(e);
      }
    },
    answerSurvey: function (url) {
      this.$router.push({ path: `/survey` });
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
</style>
