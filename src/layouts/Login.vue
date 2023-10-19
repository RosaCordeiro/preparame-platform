<template>
  <div class="login">
    <div class="login-container">
      <Login />
    </div>
  </div>
</template>

<script>
import Login from "./../components/site/general/Login.vue";
import { loginControl } from "./../utils/controls/loginControl.js";

export default {
  components: {
    Login,
  },
  data() {
    return {
      redirectToSurvey: false,
    };
  },
  methods: {
    requestLogin: function () {
      loginControl.loggedFrom = "LOGIN";

      const loginInterval = setInterval(() => {
        if (loginControl.isLogged && loginControl.loggedFrom == "LOGIN") {
          if (sessionStorage.getItem("redirect") != null) {
            this.$router.push(sessionStorage.getItem("redirect"));
            sessionStorage.removeItem("redirect");
          } else {
            this.$router.push("/platform");
          }

          clearInterval(loginInterval);
        }
      }, 100);
    },
  },
  created() {
    this.requestLogin();
  },
};
</script>

<style lang="scss">
.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    90deg,
    rgba(255, 70, 144, 1) 0%,
    rgba(26, 39, 183, 1) 100%
  );
  flex-direction: column;
}
</style>
