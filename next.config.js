/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		PROD_API_URL: process.env.PROD_API_URL,
    DEV_API_URL: process.env.DEV_API_URL,
    MODE: process.env.NODE_ENV,
	},
};

module.exports = nextConfig;
