<template>
  <q-input
    filled
    v-model="model"
    :label="col.label"
    :rules="col.rules"
    dense
    :readonly="!editable"
    :class="`col-${col.size} q-mb-sm q-mr-sm`"
  >
    <template v-slot:append>
      <q-icon name="colorize" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-color v-model="model" />
        </q-popup-proxy>
      </q-icon>
    </template>
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
};
</script>

<style></style>
