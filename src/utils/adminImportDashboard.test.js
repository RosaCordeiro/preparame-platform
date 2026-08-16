const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const {
  hasValidCompanyId,
  resolveImportOutcome,
  shouldClearCompanyIdOnDashboardRefresh,
} = require("./adminImportDashboard.js");

describe("hasValidCompanyId", () => {
  it("rejects null / string null / undefined (causa do UUID no path)", () => {
    assert.equal(hasValidCompanyId(null), false);
    assert.equal(hasValidCompanyId("null"), false);
    assert.equal(hasValidCompanyId("undefined"), false);
    assert.equal(hasValidCompanyId(undefined), false);
    assert.equal(hasValidCompanyId(""), false);
  });

  it("accepts TUDO / B2B / B2C / uuid", () => {
    assert.equal(hasValidCompanyId("TUDO"), true);
    assert.equal(hasValidCompanyId("B2B"), true);
    assert.equal(hasValidCompanyId("B2C"), true);
    assert.equal(
      hasValidCompanyId("015bcb2e-5ce4-444c-b0c4-96b864aa735f"),
      true
    );
  });
});

describe("resolveImportOutcome", () => {
  it("refreshes and positive toast only when success > 0", () => {
    const outcome = resolveImportOutcome({ success: 3, errors: [] });
    assert.equal(outcome.shouldRefreshDashboard, true);
    assert.equal(outcome.notifyType, "positive");
    assert.match(outcome.notifyMessage, /3 registros/);
  });

  it("does not refresh on success 0 with row errors (toast enganoso)", () => {
    const outcome = resolveImportOutcome({
      success: 0,
      errors: [{ row: 2, reason: "x" }],
    });
    assert.equal(outcome.shouldRefreshDashboard, false);
    assert.equal(outcome.notifyType, "warning");
    assert.match(outcome.notifyMessage, /Nenhum registro importado/);
  });

  it("does not refresh when success is 0 and no errors", () => {
    const outcome = resolveImportOutcome({ success: 0 });
    assert.equal(outcome.shouldRefreshDashboard, false);
    assert.equal(outcome.notifyType, "negative");
  });
});

describe("shouldClearCompanyIdOnDashboardRefresh", () => {
  it("never clears companyId (evita GET companies/config/null)", () => {
    assert.equal(shouldClearCompanyIdOnDashboardRefresh(), false);
  });
});
