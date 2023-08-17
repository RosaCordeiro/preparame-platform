<template>
  <q-card
    :class="{
      'specialist-provides-timetable-timetable': !this.mobile,
      'q-ml-md': !this.mobile,
      'specialist-provides-timetable-timetable-mobile': this.mobile,
    }"
  >
    <q-card-section
      class="bg-secondary text-white specialist-provides-timetable-timetable-title"
    >
      <div class="text-h6">Marque seus horários como disponíveis</div>
      <div class="text-subtitle2">
        Dia {{ formatDate(dateCalendar, "dd/mm/yyyy") }}
      </div>
    </q-card-section>
    <q-card-section class="specialist-provides-timetable-timetable-hours">
      <q-banner
        v-for="hour in hours"
        :key="hour.id"
        rounded
        :class="{
          'text-white': true,
          'bg-grey': !hour.scheduled && !hour.available,
          'bg-green-8': !hour.scheduled && hour.available,
          'bg-blue': hour.scheduled,
          'q-mb-sm': true,
        }"
      >
        <div class="row items-start items-center">
          <div class="row text-center text-h5 col-2">
            <div>{{ hour.hour }}</div>
          </div>
          <q-space v-if="!hour.scheduled" class="col-7"></q-space>
          <div v-else class="col">
            <div class="text-subtitle1">{{ hour.userName }}</div>
            <div class="text-subtitle2">{{ hour.productName }}</div>
          </div>
          <div class="row items-start col-3">
            <div class="row items-center">
              <q-toggle
                v-if="!hour.scheduled && !hour.disable"
                v-model="hour.available"
                checked-icon="check"
                color="green"
                unchecked-icon="clear"
                :disable="hour.disable"
                @input="providesHour(hour)"
              />
              <div
                v-if="!hour.scheduled && hour.available"
                class="text-subtitle2"
              >
                Disponível
              </div>
              <div
                v-else-if="!hour.scheduled && !hour.available && !hour.disable"
                class="text-subtitle2"
              >
                Indisponível
              </div>
              <!-- <div v-if="hour.scheduled" class="text-subtitle2">
                <q-btn
                  color="blue-10"
                  icon-right="mdi-file"
                  label="Informações"
                  size="sm"
                />
              </div> -->
            </div>
          </div>
        </div>
      </q-banner>
    </q-card-section>
  </q-card>
</template>

<script>
import { formatDateToStringMasked } from "../../../utils/formatDate.js";
import { saveCrud } from "./../../general/crud/utils/saveCrud.js";
import { removeCrud } from "./../../general/crud/utils/removeCrud.js";
import { filterCrud } from "./../../general/crud/utils/filterCrud.js";

export default {
  props: ["dateCalendar", "specialist"],
  data() {
    return {
      mobile: false,
      hours: [
        { hour: "7:00", id: 7, available: false, scheduled: false },
        { hour: "8:00", id: 8, available: false, scheduled: false },
        { hour: "9:00", id: 9, available: false, scheduled: false },
        { hour: "10:00", id: 10, available: false, scheduled: false },
        { hour: "11:00", id: 11, available: false, scheduled: false },
        { hour: "12:00", id: 12, available: false, scheduled: false },
        { hour: "13:00", id: 13, available: false, scheduled: false },
        { hour: "14:00", id: 14, available: false, scheduled: false },
        { hour: "15:00", id: 15, available: false, scheduled: false },
        { hour: "16:00", id: 16, available: false, scheduled: false },
        { hour: "17:00", id: 17, available: false, scheduled: false },
        { hour: "18:00", id: 18, available: false, scheduled: false },
        { hour: "19:00", id: 19, available: false, scheduled: false },
        { hour: "20:00", id: 20, available: false, scheduled: false },
        { hour: "21:00", id: 21, available: false, scheduled: false },
        { hour: "22:00", id: 22, available: false, scheduled: false },
      ],
    };
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();
  },
  methods: {
    formatDate: function (date, mask) {
      return formatDateToStringMasked(date, mask);
    },
    loadSchedule: async function (date) {
      const filterDate = formatDateToStringMasked(
        this.dateCalendar,
        "yyyy-mm-dd"
      );

      if (this.specialist.id === undefined) return;

      const filters = [
        { name: "specialistId", model: this.specialist.id },
        { name: "dateBegin", model: filterDate },
        { name: "dateEnd", model: filterDate },
      ];

      const url = "specialists/schedule";

      const specialistSchedules = await filterCrud(filters, url);

      const actualDate = new Date();

      specialistSchedules.forEach((specialistSchedule) => {
        let dateSchedule = new Date(specialistSchedule.dateSchedule);

        dateSchedule = new Date(
          dateSchedule.setHours(
            dateSchedule.getHours() + dateSchedule.getTimezoneOffset() / 60
          )
        );

        specialistSchedule.dateSchedule = dateSchedule;

        const hourRef = dateSchedule.getHours();

        const hourFiltered = this.hours.find((hour) => {
          return hourRef === hour.id;
        });

        if (hourFiltered) {
          Object.assign(hourFiltered, {
            specialistScheduleId: specialistSchedule.id,
            product: specialistSchedule.product,
            user: specialistSchedule.user,
          });

          if (
            specialistSchedule.status.value === "AVAILABLE" &&
            actualDate < dateSchedule
          ) {
            hourFiltered.available = true;
          } else {
            hourFiltered.available = false;
          }

          if (hourFiltered.user) {
            hourFiltered.scheduled = true;
          } else {
            hourFiltered.scheduled = false;
          }
        }
      });
    },
    providesHour: async function (hour) {
      if (hour.available) {
        const url = `specialists/schedule`;

        hour.dateSchedule = new Date(hour.dateSchedule);
        hour.dateSchedule = new Date(
          hour.dateSchedule.setHours(
            hour.dateSchedule.getHours() -
              hour.dateSchedule.getTimezoneOffset() / 60
          )
        );

        await saveCrud(url, {
          status: "AVAILABLE",
          specialistId: this.specialist.id,
          dateSchedule: hour.dateSchedule,
        });
      } else {
        const url = `specialists/schedule`;

        await removeCrud(hour.specialistScheduleId, url);
      }
    },
    adjustHours: function (date) {
      const actualDate = new Date();

      this.hours.forEach((hour) => {
        const refDate = new Date(date).setHours(hour.id);

        const disable = actualDate > refDate;

        Object.assign(hour, { dateSchedule: refDate });
        Object.assign(hour, { disable: disable });

        delete hour.specialistScheduleId;
        delete hour.product;
        delete hour.user;

        hour.scheduled = false;
        hour.available = false;
      });
    },
  },

  watch: {
    dateCalendar(newQuestion) {
      this.loadSchedule(new Date(newQuestion));
      this.adjustHours(newQuestion);
    },
    specialist() {
      this.loadSchedule(new Date());
    },
  },
};
</script>

<style lang="scss">
.specialist-provides-timetable-timetable {
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 50vw;
}

.specialist-provides-timetable-timetable-hours {
  height: 100%;
  overflow: scroll;
}

.specialist-provides-timetable-timetable-mobile {
  margin: 20px 0px;
}
</style>
