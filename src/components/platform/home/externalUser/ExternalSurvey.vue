<template>
  <div
    :class="{
      'external-user-talent-bank-card': true,
      'justify-around': true,
    }"
  >
    <q-card class="external-user-talent-bank-card-container">
      <q-card-section class="external-user-talent-bank-card-header">
        <div class="external-user-talent-bank-card-info space-around">
          <div
            :class="{
              'external-user-talent-bank-card-info-container': true,
              row: true,
            }"
          >
            <div class="col-12 card__texts">
              <div>
                <div class="external-user-talent-bank-card-title">
                  AVALIE A SUA ANTIGA EMPRESA E AJUDE A CONSTRUIR O MAIOR
                  ESTUDO DE DEMISSÃO DO BRASIL
                </div>

                <p style="text-align: center">
                  <b>Nossa pesquisa é 100% anônima e não é individualizada.</b>
                  Ou seja, os resultados só podem ser visualizados por média
                  (somatória das notas, dividido por número de respondentes),
                  não por pessoa.
                </p>
              </div>

              <div v-if="!mobile" class="q-my-sm">
                <div class="card-bottom">
                  <q-btn
                    color="secondary"
                    label="RESPONDER (2 MIN.)"
                    @click="goUrl(`survey`)"
                  />

                  <p>
                    No final da pesquisa você poderá ver o estudo completo do 3°
                    trimestre, com mais de 500 respostas.
                  </p>
                </div>
              </div>
            </div>

            <div v-if="mobile" class="q-my-md">
              <div class="row">
                <q-btn
                  class="col-12"
                  color="secondary"
                  label="RESPONDER (2 MIN.)"
                  @click="goUrl(`survey`)"
                />

                <p class="q-mt-md">
                  No final da pesquisa você poderá ver o estudo completo do 3°
                  trimestre, com mais de 500 respostas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <SurveyViewDialog />
  </div>
</template>

<script>
import SurveyViewDialog from "src/components/SurveyViewDialog.vue";

export default {
  components: {
    SurveyViewDialog,
  },
  data() {
    return {
      mobile: false,
    };
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();
  },
  methods: {
    goUrl: function (url) {
      this.$router.push({ path: `${url}` });
    },
  },
};
</script>

<style>
.external-user-talent-bank-card {
  width: 100%;
}

.external-user-talent-bank-card-container {
  border-radius: 15px;
  background: linear-gradient(
    90deg,
    rgba(180, 184, 231, 1) 12%,
    rgba(250, 194, 219, 1) 96%
  );
}

.external-user-talent-bank-card-title {
  font-weight: 700;
  font-size: 1.5rem;
  font-family: "Nunito";
  font-style: normal;
  background: #1a27b7;
  opacity: 1;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
}

.external-user-talent-bank-card-img {
  height: 100px;
}

.img__card {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.card__texts {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-bottom {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.card-bottom p {
  font-size: 12px;
  color: #000000;
  max-width: 40%;
  margin: 0;
}
</style>
