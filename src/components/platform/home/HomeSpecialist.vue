<template>
  <div id="q-app" class="schedule">
    <q-page class="q-pa-md">
      <Schedule :homeType="'SPECIALIST'" />
    </q-page>
  </div>
</template>

<script>
import Schedule from "./templates/Schedule.vue";

export default {
  components: {
    Schedule,
  },
};
</script>

<style>
.schedule {
  height: 100%;
}
</style>
