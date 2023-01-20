/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	env: {
		DEV_API_URL: "http://localhost:3000/api",
		PROD_API_URL: "https://app.ronygedeon.com/api",
	},
};

module.exports = nextConfig;
