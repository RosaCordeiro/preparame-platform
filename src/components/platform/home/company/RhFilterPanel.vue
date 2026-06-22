<template>
  <UiFilterPanel
    :notice="disableFilters ? 'Selecione uma empresa para habilitar os filtros' : ''"
    :selected-filters="selectedFilters"
  >
    <UiFilterField
      label="Período"
      :options="parameters.period || []"
      :value="period"
      @input="$emit('update:period', $event)"
      :select-all="selectAllPeriods"
      @update:selectAll="$emit('update:selectAllPeriods', $event)"
      :disabled="isFieldDisabled(parameters.period)"
    />

    <UiFilterField
      label="Unidade"
      :options="parameters.unity || []"
      :value="unity"
      @input="$emit('update:unity', $event)"
      :select-all="selectAllUnity"
      @update:selectAll="$emit('update:selectAllUnity', $event)"
      :disabled="isFieldDisabled(parameters.unity)"
    />

    <UiFilterField
      label="Área"
      :options="parameters.area || []"
      :value="area"
      @input="$emit('update:area', $event)"
      :select-all="selectAllArea"
      @update:selectAll="$emit('update:selectAllArea', $event)"
      :disabled="isFieldDisabled(parameters.area)"
    />

    <UiFilterField
      label="Cargo"
      :options="parameters.role || []"
      :value="role"
      @input="$emit('update:role', $event)"
      :select-all="selectAllRole"
      @update:selectAll="$emit('update:selectAllRole', $event)"
      :disabled="isFieldDisabled(parameters.role)"
    />

    <UiFilterField
      label="Tipo de demissão"
      :options="parameters.dismissalType || []"
      :value="dismissalType"
      @input="$emit('update:dismissalType', $event)"
      :select-all="selectAllDismissalType"
      @update:selectAll="$emit('update:selectAllDismissalType', $event)"
      :disabled="isFieldDisabled(parameters.dismissalType)"
      :option-label-fn="(v) => getOptionLabel(dismissalTypeOptions, v)"
    />

    <UiFilterField
      label="Gênero"
      :options="parameters.gender || []"
      :value="gender"
      @input="$emit('update:gender', $event)"
      :select-all="selectAllGender"
      @update:selectAll="$emit('update:selectAllGender', $event)"
      :disabled="isFieldDisabled(parameters.gender)"
      :option-label-fn="(v) => getOptionLabel(genderOptions, v)"
    />

    <UiFilterField
      label="Etnia"
      :options="parameters.etnia || []"
      :value="etnia"
      @input="$emit('update:etnia', $event)"
      :select-all="selectAllEtnia"
      @update:selectAll="$emit('update:selectAllEtnia', $event)"
      :disabled="isFieldDisabled(parameters.etnia)"
      :option-label-fn="(v) => getOptionLabel(etniaOptions, v)"
    />

    <UiFilterField
      label="PCD"
      :options="parameters.pcd || []"
      :value="pcd"
      @input="$emit('update:pcd', $event)"
      :select-all="selectAllPcd"
      @update:selectAll="$emit('update:selectAllPcd', $event)"
      :disabled="isFieldDisabled(parameters.pcd)"
    />

    <UiFilterField
      label="Estado"
      :options="parameters.state || []"
      :value="state"
      @input="$emit('update:state', $event)"
      :select-all="selectAllState"
      @update:selectAll="$emit('update:selectAllState', $event)"
      :disabled="isFieldDisabled(parameters.state)"
    />

    <UiFilterField
      label="Cidade"
      :options="parameters.city || []"
      :value="city"
      @input="$emit('update:city', $event)"
      :select-all="selectAllCity"
      @update:selectAll="$emit('update:selectAllCity', $event)"
      :disabled="isFieldDisabled(parameters.city)"
    />
  </UiFilterPanel>
</template>

<script>
import UiFilterField from "../../../general/ui/UiFilterField.vue";
import UiFilterPanel from "../../../general/ui/UiFilterPanel.vue";

export default {
  components: {
    UiFilterPanel,
    UiFilterField,
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
