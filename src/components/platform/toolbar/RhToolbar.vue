<template>
  <div id="q-app" class="platform-toolbar">
    <q-header elevated class="rh-toolbar-header platform-toolbar-header">
      <q-toolbar>
        <q-btn flat @click="toogleMenu()" round dense icon="menu"></q-btn>
        <q-toolbar-title class="rh-toolbar-title">
          Programa de Demissão Responsável
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn-dropdown stretch flat label="Perfil" no-caps>
          <q-list class="toolbar-perfil">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="userAvatarUrl" alt="" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ userName }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator></q-separator>
            <q-item @click="logout()" clickable v-close-popup tabindex="0">
              <q-item-section avatar>
                <q-icon color="icon" name="mdi-logout-variant"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userAvatarUrl: "",
      userName: "",
    };
  },
  methods: {
    toogleMenu() {
      this.$parent.$parent.toogleMenu();
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("userAvatarUrl");
      localStorage.removeItem("userName");
      localStorage.removeItem("userType");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
      localStorage.removeItem("surveyAnswered");
      localStorage.removeItem("laborRiskAlert");
      localStorage.removeItem("companyId");
      localStorage.removeItem("createdAt");
      localStorage.removeItem("expiresDate");
      localStorage.removeItem("periodTest");

      this.$router.push({ path: "/login" });
    },
  },
  created() {
    this.userAvatarUrl = localStorage.getItem("userAvatarUrl");
    this.userName = localStorage.getItem("userName");
  },
};
</script>
