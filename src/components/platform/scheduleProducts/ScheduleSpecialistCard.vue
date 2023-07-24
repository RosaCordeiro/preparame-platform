<template>
  <div>
    <div class="row items-start">
      <q-card class="row col-12 specialists-card" flat bordered>
        <q-card-section horizontal class="col-12">
          <q-card-section
            class="col-1 flex flex-center"
            style="min-width: 180px"
          >
            <q-img
              class="rounded-borders specialists-card-avatar q-ma-md"
              :img-style="{
                'background-size': 'contain',
              }"
              :src="specialist.image"
            ></q-img>
          </q-card-section>
          <q-card-section class="col-6">
            <div class="text-h5 q-mt-sm q-mb-xs">{{ specialist.name }}</div>
            <div
              class="specialists-card-bio q-pa-sm q-mb-sm text-caption text-grey-8"
            >
              {{ specialist.bio }}
            </div>
            <a :href="specialist.linkedinUrl" target="_blank">
              <q-icon name="mdi-linkedin" size="36px" />
            </a>
          </q-card-section>
          <q-card-section class="col-4 q-pa-none">
            <Schedule
              class="col-12"
              :specialistSchedule="specialistSchedule"
              :specialist="specialist"
              :product="product"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
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
.specialists-card {
  max-height: 400px;
}

.specialists-card-bio {
  min-height: 35%;
  border-radius: 5px;
}
</style>
