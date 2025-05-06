import nextra from "nextra";
import { type NextConfig } from "next";

const EXPORT_STANDALONE = process?.env?.EXPORT_STANDALONE === "true";

const AvailableFeatureFlags = [
  'ENABLE_BACKEND_VALIDATION',
] as const;

type FeatureFlags = {[s in (typeof AvailableFeatureFlags)[number]]: string | undefined};

const featureFlags = Object.fromEntries(
  AvailableFeatureFlags.map((flag) => {
    const value = process?.env?.[flag];
    if (value === undefined) {
      return [flag, "false"];
    }
    if (value === "true" || value === "false") {
      return [flag, value];
    }
    throw new Error(`Invalid value for ${flag}: ${value}`);
  })
) as FeatureFlags;

type FeatureFlaggedNextConfig = 
  NextConfig & {
    env: FeatureFlags;
  }

const nextConfig: FeatureFlaggedNextConfig = {
  env: featureFlags,
  ...EXPORT_STANDALONE ? {
    output: "standalone",
  } : {
    output: "export",
    images: {
      unoptimized: true, // mandatory, otherwise won't export
    }
  }
} 

const withNextra = nextra({
  latex: { renderer: "mathjax" },
  search: {
    codeblocks: false,
  },
});

export default withNextra({
  ...nextConfig,
  reactStrictMode: false,
});
