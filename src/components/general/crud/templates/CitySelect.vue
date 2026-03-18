<template>
  <q-select
    v-model="model"
    :options="cityOptions"
    filled
    color="secondary"
    :label="col.label"
    map-options
    dense
    use-input
    input-debounce="300"
    @filter="filterCities"
    :class="`col-${col.size} q-mb-sm q-mr-sm`"
    :disable="!selectedState"
  />
</template>

<script>
import emitter from "../../../../config/event-bus";

export default {
  props: ["col", "oldValue"],
  data() {
    return {
      model: "",
      cityOptions: [],
      allCities: [],
      selectedState: null,
      allStatesData: [],
    };
  },
  async created() {
    this.model = this.oldValue;
    await this.loadStatesData();

    emitter.on("update_model", (data) => {
      if (data.name === "state") {
        this.selectedState =
          data.model && data.model.value ? data.model.value : data.model;
        this.loadCitiesForState();
      }
    });
  },
  methods: {
    async loadStatesData() {
      try {
        const response = await fetch("/estados-cidades.json");
        const data = await response.json();
        this.allStatesData = data.estados;
      } catch (error) {
        console.error("Erro ao carregar dados de estados:", error);
      }
    },
    loadCitiesForState() {
      if (!this.selectedState) {
        this.cityOptions = [];
        this.allCities = [];
        return;
      }

      const state = this.allStatesData.find(
        (s) => s.sigla === this.selectedState
      );
      if (state) {
        this.allCities = state.cidades.map((cidade) => ({
          label: cidade,
          value: cidade,
        }));
        this.cityOptions = this.allCities;
      }
    },
    filterCities(val, update) {
      update(() => {
        if (val === "") {
          this.cityOptions = this.allCities;
        } else {
          const needle = val.toLowerCase();
          this.cityOptions = this.allCities.filter(
            (city) => city.label.toLowerCase().indexOf(needle) > -1
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
  destroyed() {
    emitter.off("update_model");
  },
};
</script>
