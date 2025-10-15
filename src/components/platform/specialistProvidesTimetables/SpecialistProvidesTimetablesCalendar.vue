<template>
  <q-date
    v-model="dateCalendar"
    :landscape="!mobile"
    :locale="localeDateStrings"
    :class="{
      'specialist-provides-timetables-calendar-mobile': mobile,
    }"
  ></q-date>
</template>

<script>
import localeDateStrings from "./../../../utils/localeDateStrings.js";
import { formatDateToStringMasked } from "../../../utils/formatDate.js";

export default {
  data() {
    return {
      localeDateStrings,
      dateCalendar: new Date(),
      mobile: false,
    };
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();

    this.dateCalendar = formatDateToStringMasked(
      this.dateCalendar,
      "yyyy/mm/dd"
    );
  },
  watch: {
    dateCalendar(newQuestion) {
      // Emite evento para o componente pai
      this.$emit('dateChanged', newQuestion);
      // Fallback para o método antigo
      if (this.$parent && this.$parent.$parent && this.$parent.$parent.dateCalendar !== undefined) {
        this.$parent.$parent.dateCalendar = newQuestion;
      } else if (this.$parent && this.$parent.dateCalendar !== undefined) {
        this.$parent.dateCalendar = newQuestion;
      }
    },
  },
};
</script>

<style lang="scss">
.specialist-provides-timetables-calendar-mobile {
  width: 100%;
}
</style>
