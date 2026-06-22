<template>
  <div>
    <div class="rh-dashboard-grid">
      <RhMetricCard
        title="e-NPS"
        subtitle="Recomendação da empresa pelos ex-colaboradores"
        :company-value="removePercent(nps)"
        :general-value="removePercent(npsGeneral)"
        :min-value="-100"
        :max-value="100"
        :intersection-value="0"
        :less-than-five="lessThanFive"
        @info="$emit('metric-info', 'e-NPS')"
      />

      <RhMetricCard
        title="Risco Trabalhista"
        subtitle="Exposição a riscos de ações trabalhistas"
        :company-value="removePercent(laborRisk)"
        :general-value="removePercent(laborRiskGeneral)"
        :min-value="0"
        :max-value="10"
        :intersection-value="4"
        :inverted-colors="true"
        :less-than-five="lessThanFive"
        @info="$emit('metric-info', 'Risco Trabalhista')"
      />

      <RhMetricCard
        title="Marca"
        subtitle="Percepção da marca empregadora"
        :company-value="removePercent(brandRisk)"
        :general-value="removePercent(brandRiskGeneral)"
        :min-value="0"
        :max-value="10"
        :intersection-value="4"
        :inverted-colors="true"
        :less-than-five="lessThanFive"
        @info="$emit('metric-info', 'Marca')"
      />
    </div>

    <div class="rh-dashboard-grid">
      <RhMetricCard
        title="Realocados"
        subtitle="Percentual de ex-colaboradores recolocados"
        :company-value="removePercent(realocateds)"
        :general-value="removePercent(realocatedsGeneral)"
        :min-value="0"
        :max-value="100"
        :intersection-value="50"
        suffix="%"
        @info="$emit('metric-info', 'Realocados')"
      />

      <RhStatCard
        title="Acolhidos"
        subtitle="Total de pessoas acolhidas no programa"
        info-label="Acolhidos"
        :company-value="welcomed"
        :general-value="welcomedGeneral"
        :insufficient="lessThanFive"
        @info="$emit('metric-info', $event)"
      />

      <RhStatCard
        title="Pessoas recolocadas"
        subtitle="Quantidade absoluta no período"
        info-label="Quantidade de pessoas recolocadas"
        :company-value="realocatedCount"
        :insufficient="lessThanFive"
      />
    </div>

    <div class="rh-dashboard-grid">
      <RhMetricCard
        title="Cálculos da rescisão"
        subtitle="Ex-colaboradores que consideram os cálculos corretos"
        :company-value="removePercent(termination)"
        :general-value="removePercent(terminationGeneral)"
        suffix="%"
        :intersection-value="50"
        :less-than-five="lessThanFive"
        @info="$emit('metric-info', 'Cálculos da rescisão estão corretos?')"
      />

      <RhMetricCard
        title="Pendências trabalhistas"
        subtitle="Incidência de pendências reportadas"
        :company-value="removePercent(laborIssues)"
        :general-value="removePercent(laborIssuesGeneral)"
        suffix="%"
        :min-value="0"
        :max-value="10"
        :intersection-value="3"
        :inverted-colors="true"
        :less-than-five="lessThanFive"
        @info="$emit('metric-info', 'Pendências trabalhistas')"
      />
    </div>
  </div>
</template>

<script>
import RhMetricCard from "../company/RhMetricCard.vue";
import RhStatCard from "../company/RhStatCard.vue";

export default {
  components: {
    RhMetricCard,
    RhStatCard,
  },
  props: {
    nps: [String, Number],
    npsGeneral: [String, Number],
    brandRisk: [String, Number],
    brandRiskGeneral: [String, Number],
    laborRisk: [String, Number],
    laborRiskGeneral: [String, Number],
    realocateds: [String, Number],
    realocatedsGeneral: [String, Number],
    welcomed: [String, Number],
    welcomedGeneral: [String, Number],
    realocatedCount: [String, Number],
    termination: [String, Number],
    terminationGeneral: [String, Number],
    laborIssues: [String, Number],
    laborIssuesGeneral: [String, Number],
    lessThanFive: Boolean,
    removePercent: {
      type: Function,
      required: true,
    },
  },
};
</script>
