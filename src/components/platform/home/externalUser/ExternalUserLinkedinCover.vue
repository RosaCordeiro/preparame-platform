<template>
  <div>
    <div class="q-ma-md">
      <div class="external-user-most-common-questions-card-title">
        100 CAPAS PARA LINKEDIN
      </div>
      <div class="row col-12">
        <div class="q-my-md col-9">
          Tenha um perfil de Linkedin muito mais bonito e profissional com
          nossas capas.
          <div v-if="!mobile" class="q-my-sm">
            <q-btn
              color="secondary"
              label="ACESSAR AGORA MESMO"
              @click="downloadFile()"
            />
          </div>
          <div v-if="mobile" class="q-my-md">
            <q-btn
              color="secondary"
              label="ACESSAR AGORA MESMO"
              @click="downloadFile()"
            />
          </div>
        </div>
        <img
          v-if="!mobile"
          class="external-user-most-common-questions-card-img col-3"
          src="./../../../../assets/imgs/linkedin_icon.png"
        />
        <img
          v-if="mobile"
          class="external-user-most-common-questions-card-img col-3"
          src="./../../../../assets/imgs/linkedin_icon.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { downloadFileFromPublic } from "../../../../utils/downloadFile";
import { saveCrud } from "../../../../components/general/crud/utils/saveCrud";

export default {
  data() {
    return {
      mobile: false,
    };
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();
  },
  methods: {
    downloadFile: function () {
      downloadFileFromPublic("Capas.zip");
      saveCrud("clicks", {
        name: "Capas de Linkedin",
      });
    },
  },
};
</script>

<style>
.external-user-linkedin-cover-card-title {
  font-weight: 700;
  font-size: 1.5rem;
  font-family: "Nunito";
  font-style: normal;
  background: linear-gradient(90deg, #1a27b7 0%, #ff4690 40%);
  opacity: 1;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.external-user-linkedin-cover-card-img {
  height: 100px;
  margin: 10px auto;
}
</style>
