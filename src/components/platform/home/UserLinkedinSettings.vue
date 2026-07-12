<template>
  <q-card class="user-linkedin-settings home-user-card">
    <q-card-section>
      <div class="text-h6 text-weight-bold q-mb-sm">
        LinkedIn e programa de recolocação
      </div>
      <p class="text-body2 text-grey-8 q-mb-md">
        Informe seu perfil do LinkedIn e escolha se deseja aparecer no programa
        de recolocação do Prepara.me. Por padrão, a exibição está autorizada
        conforme os termos de uso.
      </p>

      <q-input
        v-model="form.linkedinUrl"
        label="Página do LinkedIn"
        outlined
        dense
        class="q-mb-md"
        hint="Ex.: https://www.linkedin.com/in/seu-perfil"
        :disable="loading"
      />

      <q-toggle
        v-model="form.showLinkedinInRelocationProgram"
        label="Permitir exibir meu LinkedIn no programa de recolocação"
        color="primary"
        :disable="loading"
      />

      <div class="q-mt-md">
        <q-btn
          color="primary"
          label="Salvar"
          icon="mdi-content-save"
          no-caps
          unelevated
          :loading="saving"
          :disable="loading"
          @click="save"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError, showSuccess } from "src/global";

export default {
  name: "UserLinkedinSettings",
  data() {
    return {
      loading: false,
      saving: false,
      form: {
        linkedinUrl: "",
        showLinkedinInRelocationProgram: true,
      },
    };
  },
  created() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      this.loading = true;

      try {
        const { data } = await axios.get(
          `${baseApiUrl}/users/me/company-employee`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        this.form.linkedinUrl = data.linkedinUrl || "";
        this.form.showLinkedinInRelocationProgram =
          data.showLinkedinInRelocationProgram !== false;
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          showError(error);
        }
      } finally {
        this.loading = false;
      }
    },
    async save() {
      this.saving = true;

      try {
        const { data } = await axios.patch(
          `${baseApiUrl}/users/me/company-employee`,
          {
            linkedinUrl: this.form.linkedinUrl,
            showLinkedinInRelocationProgram:
              this.form.showLinkedinInRelocationProgram,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        this.form.linkedinUrl = data.linkedinUrl || "";
        this.form.showLinkedinInRelocationProgram =
          data.showLinkedinInRelocationProgram !== false;
        showSuccess("Preferências salvas com sucesso!");
      } catch (error) {
        showError(error);
      } finally {
        this.saving = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-linkedin-settings {
  border-radius: 12px;
}
</style>
