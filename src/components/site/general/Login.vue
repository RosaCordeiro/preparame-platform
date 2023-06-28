<template>
  <div v-show="needLogin" class="login-modal">
    <div class="login-prepara-me-logo" />
    <div v-if="loggingIn" class="login-form-signin">
      <div class="login-modal-title">Acesse a nossa plataforma</div>
      <q-input
        id="loginEmail"
        class="login-form-signin-container"
        v-model="user.email"
        name="loginEmail"
        label="E-Mail ou CPF"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-email" />
        </template>
      </q-input>

      <q-input
        id="loginPassword"
        class="login-form-signin-container"
        v-model="user.password"
        :type="!showPassword ? 'password' : 'text'"
        name="loginPassword"
        label="Senha"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-lock" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="!showPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          ></q-icon>
        </template>
      </q-input>

      <q-dialog v-model="resetPasswordDialog" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">
              Insira o e-mail para alteração da sua senha
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="emailAddress" autofocus></q-input>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup></q-btn>
            <q-btn flat label="Alterar senha" @click="resetPassword()"></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div class="row-buttons">
        <div class="login-form-signin-in" @click="login()">
          <p>Entrar</p>
          <p>Já sou de casa &#128522;</p>
        </div>
        <div class="login-form-register" @click="loggingIn = false">
          Cadastro Rápido
        </div>
      </div>

      <div class="login-others-links">
        Esqueceu sua senha?
        <a @click="resetPasswordDialog = true">Clique aqui!</a>
      </div>

      <!-- <div class="login-others-links">
        Ainda não tem cadastro?
        <a @click="loggingIn = false">Clique aqui!</a>
      </div> -->
    </div>
    <div v-else class="login-form-signin">
      <div class="login-modal-title">Cadastre-se em nossa plataforma</div>

      <q-input
        id="name"
        class="login-form-signin-container"
        v-model="user.name"
        name="name"
        label="Nome Completo"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-account" />
        </template>
      </q-input>

      <q-input
        id="email"
        class="login-form-signin-container"
        v-model="user.email"
        name="email"
        label="E-Mail"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-email" />
        </template>
      </q-input>

      <q-input
        id="documentId"
        class="login-form-signin-container"
        v-model="user.documentId"
        mask="###.###.###-##"
        name="cpf"
        label="CPF"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-card-account-details" />
        </template>
      </q-input>

      <q-input
        id="password"
        class="login-form-signin-container"
        v-model="user.password"
        type="password"
        name="password"
        label="Senha"
        @input="passwordValidate()"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-lock" />
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
      >
        <template v-slot:prepend>
          <q-icon name="mdi-lock" />
        </template>
      </q-input>

      <div class="login-form-accept-terms-container">
        <q-checkbox v-model="acceptTerms" class="login-form-accept-terms" />
        <div class="login-form-accept-terms-text">
          Aceito a
          <a @click="goUrl('PrivacyTerms')">Política de Privacidade</a> e os
          <a @click="goUrl('useTerms')">Termos de Uso</a> deste site.
        </div>
      </div>

      <div class="login-form-signin-in" @click="signUp()">Cadastrar</div>
      <div class="login-others-links">
        Já tem cadastro?
        <a @click="loggingIn = !loggingIn">Clique aqui!</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import { baseApiUrl, showError } from "../../../../src/global.js";
import { cpfValidation } from "../../../utils/cpfValidation.js";
import { emailValidation } from "../../../utils/emailValidation.js";
import { passwordValidation } from "../../../utils/passwordValidation.js";
import { refreshToken } from "src/utils/refreshToken";
import { loginControl } from "src/utils/controls/loginControl";

