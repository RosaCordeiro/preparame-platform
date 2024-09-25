<template>
  <div id="contact" class="contact">
    <div
      :class="{ 'contact-info-container': true, row: !mobile, column: mobile }"
    >
      <div
        :class="{
          'contact-info-preparame': true,
          'col-3': !mobile,
          column: true,
        }"
      >
        <img
          :src="imgURL(logoImg)"
          :class="{ 'contact-info-preparame-logo': true }"
        />
        <div class="contact-info-preparame-text">
          Um marketplace que conecta profissionais de RH com você, que precisa
          se preparar para o próximo passo na carreira ou quer simplesmente
          melhorar seu currículo e suas chances no mercado de trabalho.
        </div>
      </div>
      <q-space />
      <div class="contact-info col-2 column">
        <div class="contact-info-title">Informações para contato</div>
        <div class="contact-info-text">
          <q-icon name="mdi-map-marker" />
          São Paulo e todo Brasil
        </div>
        <div class="contact-info-text">
          <q-icon name="mdi-email" />
          contato@prepara.me
        </div>
        <div class="contact-info-text">
          <q-icon name="mdi-whatsapp" />
          +55 11 95339-9384
        </div>
      </div>
      <q-space />
      <div class="contact-info col-2 column">
        <div class="contact-terms-title">Termos</div>
        <div
          class="contact-terms-text"
          @click="goUrl('PrivacyTerms', 'internal')"
        >
          Politicas de Privacidade
        </div>
        <div class="contact-terms-text" @click="goUrl('UseTerms', 'internal')">
          Termos de Uso
        </div>
        <a
          class="q-mt-md"
          href="https://www.privacidade.com.br/portal-de-privacidade?token=96e68d530e60530923326f874779b49a"
          ><img
            src="https://api.dponet.com.br/selo_portal_de_privacidade.png"
            width="300"
        /></a>
      </div>
      <q-space />
      <div class="contact-info col-2 column">
        <div class="contact-info-title">Siga-nos</div>
        <div class="contact-info-icons row">
          <q-icon
            name="mdi-facebook"
            class="contact-info-icon q-mr-sm"
            @click="goUrl('https://www.facebook.com/prepara.mebr')"
          />
          <q-icon
            name="mdi-linkedin"
            class="contact-info-icon q-mr-sm"
            @click="goUrl('https://www.linkedin.com/company/prepara-mebr/')"
          />
          <q-icon
            name="mdi-instagram"
            class="contact-info-icon q-mr-sm"
            @click="goUrl('https://www.instagram.com/prepara.me/')"
          />
        </div>
      </div>
      <q-space />
    </div>

    <div class="contact-reserved-rights">
      {{ year }} | Todos os direitos reservados @prepara.me
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: 0,
      logoImg: "logo_preparame_home.png",
      mobile: false,
    };
  },
  mounted() {
    this.year = new Date().getFullYear();
    this.mobile = window.mobileAndTabletCheck();
  },
  methods: {
    goUrl: function (url, type = "external") {
      if (type === "external") {
        window.open(url, "_blank").focus();
      } else {
        this.$router.push({ path: url });
      }
    },
    imgURL: function (pathName) {
      var images = require.context(
        "../../../../assets/logos/",
        false,
        /\.png$/
      );

      return images("./" + pathName);
    },
  },
};
</script>

<style>
.contact {
  height: 40vh;
}

.contact-info-container {
  height: 30vh;
}

.contact-reserved-rights {
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #1a27b7 0%, #ff4690 100%);
  color: #fff;
  font-family: "Nunito";
  font-weight: 300;
  font-size: 0.8rem;
  text-align: center;
}

.contact-info-preparame-logo {
  width: 200px;
  margin: 10% auto 5% auto;
}

.contact-info-preparame-text {
  font-family: "Nunito";
  font-weight: 300;
  font-size: 0.8rem;
  display: flex;
  color: #6c6c6c;
  width: 80%;
  margin: 0 auto;
}

.contact-info-title {
  font-family: "Nunito";
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: #000000;
}

.contact-terms-title {
  font-family: "Nunito";
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: #000000;
}

.contact-info {
  margin-top: 50px;
}

.contact-info-text {
  font-family: "Nunito";
  font-weight: 300;
  font-size: 0.8rem;
  color: #6c6c6c;
}

.contact-terms-text {
  cursor: pointer;
  font-family: "Nunito";
  font-weight: 300;
  font-size: 0.8rem;
  color: #6c6c6c;
}

.contact-info-icons {
  font-size: 1.5rem;
}

.contact-info-icon:hover {
  font-family: "Nunito";
  color: #000;
  cursor: pointer;
  transition: all 0.5s ease;
}

.contact-info-icon:hover {
  color: #555;
}

@media (orientation: portrait) {
  .contact {
    height: auto;
  }

  .contact-info-container {
    height: auto;
  }

  .contact-info {
    margin: 10px 0 10px 30px;
  }
}
</style>
