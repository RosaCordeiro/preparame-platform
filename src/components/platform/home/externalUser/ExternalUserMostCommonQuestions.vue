<template>
  <div class="q-pa-md">
    <div class="home-user-tool-title">50 perguntas mais comuns</div>
    <div class="row items-start">
      <div class="col home-user-tool-body">
        Baixe o e-book e descubra o que os recrutadores querem avaliar com cada
        uma delas.
        <div class="q-mt-md">
          <q-btn
            color="secondary"
            label="Baixar e-book grátis"
            no-caps
            unelevated
            @click="downloadFile()"
          />
        </div>
      </div>
      <img
        class="home-user-tool-img col-auto"
        src="./../../../../assets/imgs/most_common_questions.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { downloadFileFromPublic } from "../../../../utils/downloadFile";
import { saveCrud } from "../../../../components/general/crud/utils/saveCrud";

export default {
  methods: {
    downloadFile: function () {
      downloadFileFromPublic(
        "e-Book - 50 Perguntas Mais Comuns nas Entrevistas - Prepara.me.pdf"
      );
      saveCrud("clicks", {
        name: "E-book 50 perguntas",
      });
    },
  },
};
</script>