export default {
  data() {
    return {
      loggingIn: true,
      showPassword: false,
      resetPasswordDialog: false,
      emailAddress: "",
      eyePassIco: "eye-off",
      token: null,
      user: {},
      passwordValidPercentual: 0,
      forcePassword: "Fraca",
      acceptTerms: false,
      needLogin: false,
    };
  },
  async beforeCreate() {
    try {
      const loggedUser = await refreshToken().then((token) => {
        return token.status === 200;
      });

      loginControl.isLogged = loggedUser;
      this.needLogin = !loggedUser;

      this.token = this.$router.history.current.query.token;

      if (this.token) {
        this.loggingIn = false;
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    ...mapActions("users", ["setUser"]),
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
    switchVisibility: function () {
      const passwordField = document.getElementsByName("password")[0];

      if (passwordField.getAttribute("type") === "password") {
        passwordField.setAttribute("type", "text");
        this.eyePassIco = "eye";
      } else {
        passwordField.setAttribute("type", "password");
        this.eyePassIco = "eye-off";
      }
    },
    login: async function () {
      if (!this.user.email) {
        showError("E-mail do usuário deve ser preenchido.");
        document.getElementById("loginEmail").focus();
        return;
      }

      if (!this.user.password) {
        showError("Senha do usuário deve ser preenchido.");
        document.getElementById("loginPassword").focus();
        return;
      }

      const userData = {
        email: this.user.email,
        password: this.user.password,
      };

      await axios
        .post(`${baseApiUrl}/sessions`, userData)
        .then(async (user) => {
          this.$q.notify({
            type: "success",
            message: "Sucesso",
          });

          await this.setUser(user.data);

          loginControl.isLogged = true;
        })
        .catch(showError);

      this.user = {};
    },
    signUp: async function () {
      if (!this.acceptTerms) {
        showError("É necessário aceitar os termos do site para se cadastrar.");
        return;
      }

      if (!this.user.name) {
        showError("Nome do usuário deve ser preenchido.");
        document.getElementById("name").focus();
        return;
      }

      if (!this.user.email) {
        showError("E-mail do usuário deve ser preenchido.");
        document.getElementById("email").focus();
        return;
      }

      if (!emailValidation(this.user.email)) {
        showError("Email Inválido.");
        document.getElementById("email").focus();
        return;
      }

      if (!this.user.documentId) {
        showError("CPF do usuário deve ser preenchido.");
        document.getElementById("documentId").focus();
        return;
      }

      if (!this.user.password) {
        showError("Senha do usuário deve ser preenchida.");
        document.getElementById("password").focus();
        return;
      }

      if (!this.user.confirmPassword) {
        showError("A confirmação de senha deve ser preenchida.");
        document.getElementById("confirmPassword").focus();
        return;
      }

      if (this.user.password !== this.user.confirmPassword) {
        showError("As senhas inseridas não conferem.");
        document.getElementById("confirmPassword").focus();
        return;
      }

      if (!cpfValidation(this.user.documentId)) {
        showError("CPF Inválido.");
        document.getElementById("documentId").focus();
        return;
      }

      const userData = {
        name: this.user.name,
        username: this.user.name,
        email: this.user.email,
        password: this.user.password,
        documentId: this.user.documentId,
        subscribeToken: this.token || this.user.subscribeToken,
        type: "USER",
      };

      await axios
        .post(`${baseApiUrl}/users`, userData)
        .then(() => {
          this.$q.notify({
            type: "success",
            message: "Sucesso",
          });

          this.resetPasswordDialog = false;
          this.loggingIn = true;
        })
        .catch(showError);

      this.user = {};
    },
    openResetPasswordDialog: function () {
      this.resetPasswordDialog = true;
    },
    resetPassword: async function () {
      this.$q.loading.show();

      await axios
        .post(`${baseApiUrl}/password/forgot`, {
          email: this.emailAddress,
        })
        .then(() => {
          this.$q.notify({
            type: "success",
            message: "Sucesso",
          });

          this.resetPasswordDialog = false;
        })
        .catch((err) => {
          showError(
            `Não foi possível localizar este e-mail em nossa base de dados. ${err}`
          );
        });

      this.$q.loading.hide();
    },
    goUrl: function (url) {
      if (this.$router.history.current.path !== `/${url}`) {
        let routeData = this.$router.resolve({ path: `/${url}` });
        window.open(routeData.href, "_blank");
      }
    },
  },
};
</script>

<style lang="scss">
.login-modal {
  margin: auto;
  width: 90%;
  max-width: 600px;
  background: #fff;
  border-radius: 5px;
  padding: 30px;
  -webkit-box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.32);
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.32);
}

.login-prepara-me-logo {
  height: 100px;
  width: 90%;
  background-image: url("../../../assets/logos/logo_preparame_home.png");
  background-position: 0%;
  background-size: cover;
  padding-left: 10px;
  margin: 0 auto 20px auto;
  cursor: pointer;
}

.login-form-signin {
  display: flex;
  flex-direction: column;
}

.login-modal-title {
  width: 80%;
  margin: 0 auto 20px auto;
  font-family: "Nunito", sans-serif;
  font-size: 20px;
  text-align: center;
  color: #0922bc;
  font-weight: bold;
  user-select: none;
}

.login-form-signin-container {
  width: 80%;
  margin: auto;
}

.login-form-icon {
  width: 30px;
  color: #667998;
}

.login-form-eye-icon {
  cursor: pointer;
}

.login-form-signin input {
  max-width: 800px;
}

.login-others-links {
  width: 80%;
  margin: 2px auto;
  font-family: "Nunito", sans-serif;
  color: #667998;
  user-select: none;
  a {
    font-family: "Nunito", sans-serif;
    color: #667998;
    font-weight: bold;
    cursor: pointer;
  }
}

.login-forgot-pass {
  width: 80%;
  margin: 2px auto;
  font-family: "Nunito", sans-serif;
  font-size: 0.7rem;
  color: #667998;
  user-select: none;

  a {
    font-family: "Nunito", sans-serif;
    color: #667998;
    font-weight: bold;
    cursor: pointer;
  }
}

.login-form-signin-in,
.login-form-register {
  height: 50px;
  width: 220px;
  margin: 15px auto 30px auto;
  line-height: 50px;
  text-align: center;
  border: 1px solid #667998;
  font-family: "nunito", sans-serif;
  color: #667998;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.25s ease;
  background-color: #fff;
  user-select: none;
}

/* .login-form-signin-in:hover {
  border: 1px solid #fff;
  color: #fff;
  background-color: #667998;
} */

.login-form-signin-container-hint-password {
  font-size: 1.5rem;
}

.login-form-accept-terms-container {
  display: flex;
  flex-direction: row;
  margin: 0 5vh;
}

.login-form-accept-terms-text {
  line-height: 40px;
  text-align: center;
  color: #667998;
  font-size: 13px;
}

.login-form-accept-terms-text a {
  color: #667998;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .login-prepara-me-logo {
    height: 60px;
    width: 100%;
  }
}

.row-buttons {
  display: flex;
  width: 80%;
  margin: 0 auto;
  gap: 10px;
  margin-top: 20px;
}

.login-form-signin-in,
.login-form-register {
  flex: 1;
  text-transform: uppercase;
  font-weight: 700;
}

.login-form-signin-in {
  background-color: #f54690;
  color: #fff;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-form-signin-in p {
  margin: 0px !important;
  line-height: initial;
}

/* last p */
.login-form-signin-in p:last-child {
  font-size: 9px;
}

.login-form-register {
  background-color: #1a27b7;
  color: #fff;
}
</style>
