const PRODUCTION_API_PATTERN = /^https?:\/\/api\.prepara\.me\/?$/i;

export function isQuickLoginEnabled() {
  const api = String(process.env.API || "").trim();

  if (process.env.ENABLE_QUICK_LOGIN === "false") {
    return false;
  }

  if (PRODUCTION_API_PATTERN.test(api)) {
    return false;
  }

  if (process.env.ENABLE_QUICK_LOGIN === "true") {
    return true;
  }

  return process.env.NODE_ENV !== "production";
}
