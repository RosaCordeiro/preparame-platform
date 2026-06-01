<template>
  <component
    :is="component"
    :col="col"
    :oldValue="col.model"
    v-if="component && col.visible"
  />
</template>

<script>
import emitter from "../../../../config/event-bus.js";

export default {
  name: "dynamic-link",
  props: ["col"],
  data() {
    return {
      component: null,
    };
  },
  watch: {
    col: {
      handler: function (val) {
        emitter.emit("update_model", val);
      },
      deep: true,
    },
  },
  computed: {
    loader() {
      console.log(this.col.type);
      if (!this.col.type) {
        return null;
      }

      return () => import(`./${this.col.type}`);
    },
  },
  methods: {
    alterData: function (name, data) {
      if (this.$parent.$parent.$parent.$parent.alterData) {
        this.$parent.$parent.$parent.$parent.alterData(name, data);
      } else if (
        this.$parent.$parent.$parent.$parent.$parent.$parent.alterData
      ) {
        this.$parent.$parent.$parent.$parent.$parent.$parent.alterData(
          name,
          data
        );
      }
    },
  },
  mounted() {
    this.loader()
      .then(() => {
        this.component = () => this.loader();
      })
      .catch(() => {
        this.component = () => import("./Default");
      });
  },
};
</script>

<style scoped>
.crud-filter .q-mr-sm,
.crud-register .q-mr-sm {
  margin-right: unset;
  padding-right: 8px;
}
</style>
