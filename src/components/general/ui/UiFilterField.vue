<script>
import RhFilterSelect from "../../platform/home/company/RhFilterSelect.vue";

export default {
  components: {
    RhFilterSelect,
  },
  functional: false,
  props: {
    label: String,
    options: Array,
    value: {
      default: null,
    },
    selectAll: Boolean,
    disabled: Boolean,
    singleSelect: Boolean,
    optionLabelFn: Function,
  },
  computed: {
    normalizedValue() {
      if (this.singleSelect) {
        if (Array.isArray(this.value)) {
          return this.value.length > 0 ? this.value[0] : null;
        }

        return this.value;
      }

      return Array.isArray(this.value) ? this.value : [];
    },
  },
  render(h) {
    return h(RhFilterSelect, {
      props: {
        label: this.label,
        options: this.options,
        value: this.normalizedValue,
        multiple: !this.singleSelect,
        disabled: this.disabled,
        optionLabelFn: this.optionLabelFn,
      },
      on: {
        input: (nextValue) => {
          this.$emit("input", nextValue);
          this.$emit("update:selectAll", false);
        },
      },
    });
  },
};
</script>
