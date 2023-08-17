<template>
  <div
    v-if="simulatorVideos.length > 0 && !expired"
    :class="{ 'interview-simulator': true, column: !mobile }"
  >
    <Breadcrumbs :breadcrumbs="breadcrumbs" />

    <q-card-section class="interview-simulator-card-progress-bar-container row">
      <div class="interview-simulator-progress-bar-container col-12">
        <div
          class="interview-simulator-progress-bar-indicator"
          :style="{
            width: `${interviewPercent}%`,
          }"
        ></div>
      </div>
    </q-card-section>
    <div class="interview-simulator-video-subtitle">
      {{ simulatorVideosGroup[videoGroupNumber].name }}
    </div>
    <div class="interview-simulator-video-title">
      {{ simulatorVideos[videoNumber].question }}
    </div>

    <div class="interview-simulator-container">
      <video autoplay id="video" class="interview-simulator-webcam"></video>
      <video
        class="interview-simulator-video"
        controls
        autoplay
        controlsList="nodownload"
        oncontextmenu="return false;"
      >
        <source
          :src="simulatorVideos[videoNumber].linkVideo"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="interview-simulator-control row justify-around">
      <q-btn
        outline
        :label="'ANTERIOR'"
        :class="{
          'interview-simulator-previous-btn': true,
          'interview-simulator-btn': true,
        }"
        @click="priorVideo()"
      />
      <q-btn
        v-if="!mobile"
        flat
        label="APOIO DE RESPOSTA"
        :class="{
          'interview-simulator-tip-btn': true,
          'interview-simulator-btn': true,
        }"
        @click="showTipDialog()"
      />
      <q-btn
        flat
        :label="
          videoNumber + 1 == simulatorVideos.length
            ? videoGroupNumber + 1 == simulatorVideosGroup.length
              ? 'FINALIZAR ENTREVISTA'
              : 'FINALIZAR GRUPO'
            : 'PRÓXIMA'
        "
        :class="{
          'interview-simulator-next-btn': true,
          'interview-simulator-btn': true,
        }"
        @click="
          videoNumber + 1 == simulatorVideos.length &&
          videoGroupNumber + 1 == simulatorVideosGroup.length
            ? showEndInterviewDialog()
            : nextVideo()
        "
      />
      <q-btn
        v-if="mobile"
        flat
        label="APOIO DE RESPOSTA"
        :class="{
          'interview-simulator-tip-btn': true,
          'interview-simulator-btn': true,
        }"
        @click="showTipDialog()"
      />
    </div>
    <q-dialog v-model="showTip">
      <q-card flat class="interview-simulator-tip-card">
        <q-card class="interview-simulator-tip-card-background">
          <div class="interview-simulator-tip-card-logo"></div>
          <div class="interview-simulator-tip-card-title">
            Apoio de Resposta
          </div>

          <q-card-section class="q-pt-none">
            <div
              class="interview-simulator-tip-card-tip"
              v-html="simulatorVideos[videoNumber].tip"
            ></div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              label="Estou Pronto"
              :class="{ 'interview-simulator-tip-card-btn': true }"
              @click="closeTipDialog()"
            />
          </q-card-actions>
        </q-card>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showQuestionNextGroup">
      <q-card flat class="interview-simulator-tip-card">
        <q-card class="interview-simulator-tip-card-background">
          <div class="interview-simulator-tip-card-logo"></div>
          <div class="interview-simulator-tip-card-title">
            Você finalizou parte da entrevista!
          </div>

          <q-card-section class="q-pt-none">
            <div class="interview-simulator-tip-card-tip">
              Deseja continuar e seguir para as próximas questões?
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              label="Estou Pronto"
              :class="{ 'interview-simulator-tip-card-btn': true }"
              @click="nextGroup()"
            />
          </q-card-actions>
        </q-card>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showEndInterview">
      <q-card flat class="interview-simulator-tip-card">
        <q-card class="interview-simulator-tip-card-background">
          <div class="interview-simulator-tip-card-logo"></div>
          <div class="interview-simulator-tip-card-title">
            Você finalizou a nossa entrevista!
          </div>

          <q-card-section class="q-pt-none">
            <div class="interview-simulator-tip-card-tip">
              Parabéns por chegar até aqui, continue a praticar para atingir a
              excelência.
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              label="Finalizar"
              :class="{ 'interview-simulator-tip-card-btn': true }"
              @click="endInterview()"
            />
          </q-card-actions>
        </q-card>
      </q-card>
    </q-dialog>

    <InterviewDialog ref="modal" />
  </div>
</template>

<script>
import { saveCrud } from "src/components/general/crud/utils/saveCrud";
import Breadcrumbs from "../../general/Breacrumbs.vue";
import { filterCrud } from "./../../general/crud/utils/filterCrud";
import InterviewDialog from "src/components/InterviewDialog.vue";

