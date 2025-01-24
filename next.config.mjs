import nextra from "nextra";

const nextConfig = {
  output: 'export',
  assetPrefix: isProd ? '/your-repository-name/' : '',
  basePath: isProd ? '/your-repository-name' : '',
  images: {
    unoptimized: true // mandatory, otherwise won't export
  }
}

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  }
});

export default withNextra({
  ...nextConfig,
  reactStrictMode: true,
});
