<template>
  <q-card class="card__schedule q-pa-lg row">
    <div
      v-for="(s, index) in schedule"
      :key="index"
      class="col-3 q-pa-sm schedule"
    >
      <q-img :src="s.image" :ratio="9 / 13" class="schedule-image q-mb-md" />

      <p class="schedule-title">Tema: {{ s.title }}</p>
      <p>Quem: {{ s.mentor }}</p>
      <p>Quando: {{ formatDateToStringWithHour(s.date) }}</p>

      <q-banner
        rounded
        class="text-white bg-prepara-me-blue q-mt-md"
        :class="{
          disabled: b2b,
        }"
      >
        <div class="user-card-banner-content row">
          <q-btn
            flat
            color="white"
            label="Participar"
            class="col-12"
            @click="participate(s.id)"
          />
        </div>
      </q-banner>
    </div>
  </q-card>
</template>

<script>
import { filterCrud } from "src/components/general/crud/utils/filterCrud";
import { formatDateToStringWithHour } from "src/utils/formatDate";
import { saveCrud } from "src/components/general/crud/utils/saveCrud";

export default {
  data() {
    return {
      schedule: [],
      b2b: localStorage.getItem("companyId") != "null",
    };
  },
  methods: {
    participate: async function (id) {
      if (this.b2b) {
        const email = localStorage.getItem("userEmail");

        const response = await saveCrud("mentoring/addParticipant", {
          email,
          mentoringId: id,
        });

        if (response.status == 200) {
          this.$q.notify({
            message: "Participação confirmada com sucesso!",
            color: "positive",
            icon: "check",
          });
        } else {
          this.$q.notify({
            message: "Erro ao confirmar participação!",
            color: "negative",
            icon: "warning",
          });
        }
      }
    },
    formatDateToStringWithHour,
    listSchedule: async function () {
      const response = await filterCrud([], "mentoring");
      this.schedule = response.data;
    },
  },
  mounted() {
    this.listSchedule();
  },
};
</script>

<style>
.card__schedule {
  border-radius: 15px;
}

.schedule-image {
  border-radius: 15px;
  width: 100%;
}

.schedule p {
  font-size: 15px;
  margin: 0;
  padding: 0;
}

.schedule-title {
  font-weight: 700;
}
</style>
