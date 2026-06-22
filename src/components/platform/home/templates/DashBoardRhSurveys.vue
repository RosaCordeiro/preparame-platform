<template>
  <div>
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

    <RhSurveyPanel
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
      v-if="companyQuestions.length > 0"
      title="Perguntas da Empresa"
      subtitle="Respostas qualitativas registradas"
    >
      <CompanyQuestionsCard :companyQuestions="companyQuestions" />
    </RhSectionCard>
  </div>
</template>

<script>
import CompanyQuestionsCard from "../company/CompanyQuestionsCard.vue";
import RhFeelingMapCompare from "../company/RhFeelingMapCompare.vue";
import RhSectionCard from "../company/RhSectionCard.vue";
import RhSurveyComparePanel from "../company/RhSurveyComparePanel.vue";
import RhSurveyPanel from "../company/RhSurveyPanel.vue";

export default {
  components: {
    CompanyQuestionsCard,
    RhFeelingMapCompare,
    RhSectionCard,
    RhSurveyComparePanel,
    RhSurveyPanel,
  },
  props: {
    showShutdownSurvey: Boolean,
    showFeelingMapSurvey: Boolean,
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
  },
};
</script>
