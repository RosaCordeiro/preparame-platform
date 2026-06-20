<template>
  <div class="rh-filter-panel">
    <div class="rh-filter-panel__header">
      <div class="rh-filter-panel__title">
        <q-icon name="mdi-filter-variant" size="18px" color="primary" />
        <span>Filtros</span>
      </div>
      <span v-if="disableFilters" class="rh-filter-panel__notice">
        Selecione uma empresa para habilitar os filtros
      </span>
    </div>

    <div class="rh-filter-panel__grid">
      <RhFilterField
        label="Período"
        :options="parameters.period || []"
        :value="period"
        @input="$emit('update:period', $event)"
        :select-all="selectAllPeriods"
        @update:selectAll="$emit('update:selectAllPeriods', $event)"
        :disabled="isFieldDisabled(parameters.period)"
      />

      <RhFilterField
        label="Unidade"
        :options="parameters.unity || []"
        :value="unity"
        @input="$emit('update:unity', $event)"
        :select-all="selectAllUnity"
        @update:selectAll="$emit('update:selectAllUnity', $event)"
        :disabled="isFieldDisabled(parameters.unity)"
      />

      <RhFilterField
        label="Área"
        :options="parameters.area || []"
        :value="area"
        @input="$emit('update:area', $event)"
        :select-all="selectAllArea"
        @update:selectAll="$emit('update:selectAllArea', $event)"
        :disabled="isFieldDisabled(parameters.area)"
      />

      <RhFilterField
        label="Cargo"
        :options="parameters.role || []"
        :value="role"
        @input="$emit('update:role', $event)"
        :select-all="selectAllRole"
        @update:selectAll="$emit('update:selectAllRole', $event)"
        :disabled="isFieldDisabled(parameters.role)"
      />

      <RhFilterField
        label="Tipo de demissão"
        :options="parameters.dismissalType || []"
        :value="dismissalType"
        @input="$emit('update:dismissalType', $event)"
        :select-all="selectAllDismissalType"
        @update:selectAll="$emit('update:selectAllDismissalType', $event)"
        :disabled="isFieldDisabled(parameters.dismissalType)"
        :option-label-fn="(v) => getOptionLabel(dismissalTypeOptions, v)"
      />

      <RhFilterField
        label="Gênero"
        :options="parameters.gender || []"
        :value="gender"
        @input="$emit('update:gender', $event)"
        :select-all="selectAllGender"
        @update:selectAll="$emit('update:selectAllGender', $event)"
        :disabled="isFieldDisabled(parameters.gender)"
        :option-label-fn="(v) => getOptionLabel(genderOptions, v)"
      />

      <RhFilterField
        label="Etnia"
        :options="parameters.etnia || []"
        :value="etnia"
        @input="$emit('update:etnia', $event)"
        :select-all="selectAllEtnia"
        @update:selectAll="$emit('update:selectAllEtnia', $event)"
        :disabled="isFieldDisabled(parameters.etnia)"
        :option-label-fn="(v) => getOptionLabel(etniaOptions, v)"
      />

      <RhFilterField
        label="PCD"
        :options="parameters.pcd || []"
        :value="pcd"
        @input="$emit('update:pcd', $event)"
        :select-all="selectAllPcd"
        @update:selectAll="$emit('update:selectAllPcd', $event)"
        :disabled="isFieldDisabled(parameters.pcd)"
      />

      <RhFilterField
        label="Estado"
        :options="parameters.state || []"
        :value="state"
        @input="$emit('update:state', $event)"
        :select-all="selectAllState"
        @update:selectAll="$emit('update:selectAllState', $event)"
        :disabled="isFieldDisabled(parameters.state)"
      />

      <RhFilterField
        label="Cidade"
        :options="parameters.city || []"
        :value="city"
        @input="$emit('update:city', $event)"
        :select-all="selectAllCity"
        @update:selectAll="$emit('update:selectAllCity', $event)"
        :disabled="isFieldDisabled(parameters.city)"
      />
    </div>

    <div class="rh-filter-panel__chips">
      <span class="rh-filter-panel__chips-label">Filtros selecionados</span>
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
        Nenhum filtro selecionado
      </span>
    </div>
  </div>
</template>

<script>
import RhFilterField from "./RhFilterField.vue";

export default {
  components: {
    RhFilterField,
  },
  props: {
    disableFilters: {
      type: Boolean,
      default: false,
    },
    parameters: {
      type: Object,
      default: () => ({}),
    },
    period: Array,
    unity: Array,
    area: Array,
    role: Array,
    dismissalType: Array,
    gender: Array,
    etnia: Array,
    pcd: Array,
    state: Array,
    city: Array,
    selectAllPeriods: Boolean,
    selectAllUnity: Boolean,
    selectAllArea: Boolean,
    selectAllRole: Boolean,
    selectAllDismissalType: Boolean,
    selectAllGender: Boolean,
    selectAllEtnia: Boolean,
    selectAllPcd: Boolean,
    selectAllState: Boolean,
    selectAllCity: Boolean,
    selectedFilters: {
      type: Array,
      default: () => [],
    },
    dismissalTypeOptions: Array,
    genderOptions: Array,
    etniaOptions: Array,
    getOptionLabel: Function,
  },
  methods: {
    isFieldDisabled(options) {
      return (
        this.disableFilters || !options || options.length === 0
      );
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
