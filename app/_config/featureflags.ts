import { FeatureFlags as RuntimeFeatureFlags } from "../_store/featureFlagsStore";

export type FeatureFlag = "backend_validation";

/**
 * For server components, it will parse the environment variable directly.
 * For client components, defer to the runtime feature flags from the store.
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

export const isFeatureEnabled = (feature: FeatureFlag): boolean => {
  if (typeof window !== "undefined") {
    return RuntimeFeatureFlags.backendValidation;
  }
  
  return enabledFeatures.has(feature);
};

export const FeatureFlags = {
  get backendValidation() {
    if (typeof window !== "undefined") {
      return RuntimeFeatureFlags.backendValidation;
    }
    return isFeatureEnabled("backend_validation");
  },
};
