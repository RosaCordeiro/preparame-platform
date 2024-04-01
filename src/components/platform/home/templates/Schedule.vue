<template>
  <div class="schedule justify-around" style="position: relative">
    <q-card
      :class="{
        'schedule-container': true,
        'q-ma-md': true,
      }"
    >
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col q-ml-md q-mt-md text-h5 ellipsis">Minha Agenda</div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <EventSchedule
          v-for="(schedulesGroup, index) in groupSchedulesAdjusted"
          :key="index"
          :schedulesGroup="schedulesGroup"
          :userType="homeType"
        />
      </q-card-section>
    </q-card>

    <!-- <div class="popup__not-rating">
    </div> -->
    <div
      class="image-popup"
      v-if="hasScheduleWithoutRating && homeType === 'USER'"
    >
      <img src="~assets/imgs/mentoria_sem_nota.png" alt="" />
      <!-- close button -->
      <q-btn
        @click="hasScheduleWithoutRating = false"
        class="image-popup__close"
        icon="close"
        round
        flat
        color="black"
        style="position: absolute; right: 0; top: 0"
      />
    </div>
  </div>
</template>

<script>
import { filterCrud } from "../../../general/crud/utils/filterCrud";
import {
  formatDateToStringMasked,
  formatDateToStringWithHour,
} from "../../../../utils/formatDate.js";

export default {
  data() {
    return {
      groupSchedules: {},
      groupSchedulesAdjusted: [],
      schedules: [],
      mobile: false,
      hasScheduleWithoutRating: false,
    };
  },
  components: {
    EventSchedule: () => {
      const component = import("../templates/EventSchedule.vue");
      return component;
    },
  },
  props: ["homeType"],
  methods: {
    async init() {
      const dateBegin = new Date();
      const dateEnd = new Date();

      console.log("homeType", this.homeType === "USER");

      dateBegin.setDate(
        this.homeType === "USER"
          ? dateBegin.getDate() - 1000
          : dateBegin.getDate() - 30
      );
      dateEnd.setDate(
        this.homeType === "USER"
          ? dateEnd.getDate() + 1000
          : dateEnd.getDate() + 30
      );

      const filters = [
        {
          name: this.homeType === "USER" ? "userId" : "specialistUserId",
          model: localStorage.getItem("userId"),
        },
        {
          name: "status",
          model: "UNAVAILABLE",
        },
        {
          name: "dateBegin",
          model: formatDateToStringMasked(dateBegin, "yyyy-mm-dd"),
        },
        {
          name: "dateEnd",
          model: formatDateToStringMasked(dateEnd, "yyyy-mm-dd"),
        },
      ];

      this.schedules = [
        ...(await filterCrud(filters, "specialists/schedule")).map(
          (schedule) => {
            schedule["type"] = "individual";
            return schedule;
          }
        ),
        ...(await filterCrud(filters, "mentoring/schedule-list")).map(
          (schedule) => {
            schedule["type"] = "group";
            return schedule;
          }
        ),
      ];

      this.schedules.sort((a, b) => (a.dateSchedule > b.dateSchedule ? 1 : -1));
      this.schedules = this.schedules.filter(
        (schedule, index, self) =>
          index === self.findIndex((t) => t.id === schedule.id)
      );

      this.schedules.forEach((schedule) => {
        console.log(schedule);

        let groupKey = `${schedule["productId"]}${schedule["userId"]}${
          schedule["specialistId"]
        }${formatDateToStringWithHour(
          new Date(schedule["dateSchedule"]),
          "yyyy-mm-dd"
        )}`;

        if (!this.groupSchedules[groupKey]) {
          this.groupSchedules[groupKey] = [];
        }

        this.groupSchedules[groupKey].push(schedule);

        return schedule;
      });

      this.hasScheduleWithoutRating = Object.entries(this.groupSchedules).some(
        (schedule) => {
          const dateSchedule = new Date(schedule[1][0].dateSchedule);
          const formatedDate = new Date(
            dateSchedule.setMinutes(
              dateSchedule.getMinutes() - -dateSchedule.getTimezoneOffset()
            )
          );

          return (
            (schedule[1][0].rating === undefined ||
              schedule[1][0].rating === null ||
              schedule[1][0].rating === 0) &&
            formatedDate < new Date()
          );
        }
      );

      Object.entries(this.groupSchedules).map((schedule) => {
        const scheduleAdjusted = {};

        scheduleAdjusted[schedule[0]] = schedule[1];

        this.groupSchedulesAdjusted.push(scheduleAdjusted);
      });
    },
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();
  },
  async created() {
    this.init();
  },
};
</script>

<style lang="scss">
.schedule {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.schedule-container {
  border-radius: 15px;
  width: 100%;
  margin: 0 auto;
}

@media (orientation: portrait) {
  .schedule-container {
    width: 98%;
  }
}

.image-popup {
  position: absolute;
  left: 0;
  top: -150px;
  height: 200px;
}

.image-popup img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
