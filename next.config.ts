import nextra from "nextra";
import { type NextConfig } from "next";

const EXPORT_STANDALONE = process?.env?.EXPORT_STANDALONE === "true";

type KepoNextConfig = NextConfig & {
  env: {
    // Making this available in the client
    ENABLED_FEATURES: string | undefined;
  };
};
const nextConfig: KepoNextConfig = {
  env: {
    ENABLED_FEATURES: process?.env?.ENABLED_FEATURES,
  },
  ...(EXPORT_STANDALONE
    ? {
        output: "standalone",
      }
    : {
        output: "export",
        images: {
          unoptimized: true, // mandatory, otherwise won't export
        },
      }),
};

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
