<template>
  <div class="external-user-resume-creator-card justify-around q-mb-sm">
    <q-card class="external-user-resume-creator-card-container q-pa-sm">
      <q-card-section class="external-user-resume-creator-card-header">
        <div class="external-user-resume-creator-card-info space-around">
          <div class="row">
            <div
              :class="{
                column: true,
                'external-user-resume-creator-card-info-container': true,
                'q-mt-md': true,
                'col-10': true,
              }"
            >
              <div class="external-user-resume-creator-card-title">
                MODELO DE CURRÍCULO GRÁTIS
              </div>
              <div
                class="external-user-resume-creator-card-info-container-msg q-mb-sm"
              >
                Aumente as chances de ter seu CV selecionado com nosso modelo e
                dicas para preenchimento!
              </div>
              <div
                class="external-user-resume-creator-card-info-container-msg q-mb-md"
              >
                <b>É fácil. É rápido. É gratuito!</b>
              </div>
              <div v-if="!mobile" class="q-mb-sm">
                <q-btn
                  color="secondary"
                  label="BAIXAR MODELO"
                  href="https://preparame-backend.s3.sa-east-1.amazonaws.com/others/Modelo+1+-+CV+Nome+Sobrenome+-+%C3%81rea++(1).docx"
                />
              </div>
            </div>
            <img
              :class="{
                'external-user-resume-creator-card-img': true,
              }"
              src="./../../../../assets/imgs/check.png"
            />
          </div>
        </div>
        <div v-if="mobile" class="q-mt-md">
          <q-btn
            color="secondary"
            label="BAIXAR MODELO"
            href="https://preparame-backend.s3.sa-east-1.amazonaws.com/others/Modelo+1+-+CV+Nome+Sobrenome+-+%C3%81rea++(1).docx"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: false,
    };
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();
  },
};
</script>

<style>
.external-user-resume-creator-card {
  width: 100%;
}
.external-user-resume-creator-card-container {
  border-radius: 15px;
}

.external-user-resume-creator-card-title {
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

.external-user-resume-creator-card-img {
  height: 100px;
}

.external-user-resume-creator-card-btn-container {
  width: 100%;
  position: relative;
}

.external-user-resume-creator-card-btn-know-more {
  height: 40px;
  margin: 10px auto;
}
</style>
