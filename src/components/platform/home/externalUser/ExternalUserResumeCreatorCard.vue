<template>
  <div>
    <div  class="q-ma-md">
      <div class="external-user-most-common-questions-card-title">
        MODELO DE CURRÍCULO GRÁTIS
      </div>
      <div class="row col-12">
        <div class="q-mt-sm col-9">
          Aumente as chances de ter seu CV selecionado com nosso modelo e dicas para preenchimento!
          <div>
            <b><br>É fácil. É rápido. É gratuito!</b>
          </div>
          <div v-if="!mobile" class="q-my-sm">
            <q-btn
              color="secondary"
              label="BAIXAR MODELO"
              href="https://preparame-backend.s3.sa-east-1.amazonaws.com/others/Modelo+1+-+CV+Nome+Sobrenome+-+%C3%81rea++(1).docx"
            />
          </div>
          <div v-if="mobile" class="q-my-sm">
            <q-btn
              color="secondary"
              label="BAIXAR MODELO"
              href="https://preparame-backend.s3.sa-east-1.amazonaws.com/others/Modelo+1+-+CV+Nome+Sobrenome+-+%C3%81rea++(1).docx"
            />
          </div>
        </div>
        <img
          v-if="!mobile"
          class="external-user-most-common-questions-card-img col-3"
          src="./../../../../assets/imgs/check.png"
        />
        <img
          v-if="mobile"
          class="external-user-most-common-questions-card-img col-3"
          src="./../../../../assets/imgs/check.png"
        />
      </div>
    </div>
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
  methods: {
    goURL: function () {
      this.$router.push({ path: `/` });
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
