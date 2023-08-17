<template>
  <div class="col items-start">
    <q-card class="col specialists-card-mobile" flat bordered>
      <q-card-section class="col q-pa-none">
        <q-card-section horizontal class="flex flex-center">
          <img
            :src="specialist.image"
            alt=""
            srcset=""
            class="specialists-card-avatar q-ma-lg"
          />
          <div class="col q-ml-sm">
            <div class="text-subtitle1 q-mt-sm q-mb-xs">
              {{ specialist.name }}
            </div>
            <div class="specialists-card-mobile-bio text-caption text-grey-8">
              {{ specialist.bio }}
            </div>
            <a :href="specialist.linkedinUrl" target="_blank">
              <q-icon name="mdi-linkedin" size="24px" />
            </a>
          </div>
        </q-card-section>
        <Schedule
          :specialistSchedule="specialistSchedule"
          :specialist="specialist"
          :product="product"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  components: {
    Schedule: () => import("./Schedule.vue"),
  },
  props: {
    specialist: {
      type: Object,
      required: true,
    },
    specialistSchedule: {
      type: Array,
      required: false,
    },
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.specialists-card-mobile {
  min-height: 200px;
}

.specialists-card-avatar {
  height: 100px;
}
</style>
