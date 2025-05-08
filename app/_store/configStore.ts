"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type ConfigState = {
  // State
  source: string | null;
  featureFlags: Set<string>;
  config: Record<string, unknown>;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;

  // Actions
  fetchConfig: () => Promise<void>;
  isFeatureEnabled: (feature: string) => boolean;
  getConfigValue: <T>(key: string, defaultValue?: T) => T | undefined;
};

const initialState = {
  source: null,
  featureFlags: new Set<string>(),
  config: {},
  isLoading: false,
  error: null,
  isInitialized: false,
};

const configAPIEndpoint = "/api/config";

export const useConfigStore = create<ConfigState>()(
  immer((set, get) => ({
    ...initialState,

    // Actions
    fetchConfig: async () => {
      if (get().isLoading) return;
      if (get().isInitialized && !get().error) return;

      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        const response = await fetch(configAPIEndpoint);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch configuration: ${response.statusText}`,
          );
        }

        const data = await response.json();

        const enabledFeatures = new Set<string>(
          (data.feature_flags || "")
            .split(",")
            .map((f: string) => f.trim())
            .filter(Boolean),
        );

        set((state) => {
          state.source = data.source;
          state.featureFlags = enabledFeatures;
          state.config = data.config || {};
          state.isLoading = false;
          state.isInitialized = true;
        });
      } catch (error) {
        console.error("Failed to fetch configuration:", error);
        set((state) => {
          state.error = error instanceof Error ? error.message : String(error);
          state.isLoading = false;
        });
      }
    },

    isFeatureEnabled: (feature) => {
      return get().featureFlags.has(feature);
    },

    getConfigValue: <T>(key: string, defaultValue?: T): T | undefined => {
      const config = get().config;
      return key in config ? (config[key] as T | undefined) : defaultValue;
    },
  })),
);

export const Config = {
  get backendValidation() {
    return useConfigStore.getState().isFeatureEnabled("backend_validation");
  },

  get apiBaseUrl() {
    return useConfigStore.getState().getConfigValue<string>("api_base_url", "");
  },

  get appName() {
    return useConfigStore
      .getState()
      .getConfigValue<string>("app_name", "Fingrid Developer Portal");
  },
};
