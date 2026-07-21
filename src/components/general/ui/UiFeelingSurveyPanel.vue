<template>
  <UiSectionCard
    :title="title"
    :subtitle="subtitle"
    :info-label="infoLabel"
    @info="$emit('info', $event)"
  >
    <div class="rh-feeling-survey">
      <div class="rh-feeling-survey__toolbar">
        <span class="rh-feeling-survey__toolbar-label">Visualização</span>
        <q-btn-toggle
          v-model="viewMode"
          toggle-color="primary"
          unelevated
          dense
          :options="viewOptions"
        />
      </div>

      <div v-if="viewMode === 'cards'" class="rh-feeling-survey__cards">
        <div
          v-for="card in feelingCards"
          :key="card.key"
          class="rh-feeling-card"
          :style="{ '--feeling-accent': card.accent }"
        >
          <div class="rh-feeling-card__top">
            <div class="rh-feeling-card__icon-wrap">
              <img
                v-if="card.iconSrc"
                :src="card.iconSrc"
                :alt="card.label"
                class="rh-feeling-card__icon"
              />
              <q-icon
                v-else
                :name="card.mdiIcon"
                size="28px"
                :style="{ color: card.accent }"
              />
            </div>
            <div class="rh-feeling-card__meta">
              <h4 class="rh-feeling-card__title" :title="card.label">
                {{ card.label }}
              </h4>
              <p v-if="card.primaryHint" class="rh-feeling-card__hint">
                {{ card.primaryHint }}
              </p>
            </div>
          </div>

          <div class="rh-feeling-card__values">
            <div
              v-for="(row, index) in card.rows"
              :key="`${card.key}-row-${index}`"
              class="rh-feeling-card__value-row"
              :class="{ 'rh-feeling-card__value-row--muted': row.muted }"
            >
              <span class="rh-feeling-card__value-label">{{ row.title }}</span>
              <span class="rh-feeling-card__value-number">
                {{ formatDisplayValue(row) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="rh-survey-panel">
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
            <div
              v-for="(item, index) in column.items"
              :key="`${column.key}-${index}`"
              class="rh-feeling-list-item"
            >
              <div class="rh-feeling-list-item__icon-wrap">
                <img
                  v-if="getIconSrc(item.label)"
                  :src="getIconSrc(item.label)"
                  :alt="item.label"
                  class="rh-feeling-list-item__icon"
                />
                <q-icon
                  v-else
                  :name="getMdiIcon(item.label)"
                  size="18px"
                  color="grey-6"
                />
              </div>
              <UiProgressRow
                class="rh-feeling-list-item__row"
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
      </div>
    </div>
  </UiSectionCard>
</template>

<script>
import {
  getFeelingAccent,
  getFeelingIconSrc,
  getFeelingMdiIcon,
} from "../../../utils/feelingIcons";
import UiProgressRow from "./UiProgressRow.vue";
import UiSectionCard from "./UiSectionCard.vue";

export default {
  components: {
    UiProgressRow,
    UiSectionCard,
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
      default: 100,
    },
    intersectionValue: {
      type: Number,
      default: 50,
    },
    invertedColors: {
      type: Boolean,
      default: false,
    },
    suffix: {
      type: String,
      default: "%",
    },
    showScale: {
      type: Boolean,
      default: true,
    },
    defaultView: {
      type: String,
      default: "cards",
    },
  },
  data() {
    return {
      viewMode: this.defaultView === "list" ? "list" : "cards",
      viewOptions: [
        { label: "Cards", value: "cards", icon: "mdi-view-grid-outline" },
        { label: "Lista", value: "list", icon: "mdi-view-list-outline" },
      ],
    };
  },
  computed: {
    feelingLabels() {
      const labels = [];
      const seen = new Set();

      this.columns.forEach((column) => {
        (column.items || []).forEach((item) => {
          if (!seen.has(item.label)) {
            seen.add(item.label);
            labels.push(item.label);
          }
        });
      });

      return labels;
    },
    feelingCards() {
      return this.feelingLabels.map((label) => {
        const rows = this.columns.map((column) => {
          const item = (column.items || []).find((entry) => entry.label === label);

          return {
            title: column.title,
            value: item ? item.value : NaN,
            insufficient: item ? Boolean(item.insufficient) : false,
            muted: column.key === "general",
          };
        });

        return {
          key: String(label),
          label,
          accent: getFeelingAccent(label),
          iconSrc: getFeelingIconSrc(label),
          mdiIcon: getFeelingMdiIcon(label),
          primaryHint: rows[0] ? rows[0].title : "",
          rows,
        };
      });
    },
  },
  methods: {
    getIconSrc(label) {
      return getFeelingIconSrc(label);
    },
    getMdiIcon(label) {
      return getFeelingMdiIcon(label);
    },
    formatDisplayValue(row) {
      if (row.insufficient) {
        return "Sem informações";
      }

      if (
        row.value === "" ||
        row.value === null ||
        row.value === undefined ||
        row.value === "N/A" ||
        row.value === "Sem informações" ||
        (typeof row.value === "number" && Number.isNaN(row.value))
      ) {
        return "Sem informações";
      }

      return `${row.value}${this.suffix}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-feeling-survey__toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 16px;
}

.rh-feeling-survey__toolbar-label {
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #99a5b8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.rh-feeling-survey__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  align-items: stretch;
}

.rh-feeling-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid #e6e6e6;
  background: #fff;
  box-shadow: 0 2px 8px rgba(26, 39, 68, 0.04);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  min-height: 200px;
  height: 100%;
  box-sizing: border-box;
}

.rh-feeling-card:hover {
  border-color: #c9e8dc;
  box-shadow: 0 6px 18px rgba(26, 39, 68, 0.08);
}

.rh-feeling-card__top {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  min-height: 52px;
}

.rh-feeling-card__icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #edf9f4;
  border: 1px solid #d4f0e8;
}

.rh-feeling-card__icon {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.rh-feeling-card__meta {
  min-width: 0;
  flex: 1;
}

.rh-feeling-card__title {
  margin: 0;
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  font-weight: 800;
  line-height: 1.25;
  color: #1a2744;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word;
}

.rh-feeling-card__hint {
  margin: 2px 0 0;
  font-family: "Nunito", sans-serif;
  font-size: 0.6875rem;
  line-height: 1.3;
  color: #99a5b8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.rh-feeling-card__values {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.rh-feeling-card__value-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 10px;
  background: #edf9f4;
  border: 1px solid #d4f0e8;
}

.rh-feeling-card__value-row--muted {
  background: #f3f6fb;
  border-color: #e1e7f0;
}

.rh-feeling-card__value-label {
  font-family: "Nunito", sans-serif;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #667998;
}

.rh-feeling-card__value-number {
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: #128564;
}

.rh-feeling-card__value-row--muted .rh-feeling-card__value-number {
  color: #4a5872;
}

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
  gap: 12px;
}

.rh-feeling-list-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.rh-feeling-list-item__icon-wrap {
  width: 28px;
  height: 28px;
  margin-top: 2px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #f3f6fb;
}

.rh-feeling-list-item__icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.rh-feeling-list-item__row {
  flex: 1;
  min-width: 0;
}
</style>
