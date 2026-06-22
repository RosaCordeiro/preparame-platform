<template>
  <UiFilterPanel
    :notice="disableFilters ? 'Selecione uma empresa para habilitar os filtros' : ''"
    :selected-filters="selectedFilters"
  >
    <RhFilterSelect
      label="Período"
      :options="parameters.period || []"
      :value="period"
      :multiple="!singleSelect"
      @input="$emit('update:period', $event)"
      :disabled="isFieldDisabled(parameters.period)"
    />

    <RhFilterSelect
      label="Unidade"
      :options="parameters.unity || []"
      :value="unity"
      :multiple="!singleSelect"
      @input="$emit('update:unity', $event)"
      :disabled="isFieldDisabled(parameters.unity)"
    />

    <RhFilterSelect
      label="Área"
      :options="parameters.area || []"
      :value="area"
      :multiple="!singleSelect"
      @input="$emit('update:area', $event)"
      :disabled="isFieldDisabled(parameters.area)"
    />

    <RhFilterSelect
      label="Cargo"
      :options="parameters.role || []"
      :value="role"
      :multiple="!singleSelect"
      @input="$emit('update:role', $event)"
      :disabled="isFieldDisabled(parameters.role)"
    />

    <RhFilterSelect
      label="Tipo de demissão"
      :options="parameters.dismissalType || []"
      :value="dismissalType"
      :multiple="!singleSelect"
      @input="$emit('update:dismissalType', $event)"
      :disabled="isFieldDisabled(parameters.dismissalType)"
      :option-label-fn="(v) => getOptionLabel(dismissalTypeOptions, v)"
    />

    <RhFilterSelect
      label="Gênero"
      :options="parameters.gender || []"
      :value="gender"
      :multiple="!singleSelect"
      @input="$emit('update:gender', $event)"
      :disabled="isFieldDisabled(parameters.gender)"
      :option-label-fn="(v) => getOptionLabel(genderOptions, v)"
    />

    <RhFilterSelect
      label="Etnia"
      :options="parameters.etnia || []"
      :value="etnia"
      :multiple="!singleSelect"
      @input="$emit('update:etnia', $event)"
      :disabled="isFieldDisabled(parameters.etnia)"
      :option-label-fn="(v) => getOptionLabel(etniaOptions, v)"
    />

    <RhFilterSelect
      label="PCD"
      :options="parameters.pcd || []"
      :value="pcd"
      :multiple="!singleSelect"
      @input="$emit('update:pcd', $event)"
      :disabled="isFieldDisabled(parameters.pcd)"
    />

    <RhFilterSelect
      label="Estado"
      :options="parameters.state || []"
      :value="state"
      :multiple="!singleSelect"
      @input="$emit('update:state', $event)"
      :disabled="isFieldDisabled(parameters.state)"
    />

    <RhFilterSelect
      label="Cidade"
      :options="parameters.city || []"
      :value="city"
      :multiple="!singleSelect"
      @input="$emit('update:city', $event)"
      :disabled="isFieldDisabled(parameters.city)"
    />
  </UiFilterPanel>
</template>

<script>
import RhFilterSelect from "./RhFilterSelect.vue";
import UiFilterPanel from "../../../general/ui/UiFilterPanel.vue";

export default {
  components: {
    UiFilterPanel,
    RhFilterSelect,
  },
  props: {
    disableFilters: {
      type: Boolean,
      default: false,
    },
    singleSelect: {
      type: Boolean,
      default: false,
    },
    parameters: {
      type: Object,
      default: () => ({}),
    },
    period: {
      default: null,
    },
    unity: {
      default: null,
    },
    area: {
      default: null,
    },
    role: {
      default: null,
    },
    dismissalType: {
      default: null,
    },
    gender: {
      default: null,
    },
    etnia: {
      default: null,
    },
    pcd: {
      default: null,
    },
    state: {
      default: null,
    },
    city: {
      default: null,
    },
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
