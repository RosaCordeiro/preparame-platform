<template>
  <div
    id="q-app"
    :class="[
      'home-company',
      isRhVariant ? 'home-company--rh' : 'home-company--legacy',
    ]"
    :style="legacyPaddingStyle"
  >
    <q-page>
      <div v-if="isRhVariant" class="rh-page-header">
        <div class="rh-page-header__content">
          <span class="rh-page-header__eyebrow">Programa de Demissão Responsável</span>
          <h1 class="rh-page-title">{{ rhPageTitle }}</h1>
          <p class="rh-page-subtitle">{{ rhPageSubtitle }}</p>
        </div>
        <span class="rh-badge-info">
          <q-icon name="mdi-chart-bar" size="14px" />
          Dados comparados ao benchmark de mercado
        </span>
      </div>

      <template v-if="isRhVariant">
        <RhCompareFilters
          v-if="!showRhMetrics"
          :compare-filter-sets.sync="compareFilterSets"
          :disable-filters="disableFilters"
          :parameters="parameters"
          :dismissal-type-options="dismissalTypeOptions"
          :gender-options="genderOptions"
          :etnia-options="etniaOptions"
          :get-option-label="getOptionLabel"
          @change="loadNpsSurveyAnswers"
          @add-set="addCompareFilterSet"
          @remove-set="removeCompareFilterSet"
        />
      </template>

      <template v-else>
      <div class="box__button-actions">
        <q-tooltip
          anchor="top middle"
          self="bottom middle"
          v-if="disableFilters"
        >
          <div class="tooltip-text">
            <p>Selecione uma empresa para habilitar os filtros.</p>
          </div>
        </q-tooltip>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Período"
          text-color="white"
          no-caps
          :disable="
            disableFilters ||
            !parameters.period ||
            parameters.period.length === 0
          "
          :class="{
            label:
              !disableFilters &&
              parameters.period &&
              parameters.period.length === 0,
          }"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column" v-if="parameters.period">
              <q-checkbox
                color="primary"
                v-if="parameters.period.length > 0"
                v-model="selectAllPeriods"
                label="Selecionar Todos"
              />
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.period"
                :key="index"
                :label="r"
                :val="r"
                v-model="period"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Unidade"
          text-color="white"
          no-caps
          :disable="
            disableFilters || !parameters.unity || parameters.unity.length === 0
          "
          :class="{
            label:
              !disableFilters &&
              parameters.unity &&
              parameters.unity.length === 0,
          }"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column" v-if="parameters.unity">
              <q-checkbox
                color="primary"
                v-if="parameters.unity.length > 0"
                v-model="selectAllUnity"
                label="Selecionar Todos"
              />
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.unity"
                :key="index"
                :label="r"
                :val="r"
                v-model="unity"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Área"
          text-color="white"
          no-caps
          :disable="
            disableFilters || !parameters.area || parameters.area.length === 0
          "
          :class="{
            label:
              !disableFilters &&
              parameters.area &&
              parameters.area.length === 0,
          }"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column" v-if="parameters.area">
              <q-checkbox
                color="primary"
                v-if="parameters.area.length > 0"
                v-model="selectAllArea"
                label="Selecionar Todos"
              />
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.area"
                :key="index"
                :label="r"
                :val="r"
                v-model="area"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Cargo"
          text-color="white"
          no-caps
          :disable="
            disableFilters || !parameters.role || parameters.role.length === 0
          "
          :class="{
            label:
              !disableFilters &&
              parameters.role &&
              parameters.role.length === 0,
          }"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column" v-if="parameters.role">
              <q-checkbox
                color="primary"
                v-if="parameters.role.length > 0"
                v-model="selectAllRole"
                label="Selecionar Todos"
              />
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.role"
                :key="index"
                :label="r"
                :val="r"
                v-model="role"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Tipo de Demissão"
          text-color="white"
          no-caps
          :disable="
            disableFilters ||
            (parameters.dismissalType && parameters.dismissalType.length === 0)
          "
          :class="{
            label:
              !disableFilters &&
              parameters.dismissalType &&
              parameters.dismissalType.length === 0,
          }"
        >
          <div class="row no-wrap q-pa-md">
            <div
              class="column"
              v-if="
                parameters.dismissalType && parameters.dismissalType.length > 0
              "
            >
              <q-checkbox
                color="primary"
                v-if="parameters.dismissalType.length > 0"
                v-model="selectAllDismissalType"
                label="Selecionar Todos"
              />
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.dismissalType"
                :key="index"
                :label="getOptionLabel(dismissalTypeOptions, r)"
                :val="r"
                v-model="dismissalType"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Gênero"
          text-color="white"
          no-caps
          :disable="
            disableFilters ||
            (parameters.gender && parameters.gender.length === 0)
          "
          :class="{
            label:
              !disableFilters &&
              parameters.gender &&
              parameters.gender.length === 0,
          }"
        >
          <div class="row no-wrap q-pa-md">
            <div
              class="column"
              v-if="parameters.gender && parameters.gender.length > 0"
            >
              <q-checkbox
                color="primary"
                v-if="parameters.gender.length > 0"
                v-model="selectAllGender"
                label="Selecionar Todos"
              />
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.gender"
                :key="index"
                :label="getOptionLabel(genderOptions, r)"
                :val="r"
                v-model="gender"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Etnia"
          text-color="white"
          no-caps
          :disable="
            disableFilters ||
            (parameters.etnia && parameters.etnia.length === 0)
          "
          :class="{
            label:
              !disableFilters &&
              parameters.etnia &&
              parameters.etnia.length === 0,
          }"
        >
          <div class="row no-wrap q-pa-md">
            <div
              class="column"
              v-if="parameters.etnia && parameters.etnia.length > 0"
            >
              <q-checkbox
                color="primary"
                v-if="parameters.etnia.length > 0"
                v-model="selectAllEtnia"
                label="Selecionar Todos"
              />
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.etnia"
                :key="index"
                :label="getOptionLabel(etniaOptions, r)"
                :val="r"
                v-model="etnia"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="PCD"
          text-color="white"
          no-caps
          :disable="
            disableFilters || (parameters.pcd && parameters.pcd.length === 0)
          "
          :class="{
            label:
              !disableFilters && parameters.pcd && parameters.pcd.length === 0,
          }"
        >
          <div class="row no-wrap q-pa-md">
            <div
              class="column"
              v-if="parameters.pcd && parameters.pcd.length > 0"
            >
              <q-checkbox
                color="primary"
                v-if="parameters.pcd.length > 0"
                v-model="selectAllPcd"
                label="Selecionar Todos"
              />
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.pcd"
                :key="index"
                :label="r"
                :val="r"
                v-model="pcd"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Estado"
          text-color="white"
          no-caps
          :disable="
            disableFilters ||
            (parameters.state && parameters.state.length === 0)
          "
          :class="{
            label:
              !disableFilters &&
              parameters.state &&
              parameters.state.length === 0,
          }"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column" v-if="parameters.state">
              <q-checkbox
                color="primary"
                v-if="parameters.state.length > 0"
                v-model="selectAllState"
                label="Selecionar Todos"
              />
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.state"
                :key="index"
                :label="r"
                :val="r"
                v-model="state"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <q-btn-dropdown
          class="box__button-actions-item"
          label="Cidade"
          text-color="white"
          no-caps
          :disable="
            disableFilters || (parameters.city && parameters.city.length === 0)
          "
          :class="{
            label:
              !disableFilters &&
              parameters.city &&
              parameters.city.length === 0,
          }"
        >
          <div class="row no-wrap q-pa-md">
            <div class="column" v-if="parameters.city">
              <q-checkbox
                color="primary"
                v-if="parameters.city.length > 0"
                v-model="selectAllCity"
                label="Selecionar Todos"
              />
              <q-checkbox
                color="primary"
                v-for="(r, index) in parameters.city"
                :key="index"
                :label="r"
                :val="r"
                v-model="city"
              />
            </div>
          </div>
        </q-btn-dropdown>

        <!--  <div
          class="box__button-actions-item box__button-actions-download"
          @click="gerarPDF()"
        >
          <p>Baixar</p>
        </div> -->
      </div>

      <div class="box__filters">
        <div class="box__filters-title">Filtros selecionados</div>

        <div class="box__filters-wrap" v-if="selectedFilters.length > 0">
          <div
            class="box__filters-wrap-item"
            v-for="(i, index) in selectedFilters"
            :key="index"
          >
            {{ i }}
          </div>
        </div>
        <div v-else class="nofilter">Nenhum filtro selecionado</div>
      </div>
      </template>

      <DashBoardRhMetrics
        v-if="showRhMetrics"
        card-catalog="panelRemainder"
        :compare-results="compareResults"
        :compare-filter-sets="compareFilterSets"
        :summarize-filter-set="summarizeFilterSet"
        :nps-general="npsGeneral"
        :brand-risk-general="brandRiskGeneral"
        :labor-risk-general="laborRiskGeneral"
        :realocateds-general="realocatedsGeneral"
        :welcomed-general="welcomedGeneral"
        :termination-general="terminationGeneral"
        :labor-issues-general="laborIssuesGeneral"
        :remove-percent="removePercent"
        :expanded-metric-key="expandedMetricKey"
        :metric-timelines="metricTimelines"
        :timeline-loading="timelineLoading"
        @metric-info="openMetricInfo"
        @metric-toggle="toggleMetricExpand"
      />

      <DashBoardRhMetrics
        v-if="showRhQuantitative"
        card-catalog="kpi"
        :compare-results="compareResults"
        :compare-filter-sets="compareFilterSets"
        :summarize-filter-set="summarizeFilterSet"
        :nps-general="npsGeneral"
        :brand-risk-general="brandRiskGeneral"
        :labor-risk-general="laborRiskGeneral"
        :realocateds-general="realocatedsGeneral"
        :welcomed-general="welcomedGeneral"
        :termination-general="terminationGeneral"
        :labor-issues-general="laborIssuesGeneral"
        :remove-percent="removePercent"
        :expanded-metric-key="expandedMetricKey"
        :metric-timelines="metricTimelines"
        :timeline-loading="timelineLoading"
        @metric-info="openMetricInfo"
        @metric-toggle="toggleMetricExpand"
      />

      <div v-if="!isRhVariant" class="box__three-columns">
        <div class="box__three-columns-item">
          <IconInfo label="e-NPS" />

          <RowChart
            :title="'Sua Empresa'"
            :minValue="-100"
            :maxValue="100"
            :data="removePercent(this.nps)"
            :intersectionValue="0"
            :insufficientSample="insufficientSample"
          />
          <RowChart
            :title="'Média Geral'"
            :minValue="-100"
            :maxValue="100"
            :data="removePercent(this.npsGeneral)"
            :intersectionValue="0"
          />
        </div>

        <div class="box__three-columns-item">
          <IconInfo label="Risco Trabalhista" />

          <RowChart
            :title="'Sua Empresa'"
            :data="removePercent(laborRisk)"
            :minValue="0"
            :maxValue="10"
            :intersectionValue="4"
            :invertedColors="true"
            :invertedIcons="true"
            :insufficientSample="insufficientSample"
          />
          <RowChart
            :title="'Média Geral'"
            :data="removePercent(laborRiskGeneral)"
            :minValue="0"
            :maxValue="10"
            :intersectionValue="4"
            :invertedColors="true"
            :invertedIcons="true"
          />
        </div>

        <div class="box__three-columns-item">
          <IconInfo label="Marca" />
          <RowChart
            :title="'Sua Empresa'"
            :data="removePercent(brandRisk)"
            :minValue="0"
            :maxValue="10"
            :intersectionValue="4"
            :invertedColors="true"
            :invertedIcons="true"
            :insufficientSample="insufficientSample"
          />
          <RowChart
            :title="'Média Geral'"
            :data="removePercent(brandRiskGeneral)"
            :minValue="0"
            :maxValue="10"
            :intersectionValue="4"
            :invertedColors="true"
            :invertedIcons="true"
          />
        </div>
      </div>

      <DashBoardRhSurveys
        v-if="showRhSurveys"
        :show-shutdown-survey="showShutdownSurvey && showRhQuantitative"
        :show-feeling-map-survey="showFeelingMapSurvey && showRhQuantitative"
        :show-company-questions="showRhQualitative"
        :shutdown-compare-groups="shutdownCompareGroups"
        :feeling-survey-columns="feelingSurveyColumnsRh"
        :feeling-map-charts="feelingMapCharts"
        :company-questions="companyQuestions"
        :compare-results="compareResults"
        :compare-filter-sets="compareFilterSets"
        :summarize-filter-set="summarizeFilterSet"
        :realocateds-general="realocatedsGeneral"
        @metric-info="openMetricInfo"
      />

      <template v-if="!isRhVariant">
      <div class="box__two-columns">
        <div class="box__two-columns-item">
          <IconInfo label="Realocados" />

          <RowChartOneEmojiWithoutIntersection
            :title="'Sua Empresa'"
            :data="removePercent(realocateds)"
            :insufficientSample="false"
          />
        </div>

        <div class="box__two-columns-item">
          <IconInfo label="Acolhidos" />

          <RowChartNoEmojiString
            :title="'Sua Empresa'"
            :data="welcomed.toString()"
            :insufficientSample="insufficientSample"
          />
        </div>
      </div>

      <div class="box__two-columns">
        <div class="box__two-columns-item">
          <IconInfo label="Quantidade de pessoas recolocadas" />

          <RowChartNoEmojiString
            :title="'Sua Empresa'"
            :data="realocatedCount.toString()"
            :insufficientSample="insufficientSample"
          />
        </div>
      </div>

      <div class="box__two-columns">
        <div class="box__two-columns-item">
          <IconInfo label="Cálculos da rescisão estão corretos?" />

          <RowChartOneEmojiExpanded
            :title="'Sua Empresa'"
            :data="removePercent(termination)"
            :insufficientSample="insufficientSample"
          />
          <RowChartOneEmojiExpanded
            :title="'Média Geral'"
            :data="removePercent(terminationGeneral)"
          />
        </div>

        <div class="box__two-columns-item">
          <IconInfo label="Pendências trabalhistas" />

          <RowChartOneEmojiExpanded
            :title="'Sua Empresa'"
            :data="removePercent(laborIssues)"
            :intersectionValue="3"
            :invertedColors="true"
            :insufficientSample="insufficientSample"
          />
          <RowChartOneEmojiExpanded
            :title="'Média Geral'"
            :data="removePercent(laborIssuesGeneral)"
            :intersectionValue="3"
            :invertedColors="true"
          />
        </div>
      </div>

      <div class="box__two-columns">
        <div class="box__two-columns-item" v-if="shutDown.length > 0">
          <IconInfo label="Avaliação pós demissão" />

          <div class="row">
            <h3 class="your-company">Sua empresa</h3>

            <p class="score-description">notas de 1 a 10</p>
          </div>

          <div v-for="(i, number) in shutDown" :key="number">
            <RowChartOneEmoji
              :minValue="1"
              :maxValue="10"
              :title="i.question"
              :data="removePercent(i.count)"
              :intersectionValue="7"
              :textBold="false"
            />
          </div>
        </div>

        <div class="box__two-columns-item">
          <IconInfo label="Avaliação pós demissão" />

          <div class="row">
            <h3 class="your-company">Geral</h3>

            <p class="score-description">notas de 1 a 10</p>
          </div>

          <div v-for="(i, number) in shutDownGeneral" :key="number">
            <RowChartOneEmoji
              :minValue="1"
              :maxValue="10"
              :title="i.question"
              :data="removePercent(i.count)"
              :intersectionValue="7"
              :textBold="false"
            />
          </div>
        </div>
      </div>

      <template v-if="!isVoluntaryOnly">
      <div class="card mapa" v-if="feelingMap.length > 0">
        <div class="card-top">
          <IconInfo label="Mapa de sentimentos" />

          <div class="tag">Sua empresa</div>
        </div>

        <ChartApex
          type="polarArea"
          height="400px"
          style="width: 100%; height: 100%"
          :options="chartOptions"
          :series="feelingMap.map((c) => c.count)"
        />
      </div>

      <div class="card">
        <h2>Comparativo mapa de sentimentos</h2>

        <div class="row">
          <div class="card-col" v-if="feelingMap.length > 0">
            <div class="row">
              <h3 class="your-company">Sua empresa</h3>

              <p class="score-description">notas de 1 a 100</p>
            </div>

            <div v-for="(i, number) in feelingMap" :key="number">
              <RowChartOneEmoji
                :minValue="1"
                :maxValue="100"
                :title="i.feeling"
                :width="'100%'"
                :data="removePercent(i.count)"
                :icon="formatFeeling(i.feeling)"
                :textBold="false"
              />
            </div>
          </div>

          <div class="card-col">
            <div class="row">
              <h3 class="your-company">Geral</h3>

              <p class="score-description">notas de 1 a 100</p>
            </div>

            <div v-for="(i, number) in feelingMapGeneral" :key="number">
              <RowChartOneEmoji
                :minValue="1"
                :maxValue="100"
                :title="i.feeling"
                :width="'100%'"
                :data="removePercent(i.count)"
                :icon="formatFeeling(i.feeling)"
                :textBold="false"
              />
            </div>
          </div>
        </div>
      </div>
      </template>

      <div v-if="companyQuestions.length > 0" class="card">
        <h2>Perguntas da Empresa</h2>
        <CompanyQuestionsCard :companyQuestions="companyQuestions" />
      </div>
      </template>

      <template v-if="isVoluntaryOnly">
        <div
          class="card mapa"
          v-if="voluntaryReasonsMap.length > 0"
        >
          <div class="card-top">
            <IconInfo label="Mapa de motivos de pedido de demissão" />
            <div class="tag">Sua empresa</div>
          </div>
          <ChartApex
            type="polarArea"
            height="400px"
            style="width: 100%; height: 100%"
            :options="reasonsChartOptions"
            :series="voluntaryReasonsMap.map((c) => removePercent(c.count))"
          />
        </div>

        <div class="card">
          <h2>Comparativo mapa de motivos de pedido de demissão</h2>

          <div class="row">
            <div class="card-col" v-if="voluntaryReasonsMap.length > 0">
              <div class="row">
                <h3 class="your-company">Sua empresa</h3>
                <p class="score-description">notas de 1 a 100</p>
              </div>

              <div v-for="(i, number) in voluntaryReasonsMap" :key="number">
                <RowChartOneEmoji
                  :minValue="0"
                  :maxValue="100"
                  :title="i.reason"
                  :width="'100%'"
                  :data="removePercent(i.count)"
                  :textBold="false"
                />
              </div>
            </div>

            <div class="card-col">
              <div class="row">
                <h3 class="your-company">Geral</h3>
                <p class="score-description">notas de 1 a 100</p>
              </div>

              <div
                v-for="(i, number) in voluntaryReasonsMapGeneral"
                :key="number"
              >
                <RowChartOneEmoji
                  :minValue="0"
                  :maxValue="100"
                  :title="i.reason"
                  :width="'100%'"
                  :data="removePercent(i.count)"
                  :textBold="false"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </q-page>

    <TextDialogWidget ref="infoWidget" />
    <InformationDialogWidget ref="metricInfoWidget" />
  </div>
