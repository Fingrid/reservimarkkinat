import nextra from "nextra";

const EXPORT_STANDALONE = process?.env?.EXPORT_STANDALONE === "true";

const nextConfig = EXPORT_STANDALONE ? {
  output: "standalone",
} : {
  output: "export",
  images: {
    unoptimized: true, // mandatory, otherwise won't export
  },
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
