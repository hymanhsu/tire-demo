/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    // distDir: 'build',
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
        responseLimit: '8mb',
    },
    // sassOptions: {
    //     includePaths: [path.join(__dirname, 'styles')],
    // },
}

module.exports = nextConfig
