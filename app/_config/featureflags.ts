export type FeatureFlag = "backend_validation";

/**
 * Parses the consolidated ENABLED_FEATURES environment variable
 * Format: comma-separated list of features, e.g. "backend_validation,advanced_filtering"
 */
const parseEnabledFeatures = (): Set<string> => {
  const enabledFeatures = process.env.ENABLED_FEATURES || "";
  return new Set(
    enabledFeatures
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean),
  );
};

const enabledFeatures = parseEnabledFeatures();
export const isFeatureEnabled = (feature: FeatureFlag): boolean =>
  enabledFeatures.has(feature);

/**
 * Helper object to access all feature flags directly
 */
export const FeatureFlags = {
  backendValidation: isFeatureEnabled("backend_validation"),
};
