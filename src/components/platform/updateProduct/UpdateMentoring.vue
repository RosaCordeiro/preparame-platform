<template>
  <q-page>
    <Toolbar class="platform-toolbar" />
    <MentoringExchange/>
  </q-page>
</template>

<script>
import MentoringExchange from "./MentoringExchange.vue";

export default {
  data() {
    return {
    };
  },
  components: {
    MentoringExchange,
    Toolbar: () => {
      const component = window.mobileAndTabletCheck()
        ? import("../toolbar/ToolbarMobile.vue")
        : import("../toolbar/Toolbar.vue");
      return component;
    },
  },
}
</script>

<style lang="scss">
.platform-content {
  background-color: #f5f6fa;
  font-family: "Nunito";
  font-style: normal;
}

</style>
