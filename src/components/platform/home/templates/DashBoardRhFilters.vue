<template>
  <RhFilterPanel
    :disable-filters="disableFilters"
    :parameters="parameters"
    :period-start.sync="periodStart"
    :period-end.sync="periodEnd"
    :unity.sync="unity"
    :area.sync="area"
    :role.sync="role"
    :dismissal-type.sync="dismissalType"
    :gender.sync="gender"
    :etnia.sync="etnia"
    :pcd.sync="pcd"
    :state.sync="state"
    :city.sync="city"
    :selected-filters="selectedFilters"
    :dismissal-type-options="dismissalTypeOptions"
    :gender-options="genderOptions"
    :etnia-options="etniaOptions"
    :get-option-label="getOptionLabel"
  />
</template>

<script>
import RhFilterPanel from "../company/RhFilterPanel.vue";

export default {
  components: {
    RhFilterPanel,
  },
  props: {
    disableFilters: Boolean,
    parameters: Object,
    periodStart: {
      default: null,
    },
    periodEnd: {
      default: null,
    },
    unity: Array,
    area: Array,
    role: Array,
    dismissalType: Array,
    gender: Array,
    etnia: Array,
    pcd: Array,
    state: Array,
    city: Array,
    selectedFilters: Array,
    dismissalTypeOptions: Array,
    genderOptions: Array,
    etniaOptions: Array,
    getOptionLabel: Function,
  },
};
</script>
