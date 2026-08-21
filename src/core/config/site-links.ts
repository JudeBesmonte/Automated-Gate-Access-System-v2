import { CameraIcon, CreditCardIcon, IdCardIcon, UsersIcon } from "lucide-react"
import { LuHouse } from "react-icons/lu"

type NavRoute = {
	title: string
	url: string
	icon: React.ComponentType
	isActive?: boolean
	items?: { title: string; url: string }[]
}

export const adminLinks: {
	overview: { label: string; routes: NavRoute[] }
} = {
	overview: {
		label: "Overview",
		routes: [
			{
				title: "Dashboard",
				url: "/admin",
				icon: LuHouse
			},
			{
				title: "Users",
				url: "/admin/users",
				icon: UsersIcon
			},
			{
				title: "RFID Tags",
				url: "/admin/rfid-tags",
				icon: CreditCardIcon
			},
			{
				title: "License Plate",
				url: "/admin/license-plate",
				icon: CameraIcon
			},
			{
				title: "License ID",
				url: "/admin/license-id",
				icon: IdCardIcon
			}
		]
	}
}

