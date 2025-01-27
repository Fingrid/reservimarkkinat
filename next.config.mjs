import nextra from "nextra";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  assetPrefix: isProd ? '/resurssimarkkinat-dev' : '',
  basePath: isProd ? '/resurssimarkkinat-dev' : '',
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
