<template>
  <RhFilterPanel
    :disable-filters="disableFilters"
    :parameters="parameters"
    :period.sync="period"
    :unity.sync="unity"
    :area.sync="area"
    :role.sync="role"
    :dismissal-type.sync="dismissalType"
    :gender.sync="gender"
    :etnia.sync="etnia"
    :pcd.sync="pcd"
    :state.sync="state"
    :city.sync="city"
    :select-all-periods.sync="selectAllPeriods"
    :select-all-unity.sync="selectAllUnity"
    :select-all-area.sync="selectAllArea"
    :select-all-role.sync="selectAllRole"
    :select-all-dismissal-type.sync="selectAllDismissalType"
    :select-all-gender.sync="selectAllGender"
    :select-all-etnia.sync="selectAllEtnia"
    :select-all-pcd.sync="selectAllPcd"
    :select-all-state.sync="selectAllState"
    :select-all-city.sync="selectAllCity"
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
    selectedFilters: Array,
    dismissalTypeOptions: Array,
    genderOptions: Array,
    etniaOptions: Array,
    getOptionLabel: Function,
  },
};
</script>
