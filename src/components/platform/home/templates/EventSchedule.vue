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
        'bg-prepara-me-pink': !eventValid && filesCountSpecialist === 0,
        'bg-prepara-me-green-specialist':
          !eventValid && filesCountSpecialist >= 1,
      }"
    >
      <div class="row items-start items-center event-schedule">
        <div
          class="col event-schedule-day-info text-center text-h5 col-xs-12 col-sm-2 display-hour"
        >
          <div class="event-schedule-day">{{ scheduleDay }}</div>
          <div class="event-schedule-day text-caption">{{ month }}</div>
          <div class="text-subtitle1 text-center">{{ hour }}</div>
        </div>
        <div
          class="row items-start items-center event-schedule-info col-xs-12 col-sm-10"
        >
          <div
            class="event-schedule-product col items-center col-xs-12 col-sm-4"
          >
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

          <div
            class="col-xs-12 col-sm-3 justify-center"
            v-if="disableFileUpload"
          ></div>
          <div class="col-xs-12 col-sm-3 justify-center" v-else>
            <div
              class="col-xs-12 col-sm-3 justify-center"
              v-if="userType === 'USER'"
            >
              <div
                v-if="eventValid && filesCountUser == 0 && enableUploadFileUser"
                class="textandbutton column"
              >
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
              <div
                v-else-if="
                  eventValid && filesCountUser >= 1 && enableUploadFileUser
                "
                class="textandbutton column"
              >
                <span class="q-ma-sm txt-center">Curriculo inserido</span>
                <div class="icones">
                  <img
                    src="../../../../assets/icons/visto.png"
                    alt=""
                    width="80"
                    height="50"
                  />
                </div>
                <q-btn
                  style="background: #FF0080; color=white"
                  label="Procurar Arquivo"
                  class="q-ma-sm"
                  @click="openSearchFileDialog()"
                />
              </div>

              <div
                v-else-if="!eventValid && filesCountSpecialist === 0"
                class="textandbutton column"
              >
                <span> Relatório sendo finalizado </span>
                <div class="icone-ampulheta">
                  <img
                    src="../../../../assets/icons/ampulheta.png"
                    alt=""
                    width="40"
                    height="40"
                  />
                </div>
                <q-btn
                  style="background: #fff; color: #000"
                  label="Visualizar Seus Arquivos"
                  class="q-ma-sm"
                  @click="openFileDialog('ALL')"
                />
              </div>
              <div
                v-else-if="!eventValid && filesCountSpecialist >= 1"
                class="textandbutton column"
              >
                <span> Baixar aqui o relatório da sua mentoria </span>
                <div class="icones">
                  <img
                    src="../../../../assets/icons/visto.png"
                    alt=""
                    width="80"
                    height="50"
                  />
                </div>
                <q-btn
                  style="background: #FF0080; color=white"
                  label="Visualizar Relatório e Arquivos"
                  class="q-ma-sm"
                  @click="openFileDialog('ALL')"
                />
              </div>
            </div>
            <div class="col-xs-12 col-sm-3" v-else>
              <div
                v-if="eventValid && filesCountUser == 0 && enableUploadFileUser"
                class="textandbutton column"
              >
                <span class="q-ma-sm txt-center"
                  >Agendamento sem currículo</span
                >
                <div class="icones">
                  <img
                    src="../../../../assets/icons/bloqueio.png"
                    alt=""
                    width="80"
                    height="50"
                  />
                </div>
              </div>

              <div
                v-else-if="eventValid && filesCountUser >= 1"
                class="textandbutton column"
              >
                <span class="q-ma-sm txt-center">Baixar currículo</span>
                <div class="icones">
                  <img
                    src="../../../../assets/icons/visto.png"
                    alt=""
                    width="80"
                    height="50"
                  />
                </div>
                <q-btn
                  v-if="userType === 'SPECIALIST'"
                  style="background: #FF0080; color=white"
                  label="Visualizar Arquivos Usuário"
                  class="q-ma-sm"
                  @click="openFileDialog('USER')"
                />
              </div>

              <div
                v-else-if="!eventValid && filesCountSpecialist === 0"
                class="textandbutton column"
              >
                <span class="q-ma-sm txt-center">Relatório Pendente</span>
                <div class="icones">
                  <img
                    src="../../../../assets/icons/bloqueio.png"
                    alt=""
                    width="80"
                    height="50"
                  />
                </div>
                <q-btn
                  style="background: #000; color: #fff"
                  label="Procurar Arquivo"
                  class="q-ma-sm"
                  @click="openSearchFileDialog()"
                />
              </div>

              <div
                v-else-if="!eventValid && filesCountSpecialist > 0"
                class="textandbutton column"
              >
                <span class="q-ma-sm txt-center">Relatório Carregado</span>
                <div class="icones">
                  <img
                    src="../../../../assets/icons/visto.png"
                    alt=""
                    width="80"
                    height="50"
                    class="imagem"
                  />
                </div>
                <q-btn
                  style="background: #000; color: #fff"
                  label="Procurar Arquivo"
                  class="q-ma-sm"
                  @click="openSearchFileDialog()"
                />
              </div>
            </div>
          </div>

          <div
            class="event-schedule-hour col-xs-12 col-sm-2 justify-center event-schedule-star"
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
          <div class="event-schedule-hour col-xs-12 col-sm-2">
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
          <div
            class="col-xs-12 col-sm-1 text-center justify-center"
            v-if="eventValid && !lessThen3Hours && userType === 'USER'"
          >
            <q-btn
              v-if="eventValid && !lessThen3Hours && userType === 'USER' && !onlyAdmin" 
              color="white"
              class="text-caption"
              flat
              @click="cancelScheduleFunction()"
            >
              <q-tooltip> Cancelar Agendamento </q-tooltip>
              <q-icon
                v-if="eventValid && !lessThen3Hours && userType === 'USER'"
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

    <SearchFileDialog
      ref="searchFileDialog"
      v-if="searchDialog"
      :identifier="Object.entries(this.schedulesGroup)[0][1][0].id"
      :userType="userType"
    />
    <ViewFileDialog
      ref="viewFileDialog"
      v-if="viewDialog"
      :identifier="Object.entries(this.schedulesGroup)[0][1][0].id"
    />

    <ConfirmDialogScheduleWidget
      ref="confirmDialog"
      :onCancel="onCancel"
      :onShow="goToSchedule"
    />
  </div>
