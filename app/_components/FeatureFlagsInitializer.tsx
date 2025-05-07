"use client";

import { useEffect } from "react";
import { useFeatureFlagsStore } from "../_store/featureFlagsStore";

/**
 * This component initializes the feature flags store
 * It should be included in the app layout so it runs on every page
 */
export const FeatureFlagsInitializer = () => {
  const fetchFeatureFlags = useFeatureFlagsStore((state) => state.fetchFeatureFlags);
  const isInitialized = useFeatureFlagsStore((state) => state.isInitialized);

  useEffect(() => {
    if (!isInitialized) {
      fetchFeatureFlags();
    }
  }, [fetchFeatureFlags, isInitialized]);

  // This is a utility component that doesn't render anything
  return null;
};
