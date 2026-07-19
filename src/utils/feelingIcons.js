/* eslint-disable global-require */
const ICON_BY_TOKEN = {
  alegre: require("../assets/icons/alegre.png"),
  aliviado: require("../assets/icons/aliviado.png"),
  alivio: require("../assets/icons/aliviado.png"),
  bravo: require("../assets/icons/bravo.png"),
  raiva: require("../assets/icons/bravo.png"),
  desesperado: require("../assets/icons/desesperado.png"),
  desespero: require("../assets/icons/desesperado.png"),
  indiferente: require("../assets/icons/indiferente.png"),
  indiferenca: require("../assets/icons/indiferente.png"),
  injusticado: require("../assets/icons/injusticado.png"),
  injustica: require("../assets/icons/injusticado.png"),
  inseguro: require("../assets/icons/inseguro.png"),
  inseguranca: require("../assets/icons/inseguro.png"),
  surpreso: require("../assets/icons/surpreso.png"),
  surpresa: require("../assets/icons/surpreso.png"),
  triste: require("../assets/icons/triste.png"),
  tristeza: require("../assets/icons/triste.png"),
};

const FEELING_MDI_FALLBACK = {
  alegre: "mdi-emoticon-happy-outline",
  aliviado: "mdi-emoticon-excited-outline",
  alivio: "mdi-emoticon-excited-outline",
  bravo: "mdi-emoticon-angry-outline",
  raiva: "mdi-emoticon-angry-outline",
  desesperado: "mdi-emoticon-frown-outline",
  desespero: "mdi-emoticon-frown-outline",
  indiferente: "mdi-emoticon-neutral-outline",
  indiferenca: "mdi-emoticon-neutral-outline",
  injusticado: "mdi-gavel",
  injustica: "mdi-gavel",
  inseguro: "mdi-emoticon-confused-outline",
  inseguranca: "mdi-emoticon-confused-outline",
  surpreso: "mdi-emoticon-surprised-outline",
  surpresa: "mdi-emoticon-surprised-outline",
  triste: "mdi-emoticon-sad-outline",
  tristeza: "mdi-emoticon-sad-outline",
};

const FEELING_ACCENT = {
  alegre: "#15aa7c",
  aliviado: "#15aa7c",
  alivio: "#15aa7c",
  bravo: "#e35d5d",
  raiva: "#e35d5d",
  desesperado: "#c44b6a",
  desespero: "#c44b6a",
  indiferente: "#99a5b8",
  indiferenca: "#99a5b8",
  injusticado: "#d97706",
  injustica: "#d97706",
  inseguro: "#7c6cf0",
  inseguranca: "#7c6cf0",
  surpreso: "#3b82f6",
  surpresa: "#3b82f6",
  triste: "#667998",
  tristeza: "#667998",
};

function normalizeFeelingKey(feeling) {
  if (!feeling) {
    return "";
  }

  return String(feeling)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(".")[0]
    .split("(")[0]
    .trim()
    .replace(/\s+/g, " ");
}

function resolveFeelingToken(feeling) {
  const key = normalizeFeelingKey(feeling);

  if (!key) {
    return "";
  }

  if (ICON_BY_TOKEN[key]) {
    return key;
  }

  const firstWord = key.split(" ")[0];

  if (ICON_BY_TOKEN[firstWord]) {
    return firstWord;
  }

  const matched = Object.keys(ICON_BY_TOKEN).find((token) => key.includes(token));

  return matched || firstWord;
}

export function getFeelingIconSrc(feeling) {
  const token = resolveFeelingToken(feeling);

  return ICON_BY_TOKEN[token] || null;
}

export function getFeelingMdiIcon(feeling) {
  const token = resolveFeelingToken(feeling);

  return FEELING_MDI_FALLBACK[token] || "mdi-emoticon-outline";
}

export function getFeelingAccent(feeling) {
  const token = resolveFeelingToken(feeling);

  return FEELING_ACCENT[token] || "#15aa7c";
}

export function formatFeelingKey(feeling) {
  return normalizeFeelingKey(feeling);
}
