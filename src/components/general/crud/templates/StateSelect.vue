<template>
  <q-select
    v-model="model"
    :options="stateOptions"
    filled
    color="secondary"
    :label="col.label"
    map-options
    dense
    use-input
    input-debounce="300"
    @filter="filterStates"
    :class="`col-${col.size} q-mb-sm q-mr-sm`"
  />
</template>

<script>
import emitter from "../../../../config/event-bus";

export default {
  props: ["col", "oldValue"],
  data() {
    return {
      model: "",
      stateOptions: [],
      allStates: [],
    };
  },
  created() {
    this.model = this.oldValue;
    this.loadStates();
  },
  methods: {
    async loadStates() {
      try {
        const response = await fetch("/estados-cidades.json");
        const data = await response.json();
        this.allStates = data.estados.map((estado) => ({
          label: `${estado.nome} (${estado.sigla})`,
          value: estado.sigla,
        }));
        this.stateOptions = this.allStates;
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
      }
    },
    filterStates(val, update) {
      update(() => {
        if (val === "") {
          this.stateOptions = this.allStates;
        } else {
          const needle = val.toLowerCase();
          this.stateOptions = this.allStates.filter(
            (state) => state.label.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
  },
  watch: {
    model: {
      handler(val) {
        if (val && this.$parent && this.$parent.alterData) {
          this.$parent.alterData(this.col.name, val);
        }
      },
    },
  },
};
</script>