</template>

<script>
import { filterCrud } from "../../../general/crud/utils/filterCrud";
import RowChart from "../company/RowChart.vue";
import RowChartNoEmojiString from "../company/RowChartNoEmojiString.vue";
import RowChartOneEmoji from "../company/RowChartOneEmoji.vue";
import RowChartOneEmojiExpanded from "../company/RowChartOneEmojiExpanded.vue";
import IconInfo from "src/components/general/IconInfo.vue";
import InformationDialogWidget from "src/components/general/InformationDialogWidget.vue";
import RowChartOneEmojiWithoutIntersection from "../company/RowChartOneEmojiWithoutIntersection.vue";
import TextDialogWidget from "src/components/general/TextDialogWidget.vue";
import CompanyQuestionsCard from "../company/CompanyQuestionsCard.vue";
import ChartApex from "../../../general/charts/ChartApex.vue";
import RhCompareFilters from "../company/RhCompareFilters.vue";
import DashBoardRhMetrics from "./DashBoardRhMetrics.vue";
import DashBoardRhSurveys from "./DashBoardRhSurveys.vue";
import {
  buildFeelingMapCharts,
  buildFeelingSurveyColumns,
  buildQuestionCompareGroups,
  applyTimelineSeriesFill,
  formatPeriodAxisLabel,
  getTimelineSeriesLabel,
  omitPeriod,
  summarizeActiveFilters,
} from "../../../../utils/rhMetricDisplay";