</template>

<script>
import ConfirmDialogScheduleWidget from "src/components/general/ConfirmDialogScheduleWidget.vue";
import { saveCrud } from "./../../../general/crud/utils/saveCrud";
import SearchFileDialog from "src/components/SearchFileDialog.vue";
import ViewFileDialog from "src/components/ViewFileDialog.vue";

export default {
  components: {
    SearchFileDialog,
    ViewFileDialog,
    ConfirmDialogScheduleWidget,
  },
  data() {
    return {
      scheduleDay: "",
      month: "",
      specialistName: "",
      productName: "",
      hour: "",
      eventValid: true,
      lessThen3Hours: false,
      lessThen1Hour: false,
      moreThen1Hour: false,
      confirm: false,
      eventSchedule: {},
      rate: 0,
      filesCountUser: 0,
      filesCountSpecialist: 0,
      searchDialog: false,
      viewDialog: false,
      productsName: [
        "Reconstrução de Currículo Português",
        "Reconstrução de Curriculo Português + Inglês",
        "Reconstrução de Currículo em Inglês",
        "Reconstrução de Currículo em Português + Relatório Perfil LinkedIn",
      ],
      productsDisable: [
        "Kit Recolocação",
        "Orientação Previdenciária INSS",
        "Aula de LinkedIn",
      ],
    };
  },
  props: ["schedulesGroup", "userType"],
  computed: {
    enableUploadFileUser() {
      console.log(this.productName);

      return this.productsName.includes(this.productName);
    },
    disableFileUpload() {
      return this.productsDisable.includes(this.productName);
    },
  },
  methods: {
    goToSchedule() {
      this.$router.push(
        `/products/schedule/${this.eventSchedule.schedules[0].productId}?reschedule=true&scheduleId=${this.eventSchedule.schedules[0].id}`
      );
    },
    onCancel() {
      this.confirm = true;
    },
    cancelScheduleFunction() {
      this.$refs.confirmDialog.open();
      //this.confirm = true;
    },
    openFileDialog(type) {
      this.viewDialog = true;

      setTimeout(() => {
        this.$refs.viewFileDialog.show(
          Object.entries(this.schedulesGroup)[0][1][0].id,
          type
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

    console.log("AQUI O EVENT SCHEDULE", this.eventSchedule.schedules[0]);

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
        dateSchedule.getHours() + dateSchedule.getTimezoneOffset() / 60
      )
    );

    const actualDate = new Date();

    const actualDateAddEventDuration = new Date(
      actualDate.setHours(actualDate.getHours())
    );

    /*  if (
      this.eventSchedule.schedules[0].id ===
      "b7889fcc-f3fa-4d7b-a063-5beb0e9d3788"
    ) {
      console.log("actualDateAddEventDuration", actualDateAddEventDuration);
      console.log("dateSchedule", dateSchedule);
      console.log("actualDate", actualDate);


      console.log("dateScheduleMore", dateScheduleMore);
    } */
    /* const dateScheduleMore = new Date(
      dateSchedule.setHours(dateSchedule.getHours() + 1)
    ); */

    const compareDateSchedule = new Date(
      JSON.parse(JSON.stringify(dateSchedule))
    ).setHours(dateSchedule.getHours() + 1);

    this.eventValid = !(actualDateAddEventDuration > compareDateSchedule);

    const getDiffHours = (dt2, dt1) => {
      /* console.log("dt2", dt2);

      console.log("dt1", dt1); */
      var diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60 * 60;
      return Math.abs(Math.round(diff));
    };

    const diffHours = getDiffHours(actualDate, dateSchedule);

    //console.log("diffHours", diffHours);

    this.lessThen3Hours = diffHours < 3;
    this.lessThen1Hour = diffHours < 2;
    this.moreThen1Hour = diffHours > 1;
    this.onlyAdmin = this.eventSchedule.schedules[0].product.onlyAdmin;
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

    let hour = `0${dateSchedule.getHours()}`;
    hour = hour.substring(hour.length - 2);

    let minute = `0${dateSchedule.getMinutes()}`;
    minute = minute.substring(minute.length - 2);

    this.hour = `${hour}:${minute}`;
    this.rate = parseInt(Object.entries(this.schedulesGroup)[0][1][0].rating);
  },
};
</script>

<style lang="scss">
.textandbutton span {
  text-align: center;
}

.textandbutton {
  justify-content: center;
  align-items: center;
}

.icones {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icone-ampulheta {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
}

.icone-ampulheta img {
  object-fit: cover;
}

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

.bg-prepara-me-pink {
  background-color: #ff0080 !important;
}

.bg-prepara-me-green-specialist {
  background-color: #15aa7c !important;
}

@media screen and (max-width: 600px) {
  .display-hour {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }

  .display-hour > div {
    font-size: 12px;
  }

  .event-schedule-product > div {
    font-size: 12px;
  }

  .event-schedule-star {
    display: flex;
  }
}
</style>
