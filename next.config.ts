import type { NextConfig } from "next"
import { config } from "dotenv"

config()

module.exports = {
	env: {
		NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
	}
}

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "via.placeholder.com"
			},
			{
				// Gio
				protocol: "https",
				hostname: "zhhzvzshbfkszuzjgulg.supabase.co", // Replace with your Supabase hostname
				port: "", // Leave empty for default HTTPS port
				pathname: "/storage/v1/object/public/**" // Optional: Restrict to specific paths
			},
			{
				// Mac
				protocol: "https",
				hostname: "wcvblzygeolnmnhmjanm.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/**"
			},
			{
				// Jude
				protocol: "https",
				hostname: "fpgkrhcrqpkvmbytcwbh.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/**"
			}
		]
	}
}

export default nextConfig
