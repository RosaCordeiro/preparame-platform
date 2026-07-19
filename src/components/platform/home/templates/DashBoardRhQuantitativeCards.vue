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
      >
        <RhMetricCard
          v-bind="metric.props"
          :coming-soon="metric.comingSoon"
          :clickable="false"
          @info="$emit('metric-info', metric.infoLabel || metric.props.title)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RhMetricCard from "../company/RhMetricCard.vue";
import {
  buildCompareRows,
  parseMetricValue,
} from "../../../../utils/rhMetricDisplay";

const COMING_SOON_CARDS = [
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

export default {
  components: {
    RhMetricCard,
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
    realocatedsGeneral: [String, Number],
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
    metricCards() {
      const cards = [
        {
          key: "relocationRate",
          comingSoon: false,
          infoLabel: "Taxa de recolocação",
          props: {
            title: "Taxa de recolocação",
            subtitle: "Percentual de ex-colaboradores recolocados",
            companyValue: this.metricValue("realocateds"),
            generalValue: this.parseGeneralValue(this.realocatedsGeneral),
            compareRows: this.compareRowsFor("realocateds"),
            minValue: 0,
            maxValue: 100,
            intersectionValue: 50,
            suffix: "%",
            lessThanFive: this.primaryInsufficient,
          },
        },
      ];

      COMING_SOON_CARDS.forEach((card) => {
        cards.push({
          key: card.key,
          comingSoon: true,
          infoLabel: card.title,
          props: {
            title: card.title,
            subtitle: card.subtitle,
          },
        });
      });

      return cards;
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
    metricValue(field) {
      if (!this.primaryResult) {
        return NaN;
      }

      return parseMetricValue(this.primaryResult[field]);
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
