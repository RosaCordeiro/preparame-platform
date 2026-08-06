<template>
  <div class="rh-compare-filters">
    <div
      v-for="(set, index) in compareFilterSets"
      :key="set.id"
      class="rh-compare-filters__set"
    >
      <div class="rh-compare-filters__set-header">
        <span class="rh-compare-filters__set-title">{{ set.label }}</span>
        <q-btn
          v-if="index > 0"
          flat
          round
          dense
          icon="mdi-close"
          color="grey-7"
          aria-label="Remover filtro comparativo"
          @click="$emit('remove-set', index)"
        />
      </div>

      <RhFilterPanel
        single-select
        :disable-filters="disableFilters"
        :parameters="parameters"
        :period-start="set.periodStart"
        :period-end="set.periodEnd"
        :unity="set.unity"
        :area="set.area"
        :role="set.role"
        :dismissal-type="set.dismissalType"
        :gender="set.gender"
        :etnia="set.etnia"
        :pcd="set.pcd"
        :state="set.state"
        :city="set.city"
        :selected-filters="selectedFiltersForSet(set)"
        :dismissal-type-options="dismissalTypeOptions"
        :gender-options="genderOptions"
        :etnia-options="etniaOptions"
        :get-option-label="getOptionLabel"
        @update:periodStart="updateSetField(index, 'periodStart', $event)"
        @update:periodEnd="updateSetField(index, 'periodEnd', $event)"
        @update:unity="updateSetField(index, 'unity', $event)"
        @update:area="updateSetField(index, 'area', $event)"
        @update:role="updateSetField(index, 'role', $event)"
        @update:dismissalType="updateSetField(index, 'dismissalType', $event)"
        @update:gender="updateSetField(index, 'gender', $event)"
        @update:etnia="updateSetField(index, 'etnia', $event)"
        @update:pcd="updateSetField(index, 'pcd', $event)"
        @update:state="updateSetField(index, 'state', $event)"
        @update:city="updateSetField(index, 'city', $event)"
      />
    </div>

    <div class="rh-compare-filters__actions">
      <q-btn
        v-if="compareFilterSets.length < maxSets"
        outline
        no-caps
        color="primary"
        icon="mdi-plus"
        label="Comparar filtro"
        class="rh-compare-filters__add"
        :disable="disableFilters"
        @click="$emit('add-set')"
      />
      <span v-else class="rh-compare-filters__limit">
        Máximo de {{ maxSets }} filtros comparativos
      </span>
    </div>
  </div>
</template>

<script>
import RhFilterPanel from "./RhFilterPanel.vue";

export default {
  components: {
    RhFilterPanel,
  },
  props: {
    compareFilterSets: {
      type: Array,
      required: true,
    },
    maxSets: {
      type: Number,
      default: 3,
    },
    disableFilters: Boolean,
    parameters: Object,
    dismissalTypeOptions: Array,
    genderOptions: Array,
    etniaOptions: Array,
    getOptionLabel: Function,
  },
  methods: {
    emitUpdatedSets(nextSets) {
      this.$emit("update:compareFilterSets", nextSets);
    },
    updateSetField(index, field, value) {
      const nextSets = this.compareFilterSets.map((set, setIndex) => {
        if (setIndex !== index) {
          return set;
        }

        return {
          ...set,
          [field]: value,
        };
      });

      this.emitUpdatedSets(nextSets);
      this.$emit("change");
    },
    hasFilterValue(value) {
      return value !== null && value !== undefined && value !== "";
    },
    formatChipDate(isoDate) {
      const match = String(isoDate).match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (!match) {
        return String(isoDate);
      }

      return `${match[3]}/${match[2]}/${match[1]}`;
    },
    selectedFiltersForSet(set) {
      const filters = [];

      if (this.hasFilterValue(set.periodStart) || this.hasFilterValue(set.periodEnd)) {
        const start = this.hasFilterValue(set.periodStart)
          ? this.formatChipDate(set.periodStart)
          : "…";
        const end = this.hasFilterValue(set.periodEnd)
          ? this.formatChipDate(set.periodEnd)
          : "…";
        filters.push(`${start} → ${end}`);
      } else if (this.hasFilterValue(set.period)) {
        filters.push(set.period);
      }

      if (this.hasFilterValue(set.area)) {
        filters.push(set.area);
      }

      if (this.hasFilterValue(set.role)) {
        filters.push(set.role);
      }

      if (this.hasFilterValue(set.unity)) {
        filters.push(set.unity);
      }

      if (this.hasFilterValue(set.state)) {
        if (typeof set.state === "object" && set.state.value) {
          filters.push(set.state.value);
        } else {
          filters.push(set.state);
        }
      }

      if (this.hasFilterValue(set.city)) {
        if (typeof set.city === "object" && set.city.label) {
          filters.push(set.city.label.split(" (")[0]);
        } else {
          filters.push(set.city);
        }
      }

      if (this.hasFilterValue(set.dismissalType)) {
        filters.push(
          this.getOptionLabel(this.dismissalTypeOptions, set.dismissalType)
        );
      }

      if (this.hasFilterValue(set.gender)) {
        filters.push(this.getOptionLabel(this.genderOptions, set.gender));
      }

      if (this.hasFilterValue(set.etnia)) {
        filters.push(this.getOptionLabel(this.etniaOptions, set.etnia));
      }

      if (this.hasFilterValue(set.pcd)) {
        filters.push(`PCD: ${set.pcd}`);
      }

      return filters;
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-compare-filters {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.rh-compare-filters__set {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rh-compare-filters__set-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.rh-compare-filters__set-title {
  font-family: "Nunito", sans-serif;
  font-size: 0.8125rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #128564;
}

.rh-compare-filters__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rh-compare-filters__add {
  align-self: flex-start;
}

.rh-compare-filters__limit {
  font-family: "Nunito", sans-serif;
  font-size: 0.8125rem;
  color: #667998;
}
</style>
