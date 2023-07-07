/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: [
			"@prisma/client",
			"@auth/prisma-adapter",
			"@types/bcrypt",
			"bcrypt",
			"mongoose",
		],
	},
};

module.exports = nextConfig;