export default {
  components: {
    ChartApex,
    DashBoardRhMetrics,
    DashBoardRhSurveys,
    RhCompareFilters,
    RowChart,
    TextDialogWidget,
    RowChartOneEmoji,
    IconInfo,
    InformationDialogWidget,
    RowChartNoEmojiString,
    RowChartOneEmojiExpanded,
    RowChartOneEmojiWithoutIntersection,
    CompanyQuestionsCard,
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
      voluntaryReasonsMap: [],
      voluntaryReasonsMapGeneral: [],
      reasonsChartOptions: {},
      dashboardsLoaded: false,
      mobile: false,
      chartOptions: {},
      parameters: {},
      period: [],
      area: [],
      role: [],
      unity: [],
      dismissalType: [],
      gender: [],
      etnia: [],
      pcd: [],
      state: [],
      city: [],
      userType: localStorage.getItem("userType"),
      insufficientSample: false,
      selectAllPeriods: false,
      selectAllUnity: false,
      selectAllArea: false,
      selectAllRole: false,
      selectAllDismissalType: false,
      selectAllGender: false,
      selectAllEtnia: false,
      selectAllPcd: false,
      selectAllState: false,
      selectAllCity: false,
      realocatedCount: 0,
      companyQuestions: [],
      isLoading: false,
      compareFilterSets: [],
      compareResults: [],
      expandedMetricKey: null,
      metricTimelines: {},
      timelineLoading: false,
      loadRequestId: 0,
    };
  },
  props: {
    companyId: [String, Number],
    variant: {
      type: String,
      default: "legacy",
    },
    rhSection: {
      type: String,
      default: "metrics",
    },
  },
  computed: {
    isRhVariant() {
      return this.variant === "rh";
    },
    showRhMetrics() {
      return this.isRhVariant && this.rhSection === "metrics";
    },
    showRhSurveys() {
      return (
        this.isRhVariant &&
        (this.rhSection === "quantitative" || this.rhSection === "qualitative")
      );
    },
    showRhQuantitative() {
      return this.isRhVariant && this.rhSection === "quantitative";
    },
    showRhQualitative() {
      return this.isRhVariant && this.rhSection === "qualitative";
    },
    rhPageTitle() {
      if (this.rhSection === "metrics") {
        return "Painel Executivo de Riscos e Impactos";
      }
      if (this.rhSection === "quantitative") {
        return "Pesquisa quantitativa";
      }
      if (this.rhSection === "qualitative") {
        return "Pesquisa qualitativa";
      }
      return "Indicadores de Riscos";
    },
    rhPageSubtitle() {
      if (this.rhSection === "metrics") {
        return "Visão de KPIs de risco e impacto com comparativo de mercado";
      }
      if (this.rhSection === "quantitative") {
        return "Avaliação pós-demissão e mapa de sentimentos";
      }
      if (this.rhSection === "qualitative") {
        return "Respostas textuais das pesquisas da empresa";
      }
      return "Monitoramento completo com comparativo de mercado";
    },
    isVoluntaryOnly() {
      const dismissalFilter = this.isRhVariant
        ? (this.compareFilterSets[0] && this.compareFilterSets[0].dismissalType) || []
        : this.dismissalType;

      return (
        dismissalFilter.length === 1 && dismissalFilter[0] === "voluntary"
      );
    },
    legacyPaddingStyle() {
      if (this.isRhVariant) {
        return {};
      }

      return {
        padding: this.userType === "ADMIN" ? "0" : "20px",
      };
    },
    disableFilters() {
      return (
        this.companyId === "TUDO" ||
        this.companyId === "B2B" ||
        this.companyId === "B2C"
      );
    },
    shutdownCompareGroups() {
      return buildQuestionCompareGroups({
        compareResults: this.compareResults,
        compareFilterSets: this.compareFilterSets,
        generalItems: this.shutDownGeneral,
        summarizeFilterSet: this.summarizeFilterSet,
        parseValue: (value) => this.removePercent(value),
      });
    },
    feelingSurveyColumnsRh() {
      return buildFeelingSurveyColumns({
        compareResults: this.compareResults,
        compareFilterSets: this.compareFilterSets,
        generalItems: this.feelingMapGeneral,
        summarizeFilterSet: this.summarizeFilterSet,
        parseValue: (value) => this.removePercent(value),
      });
    },
    feelingMapCharts() {
      return buildFeelingMapCharts({
        compareResults: this.compareResults,
        compareFilterSets: this.compareFilterSets,
        generalItems: this.feelingMapGeneral,
        summarizeFilterSet: this.summarizeFilterSet,
      });
    },
    shutdownSurveyColumns() {
      const merged = this.buildSurveyItems(
        this.shutDown,
        this.shutDownGeneral,
        "question"
      );

      return [
        {
          key: "company",
          title: "Sua empresa",
          hint: "Notas de 1 a 10",
          items: merged.companyItems,
        },
        {
          key: "general",
          title: "Média geral",
          hint: "Notas de 1 a 10",
          items: merged.generalItems,
        },
      ];
    },
    feelingSurveyColumns() {
      const merged = this.buildSurveyItems(
        this.feelingMap,
        this.feelingMapGeneral,
        "feeling"
      );

      return [
        {
          key: "company",
          title: "Sua empresa",
          hint: "Notas de 1 a 100",
          items: merged.companyItems,
        },
        {
          key: "general",
          title: "Média geral",
          hint: "Notas de 1 a 100",
          items: merged.generalItems,
        },
      ];
    },
    displayFeelingMapChart() {
      return this.buildSurveyItems(
        this.feelingMap,
        this.feelingMapGeneral,
        "feeling"
      ).companyItems.map((item) => ({
        feeling: item.label,
        count: item.value,
      }));
    },
    showShutdownSurvey() {
      if (this.isRhVariant) {
        return this.shutdownCompareGroups.length > 0;
      }

      return this.shutdownSurveyColumns.some(
        (column) => column.items.length > 0
      );
    },
    showFeelingMapSurvey() {
      if (this.isVoluntaryOnly) {
        return false;
      }

      if (this.isRhVariant) {
        return (
          this.feelingSurveyColumnsRh.some((column) => column.items.length > 0) ||
          this.feelingMapCharts.length > 0
        );
      }

      return this.feelingSurveyColumns.some((column) => column.items.length > 0);
    },
    selectedFilters() {
      const filters = [];

      // Filtros simples (string)
      filters.push(...this.period, ...this.area, ...this.role, ...this.unity);

      // Estado - apenas sigla
      this.state.forEach((value) => {
        if (typeof value === "object" && value.value) {
          filters.push(value.value);
        } else {
          filters.push(value);
        }
      });

      // Cidade - apenas nome
      this.city.forEach((value) => {
        if (typeof value === "object" && value.label) {
          filters.push(value.label.split(" (")[0]);
        } else {
          filters.push(value);
        }
      });

      // Filtros com mapeamento de label
      this.dismissalType.forEach((value) => {
        const option = this.dismissalTypeOptions.find(
          (opt) => opt.value === value
        );
        filters.push(option ? option.label : value);
      });

      this.gender.forEach((value) => {
        const option = this.genderOptions.find((opt) => opt.value === value);
        filters.push(option ? option.label : value);
      });

      this.etnia.forEach((value) => {
        const option = this.etniaOptions.find((opt) => opt.value === value);
        filters.push(option ? option.label : value);
      });

      // PCD com prefixo
      this.pcd.forEach((value) => {
        filters.push(`PCD: ${value}`);
      });

      return filters;
    },
    genderOptions() {
      return [
        { label: "Mulher Cisgênero", value: "cisgender_woman" },
        { label: "Homem Cisgênero", value: "cisgender_man" },
        { label: "Mulher Trans", value: "trans_woman" },
        { label: "Homem Trans", value: "trans_man" },
        { label: "Pessoa Não Binária", value: "non_binary" },
        { label: "Sem informação", value: "not_informed" },
      ];
    },
    etniaOptions() {
      return [
        { label: "Branca", value: "branca" },
        { label: "Preta", value: "preta" },
        { label: "Parda", value: "parda" },
        { label: "Amarela", value: "amarela" },
        { label: "Indígena", value: "indigena" },
        { label: "Sem informação", value: "not_informed" },
      ];
    },
    pcdOptions() {
      return [
        { label: "Sim", value: "Sim" },
        { label: "Não", value: "Não" },
      ];
    },
    dismissalTypeOptions() {
      return [
        { label: "Voluntária", value: "voluntary" },
        { label: "Involuntária", value: "involuntary" },
      ];
    },
  },
  watch: {
    companyId() {
      this.period = [];
      this.area = [];
      this.role = [];
      this.unity = [];
      this.dismissalType = [];
      this.gender = [];
      this.etnia = [];
      this.pcd = [];
      this.state = [];
      this.city = [];

      if (this.isRhVariant) {
        this.compareFilterSets = [this.createCompareFilterSet("Filtro 1")];
        this.expandedMetricKey = null;
        this.metricTimelines = {};
      }

      this.loadNpsSurveyAnswers();
    },
    feelingMap() {
      this.setChartOptions();
    },
    feelingMapGeneral() {
      this.setChartOptions();
    },
    voluntaryReasonsMap() {
      this.setReasonsChartOptions();
    },
    area(f) {
      if (!this.isRhVariant) {
        this.loadNpsSurveyAnswers();
      }
    },
    role(f) {
      if (!this.isRhVariant) {
        this.loadNpsSurveyAnswers();
      }
    },
    period(f) {
      if (!this.isRhVariant) {
        this.loadNpsSurveyAnswers();
      }
    },
    unity(f) {
      if (!this.isRhVariant) {
        this.loadNpsSurveyAnswers();
      }
    },
    dismissalType(f) {
      if (!this.isRhVariant) {
        this.loadNpsSurveyAnswers();
      }
    },
    gender(f) {
      if (!this.isRhVariant) {
        this.loadNpsSurveyAnswers();
      }
    },
    etnia(f) {
      if (!this.isRhVariant) {
        this.loadNpsSurveyAnswers();
      }
    },
    pcd(f) {
      if (!this.isRhVariant) {
        this.loadNpsSurveyAnswers();
      }
    },
    state(f) {
      if (!this.isRhVariant) {
        this.loadNpsSurveyAnswers();
      }
    },
    city(f) {
      if (!this.isRhVariant) {
        this.loadNpsSurveyAnswers();
      }
    },
    selectAllPeriods(value) {
      if (value) {
        this.period = this.parameters.period
          ? this.parameters.period.slice()
          : [];
      } else {
        this.period = [];
      }
    },
    selectAllUnity(value) {
      if (value) {
        this.unity = this.parameters.unity ? this.parameters.unity.slice() : [];
      } else {
        this.unity = [];
      }
    },
    selectAllArea(value) {
      if (value) {
        this.area = this.parameters.area ? this.parameters.area.slice() : [];
      } else {
        this.area = [];
      }
    },
    selectAllRole(value) {
      if (value) {
        this.role = this.parameters.role ? this.parameters.role.slice() : [];
      } else {
        this.role = [];
      }
    },
    selectAllDismissalType(value) {
      if (value) {
        this.dismissalType = this.parameters.dismissalType
          ? this.parameters.dismissalType.slice()
          : [];
      } else {
        this.dismissalType = [];
      }
    },
    selectAllGender(value) {
      if (value) {
        this.gender = this.parameters.gender
          ? this.parameters.gender.slice()
          : [];
      } else {
        this.gender = [];
      }
    },
    selectAllEtnia(value) {
      if (value) {
        this.etnia = this.parameters.etnia ? this.parameters.etnia.slice() : [];
      } else {
        this.etnia = [];
      }
    },
    selectAllPcd(value) {
      if (value) {
        this.pcd = this.parameters.pcd ? this.parameters.pcd.slice() : [];
      } else {
        this.pcd = [];
      }
    },
    selectAllState(value) {
      if (value) {
        this.state = this.parameters.state ? this.parameters.state.slice() : [];
      } else {
        this.state = [];
      }
    },
    selectAllCity(value) {
      if (value) {
        this.city = this.parameters.city ? this.parameters.city.slice() : [];
      } else {
        this.city = [];
      }
    },
  },

  methods: {
    getOptionLabel(options, value) {
      const option = options.find((opt) => opt.value === value);
      return option ? option.label : value;
    },
    gerarPDF() {
      const doc = new jsPDF({
        orientation: "landscape",
        format: "letter",
        compress: true,
      });

      doc.html(document.getElementById("q-app"), {
        x: 10,
        y: 10,
        autoPaging: true,
        html2canvas: {
          scale: 0.5,
        },
        windowWidth: document.getElementById("q-app").offsetWidth,
        windowHeight: document.getElementById("q-app").offsetHeight,
        callback: function (doc) {
          doc.save("arquivo.pdf");
        },
      });

      const element = document.getElementById("q-app"); // ou qualquer outro seletor para o elemento que você quer converter
      doc.html(element, {
        callback: function (doc) {
          doc.save("arquivo.pdf");
        },
      });
    },
    /* gerarPDF() {
      const element = document.getElementById("q-app");

      let options = {
        margin: 1,
        filename: "meu-documento.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Usar html2pdf() passando o elemento e as opções
      html2pdf().set(options).from(element).save();
    }, */
    formatFeeling(feeling) {
      /* remove diacritics */
      feeling = feeling.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      return feeling.toString().split(".")[0].toLowerCase().split("(")[0];
    },
    openMetricInfo(label) {
      if (this.$refs.metricInfoWidget) {
        this.$refs.metricInfoWidget.open(label);
      }
    },
    buildSurveyItems(companyItems, generalItems, labelKey) {
      const company = companyItems || [];
      const general = generalItems || [];

      const companyMap = {};
      company.forEach((item) => {
        companyMap[item[labelKey]] = item;
      });

      const generalMap = {};
      general.forEach((item) => {
        generalMap[item[labelKey]] = item;
      });

      const labels = [];
      const seen = new Set();

      [...general, ...company].forEach((item) => {
        const label = item[labelKey];

        if (!seen.has(label)) {
          seen.add(label);
          labels.push(label);
        }
      });

      return {
        labels,
        companyItems: labels.map((label) => ({
          label,
          value: companyMap[label]
            ? this.removePercent(companyMap[label].count)
            : 0,
          insufficient: false,
        })),
        generalItems: labels.map((label) => ({
          label,
          value: generalMap[label]
            ? this.removePercent(generalMap[label].count)
            : 0,
          insufficient: false,
        })),
      };
    },
    setChartOptions() {
      this.chartOptions = {
        chart: {
          type: "polarArea",
        },
        labels: this.displayFeelingMapChart.map((item) => item.feeling.toString()),
        stroke: {
          colors: ["#fff"],
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#f54890", "#35a97d", "#1a27b7", "#f54890"],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 70, 100],
            colorStops: [],
          },
        },
        yaxis: {
          show: false,
        },
        legend: {
          position: "right",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        tooltip: {
          y: {
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      };

      setTimeout(() => {
        document.querySelectorAll(".apexcharts-legend-text").forEach((el) => {
          el.parentElement.classList.add(this.formatFeeling(el.innerHTML));

          //console.log(el.parentElement);
          /* get pattern and first childreh */

          /* el.parentElement.parentElement.firstChild.classList.add(
            this.formatFeeling(el.innerHTML)
          ); */
        });
      }, 500);
    },
    setReasonsChartOptions() {
      this.reasonsChartOptions = {
        chart: { type: "polarArea" },
        labels: this.voluntaryReasonsMap.map((c) => c.reason.toString()),
        stroke: { colors: ["#fff"] },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#f54890", "#35a97d", "#1a27b7", "#f54890"],
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 70, 100],
            colorStops: [],
          },
        },
        yaxis: { show: false },
        legend: { position: "right" },
        responsive: [
          { breakpoint: 480, options: { legend: { position: "bottom" } } },
        ],
        tooltip: { y: { formatter: (val) => val + "%" } },
      };
    },
    removePercent(value) {
      if (value === null || value === undefined || value === "") {
        return NaN;
      }

      const raw = String(value).replace("%", "").replace(",", ".").trim();

      if (raw === "N/A" || raw === "Sem informações") {
        return NaN;
      }

      const parsed = Number(raw);

      return Number.isFinite(parsed) ? parsed : NaN;
    },
    createCompareFilterSet(label) {
      return {
        id: `filter-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        label,
        period: null,
        unity: null,
        area: null,
        role: null,
        dismissalType: null,
        gender: null,
        etnia: null,
        pcd: null,
        state: null,
        city: null,
      };
    },
    hasFilterValue(value) {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return value !== null && value !== undefined && value !== "";
    },
    shouldWarnInsufficientFilterData(report) {
      if (!report) {
        return false;
      }

      const hasFilters = this.isRhVariant
        ? this.hasAnyCompareFilterSelected()
        : this.selectedFilters.length > 0;

      if (!hasFilters) {
        return false;
      }

      const nps = report.nps;
      const noMetricData =
        nps === undefined ||
        nps === null ||
        nps === "" ||
        nps === "N/A" ||
        nps === "0%" ||
        nps === "Sem informações";

      return Boolean(report.insufficientSample || report.noData || noMetricData);
    },
    normalizeFilterValues(values) {
      if (!this.hasFilterValue(values)) {
        return [];
      }

      if (Array.isArray(values)) {
        return values;
      }

      return [values];
    },
    getLegacyFilterSet() {
      return {
        period: this.period,
        unity: this.unity,
        area: this.area,
        role: this.role,
        dismissalType: this.dismissalType,
        gender: this.gender,
        etnia: this.etnia,
        pcd: this.pcd,
        state: this.state,
        city: this.city,
      };
    },
    getPrimaryFilterSet() {
      if (this.isRhVariant) {
        if (!this.compareFilterSets.length) {
          this.compareFilterSets = [this.createCompareFilterSet("Filtro 1")];
        }

        return this.compareFilterSets[0];
      }

      return this.getLegacyFilterSet();
    },
    getReportFilterSets() {
      if (this.isRhVariant) {
        if (!this.compareFilterSets.length) {
          this.compareFilterSets = [this.createCompareFilterSet("Filtro 1")];
        }

        return this.compareFilterSets;
      }

      return [
        {
          label: "Sua Empresa",
          ...this.getLegacyFilterSet(),
        },
      ];
    },
    buildReportFilters(filterSet) {
      const filters = [
        {
          name: "companyId",
          model: this.companyId,
        },
      ];

      const fields = [
        ["area", filterSet.area],
        ["role", filterSet.role],
        ["period", filterSet.period],
        ["unity", filterSet.unity],
        ["dismissalType", filterSet.dismissalType],
        ["gender", filterSet.gender],
        ["etnia", filterSet.etnia],
        ["pcd", filterSet.pcd],
        ["state", filterSet.state],
        ["city", filterSet.city],
      ];

      fields.forEach(([name, values]) => {
        const normalizedValues = this.normalizeFilterValues(values);

        if (normalizedValues.length > 0) {
          filters.push({
            name,
            model: JSON.stringify(normalizedValues),
          });
        }
      });

      return filters;
    },
    extractCompareResult(report, label) {
      return {
        label,
        nps: report.nps,
        brandRisk: report.brandRisk,
        laborRisk: report.laborRisk,
        realocateds: report.realocateds,
        welcomed: report.welcomed,
        termination: report.termination,
        laborIssues: report.laborIssues,
        realocatedCount: report.realocatedCount,
        insufficientSample: report.insufficientSample,
        shutDown: report.shutDown || [],
        feelingMap: report.feelingMap || [],
      };
    },
    summarizeFilterSet(filterSet) {
      return summarizeActiveFilters(filterSet, {
        dismissalType: (value) =>
          this.getOptionLabel(this.dismissalTypeOptions, value),
        gender: (value) => this.getOptionLabel(this.genderOptions, value),
        etnia: (value) => this.getOptionLabel(this.etniaOptions, value),
      });
    },
    assignPrimaryReport(npsSurveyReport) {
      this.nps = npsSurveyReport.nps;
      this.brandRisk = npsSurveyReport.brandRisk;
      this.laborRisk = npsSurveyReport.laborRisk;
      this.realocateds = npsSurveyReport.realocateds;
      this.welcomed = npsSurveyReport.welcomed;
      this.termination = npsSurveyReport.termination;
      this.laborIssues = npsSurveyReport.laborIssues;
      this.shutDown = npsSurveyReport.shutDown;
      this.feelingMap = npsSurveyReport.feelingMap;
      this.voluntaryReasonsMap = npsSurveyReport.voluntaryReasonsMap || [];
      this.realocatedCount = npsSurveyReport.realocatedCount;

      this.npsGeneral = npsSurveyReport.general.nps;
      this.brandRiskGeneral = npsSurveyReport.general.brandRisk;
      this.laborRiskGeneral = npsSurveyReport.general.laborRisk;
      this.realocatedsGeneral = npsSurveyReport.general.realocateds;
      this.welcomedGeneral = npsSurveyReport.general.welcomed;
      this.terminationGeneral = npsSurveyReport.general.termination;
      this.laborIssuesGeneral = npsSurveyReport.general.laborIssues;
      this.shutDownGeneral = npsSurveyReport.general.shutDown;
      this.feelingMapGeneral = npsSurveyReport.general.feelingMap;
      this.voluntaryReasonsMapGeneral =
        npsSurveyReport.general.voluntaryReasonsMap || [];
      this.insufficientSample = npsSurveyReport.insufficientSample;
      this.companyQuestions =
        npsSurveyReport.companyQuestions == null
          ? []
          : npsSurveyReport.companyQuestions;
    },
    addCompareFilterSet() {
      if (this.compareFilterSets.length >= 3) {
        return;
      }

      this.compareFilterSets.push(
        this.createCompareFilterSet(`Filtro ${this.compareFilterSets.length + 1}`)
      );
      this.loadNpsSurveyAnswers();
    },
    removeCompareFilterSet(index) {
      if (index === 0) {
        return;
      }

      this.compareFilterSets.splice(index, 1);
      this.compareFilterSets.forEach((set, setIndex) => {
        set.label = `Filtro ${setIndex + 1}`;
      });
      this.loadNpsSurveyAnswers();
    },
    extractTimelineValue(report, metricKey, useGeneral) {
      if (!report) {
        return null;
      }

      const source = useGeneral ? report.general : report;
      const rawMap = {
        nps: source.nps,
        laborRisk: source.laborRisk,
        brandRisk: source.brandRisk,
        realocateds: source.realocateds,
        socialImpactReduction: source.realocateds,
        welcomed: source.welcomed,
        realocatedCount: source.realocatedCount,
        termination: source.termination,
        laborIssues: source.laborIssues,
      };
      const raw = rawMap[metricKey];

      if (
        raw === undefined ||
        raw === null ||
        raw === "" ||
        raw === "N/A" ||
        raw === "Sem informações"
      ) {
        return null;
      }

      if (metricKey === "welcomed") {
        if (String(raw).includes("/")) {
          return parseInt(String(raw).split("/")[0], 10);
        }
      }

      if (metricKey === "realocatedCount") {
        return Number(raw);
      }

      return this.removePercent(raw);
    },
    async loadMetricTimeline(metricKey) {
      const periods = (this.parameters.period || []).slice();

      if (!periods.length) {
        this.$set(this.metricTimelines, metricKey, {
          categories: [],
          series: [],
        });
        return;
      }

      this.timelineLoading = true;
      const filterSets = this.getReportFilterSets();

      try {
        const reportsByPeriod = await Promise.all(
          periods.map(async (period) => {
            const reports = await Promise.all(
              filterSets.map((set) =>
                filterCrud(
                  this.buildReportFilters({
                    ...omitPeriod(set),
                    period,
                  }),
                  "reports/NPSSurveyAnswers"
                )
              )
            );

            return {
              period,
              reports,
            };
          })
        );

        const series = filterSets.map((set, setIndex) => ({
          name: getTimelineSeriesLabel(set, setIndex, this.compareFilterSets),
          data: applyTimelineSeriesFill(
            metricKey,
            reportsByPeriod.map(({ reports }) =>
              this.extractTimelineValue(reports[setIndex], metricKey, false)
            )
          ),
        }));

        series.push({
          name: "Média Geral",
          data: applyTimelineSeriesFill(
            metricKey,
            reportsByPeriod.map(({ reports }) =>
              this.extractTimelineValue(reports[0], metricKey, true)
            )
          ),
        });

        this.$set(this.metricTimelines, metricKey, {
          categories: periods.map((period) => formatPeriodAxisLabel(period)),
          rawPeriods: periods,
          series,
        });
      } finally {
        this.timelineLoading = false;
      }
    },
    async toggleMetricExpand(metricKey) {
      if (this.expandedMetricKey === metricKey) {
        this.expandedMetricKey = null;
        return;
      }

      this.expandedMetricKey = metricKey;
      await this.loadMetricTimeline(metricKey);
    },
    hasAnyCompareFilterSelected() {
      if (!this.isRhVariant) {
        return this.selectedFilters.length > 0;
      }

      return this.compareFilterSets.some((set) => {
        return [
          set.period,
          set.unity,
          set.area,
          set.role,
          set.dismissalType,
          set.gender,
          set.etnia,
          set.pcd,
          set.state,
          set.city,
        ].some((value) => this.hasFilterValue(value));
      });
    },
    pruneScalarFilter(set, field, options) {
      const value = set[field];

      if (!this.hasFilterValue(value) || !options || options.length === 0) {
        set[field] = Array.isArray(value) ? [] : null;
        return;
      }

      if (Array.isArray(value)) {
        set[field] = value.filter((item) => options.includes(item));
        return;
      }

      if (!options.includes(value)) {
        set[field] = null;
      }
    },
    pruneFilterSet(set) {
      this.pruneScalarFilter(set, "period", this.parameters.period);
      this.pruneScalarFilter(set, "unity", this.parameters.unity);
      this.pruneScalarFilter(set, "area", this.parameters.area);
      this.pruneScalarFilter(set, "role", this.parameters.role);
      this.pruneScalarFilter(set, "dismissalType", this.parameters.dismissalType);
      this.pruneScalarFilter(set, "gender", this.parameters.gender);
      this.pruneScalarFilter(set, "etnia", this.parameters.etnia);
      this.pruneScalarFilter(set, "pcd", this.parameters.pcd);
      this.pruneScalarFilter(set, "state", this.parameters.state);
      this.pruneScalarFilter(set, "city", this.parameters.city);
    },
    loadParameters: async function () {
      let filters = [];

      if (!this.isRhVariant) {
        const activeSet = this.getPrimaryFilterSet();

        if (activeSet.period && activeSet.period.length > 0) {
          filters.push({
            name: "period",
            model: JSON.stringify(activeSet.period),
          });
        }

        if (activeSet.unity && activeSet.unity.length > 0) {
          filters.push({
            name: "unity",
            model: JSON.stringify(activeSet.unity),
          });
        }

        if (activeSet.area && activeSet.area.length > 0) {
          filters.push({
            name: "area",
            model: JSON.stringify(activeSet.area),
          });
        }

        if (activeSet.dismissalType && activeSet.dismissalType.length > 0) {
          filters.push({
            name: "dismissalType",
            model: JSON.stringify(activeSet.dismissalType),
          });
        }

        if (activeSet.gender && activeSet.gender.length > 0) {
          filters.push({
            name: "gender",
            model: JSON.stringify(activeSet.gender),
          });
        }

        if (activeSet.etnia && activeSet.etnia.length > 0) {
          filters.push({
            name: "etnia",
            model: JSON.stringify(activeSet.etnia),
          });
        }

        if (activeSet.pcd && activeSet.pcd.length > 0) {
          filters.push({
            name: "pcd",
            model: JSON.stringify(activeSet.pcd),
          });
        }

        if (activeSet.state && activeSet.state.length > 0) {
          filters.push({
            name: "state",
            model: JSON.stringify(activeSet.state),
          });
        }

        if (activeSet.city && activeSet.city.length > 0) {
          filters.push({
            name: "city",
            model: JSON.stringify(activeSet.city),
          });
        }
      }

      const data = await filterCrud(
        filters,
        `companies/config/${this.companyId}`
      );

      this.parameters = data;

      // Garantir que os parâmetros tenham valores padrão
      if (!this.parameters.period) this.parameters.period = [];
      if (!this.parameters.unity) this.parameters.unity = [];
      if (!this.parameters.area) this.parameters.area = [];
      if (!this.parameters.role) this.parameters.role = [];
      if (!this.parameters.dismissalType) this.parameters.dismissalType = [];
      if (!this.parameters.gender) this.parameters.gender = [];
      if (!this.parameters.etnia) this.parameters.etnia = [];
      if (!this.parameters.pcd) this.parameters.pcd = [];
      if (!this.parameters.state) this.parameters.state = [];
      if (!this.parameters.city) this.parameters.city = [];

      if (this.isRhVariant) {
        this.compareFilterSets.forEach((set) => this.pruneFilterSet(set));
      } else {
        this.pruneFilterSet(this.getPrimaryFilterSet());
      }
    },
    loadNpsSurveyAnswers: async function () {
      const requestId = ++this.loadRequestId;
      this.isLoading = true;

      try {
        await this.loadParameters();

        if (requestId !== this.loadRequestId) {
          return;
        }

        if (this.companyId === "null") {
          this.$q.notify({
            type: "error",
            message: "Nenhuma empresa selecionada para o usuário.",
          });
          return;
        }

        const filterSets = this.getReportFilterSets();

        this.$q.loading.show();

        const reports = await Promise.all(
          filterSets.map((set) =>
            filterCrud(this.buildReportFilters(set), "reports/NPSSurveyAnswers")
          )
        );

        if (requestId !== this.loadRequestId) {
          return;
        }

        const npsSurveyReport = reports[0];

        if (!npsSurveyReport) {
          return;
        }

        this.assignPrimaryReport(npsSurveyReport);
        this.compareResults = reports.map((report, index) =>
          this.extractCompareResult(report, filterSets[index].label)
        );

        if (this.expandedMetricKey) {
          await this.loadMetricTimeline(this.expandedMetricKey);
        }

        // Avisar somente quando há filtro ativo e o relatório não retorna métricas
        if (this.shouldWarnInsufficientFilterData(npsSurveyReport)) {
          this.$q.notify({
            type: "warning",
            message: "Atenção\nNão há dados suficientes para este filtro.",
            html: true,
            timeout: 3000,
          });
        }

        function compareFeelings(a, b) {
          if (a.feeling < b.feeling) {
            return -1;
          }
          if (a.feeling > b.feeling) {
            return 1;
          }
          return 0;
        }

        this.feelingMap.sort(compareFeelings);
        this.feelingMapGeneral.sort(compareFeelings);

        this.dashboardsLoaded = true;

        this.$refs.infoWidget.close();
        if (
          !this.isRhVariant &&
          npsSurveyReport.insufficientSample &&
          this.shouldWarnInsufficientFilterData(npsSurveyReport)
        ) {
          this.$refs.infoWidget.open();
        }
      } finally {
        if (requestId === this.loadRequestId) {
          this.$q.loading.hide();
          this.isLoading = false;
        }
      }
    },
    async downloadExcel() {
      this.downloadLoading = true;

      try {
        const filters = [
          {
            name: "companyId",
            model: this.companyId,
          },
        ];

        if (this.area.length > 0) {
          filters.push({
            name: "area",
            model: JSON.stringify(this.area),
          });
        }

        if (this.role.length > 0) {
          filters.push({
            name: "role",
            model: JSON.stringify(this.role),
          });
        }

        if (this.period.length > 0) {
          filters.push({
            name: "period",
            model: JSON.stringify(this.period),
          });
        }

        if (this.unity.length > 0) {
          filters.push({
            name: "unity",
            model: JSON.stringify(this.unity),
          });
        }

        if (this.dismissalType.length > 0) {
          filters.push({
            name: "dismissalType",
            model: JSON.stringify(this.dismissalType),
          });
        }

        if (this.gender.length > 0) {
          filters.push({
            name: "gender",
            model: JSON.stringify(this.gender),
          });
        }

        if (this.etnia.length > 0) {
          filters.push({
            name: "etnia",
            model: JSON.stringify(this.etnia),
          });
        }

        if (this.pcd.length > 0) {
          filters.push({
            name: "pcd",
            model: JSON.stringify(this.pcd),
          });
        }

        if (this.state.length > 0) {
          filters.push({
            name: "state",
            model: JSON.stringify(this.state),
          });
        }

        if (this.city.length > 0) {
          filters.push({
            name: "city",
            model: JSON.stringify(this.city),
          });
        }

        const queryParams = new URLSearchParams();
        filters.forEach((filter) => {
          queryParams.append(filter.name, filter.model);
        });

        const response = await fetch(
          `${baseApiUrl}/reports/npsSurveyAnswers/export?${queryParams.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao baixar o arquivo");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "respostas-nps.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        this.$q.notify({
          type: "positive",
          message: "Arquivo baixado com sucesso!",
        });
      } catch (error) {
        console.error("Erro ao baixar Excel:", error);
        this.$q.notify({
          type: "negative",
          message: "Erro ao baixar o arquivo Excel",
        });
      } finally {
        this.downloadLoading = false;
      }
    },
    async importExcel() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".xlsx";

      input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        this.$q
          .dialog({
            title: "Importar Respostas",
            message: `
            <div style="text-align: left;">
              <p><strong>Arquivo:</strong> ${file.name}</p>
              <p><strong>Regras importantes:</strong></p>
              <ul>
                <li>CPF deve ser enviado sem pontos e traços</li>
                <li>Ao menos CPF ou Email deve estar preenchido</li>
                <li>Valores numéricos (NPS, riscos) devem estar entre 0 e 10</li>
                <li>Campos JSON devem ser JSON válido ou deixados em branco</li>
                <li>Tipo de Demissão: voluntary ou involuntary</li>
                <li>Alerta: ALERT ou NORMAL</li>
                <li>Realocado: REALOCATED ou NOT_REALOCATED</li>
              </ul>
              <p>Deseja continuar com a importação?</p>
            </div>
          `,
            html: true,
            cancel: true,
            persistent: true,
          })
          .onOk(async () => {
            await this.processImport(file);
          });
      };

      input.click();
    },
    async processImport(file) {
      this.importLoading = true;

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          `${baseApiUrl}/reports/npsSurveyAnswers/import`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Erro na importação");
        }

        // Mostrar resumo da importação
        let message = `<div style="text-align: left;">`;
        message += `<p><strong>${result.success} registros importados com sucesso</strong></p>`;

        if (result.errors && result.errors.length > 0) {
          message += `<p><strong>${result.errors.length} erros encontrados:</strong></p>`;
          message += `<ul>`;
          result.errors.forEach((error) => {
            message += `<li>Linha ${error.row}: ${error.reason}</li>`;
          });
          message += `</ul>`;
        }
        message += `</div>`;

        this.$q.dialog({
          title: "Resultado da Importação",
          message: message,
          html: true,
          ok: "Fechar",
        });

        // Recarregar os dados do dashboard
        await this.loadNpsSurveyAnswers();
      } catch (error) {
        console.error("Erro na importação:", error);
        this.$q.notify({
          type: "negative",
          message: error.message || "Erro ao importar o arquivo",
        });
      } finally {
        this.importLoading = false;
      }
    },
    showImportInfo() {
      this.$refs.excelImportInfo.show();
    },
  },
  async mounted() {
    this.mobile = window.mobileAndTabletCheck();

    if (this.isRhVariant) {
      this.compareFilterSets = [this.createCompareFilterSet("Filtro 1")];
    }

    if (this.userType !== "ADMIN") {
      this.loadParameters();
    }
    this.loadNpsSurveyAnswers();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

.home-company--legacy {
  width: 100vw;
  height: 100%;
  overflow: auto;
}

.box__button-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* Ajuste conforme sua necessidade */
  gap: 20px;
  /* Ajuste conforme sua necessidade */
  margin: 20px 0px;
}

