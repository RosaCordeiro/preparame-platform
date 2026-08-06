<template>
  <div>
    <div v-if="!hasMetricsData" class="rh-dashboard-loading">
      <q-spinner-dots color="primary" size="32px" />
      <span>Carregando indicadores…</span>
    </div>

    <div v-else class="rh-dashboard-grid">
      <div
        v-for="metric in metricCards"
        :key="metric.key"
        class="rh-metric-slot"
        :class="{ 'rh-metric-slot--expanded': expandedMetricKey === metric.key }"
      >
        <component
          :is="metric.component"
          v-bind="metric.props"
          :coming-soon="metric.comingSoon"
          :clickable="isMetricClickable(metric)"
          :expanded="isMetricExpanded(metric)"
          @toggle="$emit('metric-toggle', metric.key)"
          @info="$emit('metric-info', metric.infoLabel || metric.props.title)"
        >
          <UiMetricTimeline
            v-if="isMetricExpanded(metric)"
            :categories="timelineCategories"
            :raw-periods="timelineRawPeriods"
            :series="timelineSeriesFor(metric.key)"
            :loading="timelineLoading"
            :value-suffix="metric.timelineSuffix || ''"
            :subtitle="metric.timelineSubtitle"
          />
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import RhMetricCard from "../company/RhMetricCard.vue";
import RhStatCard from "../company/RhStatCard.vue";
import UiMetricTimeline from "../../../general/ui/UiMetricTimeline.vue";
import {
  buildCompareRows,
  buildCompareRowsRaw,
  parseMetricValue,
} from "../../../../utils/rhMetricDisplay";

const COMING_SOON_CARDS = [
  {
    key: "newConflictManagement",
    title: "Gestão de Conflitos e Dúvidas em Andamento",
    subtitle: "Acompanhamento de conflitos e dúvidas em andamento",
  },
  {
    key: "newWhistleblowingChannel",
    title: "Canal de denúncias novos",
    subtitle: "Indicadores do canal de denúncias",
  },
  {
    key: "laborRiskReduction",
    title: "Redução de Conflitos Críticos e Dúvidas com o PDR",
    subtitle: "Evolução de conflitos críticos e dúvidas no PDR",
  },
  {
    key: "reputationalImpactReduction",
    title: "Redução de impacto reputacional",
    subtitle: "Evolução do impacto na reputação",
  },
  {
    key: "psychosocialImpactReduction",
    title: "Redução de Impacto Negativo na Saúde Mental com o PDR",
    subtitle: "Evolução do impacto negativo na saúde mental no PDR",
  },
];

/** Placeholders da quantitativa — ocultos temporariamente. */
const QUANTITATIVE_COMING_SOON_CARDS = [];

function mapComingSoonCards(list) {
  return list.map((card) => ({
    key: card.key,
    component: "RhMetricCard",
    comingSoon: true,
    infoLabel: card.title,
    props: {
      title: card.title,
      subtitle: card.subtitle,
    },
  }));
}

