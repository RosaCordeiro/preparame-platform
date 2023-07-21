<template>
  <div id="q-app" class="home-company">
    <q-page :class="{ 'q-pa-md': !mobile }">
      <div
        :class="{
          'home-company-charts': true,
          'justify-between': true,
        }"
      >
        <div class="home-company-charts-cards row">
          <NpsCard
            v-if="dashboardsLoaded"
            :nps="nps"
            style="flex: 1 0 200px"
          ></NpsCard>
          <EmployeerBrandRiskCard
            v-if="dashboardsLoaded"
            :employeerBrandRisk="brandRisk"
            style="flex: 1 0 200px"
          ></EmployeerBrandRiskCard>
          <LaborRiskCard
            v-if="dashboardsLoaded"
            :laborRisk="laborRisk"
            style="flex: 1 0 200px"
          ></LaborRiskCard>
          <RealocatedsCard
            v-if="dashboardsLoaded"
            :realocateds="countRealocateds"
            :totalUsers="countUsers"
            style="flex: 1 0 200px"
          ></RealocatedsCard>
          <RegisteredEmployeesCard
            v-if="dashboardsLoaded"
            :registeredEmployees="countAccepted"
            :totalEmployees="countEmployees"
            style="flex: 1 0 200px"
          >
          </RegisteredEmployeesCard>
        </div>
        <div class="home-company-charts-cards row">
          <NineCard
            v-if="dashboardsLoaded"
            :lastAnswers="lastAnswers"
            :countUsers="countUsers"
            style="flex: 1 0 200px"
          ></NineCard>
          <LaborRiskAlertCard
            v-if="dashboardsLoaded"
            :laborRiskAlerts="countLaborRiskAlerts"
            :totalUsers="countUsers"
            style="flex: 1 0 200px"
          ></LaborRiskAlertCard>
        </div>

        <div class="charts__row row">
          <LaborRiskDetailedCard
            v-if="dashboardsLoaded"
            :laborRisks="laborRiskData"
          />
          <FeelingsMapCard
            v-if="dashboardsLoaded"
            :feelingsMap="feelingsMapData"
            :users="countUsersResponded"
          />
        </div>

        <!-- <div class="home-company-charts-cards justify-around">
          <LaborRiskDetailedCard
            v-if="dashboardsLoaded"
            :laborRisks="laborRiskData"
          />
          <FeelingsMapCard
            v-if="dashboardsLoaded"
            :feelingsMap="feelingsMapData"
          />
        </div> -->
      </div>
      <div
        :class="{
          'home-company-charts': true,
          'justify-between': true,
          'col-12': !mobile,
          row: !mobile,
          column: mobile,
        }"
      ></div>
    </q-page>
  </div>
</template>

<script>
import { filterCrud } from "./../../general/crud/utils/filterCrud";

import NpsCard from "./company/NpsCard.vue";
import EmployeerBrandRiskCard from "./company/EmployeerBrandRiskCard.vue";
import LaborRiskCard from "./company/LaborRiskCard.vue";
import LaborRiskAlertCard from "./company/LaborRiskAlertCard.vue";
import RealocatedsCard from "./company/RealocatedsCard.vue";
import RegisteredEmployeesCard from "./company/RegisteredEmployeesCard.vue";
import FeelingsMapCard from "./company/FeelingsMapCard.vue";
import LaborRiskDetailedCard from "./company/LaborRiskDetailedCard.vue";
import NineCard from "./company/NineCard.vue";