.box__button-actions-item {
  flex: 1 0 100px;
  /* Ajuste conforme sua necessidade */
  box-sizing: border-box;
  padding: 10px;
  background: rgba(21, 170, 124, 1);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.box__button-actions-item p {
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}

.box__three-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* Ajuste conforme sua necessidade */
  gap: 20px;
  /* Ajuste conforme sua necessidade */
  margin: 20px 0px;
}

.box__three-columns-item {
  flex: 1 0 425px;
  /* Ajuste conforme sua necessidade */
  box-sizing: border-box;
  padding: 20px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  gap: 20px;
}

.box__filters {
  background: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.box__filters-title {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 29.26px;
  color: black;
  margin: 0;
  margin-bottom: 20px;
}

.box__filters-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.box__filters-wrap-item {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 29.26px;
  border-radius: 5px;
}

.nofilter {
  font-size: 14px;
  font-weight: 400;
  line-height: 29.26px;
  text-align: center;
}

.box__filters-wrap-item::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  -moz-border-radius: 7.5px;
  -webkit-border-radius: 7.5px;
  border-radius: 7.5px;
  background-color: rgba(21, 170, 124, 1);
}

.box__three-columns-item h2,
.box__two-columns-item h2,
.card h2 {
  color: rgba(26, 39, 183, 1);
  font-size: 32px;
  line-height: 39px;
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
}

