import nextra from "nextra";

const nextConfig = {
  output: 'export',
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
