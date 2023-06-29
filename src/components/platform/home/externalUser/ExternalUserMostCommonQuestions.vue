<template>
  <div>
    <div  class="q-ma-md">
      <div class="external-user-most-common-questions-card-title">
        50 PERGUNTAS MAIS COMUNS
      </div>
      <div class="row col-12">
        <div class="q-mt-sm col-8">
          Baixe o e-book e descubra o que os recrutadores querem avaliar com cada uma delas.
          <div v-if="!mobile" class="q-my-sm">
            <q-btn
              color="secondary"
              label="BAIXAR E-BOOK GRÁTIS"
              @click="downloadFile()"
            />
          </div>
          <div v-if="mobile" class="q-my-md">
            <q-btn
              color="secondary"
              label="BAIXAR E-BOOK GRÁTIS"
              @click="downloadFile()"
            />
          </div>
        </div>
        <img
          v-if="!mobile"
          class="external-user-most-common-questions-card-img col-4"
          src="./../../../../assets/imgs/most_common_questions.png"
        />
        <img
          v-if="mobile"
          class="external-user-most-common-questions-card-img col-4"
          src="./../../../../assets/imgs/most_common_questions.png"
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
      downloadFileFromPublic("e-Book - 50 Perguntas Mais Comuns nas Entrevistas - Prepara.me.pdf");
      saveCrud("clicks", {
        name: "E-book 50 perguntas"
      });
    },
  },
};
</script>

<style>
.external-user-most-common-questions-card-title {
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

.external-user-most-common-questions-card-img {
  height: 100px;
  margin: 10px auto;
}
</style>
