"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type FeatureFlagsState = {
  // State
  source: string | null;
  featureFlags: Set<string>;
  validatorEndpoint: string | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;

  // Actions
  fetchFeatureFlags: () => Promise<void>;
  isFeatureEnabled: (feature: string) => boolean;
};

const initialState = {
  source: null,
  featureFlags: new Set<string>(),
  validatorEndpoint: null,
  isLoading: false,
  error: null,
  isInitialized: false,
};

/**
 * Zustand store for feature flags
 * Fetches feature flags from the API endpoint and provides a way to check if a feature is enabled
 */
export const useFeatureFlagsStore = create<FeatureFlagsState>()(
  immer((set, get) => ({
    ...initialState,

    // Actions
    fetchFeatureFlags: async () => {
      // Prevent multiple fetches in parallel
      if (get().isLoading) return;

      // Don't refetch if already initialized unless there was an error
      if (get().isInitialized && !get().error) return;

      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const response = await fetch("/api/feature-flags");
        if (!response.ok) {
          throw new Error(`Failed to fetch feature flags: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Parse the comma-separated feature flags
        const enabledFeatures = new Set<string>(
          (data.feature_flags || "")
            .split(",")
            .map((f: string) => f.trim())
            .filter(Boolean)
        );

        set((state) => {
          state.source = data.source;
          state.featureFlags = enabledFeatures;
          state.validatorEndpoint = data.validatorEndpoint;
          state.isLoading = false;
          state.isInitialized = true;
        });
      } catch (error) {
        console.error("Failed to fetch feature flags:", error);
        set((state) => {
          state.error = error instanceof Error ? error.message : String(error);
          state.isLoading = false;
        });
      }
    },

    isFeatureEnabled: (feature) => {
      return get().featureFlags.has(feature);
    },
  }))
);

/**
 * Helper object to access all feature flags directly
 * Use this when you need to access feature flags in a component without
 * having to call the store's isFeatureEnabled method
 */
export const FeatureFlags = {
  get backendValidation() {
    return useFeatureFlagsStore.getState().isFeatureEnabled("backend_validation");
  },
  // Add more feature flags here as needed
};
