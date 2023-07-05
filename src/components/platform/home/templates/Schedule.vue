<template>
  <div class="schedule justify-around">
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
  </div>
</template>

<script>
import { filterCrud } from "../../../general/crud/utils/filterCrud";
import { formatDateToStringMasked } from "../../../../utils/formatDate.js";

export default {
  data() {
    return {
      groupSchedules: {},
      groupSchedulesAdjusted: [],
      schedules: [],
      mobile: false,
    };
  },
  components: {
    EventSchedule: () => {
      const component = window.mobileAndTabletCheck()
        ? import("../templates/EventScheduleMobile.vue")
        : import("../templates/EventSchedule.vue");
      return component;
    },
  },
  props: ["homeType"],
  mounted() {
    this.mobile = window.mobileAndTabletCheck();
  },
  async created() {
    const dateBegin = new Date();
    const dateEnd = new Date();

    dateBegin.setDate(dateBegin.getDate() - 1);
    dateEnd.setDate(dateEnd.getDate() + 14);

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
      ...(await filterCrud(filters, "specialists/schedule")).map((schedule) => {
        schedule["type"] = "individual";
        schedule["rating"] = schedule["rating"] ? schedule["rating"] : 0;
        return schedule;
      }),
      /*  ...(await filterCrud(filters, "mentoring/schedule-list"))?.map(
        (schedule) => {
          schedule["type"] = "group";
          return schedule;
        }
      ), */
    ];

    console.log(this.schedules);

    this.schedules.forEach((schedule) => {
      let groupKey = `${schedule["productId"]}${schedule["userId"]}${
        schedule["specialistId"]
      }${formatDateToStringMasked(
        new Date(schedule["dateSchedule"]),
        "yyyy-mm-dd"
      )}`;

      if (!this.groupSchedules[groupKey]) {
        this.groupSchedules[groupKey] = [];
      }

      this.groupSchedules[groupKey].push(schedule);

      return schedule;
    });

    Object.entries(this.groupSchedules).map((schedule) => {
      const scheduleAdjusted = {};

      scheduleAdjusted[schedule[0]] = schedule[1];

      this.groupSchedulesAdjusted.push(scheduleAdjusted);
    });
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
</style>
