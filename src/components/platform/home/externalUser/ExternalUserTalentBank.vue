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
            <div class="col-10">
              <div class="external-user-talent-bank-card-title">
                BANCO DE TALENTOS: INDICAMOS VOCÊ PARA RECRUTADORES
              </div>

              <img
                v-if="mobile"
                :class="{
                  'external-user-talent-bank-card-img': true,
                }"
                src="./../../../../assets/imgs/talent_bank.jpg"
              />
              <div v-if="!mobile" class="q-my-sm">
                <q-btn
                  color="secondary"
                  label="PREENCHER [MENOS DE 3 MIN.]"
                  @click="goBlank(`https://forms.gle/bGNAkfse2F72uVeK9`)"
                />
              </div>
            </div>
            <div class="col-2">
              <img
                v-if="!mobile"
                :class="{
                  'external-user-talent-bank-card-img': true,
                  'col-3': true,
                }"
                src="./../../../../assets/imgs/talent_bank.jpg"
              />
            </div>
            <div v-if="mobile" class="q-my-md">
              <q-btn
                color="secondary"
                label="PREENCHER [MENOS DE 3 MIN.]"
                @click="goBlank(`https://forms.gle/bGNAkfse2F72uVeK9`)"
              />
            </div>
          </div>
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
  methods: {
    goBlank: function (url) {
      window.open(url, "_blank");
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
}

.external-user-talent-bank-card-title {
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

.external-user-talent-bank-card-img {
  height: 100px;
}
</style>
