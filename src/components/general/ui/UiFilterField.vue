<template>
  <div
    class="rh-filter-field"
    :class="{ 'rh-filter-field--disabled': disabled, 'rh-filter-field--active': hasSelection }"
  >
    <label class="rh-filter-field__label">{{ label }}</label>

    <q-btn-dropdown
      v-if="!disabled"
      outline
      no-caps
      color="primary"
      :label="buttonLabel"
      class="rh-filter-field__control"
      content-class="rh-filter-field__menu"
    >
      <q-list dense class="rh-filter-field__list">
        <q-item tag="label" v-ripple v-if="options.length > 0">
          <q-item-section avatar>
            <q-checkbox
              color="primary"
              v-model="localSelectAll"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Selecionar todos</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator v-if="options.length > 0" />

        <q-item
          tag="label"
          v-ripple
          v-for="(option, index) in options"
          :key="index"
        >
          <q-item-section avatar>
            <q-checkbox
              color="primary"
              :val="getOptionValue(option)"
              v-model="localValue"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ getOptionLabel(option) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <div v-else class="rh-filter-field__empty">
      Sem opções
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    selectAll: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    optionLabelFn: {
      type: Function,
      default: null,
    },
  },
  computed: {
    hasSelection() {
      return this.value.length > 0;
    },
    localValue: {
      get() {
        return this.value;
      },
      set(nextValue) {
        this.$emit("input", nextValue);
      },
    },
    localSelectAll: {
      get() {
        return this.selectAll;
      },
      set(nextValue) {
        this.$emit("update:selectAll", nextValue);
      },
    },
    buttonLabel() {
      if (this.value.length === 0) {
        return "Todos";
      }

      if (this.value.length === 1) {
        return this.getOptionLabel(this.value[0]);
      }

      return `${this.value.length} selecionados`;
    },
  },
  methods: {
    getOptionValue(option) {
      return option;
    },
    getOptionLabel(option) {
      if (this.optionLabelFn) {
        return this.optionLabelFn(option);
      }

      if (typeof option === "object" && option !== null) {
        return option.label || option.value || String(option);
      }

      return String(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-filter-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rh-filter-field__label {
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #667998;
}

.rh-filter-field__control {
  width: 100%;

  ::v-deep .q-btn {
    width: 100%;
    min-height: 40px;
    border-radius: 10px;
    border: 1px solid #d8dee8;
    background: #fff;
    color: #1a2744;
    font-family: "Nunito", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    justify-content: space-between;
    padding: 0 12px;

    &:before {
      box-shadow: none;
    }

    .q-btn__content {
      color: #1a2744;
      width: 100%;
      justify-content: space-between;
    }
  }
}

.rh-filter-field--active ::v-deep .q-btn {
  border-color: #15aa7c;
  background: #edf9f4;
}

.rh-filter-field--disabled .rh-filter-field__empty {
  min-height: 40px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px dashed #d8dee8;
  background: #f8f9fb;
  color: #99a5b8;
  font-family: "Nunito", sans-serif;
  font-size: 0.8125rem;
}

.rh-filter-field__list {
  min-width: 220px;
  max-height: 280px;
  overflow-y: auto;
}
</style>
