<template>
  <UiSectionCard
    :title="title"
    :subtitle="subtitle"
    :info-label="infoLabel"
    @info="$emit('info', $event)"
  >
    <div class="rh-survey-panel">
      <div
        v-for="column in columns"
        :key="column.key"
        class="rh-survey-panel__column"
      >
        <div class="rh-survey-panel__column-head">
          <span class="rh-survey-panel__column-title">{{ column.title }}</span>
          <span class="rh-survey-panel__column-hint">{{ column.hint }}</span>
        </div>

        <div class="rh-survey-panel__items">
          <UiProgressRow
            v-for="(item, index) in column.items"
            :key="`${column.key}-${index}`"
            :label="item.label"
            :value="item.value"
            :min-value="minValue"
            :max-value="maxValue"
            :intersection-value="intersectionValue"
            :inverted-colors="invertedColors"
            :insufficient="item.insufficient"
            :suffix="suffix"
            :show-scale="showScale"
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
    columns: {
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
    showScale: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-survey-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.rh-survey-panel__column-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eef1f5;
}

.rh-survey-panel__column-title {
  font-family: "Nunito", sans-serif;
  font-size: 0.8125rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #15aa7c;
}

.rh-survey-panel__column-hint {
  font-family: "Nunito", sans-serif;
  font-size: 0.6875rem;
  color: #99a5b8;
}

.rh-survey-panel__items {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
