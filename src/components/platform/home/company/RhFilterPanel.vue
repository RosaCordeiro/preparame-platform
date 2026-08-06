<template>
  <UiFilterPanel
    :notice="disableFilters ? 'Selecione uma empresa para habilitar os filtros' : ''"
    :selected-filters="selectedFilters"
  >
    <div
      class="rh-filter-date"
      :class="{
        'rh-filter-date--disabled': disableFilters,
        'rh-filter-date--active': Boolean(periodStart),
      }"
    >
      <label class="rh-filter-date__label">Data de</label>
      <q-input
        dense
        outlined
        no-error-icon
        mask="##/##/####"
        :value="formatDisplayDate(periodStart)"
        :disable="disableFilters"
        clearable
        placeholder="Selecione"
        class="rh-filter-date__control"
        @clear="emitPeriodStart(null)"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="startProxy" transition-show="scale" transition-hide="scale">
              <q-date
                :value="periodStart"
                mask="YYYY-MM-DD"
                today-btn
                @input="onStartDateInput"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div
      class="rh-filter-date"
      :class="{
        'rh-filter-date--disabled': disableFilters,
        'rh-filter-date--active': Boolean(periodEnd),
      }"
    >
      <label class="rh-filter-date__label">Até</label>
      <q-input
        dense
        outlined
        no-error-icon
        mask="##/##/####"
        :value="formatDisplayDate(periodEnd)"
        :disable="disableFilters"
        clearable
        placeholder="Selecione"
        class="rh-filter-date__control"
        @clear="emitPeriodEnd(null)"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="endProxy" transition-show="scale" transition-hide="scale">
              <q-date
                :value="periodEnd"
                mask="YYYY-MM-DD"
                today-btn
                @input="onEndDateInput"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

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
    periodStart: {
      default: null,
    },
    periodEnd: {
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
      return this.disableFilters || !options || options.length === 0;
    },
    formatDisplayDate(isoDate) {
      if (!isoDate) {
        return "";
      }

      const match = String(isoDate).match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!match) {
        return String(isoDate);
      }

      return `${match[3]}/${match[2]}/${match[1]}`;
    },
    emitPeriodStart(value) {
      this.$emit("update:periodStart", value);
    },
    emitPeriodEnd(value) {
      this.$emit("update:periodEnd", value);
    },
    onStartDateInput(value) {
      this.emitPeriodStart(value || null);
      if (this.$refs.startProxy && this.$refs.startProxy.hide) {
        this.$refs.startProxy.hide();
      }
    },
    onEndDateInput(value) {
      this.emitPeriodEnd(value || null);
      if (this.$refs.endProxy && this.$refs.endProxy.hide) {
        this.$refs.endProxy.hide();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-filter-date {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rh-filter-date__label {
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #667998;
}

.rh-filter-date__control {
  width: 100%;

  ::v-deep .q-field__control {
    min-height: 40px;
    border-radius: 10px;
    background: #fff;
    font-family: "Nunito", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    color: #1a2744;

    &:before {
      border-color: #d8dee8;
    }
  }

  ::v-deep .q-field__native,
  ::v-deep .q-field__input {
    color: #1a2744;
    font-weight: 600;
  }

  ::v-deep .q-field__marginal {
    color: #667998;
  }
}

.rh-filter-date--active ::v-deep .q-field__control {
  background: #edf9f4;

  &:before {
    border-color: #15aa7c;
  }
}

.rh-filter-date--disabled ::v-deep .q-field__control {
  background: #f8f9fb;
}
</style>
