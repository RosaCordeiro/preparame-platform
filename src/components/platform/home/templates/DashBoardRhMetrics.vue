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
          :clickable="!metric.comingSoon"
          :expanded="!metric.comingSoon && expandedMetricKey === metric.key"
          @toggle="$emit('metric-toggle', metric.key)"
          @info="$emit('metric-info', metric.infoLabel || metric.props.title)"
        >
          <UiMetricTimeline
            v-if="!metric.comingSoon && expandedMetricKey === metric.key"
            :categories="timelineCategories"
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
    title: "Gestão de novos conflitos",
    subtitle: "Acompanhamento de conflitos emergentes",
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
  {
    key: "resolvedDoubts",
    title: "Dúvidas resolvidas",
    subtitle: "Percentual de dúvidas solucionadas",
  },
  {
    key: "exEmployeeEvaluation",
    title: "Avaliação dos ex-colaboradores do PDR",
    subtitle: "Avaliação geral dos ex-colaboradores do PDR",
  },
];

/** Placeholders que antes ficavam em DashBoardRhQuantitativeCards (mesmo grid dos KPIs). */
const QUANTITATIVE_COMING_SOON_CARDS = [
  {
    key: "criticalRisks",
    title: "Riscos críticos",
    subtitle: "Monitoramento de riscos críticos do processo",
  },
  {
    key: "resolutionRate",
    title: "Taxa de resolução",
    subtitle: "Percentual de casos resolvidos",
  },
  {
    key: "legalRiskReduction",
    title: "Redução de risco jurídico",
    subtitle: "Evolução da exposição jurídica",
  },
  {
    key: "psychosocialReduction",
    title: "Redução psicossocial",
    subtitle: "Indicador de impacto psicossocial",
  },
  {
    key: "employerBrand",
    title: "Marca empregadora",
    subtitle: "Percepção da marca empregadora",
  },
  {
    key: "segmentIndex",
    title: "Índice segmento",
    subtitle: "Comparativo com o segmento de mercado",
  },
  {
    key: "doubtRate",
    title: "Taxa de dúvidas",
    subtitle: "Incidência de dúvidas reportadas",
  },
];

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
    kpiCards() {
      return [
        {
          key: "nps",
          component: "RhMetricCard",
          infoLabel: "e-NPS",
          timelineSubtitle: "e-NPS por período",
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
          props: {
            title: "Realocados",
            subtitle: "Percentual de ex-colaboradores recolocados",
            companyValue: this.metricValue("realocateds"),
            generalValue: this.parseGeneralValue(this.realocatedsGeneral),
            compareRows: this.compareRowsFor("realocateds"),
            minValue: 0,
            maxValue: 100,
            intersectionValue: 50,
            suffix: "%",
          },
        },
        {
          key: "welcomed",
          component: "RhStatCard",
          infoLabel: "Acolhidos",
          timelineSubtitle: "Acolhidos por período",
          props: {
            title: "Acolhidos",
            subtitle: "Total de pessoas acolhidas no programa",
            companyValue: this.primaryResult.welcomed,
            generalValue: this.welcomedGeneral,
            compareRows: this.compareRowsForRaw("welcomed"),
            insufficient: this.primaryInsufficient,
          },
        },
        {
          key: "realocatedCount",
          component: "RhStatCard",
          infoLabel: "Pessoas realocadas",
          timelineSubtitle: "Quantidade realocada por período",
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
          props: {
            title: "Cálculos da rescisão",
            subtitle: "Ex-colaboradores que consideram os cálculos corretos",
            companyValue: this.metricValue("termination"),
            generalValue: this.parseGeneralValue(this.terminationGeneral),
            compareRows: this.compareRowsFor("termination"),
            suffix: "%",
            intersectionValue: 50,
            insufficientSample: this.primaryInsufficient,
          },
        },
        {
          key: "laborIssues",
          component: "RhMetricCard",
          infoLabel: "Pendências trabalhistas",
          timelineSubtitle: "Pendências por período",
          timelineSuffix: "%",
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
          timelineSubtitle: "Taxa acumulada de recolocação por mês (data da recolocação)",
        timelineSuffix: "%",
        props: {
          title: "Redução de impacto negativo social",
          subtitle:
            "Taxa de recolocação das pessoas do programa (impacto negativo social)",
          companyValue: this.metricValue("realocateds"),
          generalValue: this.parseGeneralValue(this.realocatedsGeneral),
          compareRows: this.compareRowsFor("realocateds"),
          minValue: 0,
          maxValue: 100,
          intersectionValue: 50,
          suffix: "%",
          insufficientSample: this.primaryInsufficient,
        },
      };

      // Mantém a ordem visual: após saúde mental, antes de dúvidas resolvidas.
      const psychosocialIdx = comingSoon.findIndex(
        (card) => card.key === "psychosocialImpactReduction"
      );
      if (psychosocialIdx === -1) {
        return [socialImpactCard, ...comingSoon];
      }

      return [
        ...comingSoon.slice(0, psychosocialIdx + 1),
        socialImpactCard,
        ...comingSoon.slice(psychosocialIdx + 1),
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
