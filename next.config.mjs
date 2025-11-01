/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Add .dna extension support
    config.resolve.extensions.push('.dna');
    
    // Treat .dna files as .tsx files
    config.module.rules.push({
      test: /\.dna$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      ],
    });

    return config;
  },
  // Enable experimental features for DNA-Lang
  experimental: {
    turbo: {
      rules: {
        '*.dna': {
          loaders: ['babel-loader'],
          as: '*.tsx',
        },
      },
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
