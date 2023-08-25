<template>
  <q-form class="form">
    <!-- nome, email, cpf, senha e confirmação de senha -->

    <q-input
      placeholder="Nome"
      borderless
      v-model="name"
      class="input__text"
      :input-style="{
        backgroundColor: $parent.clockColor,
        borderRadius: '5px',
        color: '#fff',
        fontWeight: '700',
        fontSize: '1rem',
        padding: '10px',
      }"
    >
    </q-input>

    <q-input
      placeholder="E-mail"
      borderless
      v-model="email"
      class="input__text"
      :input-style="{
        backgroundColor: $parent.clockColor,
        borderRadius: '5px',
        color: '#fff',
        fontWeight: '700',
        fontSize: '1rem',
        padding: '10px',
      }"
    >
    </q-input>

    <q-input
      placeholder="CPF"
      borderless
      v-model="cpf"
      mask="###.###.###-##"
      class="input__text"
      :input-style="{
        backgroundColor: $parent.clockColor,
        borderRadius: '5px',
        color: '#fff',
        fontWeight: '700',
        fontSize: '1rem',
        padding: '10px',
      }"
    >
    </q-input>

    <q-input
      placeholder="Senha"
      borderless
      v-model="password"
      type="password"
      class="input__text"
      :input-style="{
        backgroundColor: $parent.clockColor,
        borderRadius: '5px',
        color: '#fff',
        fontWeight: '700',
        fontSize: '1rem',
        padding: '10px',
      }"
    >
    </q-input>

    <q-input
      placeholder="Confirme sua senha"
      borderless
      v-model="confirmPassword"
      type="password"
      class="input__text"
      :input-style="{
        backgroundColor: $parent.clockColor,
        borderRadius: '5px',
        color: '#fff',
        fontWeight: '700',
        fontSize: '1rem',
        padding: '10px',
      }"
    >
    </q-input>

    <p
      class="confirm"
      :style="{
        color: $parent.textColor,
      }"
    >
      Ao se cadastrar, você aceita que o Prepara.me compartilhe seu cadastro com
      a empresa patrocinadora.
    </p>

    <div class="submit" @click="submitForm">
      <p>Acesso Grátis</p>
    </div>

    <!-- <img src="~assets/imgs/8.png" alt="" /> -->
  </q-form>
</template>

<script>
import { signUp } from "src/utils/controls/loginControl";
export default {
  data() {
    return {
      name: "",
      email: "",
      cpf: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async submitForm() {
      const response = await signUp(
        true,
        {
          name: this.name,
          email: this.email,
          documentId: this.cpf,
          password: this.password,
          confirmPassword: this.confirmPassword,
        },
        "",
        this.$route.params.companyName
      );

      if (response === true) {
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 80%;
  cursor: pointer;
}

img::after {
  content: "Clique aqui para enviar o formulário";
}

.submit {
  background-image: url("~assets/imgs/8.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 801px) {
  .submit {
    min-width: 300px;
  }
}

.submit p {
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
  color: #1a27b7;
  text-align: center;
}

.input__text {
  margin-bottom: 15px;
}

.confirm {
  font-size: 1rem;
  color: #fff;
  text-align: center;
  margin-bottom: 15px;
}
</style>
