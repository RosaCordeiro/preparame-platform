import Vue from "vue";
import axios from "axios";
import { cpfValidation } from "../../utils/cpfValidation.js";
import { emailValidation } from "../../utils/emailValidation.js";
import { passwordValidation } from "../../utils/passwordValidation.js";
import { baseApiUrl, showError, showSucess } from "../../../src/global.js";

const loginControl = Vue.observable({
  isLogged: false,
  loggedFrom: "",
});

const passwordValidate = function (user) {
  const forcePassword = passwordValidation(user.password);

  if (forcePassword <= 100) {
    forcePassword = "Forte";
  }

  if (forcePassword <= 70) {
    forcePassword = "Média";
  }

  if (forcePassword <= 30) {
    forcePassword = "Fraca";
  }
};

const signUp = async function (acceptTerms, user, token, companyNameSignIn) {
  if (!acceptTerms) {
    showError("É necessário aceitar os termos do site para se cadastrar.");
    return;
  }

  if (!user.name) {
    showError("Nome do usuário deve ser preenchido.");
    return;
  }

  if (!user.email) {
    showError("E-mail do usuário deve ser preenchido.");
    return;
  }

  if (!emailValidation(user.email)) {
    showError("Email Inválido.");
    return;
  }

  if (!user.documentId) {
    showError("CPF do usuário deve ser preenchido.");
    return;
  }

  if (!user.password) {
    showError("Senha do usuário deve ser preenchida.");
    return;
  }

  if (!user.confirmPassword) {
    showError("A confirmação de senha deve ser preenchida.");
    return;
  }

  if (user.password !== user.confirmPassword) {
    showError("As senhas inseridas não conferem.");
    return;
  }

  if (!cpfValidation(user.documentId)) {
    showError("CPF Inválido.");
    return;
  }

  const userData = {
    name: user.name,
    username: user.name,
    email: user.email,
    password: user.password,
    documentId: user.documentId,
    subscribeToken: token || user.subscribeToken,
    type: "USER",
    companyNameSignIn: companyNameSignIn || "",
  };

  return await axios
    .post(`${baseApiUrl}/users`, userData)
    .then(() => {
      showSucess("Sucesso");

      return true;
    })
    .catch((err) => {
      showError(err);

      console.log(err);

      return false;
    });
};

export { loginControl, signUp, passwordValidate };
