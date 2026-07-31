<template>
  <div class="rh-filter-panel">
    <div class="rh-filter-panel__header">
      <div class="rh-filter-panel__title">
        <q-icon name="mdi-filter-variant" size="18px" color="primary" />
        <span>{{ title }}</span>
      </div>
      <span v-if="notice" class="rh-filter-panel__notice">
        {{ notice }}
      </span>
    </div>

    <div class="rh-filter-panel__grid">
      <slot />
    </div>

    <div class="rh-filter-panel__chips">
      <span class="rh-filter-panel__chips-label">{{ chipsLabel }}</span>
      <div v-if="selectedFilters.length > 0" class="rh-filter-panel__chips-wrap">
        <span
          v-for="(filter, index) in selectedFilters"
          :key="index"
          class="rh-filter-chip"
        >
          {{ filter }}
        </span>
      </div>
      <span v-else class="rh-filter-panel__chips-empty">
        {{ emptyChipsLabel }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Filtros",
    },
    notice: {
      type: String,
      default: "",
    },
    chipsLabel: {
      type: String,
      default: "Filtros selecionados",
    },
    emptyChipsLabel: {
      type: String,
      default: "Nenhum filtro selecionado",
    },
    selectedFilters: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-filter-panel {
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
}

.rh-filter-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.rh-filter-panel__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Nunito", sans-serif;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #1a2744;
}

.rh-filter-panel__notice {
  font-family: "Nunito", sans-serif;
  font-size: 0.8125rem;
  color: #667998;
  background: #f3f6fb;
  padding: 6px 12px;
  border-radius: 999px;
}

.rh-filter-panel__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
}

.rh-filter-panel__chips {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #eef1f5;
}

.rh-filter-panel__chips-label {
  display: block;
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #667998;
  margin-bottom: 10px;
}

.rh-filter-panel__chips-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.rh-filter-chip {
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 999px;
  background: #edf9f4;
  color: #128564;
  font-family: "Nunito", sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
}

.rh-filter-panel__chips-empty {
  font-family: "Nunito", sans-serif;
  font-size: 0.875rem;
  color: #99a5b8;
}
</style>
