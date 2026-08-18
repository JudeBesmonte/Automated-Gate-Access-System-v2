import { UsersIcon } from "lucide-react"
import { LuHouse, LuTicket } from "react-icons/lu"

type NavRoute = {
	title: string
	url: string
	icon: React.ComponentType
	isActive?: boolean
	items?: { title: string; url: string }[]
}

export const adminLinks: {
	overview: { label: string; routes: NavRoute[] }
	customer: { label: string; routes: NavRoute[] }
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
			}
		]
	},
	customer: {
		label: "Customer Management",
		routes: [
			{
				title: "Tickets",
				url: "/admin/tickets",
				icon: LuTicket
			}
		]
	}
}