export default {
  components: {
    NpsCard,
    EmployeerBrandRiskCard,
    LaborRiskCard,
    RealocatedsCard,
    RegisteredEmployeesCard,
    FeelingsMapCard,
    LaborRiskDetailedCard,
    LaborRiskAlertCard,
    NineCard,
  },
  data() {
    return {
      nps: 0,
      laborRisk: 0,
      brandRisk: 0,
      countUsers: 0,
      countEmployees: 0,
      countRealocateds: 0,
      countLaborRiskAlerts: 0,
      countAccepted: 0,
      countUsersResponded: 0,
      dashboardsLoaded: false,
      feelingsMapData: [],
      laborRiskData: [],
      brandRiskData: [],
      mobile: false,
      lastAnswer: {},
      lastAnswers: [],
    };
  },
  methods: {
    loadNpsSurveyAnswers: async function () {
      let companyId = localStorage.getItem("companyId");

      if (companyId === "null") {
        this.$q.notify({
          type: "error",
          message: "Nenhuma empresa selecionada para o usuário.",
        });

        return;
      }

      const filters = [
        {
          name: "companyId",
          model: localStorage.getItem("companyId"),
        },
      ];

      const npsSurveyReport = await filterCrud(
        filters,
        "reports/NPSSurveyAnswers"
      );

      const npsSurveyAnswers = npsSurveyReport.filter((npsSurvey) => {
        if (npsSurvey.user) {
          return npsSurvey.user.surveyAnswered;
        }
      });

      let laborRisk = npsSurveyAnswers.reduce(
        (laborRisckTotal = 0, employee) => {
          return laborRisckTotal + employee.user.laborRisk;
        },
        0
      );

      this.laborRisk = 10 - (laborRisk / npsSurveyAnswers.length).toFixed(2);

      let brandRisk = npsSurveyAnswers.reduce(
        (brandRisckTotal = 0, employee) => {
          return brandRisckTotal + employee.user.brandRisk;
        },
        0
      );

      this.brandRisk = 10 - (brandRisk / npsSurveyAnswers.length).toFixed(2);

      const users = npsSurveyReport.filter((employee) => {
        return employee.userId;
      });

      const realocateds = users.filter((user) => {
        return user.user.realocated == "REALOCATED";
      });

      const laborRiskAlerts = users.filter((user) => {
        return user.user.laborRiskAlert == "ALERT";
      });

      users.forEach((user) => {
        const feelingsMap = JSON.parse(user.user.feelingsMapJSON);
        const laborRisks = JSON.parse(user.user.laborRiskJSON);
        const brandRisks = JSON.parse(user.user.brandRiskJSON);

        if (Array.isArray(feelingsMap)) {
          feelingsMap.forEach((feelingMapped) => {
            const findFeeling = this.feelingsMapData.findIndex(
              (feelingInserted) => {
                return feelingMapped.feeling == feelingInserted.feeling;
              }
            );

            if (findFeeling >= 0) {
              this.feelingsMapData[findFeeling].count++;
            } else {
              this.feelingsMapData.push({ ...feelingMapped, count: 1 });
            }
          });
        }

        if (Array.isArray(laborRisks)) {
          for (const laborRiskMapped of laborRisks) {
            if (laborRiskMapped.index === 9) {
              this.lastAnswers.push(laborRiskMapped);
              continue;
            }

            const findLaborRisk = this.laborRiskData.findIndex(
              (laborRiskInserted) => {
                return laborRiskMapped.question == laborRiskInserted.question;
              }
            );

            if (findLaborRisk >= 0) {
              this.laborRiskData[findLaborRisk].count += laborRiskMapped.answer;
            } else {
              this.laborRiskData.push({
                ...laborRiskMapped,
                count: laborRiskMapped.answer,
              });
            }
          }
        }

        if (Array.isArray(brandRisks)) {
          brandRisks.forEach((brandRiskMapped) => {
            const findBrandRisk = this.brandRiskData.findIndex(
              (brandRiskInserted) => {
                return brandRiskMapped.question == brandRiskInserted.question;
              }
            );

            if (findBrandRisk >= 0) {
              this.brandRiskData[findBrandRisk].count += brandRiskMapped.answer;
            } else {
              this.brandRiskData.push({
                ...brandRiskMapped,
                count: brandRiskMapped.answer,
              });
            }
          });
        }
      });

      this.brandRiskData.forEach((brandRisk) => {
        brandRisk.count = brandRisk.count / users.length;
      });

      this.countEmployees = npsSurveyReport.length;
      this.countUsers = users.length;
      this.countRealocateds = realocateds.length;

      this.countLaborRiskAlerts = laborRiskAlerts.length;

      this.dashboardsLoaded = true;
      this.countUsersResponded = users.filter((user) => {
        return user.user.surveyAnswered;
      }).length;

      this.countAccepted = users.filter((user) => {
        return user.accepted;
      }).length;

      this.laborRiskData.forEach((laborRisk) => {
        laborRisk.count = laborRisk.count / this.countUsersResponded;
      });

      const npsAnswers = npsSurveyAnswers.map((npsSurvey) => {
        return npsSurvey.user.NPSSurvey;
      });

      const result = npsAnswers.reduce(
        (accumulators, npsAnswer) => {
          if (npsAnswer < 7) {
            accumulators.npsAnswersLassThanSeven += 1;
          }
          if (npsAnswer > 8) {
            accumulators.npsAnswersMoreThanEight += 1;
          }

          return accumulators;
        },
        { npsAnswersLassThanSeven: 0, npsAnswersMoreThanEight: 0 }
      );

      this.nps = (
        result.npsAnswersMoreThanEight / this.countUsersResponded -
        result.npsAnswersLassThanSeven / this.countUsersResponded
      ).toFixed(2);
    },
  },
  async mounted() {
    this.mobile = window.mobileAndTabletCheck();

    this.loadNpsSurveyAnswers();
  },
};
</script>

<style lang="scss">
.home-company {
  width: 100vw;
  height: 100%;
  overflow: auto;
}

.home-company-charts {
  display: flex;
  flex-direction: column;
  height: 20vh !important;
}

.home-company-charts-cards {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.home-company-charts-detailed {
  height: 60vh;
  width: 100vw;
}

.charts__row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  gap: 32px;
}

.teste-1 {
  width: 100%;
  background-color: black;
}

.teste-2 {
  width: 100%;
  background-color: blue;
}
</style>
