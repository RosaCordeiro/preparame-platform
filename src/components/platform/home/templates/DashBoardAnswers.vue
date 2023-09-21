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
            :npsGeneral="npsGeneral"
            style="flex: 1 0 200px"
          ></NpsCard>
          <EmployeerBrandRiskCard
            v-if="dashboardsLoaded"
            :employeerBrandRisk="brandRisk"
            :employeerBrandRiskGeneral="brandRiskGeneral"
            style="flex: 1 0 200px"
          ></EmployeerBrandRiskCard>
          <LaborRiskCard
            v-if="dashboardsLoaded"
            :laborRisk="laborRisk"
            :laborRiskGeneral="laborRiskGeneral"
            style="flex: 1 0 200px"
          ></LaborRiskCard>
          <RealocatedsCard
            v-if="dashboardsLoaded"
            :realocateds="realocateds"
            :realocatedsGeneral="realocatedsGeneral"
            style="flex: 1 0 200px"
          ></RealocatedsCard>
          <RegisteredEmployeesCard
            v-if="dashboardsLoaded"
            :welcomed="welcomed"
            :welcomedGeneral="welcomedGeneral"
            style="flex: 1 0 200px"
          >
          </RegisteredEmployeesCard>
        </div>
        <div class="home-company-charts-cards row">
          <NineCard
            v-if="dashboardsLoaded"
            :termination="termination"
            :terminationGeneral="terminationGeneral"
            style="flex: 1 0 200px"
          ></NineCard>
          <LaborRiskAlertCard
            v-if="dashboardsLoaded"
            :laborIssues="laborIssues"
            :laborIssuesGeneral="laborIssuesGeneral"
            style="flex: 1 0 200px"
          ></LaborRiskAlertCard>
        </div>

        <div class="charts__row row">
          <LaborRiskDetailedCard
            v-if="dashboardsLoaded && shutDown.length !== 0"
            :shutDown="shutDown"
            :title="'Sua Empresa'"
          />
          <LaborRiskDetailedCard
            v-if="dashboardsLoaded"
            :shutDown="shutDownGeneral"
            :title="'Geral'"
          />
        </div>

        <div class="charts__row row">
          <FeelingsMapCard
          v-if="dashboardsLoaded"
          :feelingMap="feelingMap"
          :title="'Sua Empresa'"
        />
        <FeelingsMapCard
          :feelingMap="feelingMapGeneral"
          :title="'Geral'"
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
import { filterCrud } from "../../../general/crud/utils/filterCrud";

import NpsCard from "../company/NpsCard.vue";
import EmployeerBrandRiskCard from "../company/EmployeerBrandRiskCard.vue";
import LaborRiskCard from "../company/LaborRiskCard.vue";
import LaborRiskAlertCard from "../company/LaborRiskAlertCard.vue";
import RealocatedsCard from "../company/RealocatedsCard.vue";
import RegisteredEmployeesCard from "../company/RegisteredEmployeesCard.vue";
import FeelingsMapCard from "../company/FeelingsMapCard.vue";
import LaborRiskDetailedCard from "../company/LaborRiskDetailedCard.vue";
import NineCard from "../company/NineCard.vue";

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
      nps: "",
      npsGeneral: "",
      brandRisk: "",
      brandRiskGeneral: "",
      laborRisk: "",
      laborRiskGeneral: "",
      realocateds: "",
      realocatedsGeneral: "",
      welcomed: "",
      welcomedGeneral: "",
      termination: "",
      terminationGeneral: "",
      laborIssues: "",
      laborIssuesGeneral: "",
      shutDown: [],
      shutDownGeneral: [],
      feelingMap: [],
      feelingMapGeneral: [],
      dashboardsLoaded: false,
      mobile: false,
    };
  },
  props: ["companyId"],
  watch: {
    companyId(){
      this.loadNpsSurveyAnswers();
    }
  },
  methods: {
    loadNpsSurveyAnswers: async function () {
      if (this.companyId === "null") {
        this.$q.notify({
          type: "error",
          message: "Nenhuma empresa selecionada para o usuário.",
        });

        return;
      }

      const filters = [
        {
          name: "companyId",
          model: this.companyId,
        },
      ];

      const npsSurveyReport = await filterCrud(
        filters,
        "reports/NPSSurveyAnswers"
      );

      this.nps = npsSurveyReport.nps;
      this.npsGeneral = npsSurveyReport.general.nps;

      this.brandRisk = npsSurveyReport.brandRisk;
      this.brandRiskGeneral = npsSurveyReport.general.brandRisk;

      this.laborRisk = npsSurveyReport.laborRisk;
      this.laborRiskGeneral = npsSurveyReport.general.laborRisk;

      this.realocateds = npsSurveyReport.realocateds;
      this.realocatedsGeneral = npsSurveyReport.general.realocateds;

      this.welcomed = npsSurveyReport.welcomed;
      this.welcomedGeneral = npsSurveyReport.general.welcomed;

      this.termination = npsSurveyReport.termination;
      this.terminationGeneral = npsSurveyReport.general.termination;

      this.laborIssues = npsSurveyReport.laborIssues;
      this.laborIssuesGeneral = npsSurveyReport.general.laborIssues;

      this.shutDown = npsSurveyReport.shutDown;
      this.shutDownGeneral = npsSurveyReport.general.shutDown;

      this.feelingMap = npsSurveyReport.feelingMap;
      this.feelingMapGeneral = npsSurveyReport.general.feelingMap;

      this.dashboardsLoaded = true;
      console.log(npsSurveyReport);
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

.home-company-charts-cards>div>div>div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

.home-company-charts-cards>div>div>div>div:first-child {
    margin-bottom: auto;
}

.home-company-charts-cards> div>div, .home-company-charts-cards> div>div>div {
    height: 100%;
    vertical-align: unset;
}
</style>
