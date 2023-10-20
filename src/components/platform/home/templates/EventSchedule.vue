<template>
  <div>
    <q-banner
      rounded
      :class="{
        'event-schedule': true,
        'q-ma-sm': true,
        'text-white': true,
        'bg-grey': !eventValid,
        'bg-prepara-me-blue': eventValid && !lessThen1Hour,
        'bg-primary': eventValid && lessThen1Hour,
        'bg-prepara-me-green':
          Object.entries(this.schedulesGroup)[0][1][0].type === 'group' &&
          eventValid,
      }"
    >
      <div class="row items-start items-center event-schedule">
        <div class="col event-schedule-day-info text-center text-h5 col-2">
          <div class="event-schedule-day">{{ scheduleDay }}</div>
          <div class="event-schedule-day text-caption">{{ month }}</div>
          <div class="text-subtitle1 text-center">{{ hour }}</div>
        </div>
        <div class="row items-start items-center event-schedule-info col-10">
          <div class="event-schedule-product col items-center col-4">
            <div class="text-subtitle1">{{ productName }}</div>
            <div class="text-caption text-weight-light">
              {{
                userType === "USER"
                  ? specialistName
                  : Object.entries(this.schedulesGroup)[0][1][0].type ===
                    "group"
                  ? "Mentoria Coletiva"
                  : getUserName(eventSchedule.schedules)
              }}
              {{
                Object.entries(this.schedulesGroup)[0][1][0].type === "group"
                  ? "- Mentoria Coletiva"
                  : ""
              }}
            </div>
          </div>

          <div class="col-3">
            <q-btn
              v-if="userType === 'SPECIALIST'"
              style="background: #FF0080; color=white"
              label="Visualizar Arquivos Usuário"
              class="q-ma-sm"
              @click="openFileDialog()"
            />
            <q-btn
              style="background: #FF0080; color=white"
              label="Procurar Arquivo"
              class="q-ma-sm"
              @click="openSearchFileDialog()"
            />
            <div v-if="filesCountUser == 0" class="column">
              <span class="q-ma-sm txt-center"
                >Carregar seu currículo (mesmo que destualizado)</span
              >
              <q-btn
                style="background: #FF0080; color=white"
                label="Procurar Arquivo"
                class="q-ma-sm"
                @click="openSearchFileDialog()"
              />
            </div>
            <div v-else-if="filesCountUser >= 1" class="column">
              Curriculo inserido
              <q-icon name="warning" size="4.4em" />
            </div>
            <div
              v-else-if="!eventValid && filesCountSpecialist === 0"
              class="column"
            >
              Relatório sendo finalizado
              <q-icon name="warning" size="4.4em" />
            </div>
            <div
              v-else-if="!eventValid && filesCountSpecialist >= 1"
              class="column"
            >
              Baixar aqui o relatório da sua mentoria
              <q-icon name="warning" size="4.4em" />
            </div>
          </div>

          <div class="event-schedule-hour col-2">
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
          <div class="col-1 text-center">
            <q-btn
              v-if="eventValid"
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

    <SearchFileDialog ref="searchFileDialog" v-if="searchDialog" />
    <ViewFileDialog ref="viewFileDialog" v-if="viewDialog" />
  </div>
</template>

<script>
import { saveCrud } from "./../../../general/crud/utils/saveCrud";
import SearchFileDialog from "src/components/SearchFileDialog.vue";
import ViewFileDialog from "src/components/ViewFileDialog.vue";

export default {
  components: {
    SearchFileDialog,
    ViewFileDialog,
  },
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
      moreThen1Hour: false,
      confirm: false,
      eventSchedule: {},
      rate: 0,
      filesCountUser: 0,
      filesCountSpecialist: 0,
      searchDialog: false,
      viewDialog: false,
    };
  },
  props: ["schedulesGroup", "userType"],
  methods: {
    openFileDialog() {
      this.viewDialog = true;

      setTimeout(() => {
        this.$refs.viewFileDialog.show(
          Object.entries(this.schedulesGroup)[0][1][0].id
        );
      }, 10);
    },
    openSearchFileDialog() {
      this.searchDialog = true;

      setTimeout(() => {
        this.$refs.searchFileDialog.show(
          Object.entries(this.schedulesGroup)[0][1][0].id
        );
      }, 10);
    },
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
    async rateSpecialist() {
      if (Object.entries(this.schedulesGroup)[0][1][0].type === "individual") {
        this.eventSchedule.schedules[0].rating = this.rate;
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
  },
  watch: {},
  mounted() {
    this.eventSchedule.schedules = Object.entries(this.schedulesGroup)[0][1];

    this.filesCountSpecialist =
      this.eventSchedule.schedules[0].filesCountSpecialist;
    this.filesCountUser = this.eventSchedule.schedules[0].filesCountUser;

    if (
      this.eventSchedule.schedules[0].rating === undefined ||
      this.eventSchedule.schedules[0].rating === null
    ) {
      this.eventSchedule.schedules[0].rating = 0;
    }

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
    this.moreThen1Hour = diffHours > 1;

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
    this.rate = parseInt(Object.entries(this.schedulesGroup)[0][1][0].rating);
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

.bg-prepara-me-green {
  background-color: #15aa7c;
}

.txt-center {
  text-align: center;
}
</style>
