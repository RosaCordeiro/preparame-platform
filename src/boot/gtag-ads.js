// src/boot/gtag-ads.js
import Vue from "vue";

const ADS_ID = "AW-304198855";

// garante existência das globals (se o script ainda não carregou)
if (!window.dataLayer) window.dataLayer = [];
if (!window.gtag) {
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
}

// inicializa (sem enviar page_view automático; SPA manda manualmente)
window.gtag("js", new Date());
window.gtag("config", ADS_ID, { send_page_view: false });

// Helpers
const gAds = {
  event(name, params = {}) {
    if (window.gtag) window.gtag("event", name, params);
  },
  conversion(label, value, currency = "BRL") {
    if (!label || !window.gtag) return;
    const payload = { send_to: `${ADS_ID}/${label}` };
    if (value != null) {
      payload.value = value;
      payload.currency = currency;
    }
    window.gtag("event", "conversion", payload);
  },
};

// Disponibiliza em toda a app
Vue.prototype.$gtag = (...args) => window.gtag && window.gtag(...args);
Vue.prototype.$gAds = gAds;

export default ({ router }) => {
  // Dispara page_view a cada navegação (SPA)
  router.afterEach((to) => {
    if (!window.gtag) return;
    // pageview via config (recomendado)
    if (process.env.DEV) {
      console.log("gtag page_view", to.fullPath);
    }

    window.gtag("config", ADS_ID, { page_path: to.fullPath });
    // opcional: também enviar um event page_view explícito
    window.gtag("event", "page_view", { page_path: to.fullPath });
  });
};
