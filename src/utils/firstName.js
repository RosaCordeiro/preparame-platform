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

/**
 * Title Case por palavra: "JOÃO DA SILVA" → "João Da Silva".
 * @param {string|null|undefined} fullName
 * @returns {string}
 */
export function toTitleCasePersonName(fullName) {
  const full = String(fullName || "").trim();
  if (!full) {
    return "";
  }

  return full
    .toLocaleLowerCase("pt-BR")
    .split(/\s+/)
    .map((word) => {
      if (!word) {
        return word;
      }

      return word.charAt(0).toLocaleUpperCase("pt-BR") + word.slice(1);
    })
    .join(" ");
}
