import nextra from "nextra";
import { type NextConfig } from "next";

type KepoNextConfig = NextConfig & {
  env: {
    // Making this available in the client
    ENABLED_FEATURES: string | undefined;
  };
};
const nextConfig: KepoNextConfig = {
  output: "standalone",
  env: {
    ENABLED_FEATURES: process?.env?.ENABLED_FEATURES,
  },
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
