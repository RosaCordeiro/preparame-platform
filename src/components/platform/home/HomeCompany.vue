<template>
  <DashBoardAnswers
    :companyId="companyId"
    variant="rh"
    :rh-section="rhSection"
  />
</template>

<script>
import DashBoardAnswers from "./templates/DashBoardAnswers.vue";

export default {
  components: {
    DashBoardAnswers,
  },
  data() {
    return {
      companyId: localStorage.getItem("companyId"),
    };
  },
  computed: {
    rhSection() {
      const matched = this.$route.matched || [];
      for (let i = matched.length - 1; i >= 0; i -= 1) {
        if (matched[i].meta && matched[i].meta.rhSection) {
          return matched[i].meta.rhSection;
        }
      }
      return "metrics";
    },
  },
};
</script>
