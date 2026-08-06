/**
 * Extrai o primeiro nome de um nome completo para saudações.
 * @param {string|null|undefined} fullName
 * @param {string} [fallback="Usuário"]
 * @returns {string}
 */
export function firstNameFromFullName(fullName, fallback = "Usuário") {
  const full = String(fullName || "").trim();
  if (!full) return fallback;
  return full.split(/\s+/)[0];
}
