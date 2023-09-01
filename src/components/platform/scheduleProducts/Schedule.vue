<template>
  <div>
    <q-card class="q-ma-xs q-mt-md" flat bordered>
      <q-card-section class="schedule-card q-pa-none">
        <div class="schedule-title q-mt-xs q-mb-xs text-weight-light col-3">
          Selecione um dia e horário disponível
        </div>
        <div class="schedule-header">
          <div class="schedule-header-set-prior-day">
            <q-icon
              name="mdi-chevron-double-left"
              class="specialist-schedule-icon text-blue-grey-8"
              @click="priorWeek()"
              ><q-tooltip>Semana Anterior</q-tooltip></q-icon
            >
          </div>
          <div class="schedule-container">
            <div class="schedule-days">
              <div
                class="schedule-day"
                v-for="day in specialistScheduleData"
                :key="day.id"
              >
                <div
                  class="schedule-day-header text-blue-grey-10 text-caption bg-grey-4"
                >
                  <div class="schedule-day-header-weekday">
                    {{ day.header.weekDay }}
                  </div>
                  <div class="schedule-day-header-month-data text-weight-light">
                    {{ day.header.monthDay }}
                    {{ day.header.monthAbbr }}
                  </div>
                </div>
              </div>
            </div>
            <div class="schedule-day-hours-container">
              <div
                class="schedule-day-hours"
                v-for="(day, dayIndex) in specialistScheduleData"
                :key="day.monthDay"
              >
                <q-btn
                  v-for="(hour, hourIndex) in day.hours"
                  :key="hour.id"
                  :label="hour.hour ? hour.hour : 'N/A'"
                  class="q-pl-sm q-pr-sm schedule-day-hour text-weight-light"
                  color="light-blue-2"
                  text-color="black"
                  dense
                  unelevated
                  :disable="hour.hour && hour.available ? false : true"
                  @click="
                    confirmSchedule(day.header, hour, dayIndex, hourIndex)
                  "
                ></q-btn>
              </div>
            </div>
          </div>
          <div class="schedule-header-set-next-day">
            <q-icon
              name="mdi-chevron-double-right"
              class="specialist-schedule-icon text-blue-grey-8"
              @click="nextWeek()"
            >
              <q-tooltip>Próxima semana</q-tooltip>
            </q-icon>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <ConfirmSchedule :confirmScheduleFunctions="confirmScheduleFunctions" />
  </div>
</template>

<script>
import {
  organizeSpecialistScheduleData,
  getDayOfNextWeek,
  getDayOfWeek,
} from "./organizeSpecialistScheduleData.js";
import ConfirmSchedule from "./ConfirmSchedule.vue";
import { filterCrud } from "./../../general/crud/utils/filterCrud.js";

import Vue from "vue";