export default {
  components: {
    RhMetricCard,
    RhStatCard,
    UiMetricTimeline,
  },
  props: {
    compareResults: {
      type: Array,
      default: () => [],
    },
    compareFilterSets: {
      type: Array,
      default: () => [],
    },
    summarizeFilterSet: {
      type: Function,
      default: null,
    },
    npsGeneral: [String, Number],
    brandRiskGeneral: [String, Number],
    laborRiskGeneral: [String, Number],
    realocatedsGeneral: [String, Number],
    welcomedGeneral: [String, Number],
    terminationGeneral: [String, Number],
    laborIssuesGeneral: [String, Number],
    removePercent: {
      type: Function,
      required: true,
    },
    exEmployeeEvaluationCompany: {
      type: [Number, String],
      default: NaN,
    },
    exEmployeeEvaluationGeneral: {
      type: [Number, String],
      default: NaN,
    },
    expandedMetricKey: {
      type: String,
      default: null,
    },
    metricTimelines: {
      type: Object,
      default: () => ({}),
    },
    timelineLoading: {
      type: Boolean,
      default: false,
    },
    cardCatalog: {
      type: String,
      default: "kpi",
      validator: (value) => ["kpi", "panelRemainder"].includes(value),
    },
  },
  computed: {
    hasMetricsData() {
      if (this.cardCatalog === "panelRemainder") {
        return true;
      }

      return this.compareResults.length > 0;
    },
    primaryResult() {
      return this.compareResults[0] || {};
    },
    primaryInsufficient() {
      return Boolean(this.primaryResult.insufficientSample);
    },
    timelineCategories() {
      const timeline = this.metricTimelines[this.expandedMetricKey];

      return timeline && timeline.categories ? timeline.categories : [];
    },
    timelineRawPeriods() {
      const timeline = this.metricTimelines[this.expandedMetricKey];

      return timeline && timeline.rawPeriods ? timeline.rawPeriods : [];
    },
    kpiCards() {
      return [
        {
          key: "nps",
          component: "RhMetricCard",
          infoLabel: "e-NPS",
          timelineSubtitle: "e-NPS por período",
          hideTimeline: true,
          props: {
            title: "e-NPS",
            subtitle: "Recomendação da empresa pelos ex-colaboradores",
            companyValue: this.metricValue("nps"),
            generalValue: this.parseGeneralValue(this.npsGeneral),
            compareRows: this.compareRowsFor("nps"),
            minValue: -100,
            maxValue: 100,
            intersectionValue: 0,
            insufficientSample: this.primaryInsufficient,
          },
        },
        {
          key: "laborRisk",
          component: "RhMetricCard",
          infoLabel: "Risco Trabalhista",
          timelineSubtitle: "Risco trabalhista por período",
          hideTimeline: true,
          props: {
            title: "Risco Trabalhista",
            subtitle: "Exposição a riscos de ações trabalhistas",
            companyValue: this.metricValue("laborRisk"),
            generalValue: this.parseGeneralValue(this.laborRiskGeneral),
            compareRows: this.compareRowsFor("laborRisk"),
            minValue: 0,
            maxValue: 10,
            intersectionValue: 4,
            invertedColors: true,
            insufficientSample: this.primaryInsufficient,
          },
        },
        {
          key: "brandRisk",
          component: "RhMetricCard",
          infoLabel: "Risco de marca",
          timelineSubtitle: "Risco de marca por período",
          hideTimeline: true,
          props: {
            title: "Risco de marca",
            subtitle: "Percepção da marca empregadora",
            companyValue: this.metricValue("brandRisk"),
            generalValue: this.parseGeneralValue(this.brandRiskGeneral),
            compareRows: this.compareRowsFor("brandRisk"),
            minValue: 0,
            maxValue: 10,
            intersectionValue: 4,
            invertedColors: true,
            insufficientSample: this.primaryInsufficient,
          },
        },
        {
          key: "realocateds",
          component: "RhMetricCard",
          infoLabel: "Realocados",
          timelineSubtitle: "Taxa acumulada de recolocação por mês (data da recolocação)",
          timelineSuffix: "%",
          hideTimeline: true,
          props: {
            title: "Realocados",
            subtitle: "Percentual de ex-colaboradores recolocados",
            companyValue: this.metricValue("realocateds"),
            compareRows: this.compareRowsFor("realocateds"),
            minValue: 0,
            maxValue: 100,
            intersectionValue: 50,
            suffix: "%",
            hideGeneral: true,
          },
        },
        {
          key: "welcomed",
          component: "RhStatCard",
          infoLabel: "Acolhidos",
          timelineSubtitle: "Acolhidos por período",
          hideTimeline: true,
          props: {
            title: "Acolhidos",
            subtitle: "Total de pessoas acolhidas no programa",
            companyValue: this.primaryResult.welcomed,
            compareRows: this.compareRowsForRaw("welcomed"),
            insufficient: this.primaryInsufficient,
          },
        },
        {
          key: "realocatedCount",
          component: "RhStatCard",
          infoLabel: "Pessoas realocadas",
          timelineSubtitle: "Quantidade realocada por período",
          hideTimeline: true,
          props: {
            title: "Pessoas realocadas",
            subtitle: "Quantidade absoluta no período",
            companyValue: this.primaryResult.realocatedCount,
            compareRows: this.compareRowsForRaw("realocatedCount"),
            insufficient: this.primaryInsufficient,
          },
        },
        {
          key: "termination",
          component: "RhMetricCard",
          infoLabel: "Cálculos da rescisão estão corretos?",
          timelineSubtitle: "Rescisão correta por período",
          timelineSuffix: "%",
          hideTimeline: true,
          props: {
            title: "Cálculos da rescisão",
            subtitle: "Ex-colaboradores que consideram os cálculos corretos",
            companyValue: this.metricValue("termination"),
            generalValue: this.parseGeneralValue(this.terminationGeneral),
            compareRows: this.compareRowsFor("termination"),
            suffix: "%",
            intersectionValue: 95,
            insufficientSample: this.primaryInsufficient,
          },
        },
        {
          key: "laborIssues",
          component: "RhMetricCard",
          infoLabel: "Pendências trabalhistas",
          timelineSubtitle: "Pendências por período",
          timelineSuffix: "%",
          hideTimeline: true,
          props: {
            title: "Pendências trabalhistas",
            subtitle: "Incidência de pendências reportadas",
            companyValue: this.metricValue("laborIssues"),
            generalValue: this.parseGeneralValue(this.laborIssuesGeneral),
            compareRows: this.compareRowsFor("laborIssues"),
            suffix: "%",
            minValue: 0,
            maxValue: 10,
            intersectionValue: 3,
            invertedColors: true,
            insufficientSample: this.primaryInsufficient,
          },
        },
      ];
    },
    panelRemainderCards() {
      const comingSoon = mapComingSoonCards(COMING_SOON_CARDS);
      const socialImpactCard = {
        key: "socialImpactReduction",
        component: "RhMetricCard",
        comingSoon: false,
        infoLabel: "Redução de impacto negativo social",
        timelineSubtitle:
          "Taxa acumulada de recolocação por mês (data da recolocação)",
        timelineSuffix: "%",
        props: {
          title: "Redução de impacto negativo social",
          subtitle:
            "Taxa de recolocação das pessoas do programa (impacto negativo social)",
          companyValue: this.metricValue("realocateds"),
          compareRows: this.compareRowsFor("realocateds"),
          minValue: 0,
          maxValue: 100,
          intersectionValue: 50,
          suffix: "%",
          hideGeneral: true,
          insufficientSample: this.primaryInsufficient,
        },
      };
      const evaluationCard = {
        key: "exEmployeeEvaluation",
        component: "RhMetricCard",
        comingSoon: false,
        infoLabel: "Avaliação dos ex-colaboradores do PDR",
        timelineSubtitle:
          "Nota média das conversas por mês (data do atendimento)",
        props: {
          title: "Avaliação dos ex-colaboradores do PDR",
          subtitle: "Nota média das conversas do programa",
          companyValue: this.parseGeneralValue(
            this.exEmployeeEvaluationCompany
          ),
          generalValue: this.parseGeneralValue(
            this.exEmployeeEvaluationGeneral
          ),
          minValue: 0,
          maxValue: 5,
          intersectionValue: 4,
        },
      };

      // Ordem: ... saúde mental → impacto social → avaliação
      const psychosocialIdx = comingSoon.findIndex(
        (card) => card.key === "psychosocialImpactReduction"
      );

      if (psychosocialIdx === -1) {
        return [socialImpactCard, ...comingSoon, evaluationCard];
      }

      return [
        ...comingSoon.slice(0, psychosocialIdx + 1),
        socialImpactCard,
        ...comingSoon.slice(psychosocialIdx + 1),
        evaluationCard,
      ];
    },
    quantitativeComingSoonCards() {
      return mapComingSoonCards(QUANTITATIVE_COMING_SOON_CARDS);
    },
    metricCards() {
      if (this.cardCatalog === "panelRemainder") {
        return this.panelRemainderCards;
      }

      return this.kpiCards.concat(this.quantitativeComingSoonCards);
    },
  },
  methods: {
    isMetricClickable(metric) {
      if (!metric || metric.comingSoon || metric.hideTimeline) {
        return false;
      }

      return true;
    },
    isMetricExpanded(metric) {
      if (!this.isMetricClickable(metric)) {
        return false;
      }

      return this.expandedMetricKey === metric.key;
    },
    parseGeneralValue(value) {
      return parseMetricValue(value);
    },
    compareRowsFor(field) {
      return buildCompareRows({
        compareResults: this.compareResults,
        compareFilterSets: this.compareFilterSets,
        field,
        parseValue: (raw) => parseMetricValue(raw),
        summarizeFilterSet: this.summarizeFilterSet,
      });
    },
    compareRowsForRaw(field) {
      return buildCompareRowsRaw({
        compareResults: this.compareResults,
        compareFilterSets: this.compareFilterSets,
        field,
        summarizeFilterSet: this.summarizeFilterSet,
      });
    },
    metricValue(field) {
      if (!this.primaryResult) {
        return NaN;
      }

      return parseMetricValue(this.primaryResult[field]);
    },
    timelineSeriesFor(metricKey) {
      const timeline = this.metricTimelines[metricKey];

      return timeline && timeline.series ? timeline.series : [];
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-dashboard-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 160px;
  margin-bottom: 20px;
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #667998;
}
</style>