.card h2 {
  text-align: center;
}

.box__two-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* Ajuste conforme sua necessidade */
  gap: 20px;
  /* Ajuste conforme sua necessidade */
  margin: 20px 0px;
}

.box__two-columns-item {
  flex: 1 0 400px;
  /* Ajuste conforme sua necessidade */
  box-sizing: border-box;
  padding: 20px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  gap: 20px;
}

.your-company,
.general {
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 29.26px;
  position: relative;
  display: flex;
}

.your-company {
  color: rgba(182, 61, 158, 1);
}

.general {
  color: rgba(248, 95, 0, 1);
}

.score-description {
  content: "notas de 1 a 10";
  font-size: 12px;
  font-weight: 700;
  line-height: 14.63px;
  text-align: center;
  color: rgba(91, 91, 91, 1);
  margin: 0;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.card {
  flex: 1;
  box-sizing: border-box;
  padding: 20px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 20px 0px;
}

.card-col {
  flex: 1 0 50%;
  padding: 0 5%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
}

.card-top {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.card-top h2 {
  margin: 0;
}

.card-top .tag {
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
  background: linear-gradient(180deg, #5c31ac 0%, #b73d9d 100%);
  border-radius: 10px;
  color: white;
  font-weight: 700;
  padding: 5px 20px;
}

@media (max-width: 768px) {
  .box__three-columns-item,
  .box__two-columns-item,
  .card {
    flex: 1 0 100%;
  }

  .card .row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.box__button-actions-download {
  background: rgba(26, 39, 183, 1);
  cursor: pointer;
}

.tooltip-text {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
}

.box__button-actions-item.label::before {
  content: "* Não há filtros disponíveis";
  position: absolute;
  display: inline-block;
  bottom: -9px;
  left: 0;
  height: 10px;
  border-radius: 7.5px;
  color: black;
}

.action-button {
  min-width: 200px;
  padding: 12px 24px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .action-button {
    min-width: 150px;
    padding: 10px 16px;
    font-size: 12px;
  }
}
</style>
