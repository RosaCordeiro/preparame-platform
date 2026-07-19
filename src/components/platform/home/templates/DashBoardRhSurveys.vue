<template>
  <div>
    <DashBoardRhQuantitativeCards
      v-if="showQuantitativeCards"
      :compare-results="compareResults"
      :compare-filter-sets="compareFilterSets"
      :summarize-filter-set="summarizeFilterSet"
      :realocateds-general="realocatedsGeneral"
      @metric-info="$emit('metric-info', $event)"
    />

    <RhSurveyComparePanel
      v-if="showShutdownSurvey"
      title="Avaliação pós demissão"
      subtitle="Notas atribuídas pelos ex-colaboradores"
      info-label="Avaliação pós demissão"
      :groups="shutdownCompareGroups"
      :min-value="1"
      :max-value="10"
      :intersection-value="7"
      @info="$emit('metric-info', $event)"
    />

    <RhFeelingMapCompare
      v-if="showFeelingMapSurvey && feelingMapCharts.length > 0"
      title="Mapa de sentimentos"
      subtitle="Distribuição emocional por conjunto de filtros"
      info-label="Mapa de sentimentos"
      :charts="feelingMapCharts"
      @info="$emit('metric-info', $event)"
    />

    <RhFeelingSurveyPanel
      v-if="showFeelingMapSurvey"
      title="Comparativo mapa de sentimentos"
      subtitle="Percentual por sentimento"
      :columns="feelingSurveyColumns"
      :min-value="1"
      :max-value="100"
      :intersection-value="50"
      suffix="%"
    />

    <RhSectionCard
      v-if="showCompanyQuestions && companyQuestions.length > 0"
      title="Perguntas da Empresa"
      subtitle="Respostas qualitativas registradas"
    >
      <CompanyQuestionsCard :companyQuestions="companyQuestions" />
    </RhSectionCard>

    <RhSectionCard
      v-else-if="showCompanyQuestions && companyQuestions.length === 0"
      title="Perguntas da Empresa"
      subtitle="Respostas qualitativas registradas"
    >
      <p class="rh-empty-qualitative">
        Nenhuma resposta qualitativa encontrada para os filtros selecionados.
      </p>
    </RhSectionCard>
  </div>
</template>

<script>
import CompanyQuestionsCard from "../company/CompanyQuestionsCard.vue";
import RhFeelingMapCompare from "../company/RhFeelingMapCompare.vue";
import RhFeelingSurveyPanel from "../company/RhFeelingSurveyPanel.vue";
import RhSectionCard from "../company/RhSectionCard.vue";
import RhSurveyComparePanel from "../company/RhSurveyComparePanel.vue";
import DashBoardRhQuantitativeCards from "./DashBoardRhQuantitativeCards.vue";

export default {
  components: {
    CompanyQuestionsCard,
    DashBoardRhQuantitativeCards,
    RhFeelingMapCompare,
    RhFeelingSurveyPanel,
    RhSectionCard,
    RhSurveyComparePanel,
  },
  props: {
    showQuantitativeCards: {
      type: Boolean,
      default: false,
    },
    showShutdownSurvey: Boolean,
    showFeelingMapSurvey: Boolean,
    showCompanyQuestions: {
      type: Boolean,
      default: true,
    },
    shutdownCompareGroups: {
      type: Array,
      default: () => [],
    },
    feelingSurveyColumns: Array,
    feelingMapCharts: {
      type: Array,
      default: () => [],
    },
    companyQuestions: Array,
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
};
</script>

<style scoped>
.rh-empty-qualitative {
  margin: 0;
  color: #5f6368;
  font-size: 14px;
}
</style>
