<template>
  <div class="row external-user-welcome-card">
    <q-card class="row col-12 external-user-welcome-card-container">
      <q-card-section class="col-12 row external-user-welcome-card-header">
        <div class="external-user-welcome-card-first-msg col-12">
          Olá, {{ userName }}. Seja bem vindo (a)!
        </div>
        <div class="external-user-welcome-card-info col-12">
          <div class="external-user-welcome-card-second-msg q-mt-sm">
            E não se esqueça de sorrir, pois você está com sorte &#129303;
          </div>
          <q-btn
            v-show="false"
            color="accent"
            label="ABRIR BISCOITO DA SORTE"
            class="col self-center q-mt-md"
            size="sm"
          />
        </div>
        <div
          v-show="false"
          class="column external-user-welcome-card-fortune-cookie-container col-6"
        >
          <div class="external-user-welcome-card-fortune-cookie-img"></div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { saveCrud } from "../../../general/crud/utils/saveCrud.js";

export default {
  props: ["products", "interviewSimulator"],
  data() {
    return {
      userAvatarUrl: "",
      userName: "",
      surveyAnswered: false,
      laborRiskAlertDialog: false,
      laborRiskAlert: false,
      simulator: false,
    };
  },
  created() {
    this.userAvatarUrl = localStorage.getItem("userAvatarUrl");

    this.userName = localStorage.getItem("userName");
  },
  mounted() {
    this.surveyAnswered =
      localStorage.getItem("surveyAnswered") == "true" ? true : false;

    this.laborRiskAlert =
      localStorage.getItem("laborRiskAlert") == "ALERT" ? true : false;

    const createdAt = new Date(localStorage.getItem("createdAt"));
    const actualDate = new Date();

    const dayDiff = parseInt(
      ((actualDate - createdAt) / 1000 / 60 / 60 / 24).toFixed(0)
    );

    this.simulator = dayDiff <= 70;
  },
  methods: {
    goUrl: function (url) {
      this.$router.push({ path: `/${url}` });
    },
    laborRiskAlertUpdate: async function () {
      const userUpdate = {
        laborRiskAlert: "ALERT",
      };

      const userUpdated = await saveCrud(
        "users/updateLaborRiskAlert",
        userUpdate,
        "put"
      );

      if (userUpdated.status == 204) {
        localStorage.setItem("laborRiskAlert", "ALERT");

        this.$q.notify({
          type: "success",
          message: "Conversa sobre conciliação solicitada.",
        });

        this.laborRiskAlert = true;
      }
    },
  },
};
</script>

<style lang="scss">
.external-user-welcome-card {
  width: 98vw;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
}

.external-user-welcome-card-container {
  border-radius: 15px;
}

.external-user-welcome-card-container {
  background: linear-gradient(90deg, #c4c7de 0%, #ebc6d5 100%);
}

.external-user-welcome-card-first-msg {
  font-weight: 700;
  font-size: 1.2rem;
  font-family: "Nunito";
  font-style: normal;
  background: linear-gradient(90deg, #1a27b7 0%, #ff4690 40%);
  opacity: 1;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.external-user-welcome-card-second-msg {
  font-weight: 700;
  font-size: 0.9rem;
  font-family: "Nunito";
  font-style: normal;
  color: $text-dark-grey;
}

.external-user-welcome-card-fortune-cookie-img {
  height: 150px;
  width: 95%;
  margin-left: 10px;
  background-color: #ff4690;
}
</style>
