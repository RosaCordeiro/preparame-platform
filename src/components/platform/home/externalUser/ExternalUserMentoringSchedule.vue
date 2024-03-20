<template>
  <q-card class="card__schedule q-pa-lg row">
    <div
      v-for="(s, index) in schedule"
      :key="index"
      class="col-3 q-pa-sm schedule"
      style="justify-content: space-between"
    >
      <q-img :src="s.image" :ratio="9 / 13" class="schedule-image q-mb-md" />

      <p class="schedule-title">Tema: {{ s.title }}</p>
      <p>Quem: {{ s.mentor !== null ? s.mentor.name : "N/A" }}</p>
      <p>Quando: {{ formatDateToStringWithHour(s.date) }}</p>

      <q-banner
        rounded
        class="text-white bg-prepara-me-blue q-mt-md"
        :class="{
          disabled: !adept || !s.available || s.participating,
        }"
      >
        <div class="user-card-banner-content row">
          <q-btn
            flat
            color="white"
            label="Participar"
            class="col-12"
            @click="participate(s.id)"
            :disable="!adept || !s.available || s.participating"
          >
          </q-btn>
        </div>
        <q-tooltip v-if="s.participating">
          <div class="tooltip-text">
            Você já está participando dessa mentoria!
          </div>
        </q-tooltip>
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
      adept:
        (localStorage.getItem("companyId") !== "" &&
          localStorage.getItem("companyId") !== null &&
          localStorage.getItem("companyId") !== "null") ||
        (localStorage.getItem("companyNameSignIn") !== "" &&
          localStorage.getItem("companyNameSignIn") !== null &&
          localStorage.getItem("companyNameSignIn") !== "null"),
    };
  },
  methods: {
    participate: async function (id) {
      if (this.adept) {
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

          this.listSchedule();

          document.location.reload(true);
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
      console.log("response", response);
      this.schedule = response.data.map((s) => {
        const eventDate = new Date(s.date).setHours(
          new Date(s.date).getHours() + 3
        );
        const dateNow = new Date().setHours(new Date().getHours());

        if (eventDate < dateNow) {
          s.available = false;
        } else {
          s.available = true;
        }

        return {
          ...s,
        };
      });
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
