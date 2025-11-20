import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "frame.work",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "static.frame.work",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.prismic.io",
				pathname: "/**",
			},
		],
	},
	/* config options here */
};

export default nextConfig;
