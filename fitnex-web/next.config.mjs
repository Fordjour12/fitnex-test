import createJiti from "jiti";
import { fileURLToPath } from "node:url";
const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./env/server.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
				pathname: "/fitnex-image-121/**",
			},
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
				pathname: "/fitnex-video-131/**",
			},
		],
	},
};

export default nextConfig;
