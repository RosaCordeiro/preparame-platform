<template>
  <div class="row-info">
    <h2>{{ label }}</h2>

    <img
      src="~assets/icons/info.png"
      alt=""
      width="16"
      height="16"
      @click="open"
    />

    <InformationDialogWidget ref="infoWidget" />
  </div>
</template>

<script>
import InformationDialogWidget from "./InformationDialogWidget.vue";

export default {
  name: "IconInfo",
  components: {
    InformationDialogWidget,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    open() {
      this.$refs.infoWidget.open(this.label);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

h2 {
  color: rgba(26, 39, 183, 1);
  font-size: 32px;
  line-height: 39px;
  margin: 0 !important;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}

.row-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.row-info img {
  cursor: pointer;
}
</style>
