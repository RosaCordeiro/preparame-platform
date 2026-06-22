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
          :clickable="true"
          :expanded="expandedMetricKey === metric.key"
          @toggle="$emit('metric-toggle', metric.key)"
          @info="$emit('metric-info', metric.infoLabel || metric.props.title)"
        >
          <UiMetricTimeline
            v-if="expandedMetricKey === metric.key"
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
  },
  computed: {
    hasMetricsData() {
      return this.compareResults.length > 0;
    },
    primaryResult() {
      return this.compareResults[0] || {};
    },
    primaryInsufficient() {
      return Boolean(this.primaryResult.lessThanFive);
    },
    timelineCategories() {
      const timeline = this.metricTimelines[this.expandedMetricKey];

      return timeline && timeline.categories ? timeline.categories : [];
    },
    metricCards() {
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
            lessThanFive: this.primaryInsufficient,
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
            lessThanFive: this.primaryInsufficient,
          },
        },
        {
          key: "brandRisk",
          component: "RhMetricCard",
          infoLabel: "Marca",
          timelineSubtitle: "Percepção de marca por período",
          props: {
            title: "Marca",
            subtitle: "Percepção da marca empregadora",
            companyValue: this.metricValue("brandRisk"),
            generalValue: this.parseGeneralValue(this.brandRiskGeneral),
            compareRows: this.compareRowsFor("brandRisk"),
            minValue: 0,
            maxValue: 10,
            intersectionValue: 4,
            invertedColors: true,
            lessThanFive: this.primaryInsufficient,
          },
        },
        {
          key: "realocateds",
          component: "RhMetricCard",
          infoLabel: "Realocados",
          timelineSubtitle: "Percentual de recolocados por período",
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
          infoLabel: "Quantidade de pessoas recolocadas",
          timelineSubtitle: "Quantidade recolocada por período",
          props: {
            title: "Pessoas recolocadas",
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
            lessThanFive: this.primaryInsufficient,
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
            lessThanFive: this.primaryInsufficient,
          },
        },
      ];
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
