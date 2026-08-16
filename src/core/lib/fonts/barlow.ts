import localFont from "next/font/local"

export const barlow = localFont({
	src: [
		{
			path: "./barlow/Barlow-Black.ttf",
			weight: "900",
			style: "normal"
		},
		{
			path: "./barlow/Barlow-BlackItalic.ttf",
			weight: "900",
			style: "italic"
		},
		{
			path: "./barlow/Barlow-ExtraBold.ttf",
			weight: "800",
			style: "normal"
		},
		{
			path: "./barlow/Barlow-ExtraBoldItalic.ttf",
			weight: "800",
			style: "italic"
		},
		{
			path: "./barlow/Barlow-Bold.ttf",
			weight: "700",
			style: "normal"
		},
		{
			path: "./barlow/Barlow-BoldItalic.ttf",
			weight: "700",
			style: "italic"
		},
		{
			path: "./barlow/Barlow-SemiBold.ttf",
			weight: "600",
			style: "normal"
		},
		{
			path: "./barlow/Barlow-SemiBoldItalic.ttf",
			weight: "600",
			style: "italic"
		},
		{
			path: "./barlow/Barlow-Medium.ttf",
			weight: "500",
			style: "normal"
		},
		{
			path: "./barlow/Barlow-MediumItalic.ttf",
			weight: "500",
			style: "italic"
		},
		{
			path: "./barlow/Barlow-Regular.ttf",
			weight: "400",
			style: "normal"
		},
		{
			path: "./barlow/Barlow-Italic.ttf",
			weight: "400",
			style: "italic"
		},
		{
			path: "./barlow/Barlow-Light.ttf",
			weight: "300",
			style: "normal"
		},
		{
			path: "./barlow/Barlow-LightItalic.ttf",
			weight: "300",
			style: "italic"
		},
		{
			path: "./barlow/Barlow-ExtraLight.ttf",
			weight: "200",
			style: "normal"
		},
		{
			path: "./barlow/Barlow-ExtraLightItalic.ttf",
			weight: "200",
			style: "italic"
		},
		{
			path: "./barlow/Barlow-Thin.ttf",
			weight: "100",
			style: "normal"
		},
		{
			path: "./barlow/Barlow-ThinItalic.ttf",
			weight: "100",
			style: "italic"
		}
	],
	variable: "--font-barlow",
	display: "swap"
})
