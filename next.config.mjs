import nextra from "nextra";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true // mandatory, otherwise won't export
  }
};

const withNextra = nextra({
  latex: { renderer: 'mathjax' },
  search: {
    codeblocks: false,
  }
});

export default withNextra({
  ...nextConfig,
  reactStrictMode: false,
});
