/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: [
            "@prisma/client",
            "@auth/prisma-adapter",
            "@types/bcrypt",
            "bcrypt",
        ],
    },

    // This is config for adding images to site using the <Image /> component (better performance)
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
                port: '3000',
                pathname: '/images?q=tbn:ANd9GcTRcxxGDQ0zFHRGv6IDse2hxCdhZrrrm7RIzg&usqp=CAU',
            }
        ]
    }
};

module.exports = nextConfig;
