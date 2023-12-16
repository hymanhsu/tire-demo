/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
}

module.exports = nextConfig
