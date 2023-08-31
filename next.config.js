/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
    
        // If client-side, don't polyfill `fs`
        if (!isServer) {
          config.resolve.fallback = {
            fs: false,
            tls: false,
            net: false,
            dns: false, 
            module: false,
            readline: false,
            child_process: false
          };
        }
    
        return config;
      }
}

module.exports = nextConfig
