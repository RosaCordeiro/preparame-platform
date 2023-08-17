<template>
  <q-banner
    rounded
    :class="{
      'event-schedule': true,
      'q-ma-xs': true,
      'text-white': true,
      'bg-grey': !eventValid,
      'bg-secondary': eventValid && !lessThen1Hour,
      'bg-primary': eventValid && lessThen1Hour,
    }"
  >
    <div class="col items-start items-center">
      <div class="col">
        <div class="text-weight-regular text-left text-subtitle2">
          {{ scheduleDay }} de {{ month }} às {{ hour }} horas
        </div>
      </div>
      <div class="col items-start items-center event-schedule-info">
        <div class="event-schedule-product col items-center">
          <div class="text-subtitle2 text-weight-regular">
            {{ productName }}
          </div>
          <div class="text-caption text-weight-light">
            {{
              userType === "USER"
                ? specialistName
                : Object.entries(this.schedulesGroup)[0][1][0].type === "group"
                ? "Mentoria Coletiva"
                : getUserName(eventSchedule.schedules)
            }}
          </div>
        </div>
        <div class="event-schedule-hour">
          <div class="text-subtitle1 text-center"></div>
        </div>
        <div class="event-schedule-hour">
          <div class="text-subtitle1 text-left">
            <q-btn
              v-if="eventValid && lessThen1Hour"
              color="white"
              class="text-caption"
              flat
              @click="goMeet()"
              >Ir para reunião</q-btn
            >
            <div v-if="!eventValid" class="text-caption" color="white">
              Evento já terminou
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="event-schedule-hour col-8"
            style="justify-content: center; display: flex"
          >
            <q-rating
              v-model="rate"
              max="5"
              size="2em"
              color="gold"
              icon="star_border"
              icon-selected="star"
              :disable="eventValid"
              @click="!eventValid ? rateSpecialist() : null"
            />
          </div>
          <div class="event-schedule-hour col-2">
            <div class="text-subtitle1 text-center">
              <q-btn
                v-if="eventValid"
                color="white"
                class="text-caption"
                flat
                @click="goMeet()"
                :disable="!lessThen1Hour"
                >Ir para reunião</q-btn
              >
              <div v-else class="text-caption" color="white">
                Evento já terminou
              </div>
            </div>
          </div>
        </div>
        <div v-if="eventValid && !lessThen24Hours">
          <q-btn
            color="white"
            class="text-caption"
            flat
            @click="confirm = true"
          >
            <q-tooltip> Cancelar Agendamento </q-tooltip>
            <q-icon
              v-if="eventValid && !lessThen24Hours && userType === 'USER'"
              name="mdi-delete-outline"
              class="event-schedule-delete-icon text-h5"
            ></q-icon>
          </q-btn>
        </div>
      </div>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="mdi-exclamation"
            color="negative"
            text-color="white"
          />
          <span class="q-ml-sm"
            >Deseja confirmar o cancelamento do horário agendado?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Sim"
            color="primary"
            v-close-popup
            @click="cancelSchedule()"
          />
          <q-btn flat label="Não" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-banner>
</template>

<script>
import { saveCrud } from "./../../../general/crud/utils/saveCrud.js";

export default {
  data() {
    return {
      scheduleDay: "",
      month: "",
      specialistName: "",
      productName: "",
      hour: "",
      eventValid: true,
      lessThen24Hours: false,
      lessThen1Hour: false,
      confirm: false,
      eventSchedule: {},
      rate: 0,
    };
  },
  props: ["schedulesGroup", "userType"],
  methods: {
    getUserName(data) {
      try {
        return data[0].user.name;
      } catch (error) {
        return "Usuário não encontrado.";
      }
    },
    goMeet() {
      if (this.eventSchedule.schedules[0].hangoutLink) {
        window.location.href = this.eventSchedule.schedules[0].hangoutLink;
      } else {
        this.$q.notify({
          type: "error",
          message: "Link não encontrado.",
        });
      }
    },
    async rateSpecialist() {
      if (Object.entries(this.schedulesGroup)[0][1][0].type === "individual") {
        await saveCrud(
          `specialists/schedule/${this.eventSchedule.schedules[0].id}`,
          this.eventSchedule.schedules[0],
          "put",
          true
        );
      }

      if (Object.entries(this.schedulesGroup)[0][1][0].type === "group") {
        await saveCrud(
          `mentoring/rate`,
          {
            mentoringId: this.eventSchedule.schedules[0].id,
            rate: this.rate,
          },
          "put",
          true
        );
      }
    },
    async cancelSchedule() {
      if (Object.entries(this.schedulesGroup)[0][1][0].type === "group") {
        await saveCrud(
          `mentoring/removeParticipant`,
          {
            mentoringId: this.eventSchedule.schedules[0].id,
          },
          "post"
        );
      } else {
        for (const index in this.eventSchedule.schedules) {
          const revertAvailableProduct = index == 0;

          await saveCrud(
            `specialists/schedule/${this.eventSchedule.schedules[index].id}/cancel`,
            { revertAvailableProduct },
            "post"
          );
        }
      }

      document.location.reload(true);
    },
  },
  mounted() {
    this.eventSchedule.schedules = Object.entries(this.schedulesGroup)[0][1];

    let dateSchedule = new Date(this.eventSchedule.schedules[0].dateSchedule);

    dateSchedule = new Date(
      dateSchedule.setHours(
        dateSchedule.getHours() + dateSchedule.getTimezoneOffset() / 60 + 1
      )
    );

    const actualDate = new Date();

    const actualDateAddEventDuration = new Date(
      actualDate.setHours(actualDate.getHours())
    );

    this.eventValid = !(actualDateAddEventDuration > dateSchedule);

    const diffHours = Math.abs(actualDate - dateSchedule) / 36e5;

    this.lessThen24Hours = diffHours < 24;
    this.lessThen1Hour = diffHours < 2;

    this.scheduleDay = dateSchedule.getDate();

    this.month = dateSchedule.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });

    this.specialistName = this.eventSchedule.schedules[0].specialist.name;

    this.productName =
      this.eventSchedule.schedules[0].product &&
      this.eventSchedule.schedules[0].product.name
        ? this.eventSchedule.schedules[0].product.name
        : "Serviço não identificado";

    let hour = `0${dateSchedule.getHours() - 1}`;
    hour = hour.substring(hour.length - 2);

    let minute = `0${dateSchedule.getMinutes()}`;
    minute = minute.substring(minute.length - 2);

    this.hour = `${hour}:${minute}`;
    this.rate = Object.entries(this.schedulesGroup)[0][1][0].rating;
  },
};
</script>

<style lang="scss">
.event-schedule-delete-icon {
  cursor: pointer;
}

.event-schedule-delete-icon {
  cursor: pointer;
}
</style>
