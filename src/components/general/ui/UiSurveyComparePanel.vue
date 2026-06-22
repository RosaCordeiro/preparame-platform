<template>
  <UiSectionCard
    :title="title"
    :subtitle="subtitle"
    :info-label="infoLabel"
    @info="$emit('info', $event)"
  >
    <div class="rh-survey-compare">
      <div
        v-for="(group, groupIndex) in groups"
        :key="`${group.label}-${groupIndex}`"
        class="rh-survey-compare__group"
      >
        <h4 class="rh-survey-compare__question">{{ group.label }}</h4>

        <div class="rh-survey-compare__rows">
          <UiProgressRow
            v-for="(row, rowIndex) in group.rows"
            :key="`${group.label}-${rowIndex}`"
            :label="row.label"
            :subtitle="row.subtitle"
            :value="row.value"
            :min-value="minValue"
            :max-value="maxValue"
            :intersection-value="intersectionValue"
            :inverted-colors="invertedColors"
            :insufficient="row.insufficient"
            :suffix="suffix"
            :show-scale="rowIndex === group.rows.length - 1"
            size="sm"
          />
        </div>
      </div>
    </div>
  </UiSectionCard>
</template>

<script>
import UiProgressRow from "./UiProgressRow.vue";
import UiSectionCard from "./UiSectionCard.vue";

export default {
  components: {
    UiSectionCard,
    UiProgressRow,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    infoLabel: {
      type: String,
      default: "",
    },
    groups: {
      type: Array,
      default: () => [],
    },
    minValue: {
      type: Number,
      default: 1,
    },
    maxValue: {
      type: Number,
      default: 10,
    },
    intersectionValue: {
      type: Number,
      default: 7,
    },
    invertedColors: {
      type: Boolean,
      default: false,
    },
    suffix: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-survey-compare {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.rh-survey-compare__group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eef1f5;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.rh-survey-compare__question {
  margin: 0;
  font-family: "Nunito", sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #1a2744;
  line-height: 1.4;
}

.rh-survey-compare__rows {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
