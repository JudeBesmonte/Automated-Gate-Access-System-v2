import localFont from "next/font/local"

export const montserrat = localFont({
	src: [
		{
			path: "./montserrat/Montserrat-Black.ttf",
			weight: "900",
			style: "normal"
		},
		{
			path: "./montserrat/Montserrat-BlackItalic.ttf",
			weight: "900",
			style: "italic"
		},
		{
			path: "./montserrat/Montserrat-ExtraBold.ttf",
			weight: "800",
			style: "normal"
		},
		{
			path: "./montserrat/Montserrat-ExtraBoldItalic.ttf",
			weight: "800",
			style: "italic"
		},
		{
			path: "./montserrat/Montserrat-Bold.ttf",
			weight: "700",
			style: "normal"
		},
		{
			path: "./montserrat/Montserrat-BoldItalic.ttf",
			weight: "700",
			style: "italic"
		},
		{
			path: "./montserrat/Montserrat-SemiBold.ttf",
			weight: "600",
			style: "normal"
		},
		{
			path: "./montserrat/Montserrat-SemiBoldItalic.ttf",
			weight: "600",
			style: "italic"
		},
		{
			path: "./montserrat/Montserrat-Medium.ttf",
			weight: "500",
			style: "normal"
		},
		{
			path: "./montserrat/Montserrat-MediumItalic.ttf",
			weight: "500",
			style: "italic"
		},
		{
			path: "./montserrat/Montserrat-Regular.ttf",
			weight: "400",
			style: "normal"
		},
		{
			path: "./montserrat/Montserrat-Italic.ttf",
			weight: "400",
			style: "italic"
		},
		{
			path: "./montserrat/Montserrat-Light.ttf",
			weight: "300",
			style: "normal"
		},
		{
			path: "./montserrat/Montserrat-LightItalic.ttf",
			weight: "300",
			style: "italic"
		},
		{
			path: "./montserrat/Montserrat-ExtraLight.ttf",
			weight: "200",
			style: "normal"
		},
		{
			path: "./montserrat/Montserrat-ExtraLightItalic.ttf",
			weight: "200",
			style: "italic"
		},
		{
			path: "./montserrat/Montserrat-Thin.ttf",
			weight: "100",
			style: "normal"
		},
		{
			path: "./montserrat/Montserrat-ThinItalic.ttf",
			weight: "100",
			style: "italic"
		}
	],
	variable: "--font-montserrat",
	display: "swap"
})
