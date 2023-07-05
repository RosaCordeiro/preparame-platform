import { Notify } from "quasar";

export const userKey = "__knowledge_user";

var baseApiUrlDefinition = "";

// if (process.env.NODE_ENV && process.env.NODE_ENV == 'development') {
//baseApiUrlDefinition = "https://api.preparame.homolog.inf.br";
//baseApiUrlDefinition = "http://localhost:3334";
// } else {
baseApiUrlDefinition = "https://api.prepara.me";
// }

export const baseApiUrl = baseApiUrlDefinition;

export function showError(e) {
  if (e && e.response && e.response.data && e.response.data.message) {
    Notify.create({ type: "error", message: e.response.data.message });
    console.log(e.response.data.message);
  } else if (e && e.response && e.response.data) {
    Notify.create({ type: "error", message: e.response.data });
    console.log(e.response.data);
  } else if (typeof e === "string") {
    Notify.create({ type: "error", message: e });
    console.log(e);
  } else {
    Notify.create({ type: "error" });
    console.log("error");
  }

  return false;
}

export function showSucess(e) {
  Notify.create({ type: "success", message: e });
  return true;
}

export default { baseApiUrl, showError };
