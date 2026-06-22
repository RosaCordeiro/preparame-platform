<template>
  <div
    class="rh-filter-select"
    :class="{
      'rh-filter-select--disabled': disabled,
      'rh-filter-select--active': hasSelection,
    }"
  >
    <label class="rh-filter-select__label">{{ label }}</label>

    <q-select
      v-if="!disabled"
      v-model="localValue"
      :options="selectOptions"
      outlined
      dense
      clearable
      emit-value
      map-options
      options-dense
      :multiple="multiple"
      :use-chips="multiple"
      :placeholder="multiple ? undefined : 'Todos'"
      class="rh-filter-select__control"
      popup-content-class="rh-filter-select__popup"
    />

    <div v-else class="rh-filter-select__empty">
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
      default: null,
    },
    multiple: {
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
    localValue: {
      get() {
        return this.value;
      },
      set(nextValue) {
        this.$emit("input", nextValue);
      },
    },
    selectOptions() {
      return (this.options || []).map((option) => {
        if (
          typeof option === "object" &&
          option !== null &&
          Object.prototype.hasOwnProperty.call(option, "value")
        ) {
          return {
            label:
              option.label ||
              (this.optionLabelFn
                ? this.optionLabelFn(option.value)
                : String(option.value)),
            value: option.value,
          };
        }

        return {
          label: this.optionLabelFn
            ? this.optionLabelFn(option)
            : String(option),
          value: option,
        };
      });
    },
    hasSelection() {
      if (this.multiple) {
        return Array.isArray(this.value) && this.value.length > 0;
      }

      return this.value !== null && this.value !== undefined && this.value !== "";
    },
  },
};
</script>

<style lang="scss" scoped>
.rh-filter-select {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rh-filter-select__label {
  font-family: "Nunito", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #667998;
}

.rh-filter-select__control {
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

.rh-filter-select--active ::v-deep .q-field__control {
  background: #edf9f4;

  &:before {
    border-color: #15aa7c;
  }
}

.rh-filter-select--disabled .rh-filter-select__empty {
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
</style>
