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
    q-mb-sm q-mr-sm`"
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
  methods: {
    formatDate(date) {
      if (date.length === 16) {
        return date;
      }

      const newDate = new Date(date);

      const year = newDate.getFullYear();
      const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
      const day = newDate.getDate().toString().padStart(2, "0");

      const hour = newDate.getHours().toString().padStart(2, "0");
      const minutes = newDate.getMinutes().toString().padStart(2, "0");

      return `${year}-${month}-${day}T${hour}:${minutes}`;
    },
  },

  watch: {
    col: {
      handler(val) {
        console.log(val.model);
        this.model = this.formatDate(val.model);
      },
      deep: true,
    },
    model(newValue, oldValue) {
      this.$parent.alterData(this.col.name, newValue);
    },
  },
};
</script>

<style></style>
