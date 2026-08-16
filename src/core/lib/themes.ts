import { MoonIcon, SunIcon, SystemIcon } from "@/core/lib/icons"

export const THEMES = [
	{
		value: "light",
		label: "Light",
		icon: SunIcon
	},
	{
		value: "dark",
		label: "Dark",
		icon: MoonIcon
	},
	{
		value: "system",
		label: "System",
		icon: SystemIcon
	}
] as const
