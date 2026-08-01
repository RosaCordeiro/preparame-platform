<template>
  <apexchart v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "ChartApex",
  components: {
    apexchart: VueApexCharts,
  },
  inheritAttrs: false,
};
</script>
