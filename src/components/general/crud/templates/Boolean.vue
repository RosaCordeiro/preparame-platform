<template>
  <div class="row justify-end" :class="`col-${col.size} q-mb-sm q-mr-sm`">
    <q-toggle
      filled
      color="secondary"
      v-model="model"
      :label="col.label"
      :rules="col.rules"
      dense
      :readonly="!editable"
    />
  </div>
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

    if (this.oldValue === undefined) this.model = false;

    console.log("this.model", this.model);
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
};
</script>

<style></style>
