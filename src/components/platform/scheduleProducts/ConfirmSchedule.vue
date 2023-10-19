<template>
  <div>
    <q-dialog v-model="confirmSchedule">
      <q-card class="my-card">
        <q-card-section>
          <div class="col no-wrap items-center">
            <div class="col text-h4 ellipsis">Agendamento</div>
            <div class="col text-h6 ellipsis text-grey-8">
              {{ product.name }}
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">Informações do agendamento:</div>
          <div class="text-body2 text-grey-8">
            {{ this.dateSchedule }}
          </div>
          <div class="text-body2 text-grey-8">
            Especialista: {{ specialist.name }}
          </div>
          <br />
          <div class="text-caption text-grey-8">
            O cancelamento do agendamento pode ser feito até 24 horas antes da
            hora marcada. Após isso não poderá ser cancelado ou remarcado.
          </div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            color="primary"
            label="Agendar"
            @click="scheduleConfirmation"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <ConfirmScheduleDialog ref="confirmScheduleDialog" />
  </div>
</template>

<script>
import ConfirmScheduleDialog from "src/components/ConfirmScheduleDialog.vue";
import { saveCrud } from "./../../general/crud/utils/saveCrud.js";

export default {
  components: {
    ConfirmScheduleDialog,
  },
  data() {
    return {
      confirmSchedule: false,
      daySchedule: {},
      hourSchedule: [],
      product: {},
      dateSchedule: "",
      specialist: {},
    };
  },
  props: ["confirmScheduleFunctions"],
  mounted() {
    this.confirmScheduleFunctions.$on(
      "showScheduleConfirmDialog",
      this.showScheduleConfirmDialog
    );
  },
  methods: {
    showScheduleConfirmDialog: function (
      daySchedule,
      hourSchedules,
      specialist,
      product
    ) {
      //this.confirmSchedule = true;
      this.daySchedule = daySchedule;
      this.hourSchedules = hourSchedules;
      this.specialist = specialist;
      this.product = product;

      let endHour = new Date(this.hourSchedules[0].dateSchedule);

      endHour.setHours(
        this.hourSchedules[0].dateSchedule.getHours() + this.product.duration
      );

      this.dateSchedule = `Dia ${this.hourSchedules[0].dateSchedule.toLocaleDateString(
        undefined,
        { day: "numeric", month: "long", year: "numeric" }
      )} dás ${this.hourSchedules[0].dateSchedule.toLocaleTimeString(
        undefined,
        {
          hour: "numeric",
          minute: "numeric",
        }
      )} horas até ás ${endHour.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
      })}.`;

      this.scheduleConfirmation();
    },
    scheduleConfirmation: async function () {
      this.$refs.confirmScheduleDialog.show(async () => {
        for (const index in this.hourSchedules) {
          const specialistSchedule =
            this.hourSchedules[index].specialistSchedule;

          specialistSchedule.productId = this.product.id;
          specialistSchedule.userId = localStorage.getItem("userId");
          specialistSchedule.status = "UNAVAILABLE";
          specialistSchedule.specialistId = specialistSchedule.specialist.id;
          specialistSchedule.createEvent = index == 0 ? true : false;

          await saveCrud(
            `specialists/schedule/${this.hourSchedules[index].id}`,
            specialistSchedule,
            "put"
          ).then(() => {
            if (index == this.hourSchedules.length - 1) {
              this.$q.notify({
                type: "success",
                message: "Agendado com sucesso",
              });

              this.$router.push({ path: "/platform" });
            }
          });
        }
      });
    },
  },
};
</script>

<style></style>
