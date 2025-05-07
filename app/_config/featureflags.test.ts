import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("Feature Flags", () => {
  const originalEnv = { ...process.env };

  // Clean up environment variables between tests
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("isFeatureEnabled function", () => {
    it("should return true when feature is in ENABLED_FEATURES list", async () => {
      process.env.ENABLED_FEATURES = "backend_validation,analytics";

      // Need to re-import to get updated env vars
      const { isFeatureEnabled } = await import("./featureflags");

      expect(isFeatureEnabled("backend_validation")).toBe(true);
    });

    it("should handle whitespace in ENABLED_FEATURES list", async () => {
      process.env.ENABLED_FEATURES = "backend_validation, analytics, ";

      // Need to re-import to get updated env vars
      const { isFeatureEnabled } = await import("./featureflags");

      expect(isFeatureEnabled("backend_validation")).toBe(true);
    });
  });
});