export default {
  components: {
    ConfirmSchedule,
  },
  data() {
    return {
      weekCount: 1,
      specialistScheduleData: [],
      specialistScheduleSelected: {},
      confirmScheduleFunctions: new Vue(),
    };
  },
  props: {
    specialistSchedule: {
      type: Array,
      required: false,
    },
    specialist: {
      type: Object,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.specialistScheduleData = this.specialistSchedule;

    this.specialistScheduleData.forEach((specialistSchedule) => {
      specialistSchedule.hours.forEach((hour) => {
        if (hour.dateSchedule) {
          const diffHours = Math.abs(new Date() - hour.dateSchedule) / 36e5;

          if (diffHours < 3) {
            hour.available = false;
          }
        }
      });
    });
  },
  methods: {
    confirmSchedule: function (daySchedule, hourSchedule, dayIndex, hourIndex) {
      let rangeDuration = {
        from: 0,
        to: this.product.duration - 1,
        [Symbol.iterator]() {
          return {
            current: this.from,
            last: this.to,
            next() {
              if (this.current <= this.last) {
                return { done: false, value: this.current++ };
              } else {
                return { done: true };
              }
            },
          };
        },
      };

      let allSchedulesAvailables = true;
      let selectedSchedules = [];

      for (let indexRangeDuration of rangeDuration) {
        const validationHourIndex = hourIndex + indexRangeDuration;
        if (
          !this.specialistScheduleData[dayIndex].hours[validationHourIndex] ||
          !this.specialistScheduleData[dayIndex].hours[validationHourIndex]
            .available
        ) {
          allSchedulesAvailables = false;
        } else {
          selectedSchedules.push(
            this.specialistScheduleData[dayIndex].hours[validationHourIndex]
          );
        }
      }

      if (!allSchedulesAvailables) {
        this.$q.notify({
          type: "error",
          message: `São necessários ${this.product.duration} horários livres em sequência para poder agendar este produto. Por favor, escolha outro horário disponível.`,
        });

        return;
      } else {
        this.confirmScheduleFunctions.$emit(
          "showScheduleConfirmDialog",
          daySchedule,
          selectedSchedules,
          this.specialist,
          this.product
        );
      }
    },
    priorWeek: function () {
      if (this.weekCount === 1) {
        this.$q.notify({
          type: "error",
          message:
            "Não é possível agendar horários para semanas anteriores a esta.",
        });

        return;
      }

      this.loadPriorWeekSchedules();
      this.weekCount--;
    },
    nextWeek: function () {
      if (this.weekCount === 4) {
        this.$q.notify({
          type: "error",
          message:
            "Não é possível agendar horários para semanas posteriores a esta.",
        });

        return;
      }

      this.loadNextWeekSchedules();
      this.weekCount++;
    },
    async loadNextWeekSchedules() {
      const actualDate = new Date();

      actualDate.setDate(actualDate.getDate() + (this.weekCount - 1) * 7);

      const dateBegin = getDayOfNextWeek(
        actualDate,
        1,
        actualDate.getDay() <= 5
      );
      const dateEnd = getDayOfNextWeek(actualDate, 5, actualDate.getDay() <= 5);

      await this.loadWeekSchedules(dateBegin, dateEnd);
    },
    async loadPriorWeekSchedules() {
      const actualDate = new Date();

      actualDate.setDate(actualDate.getDate() + (this.weekCount - 2) * 7);

      const dateBegin = getDayOfWeek(actualDate, 1, actualDate.getDay() <= 5);
      const dateEnd = getDayOfWeek(actualDate, 5, actualDate.getDay() <= 5);

      await this.loadWeekSchedules(dateBegin, dateEnd);
    },
    async loadWeekSchedules(dateBegin, dateEnd) {
      dateBegin.setHours(0, 0, 0);
      dateEnd.setHours(23, 59, 59);

      const filtersSpecialistSchedule = [
        {
          name: "specialistId",
          model: this.specialist.id,
        },
        {
          name: "dateBegin",
          model: dateBegin,
        },
        {
          name: "dateEnd",
          model: dateEnd,
        },
      ];

      const specialistsSchedule = await filterCrud(
        filtersSpecialistSchedule,
        `specialists/schedule`
      );

      this.specialistScheduleData = organizeSpecialistScheduleData(
        specialistsSchedule,
        dateBegin,
        dateEnd
      );
    },
  },
};
</script>

<style lang="scss">
.schedule-card {
  display: flex;
  flex-direction: column;
}

.schedule-header {
  display: flex;
  margin: 0 auto;
}

.schedule-title {
  text-align: center;
}

.schedule-container {
  display: flex;
  flex-direction: column;
  height: 90%;
}

.schedule-days {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-right: 10px;
}

.schedule-day-header {
  font-size: 0.5rem;
  display: flex;
  flex-direction: column;
  margin: 0 4px 4px 4px;
  width: 40px;
  border-radius: 5px;
  align-items: center;
}

.schedule-day-header-month-data {
  line-height: 6px;
  margin-bottom: 4px;
  color: black;
}

.schedule-day-header-weekday {
  line-height: 15px;
  margin-bottom: 2px;
}

.schedule-day-header-weekday::first-letter {
  text-transform: capitalize;
}

.schedule-day-hours-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-height: 160px;
  min-height: 50px;
  overflow: scroll;
}

.schedule-day-hours {
  display: flex;
  flex-direction: column;
  width: 40px;
}

.schedule-day-hour {
  font-size: 0.6rem;
  text-align: center;
  margin: 2px;
}

.schedule-header-set-next-day,
.schedule-header-set-prior-day {
  cursor: pointer;
}
</style>
