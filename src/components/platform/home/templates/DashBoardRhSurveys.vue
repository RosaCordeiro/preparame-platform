<template>
  <div>
    <RhSurveyPanel
      v-if="showShutdownSurvey"
      title="Avaliação pós demissão"
      subtitle="Notas atribuídas pelos ex-colaboradores"
      info-label="Avaliação pós demissão"
      :columns="shutdownSurveyColumns"
      :min-value="1"
      :max-value="10"
      :intersection-value="7"
      @info="$emit('metric-info', $event)"
    />

    <RhSectionCard
      v-if="showFeelingMapSurvey"
      title="Mapa de sentimentos"
      subtitle="Distribuição emocional após o desligamento"
      badge="Sua empresa"
      info-label="Mapa de sentimentos"
      @info="$emit('metric-info', $event)"
    >
      <ChartApex
        type="polarArea"
        height="360px"
        style="width: 100%"
        :options="chartOptions"
        :series="displayFeelingMapChart.map((item) => item.count)"
      />
    </RhSectionCard>

    <RhSurveyPanel
      v-if="showFeelingMapSurvey"
      title="Comparativo mapa de sentimentos"
      subtitle="Sua empresa versus média geral de mercado"
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
import ChartApex from "../../../general/charts/ChartApex.vue";
import CompanyQuestionsCard from "../company/CompanyQuestionsCard.vue";
import RhSectionCard from "../company/RhSectionCard.vue";
import RhSurveyPanel from "../company/RhSurveyPanel.vue";

export default {
  components: {
    ChartApex,
    CompanyQuestionsCard,
    RhSectionCard,
    RhSurveyPanel,
  },
  props: {
    showShutdownSurvey: Boolean,
    showFeelingMapSurvey: Boolean,
    shutdownSurveyColumns: Array,
    feelingSurveyColumns: Array,
    chartOptions: Object,
    displayFeelingMapChart: Array,
    companyQuestions: Array,
  },
};
</script>
