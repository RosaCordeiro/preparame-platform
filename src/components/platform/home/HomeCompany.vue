<template>
  <DashBoardAnswers
  :companyId="companyId"
  >
  </DashBoardAnswers>
</template>

<script>
import DashBoardAnswers from './templates/DashBoardAnswers.vue';
export default {
  components: {
    DashBoardAnswers,

  },
  data(){
    return{
      companyId: localStorage.getItem("companyId")
    }
  },
}
</script>

<style>

</style>
