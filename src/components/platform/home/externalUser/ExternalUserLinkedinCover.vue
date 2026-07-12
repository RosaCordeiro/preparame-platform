<template>
  <div class="q-pa-md">
    <div class="home-user-tool-title">100 capas para LinkedIn</div>
    <div class="row items-start">
      <div class="col home-user-tool-body">
        Tenha um perfil de LinkedIn muito mais bonito e profissional com nossas
        capas.
        <div class="q-mt-md">
          <q-btn
            color="secondary"
            label="Acessar agora mesmo"
            no-caps
            unelevated
            @click="downloadFile()"
          />
        </div>
      </div>
      <img
        class="home-user-tool-img col-auto"
        src="./../../../../assets/imgs/linkedin_icon.png"
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
      downloadFileFromPublic("Capas.zip");
      saveCrud("clicks", {
        name: "Capas de Linkedin",
      });
    },
  },
};
</script>
