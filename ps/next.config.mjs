/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [],
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name][ext]',
        },
      });
      return config;
    },
  };
  
  export default nextConfig;