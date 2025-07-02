<template>
  <q-input
    filled
    color="secondary"
    v-model="model"
    :label="col.label"
    :rules="col.rules"
    dense
    :readonly="!editable"
    :class="`col-${col.size} q-mb-sm q-mr-sm`"
    
    :inputmode="col.inputmode || 'text'"
    :maxlength="col.maxlength || null"
    @keydown="handleKeydown"
    >
  </q-input>
</template>

<script>
export default {
  props: ["col", "oldValue"],
  data() {
    return {
      model: "",
      editable: true,
    };
  },
  created() {
    if (this.col.editable !== undefined) this.editable = this.col.editable;
    this.model = this.oldValue;
  },
  watch: {
    col: {
      handler(val) {
        this.model = val.model;
      },
      deep: true,
    },
    model(newQuestion, oldQuestion) {
      this.$parent.alterData(this.col.name, newQuestion);
    },
  },
  methods: {
    handleKeydown(event) {
      if (this.col.customKeydown === 'filterNumbers') {
        this.filterNumbers(event);
      }
    },
    filterNumbers(event) {
      const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab'
      ];

      if (
        !/[0-9]/.test(event.key) && 
        !allowedKeys.includes(event.key) &&
        !event.ctrlKey && !event.metaKey
      ) {
        event.preventDefault();
      }

    },
  },
};
</script>

<style></style>
