<template>
  <div class="presentation">
    <div class="info">
      <div class="title">kit de recolocação</div>
      <div class="subtitle">Simulador de Entrevistas Automático</div>
      <div class="plus-sign">
        <img :src="imgURL(plus.img)" alt />
      </div>
      <div class="subtitle">Modelo de Currículo Assertivo</div>
      <div v-if="mobile" class="image"></div>
      <div class="form">
        <div class="login-form-signin">
          <div class="login-modal-title">Cadastre-se em nossa plataforma</div>

          <q-input
            id="name"
            class="login-form-signin-container"
            v-model="user.name"
            name="name"
            label="Nome Completo"
            color="secondary"
            dark
            filled
            label-color="white"
            dense
          >
            <template v-slot:prepend>
              <q-icon color="white" name="mdi-account" />
            </template>
          </q-input>

          <q-input
            id="email"
            class="login-form-signin-container"
            v-model="user.email"
            name="email"
            label="E-Mail"
            color="secondary"
            dark
            filled
            label-color="white"
            dense
          >
            <template v-slot:prepend>
              <q-icon color="white" name="mdi-email" />
            </template>
          </q-input>

          <q-input
            id="documentId"
            class="login-form-signin-container"
            v-model="user.documentId"
            mask="###.###.###-##"
            name="cpf"
            label="CPF"
            color="secondary"
            filled
            label-color="white"
            dense
            dark
          >
            <template v-slot:prepend>
              <q-icon color="white" name="mdi-card-account-details" />
            </template>
          </q-input>

          <q-input
            id="password"
            class="login-form-signin-container"
            v-model="user.password"
            type="password"
            name="password"
            label="Senha"
            color="secondary"
            filled
            label-color="white"
            dense
            dark
            @input="passwordValidate()"
          >
            <template v-slot:prepend>
              <q-icon color="white" name="mdi-lock" />
            </template>

            <template v-slot:append>
              <div
                :class="{
                  'text-red': forcePassword === 'Fraca',
                  'text-orange': forcePassword === 'Média',
                  'text-green': forcePassword === 'Forte',
                  'login-form-signin-container-hint-password': true,
                }"
              >
                <q-icon
                  v-if="forcePassword === 'Fraca'"
                  name="mdi-emoticon-sad-outline"
                  :tooltip="forcePassword"
                />
                <q-icon
                  v-if="forcePassword === 'Média'"
                  name="mdi-emoticon-neutral-outline"
                />
                <q-icon
                  v-if="forcePassword === 'Forte'"
                  name="mdi-emoticon-outline"
                />
              </div>
            </template>
          </q-input>

          <q-input
            id="confirmPassword"
            class="login-form-signin-container"
            v-model="user.confirmPassword"
            type="password"
            name="confirmPassword"
            label="Confirmação da Senha"
            color="secondary"
            filled
            label-color="white"
            dense
            dark
          >
            <template v-slot:prepend>
              <q-icon color="white" name="mdi-lock" />
            </template>
          </q-input>
          <div class="container-presentation">
            <q-checkbox v-model="acceptTerms"/>
            <div class="text-presentation" style="text-align: start;">
              Aceito a
              <a @click="goUrl('PrivacyTerms')">Política de Privacidade</a> e os
              <a @click="goUrl('useTerms')">Termos de Uso</a> deste site.
            </div>
          </div>
        </div>
        <q-btn
          class="q-mt-lg text-white bg-prepara-me-blue"
          label="Cadastrar Gratuitamente"
          @click="freeAccess()"
        />
      </div>
    </div>
    <div v-if="!mobile" class="image"></div>
  </div>
</template>

<script>
import { passwordValidation } from "../../../utils/passwordValidation.js";
import { signUp } from "../../../utils/controls/loginControl.js";

export default {
  data() {
    return {
      mobile: false,
      plus: {
        img: "service_plus",
      },
      user: {},
      forcePassword: "",
      acceptTerms: false,
      token: ""
    };
  },
  mounted() {
    this.mobile = window.mobileAndTabletCheck();
  },
  methods: {
    freeAccess() {
      if(!this.acceptTerms){
        showError("É necessário aceitar os termos do site para se cadastrar.");
        return;
      }
      if (signUp(this.acceptTerms, this.user, this.token)) {
        this.$router.push({ path: "/login" });
      }
    },
    imgURL: function (pathName) {
      var images = require.context("../../../assets/imgs/", false, /\.png$/);

      return images(`./${pathName}.png`);
    },
    passwordValidate: function () {
      const forcePassword = passwordValidation(this.user.password);

      if (forcePassword <= 100) {
        this.forcePassword = "Forte";
      }

      if (forcePassword <= 70) {
        this.forcePassword = "Média";
      }

      if (forcePassword <= 30) {
        this.forcePassword = "Fraca";
      }
    },
    goUrl: function (url) {
      this.$router.push({ path: `/${url}` });
      this.$emit("close-mentoring-calendar");
    },
  },
};
</script>

<style lang="scss">
.kit-pro-page {
  .presentation {
    height: 100vh;
    background: linear-gradient(287.73deg, #1a27b7 3.75%, #ff4690 94.95%);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .info {
      .title {
        font-family: "Russo One", sans-serif;
        font-weight: 400;
        font-size: 3rem;
        line-height: 2rem;
        text-align: center;
        color: #ffffff;
      }

      .subtitle {
        font-family: "Nunito";
        font-weight: 700;
        font-size: 1.3rem;
        line-height: .8rem;
        text-align: center;
        color: #ffffff;
        margin-bottom: 5px;
        margin-top: 10px;
      }

      .plus-sign {
        display: flex;
        justify-content: center;
        height: 50px;
      }

      .form {
        display: flex;
        flex-direction: column;

        .login-form-signin {
          .login-form-signin-container {
            margin-bottom: 8px;
          }
        }

        .title {
          font-family: "Nunito";
          font-style: normal;
          font-size: 25px;
          line-height: 45px;
          text-align: center;
          color: #ffffff;
        }

        button {
          align-self: center;
          justify-self: center;
          width: 400px;
          height: 60px;
          line-height: 50px;
          font-size: 1.0rem;
        }
      }
    }

    .image {
      position: relative;
      height: 100vh;
      background-image: url("../../../assets/imgs/kitproimg.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position-x: 100%;
      right: 0px;
      width: 50vw;
    }
  }
}

.container-presentation {
  display: flex;
  flex-direction: row;
}

.text-presentation {
  text-align: center;
  color: #ffffff;
  font-size: 0.9rem;
}

.text-presentation a {
  color: #1a27b7;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

@media (orientation: portrait) {
  .kit-pro-page {
    .presentation {
      align-items: unset;
      flex-direction: column;
      height: 150vh;

      .info {
        .title {
          font-size: 2rem;
          line-height: unset;
        }

        .login-form-signin-container {
          margin-bottom: 5px;
        }

        .subtitle {
          font-size: 1.2rem;
          line-height: unset;
          margin-bottom: unset;
        }

        .form {
          .title {
            font-size: 1rem;
            line-height: unset;
          }

          label {
            width: 80vw;
            margin: 5px auto;
          }

          button {
            width: unset;
            height: unset;
            font-size: unset;
          }
        }
      }

      .image {
        width: 100vw;
        height: 35vh;
        top: unset;
      }
    }
  }
}
</style>
