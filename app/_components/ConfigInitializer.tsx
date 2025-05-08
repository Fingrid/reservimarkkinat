"use client";

import { useEffect } from "react";
import { useConfigStore } from "../_store/configStore";

/**
 * This component initializes the configuration store
 * It should be included in the app layout so it runs on every page
 */
export const ConfigInitializer = () => {
  const fetchConfig = useConfigStore((state) => state.fetchConfig);
  const isInitialized = useConfigStore((state) => state.isInitialized);

  useEffect(() => {
    if (!isInitialized) {
      fetchConfig();
    }
  }, [fetchConfig, isInitialized]);

  // This is a utility component that doesn't render anything
  return null;
};
