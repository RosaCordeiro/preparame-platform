/**
 * Regras do Admin: companyId válido e feedback pós-importação do dash.
 * Extraído para teste automatizado (evita /companies/config/null e toast enganoso).
 */

function hasValidCompanyId(companyId) {
  return (
    companyId !== undefined &&
    companyId !== null &&
    companyId !== "" &&
    companyId !== "null" &&
    companyId !== "undefined"
  );
}

/**
 * @param {{ success?: number, errors?: unknown[] }} result
 * @returns {{
 *   successCount: number,
 *   errorCount: number,
 *   shouldRefreshDashboard: boolean,
 *   notifyType: 'positive' | 'warning' | 'negative' | null,
 *   notifyMessage: string | null
 * }}
 */
function resolveImportOutcome(result) {
  const successCount = Number(result && result.success) || 0;
  const errorCount = Array.isArray(result && result.errors)
    ? result.errors.length
    : 0;

  if (successCount > 0) {
    return {
      successCount,
      errorCount,
      shouldRefreshDashboard: true,
      notifyType: "positive",
      notifyMessage: `Importação concluída! ${successCount} registros processados.`,
    };
  }

  if (errorCount > 0) {
    return {
      successCount,
      errorCount,
      shouldRefreshDashboard: false,
      notifyType: "warning",
      notifyMessage: `Nenhum registro importado. ${errorCount} erro(s) na planilha.`,
    };
  }

  return {
    successCount,
    errorCount,
    shouldRefreshDashboard: false,
    notifyType: "negative",
    notifyMessage: "Nenhum registro importado.",
  };
}

/** Refresh do Admin nunca deve forçar companyId nulo (path literal "null"). */
function shouldClearCompanyIdOnDashboardRefresh() {
  return false;
}

module.exports = {
  hasValidCompanyId,
  resolveImportOutcome,
  shouldClearCompanyIdOnDashboardRefresh,
};
