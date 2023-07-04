<template>
  <q-input
    :key="col.name"
    filled
    color="secondary"
    v-model="model"
    :label="col.label"
    :mask="mask"
    dense
    type="datetime-local"
    :class="`col-${col.size}
    q-mb-sm q-mr-sm date`"
  />
</template>

<script>
import localeDateStrings from "../../../../utils/localeDateStrings.js";

export default {
  props: ["col", "oldValue"],
  data() {
    return {
      model: new Date(),
      selectedDate: new Date(),
      localeDateStrings,
      mask: "##/##/####",
      rules: "",
    };
  },
  created() {
    this.model = this.oldValue;

    console.log(this.model);

    const dateRule = [
      ((value) => {
        if (!value) {
          return true;
        }

        const dateParts = value.split("/");

        value = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

        return value instanceof Date && !isNaN(value.valueOf());
      }) || "Data Inválida",
    ];

    this.rules = dateRule;
  },

  watch: {
    col: {
      handler(val) {
        this.model = val.model;
      },
      deep: true,
    },
    model(newValue, oldValue) {
      this.$parent.alterData(this.col.name, newValue);
    },
  },
};
</script>

<style>
.date .q-field__label.no-pointer-events.absolute.ellipsis {
  max-width: 133%;
  transform: translateY(-40%) scale(0.75);
  transition: transform 0.36s cubic-bezier(0.4, 0, 0.2, 1),
    max-width 0.396s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