export default {
  components: {
    Breadcrumbs,
    InterviewDialog,
  },

  data() {
    return {
      simulatorVideos: [],
      expired: false,
      simulatorVideosGroup: [],
      showTip: false,
      showQuestionNextGroup: false,
      showEndInterview: false,
      interviewPercent: 0,
      videoNumber: 0,
      videoGroupNumber: 0,
      daysToExpirePeriodTest: 0,
      daysToExpireUse: 0,
      mobile: false,
      breadcrumbs: [
        {
          title: "Apresentação do Simulador de Entrevistas",
          to: "interviewSimulatorPresentation",
        },
        {
          title: "Simulador de Entrevistas",
          to: "",
        },
      ],
      free: false,
    };
  },
  watch: {
    videoNumber: function () {
      this.saveProgress();
    },
    videoGroupNumber: function () {
      this.saveProgress();
    },
  },
  methods: {
    showTipDialog: function () {
      this.pauseVideo();

      console.log(this.videoGroupNumber);
      console.log(this.videoNumber);

      if (this.free) {
        if (this.videoGroupNumber === 0 && this.videoNumber === 0) {
          this.showTip = true;
          return;
        }

        this.$refs.modal.show();

        return;
      }

      this.showTip = true;

      //this.loadTip();
    },
    closeTipDialog: function () {
      this.playVideo();

      this.showTip = false;
    },
    async showEndInterviewDialog() {
      this.showEndInterview = true;
    },
    async endInterview() {
      this.$router.push({ path: `/platform` });
    },
    async loadGroupVideos() {
      this.simulatorVideosGroup = await filterCrud(
        [],
        "products/simulatorVideosGroup"
      );
    },
    async loadVideos() {
      const filters = [
        {
          name: "simulatorVideosGroupId",
          model: this.simulatorVideosGroup[this.videoGroupNumber].id,
        },
      ];

      this.simulatorVideos = await filterCrud(
        filters,
        "products/simulatorVideos"
      );

      this.free = localStorage.getItem("expiresDate") === "null";

      /* if (actualDate < periodTest && !(expiresDate > periodTest)) {
        this.simulatorVideos.forEach((simulatorVideo) => {
          simulatorVideo.tip = "Dicas disponíveis apenas na versão paga.";
        });
      } */

      this.calculatePercent();

      setTimeout(() => {
        this.startVideo();
      }, 1000);
    },
    nextGroup() {
      this.videoGroupNumber = this.videoGroupNumber + 1;

      this.loadVideos();

      this.videoNumber = 0;
      this.showQuestionNextGroup = false;
    },
    nextVideo() {
      if (this.videoNumber + 1 < this.simulatorVideos.length) {
        this.videoNumber = this.videoNumber + 1;
      } else {
        if (this.videoGroupNumber + 1 < this.simulatorVideosGroup.length) {
          this.pauseVideo();

          this.showQuestionNextGroup = true;

          return;
        }
      }

      this.startVideo();
      this.calculatePercent();
    },
    priorVideo() {
      if (this.videoNumber > 0) {
        this.videoNumber = this.videoNumber - 1;
      } else {
        if (this.videoGroupNumber > 0) {
          this.videoGroupNumber = this.videoGroupNumber - 1;

          this.loadVideos();

          this.videoNumber = this.simulatorVideos.length - 1;

          return;
        }
      }

      this.startVideo();
      this.calculatePercent();
    },
    startVideo() {
      setTimeout(function () {
        var video = document.querySelector(".interview-simulator-video");

        if (video) {
          video.pause();

          video.load();
          video.play();
        }
      }, 1000);
    },
    pauseVideo() {
      var video = document.querySelector(".interview-simulator-video");

      video.pause();
    },
    playVideo() {
      var video = document.querySelector(".interview-simulator-video");

      video.play();
    },
    calculatePercent() {
      this.interviewPercent =
        ((this.videoNumber + 1) / this.simulatorVideos.length) * 100;
    },
    initiateWebCam() {
      const videoStartInterval = setInterval(() => {
        var video = document.getElementById("video");

        if (video) {
          clearInterval(videoStartInterval);

          setTimeout(() => {
            {
              var video = document.getElementById("video");

              if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                  .getUserMedia({
                    video: true,
                  })
                  .then(function (stream) {
                    video.srcObject = stream;
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            }
          }, 1000);
        }
      }, 1000);
    },
    async getProgress() {
      const response = await filterCrud(
        [],
        "interview/" + localStorage.getItem("userId")
      );

      if (response === "") return;

      this.videoGroupNumber = response.group;
      this.videoNumber = response.video;
    },

    async saveProgress() {
      const body = {
        user_id: localStorage.getItem("userId"),
        group: this.videoGroupNumber,
        video: this.videoNumber,
      };

      const response = await saveCrud("interview", body, "post");
      console.log(response);
    },
  },
  async created() {
    await this.loadGroupVideos();
    this.loadVideos();
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();

    this.daysToExpirePeriodTest =
      ((new Date() - new Date(localStorage.getItem("periodTest"))) /
        1000 /
        60 /
        60 /
        24) *
      -1;

    this.daysToExpireUse =
      ((new Date() - new Date(localStorage.getItem("expiresDate"))) /
        1000 /
        60 /
        60 /
        24) *
      -1;

    if (!(this.daysToExpireUse > 0) && !(this.daysToExpirePeriodTest > 0)) {
      this.expired = true;
    }

    this.initiateWebCam();
    this.getProgress();
  },
};
</script>

<style lang="scss">
.interview-simulator {
  height: 94vh;
  padding: 0 40px 0 40px;
}

.interview-simulator-video-title {
  width: 100%;
  height: 5vh;
  text-align: center;
  padding: 20px 0 20px 0;
  font-size: 1.5rem;
  font-family: "nunito";
  text-transform: uppercase;
  color: $prepara-me-blue;
  font-weight: 700;
}

.interview-simulator-video-subtitle {
  width: 100%;
  height: 3vh;
  text-align: center;
  padding: 20px 0 0 0;
  font-size: 1rem;
  font-family: "nunito";
  text-transform: uppercase;
  color: $prepara-me-blue;
  font-weight: 700;
  margin: 0 auto;
}

.interview-simulator-container {
  display: flex;
}

.interview-simulator-webcam {
  position: relative;
  height: 50vh;
  width: 40vw;
  margin: 20px auto;
}

.interview-simulator-video {
  position: relative;
  height: 50vh;
  width: 40vw;
  margin: 20px auto;
}

.interview-simulator-control {
  height: 10vh;
}

.interview-simulator-btn {
  height: 50px;
  width: 250px;
}

.interview-simulator-previous-btn {
  color: $prepara-me-blue;
}

.interview-simulator-next-btn {
  color: $text-white;
  background-color: $prepara-me-blue;
}

.interview-simulator-tip-btn {
  background: $prepara-me-gradient;
  color: $text-white;
}

.interview-simulator-tip-card {
  background-color: transparent;
  padding: 50px;
}

.interview-simulator-tip-card-background {
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.interview-simulator-tip-card-logo {
  position: absolute;
  height: 5vw;
  width: 5vw;
  margin-top: 2vh;
  background-image: url("./../../../assets/logos/logo_reduzida.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-color: white;
  background-position-y: 1vh;
  border-radius: 5vw !important;
  top: -7vh;
}

.interview-simulator-tip-card-title {
  position: relative;
  width: 100%;
  font-family: "nunito";
  font-size: 2rem;
  margin-top: 4vh;
  text-align: left;
  color: #1a27b7;
  padding-left: 20px;
  padding-right: 20px;
}

.interview-simulator-tip-card-tip {
  position: relative;
  width: 100%;
}

.interview-simulator-tip-card-btn {
  position: relative;
  background: $prepara-me-gradient;
  color: $text-white;
  height: 50px;
  width: 250px;
}

.interview-simulator-card-progress-bar-container {
  padding: 0;
  margin-top: 20px;
  height: 1vh;
}

.interview-simulator-progress-bar-container {
  height: 10px !important;
  background: $background-grey;
  position: relative;
  border-radius: 5px;
}

.interview-simulator-progress-bar-indicator {
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  -webkit-mask: linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0);
}

.interview-simulator-progress-bar-indicator::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(90deg, #1a27b7 0%, #ff4690 100%);
}

@media (orientation: portrait) {
  .interview-simulator {
    height: 92.5vh;
    padding: 4vw;
  }

  .interview-simulator-video-title {
    font-size: 1rem;
  }

  .interview-simulator-container {
    flex-direction: column;
  }

  .interview-simulator-webcam {
    height: 30vh;
    width: 90vw;
    margin: auto;
  }

  .interview-simulator-video {
    height: 30vh;
    width: 90vw;
    margin: auto;
  }

  .interview-simulator-tip-card {
    padding: 50px 0 0 0;
  }

  .interview-simulator-tip-card-title {
    font-size: 1rem;
  }

  .interview-simulator-tip-card-tip {
    font-size: 0.8rem;
    top: 4vh;
  }

  .interview-simulator-tip-card-btn {
    font-size: 0.8rem;
    height: 40px;
    width: 200px;
  }

  .interview-simulator-tip-card-logo {
    height: 15vw;
    width: 15vw;
    border-radius: 15vw !important;
    top: -6vh;
  }

  .interview-simulator-btn {
    height: 40px;
    width: 150px;
    font-size: 0.7rem;
    margin: 10px 0 10px 0;
  }
}
</style>
