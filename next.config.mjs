/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.googleusercontent.com',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'marcin-buymeacoffee.s3.amazonaws.com',
				port: '',
			},
		],
	},
};

export default nextConfig;
