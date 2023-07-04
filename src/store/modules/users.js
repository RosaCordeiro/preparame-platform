import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: null,
    auth: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.auth = !!user;

      if (user) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("refresh_token", user.refresh_token);
        localStorage.setItem("userAvatarUrl", user.user.avatarUrl);
        localStorage.setItem("userName", user.user.name);
        localStorage.setItem("userEmail", user.user.email);
        localStorage.setItem("userId", user.user.id);
        localStorage.setItem("userType", user.user.type.value);
        localStorage.setItem("surveyAnswered", user.user.surveyAnswered);
        localStorage.setItem("laborRiskAlert", user.user.laborRiskAlert.value);
        localStorage.setItem("companyId", user.user.companyId);
        localStorage.setItem("createdAt", user.user.created_at);
        localStorage.setItem("expiresDate", user.user.expiresDate);
        localStorage.setItem("periodTest", user.user.periodTest);
        localStorage.setItem("logged", true);
        localStorage.setItem("surveyPopupShowed", false);
        localStorage.setItem("subscribeToken", user.user.subscribeToken);
      } else {
        delete axios.defaults.headers.common["Authorization"];

        localStorage.setItem("logged", false);
      }
    },
    setUserDates(state, user) {
      if (user) {
        localStorage.setItem("expiresDate", user.expiresDate);
        localStorage.setItem("periodTest", user.periodTest);
      }
    },
  },
  actions: {
    setUser(state, payload) {
      state.commit("setUser", payload);
    },
    setUserDates(state, payload) {
      state.commit("setUserDates", payload);
    },
  },
};
