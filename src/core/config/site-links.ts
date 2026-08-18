import { CreditCardIcon, UsersIcon } from "lucide-react"
import { LuChartLine, LuHouse, LuTicket, LuUser } from "react-icons/lu"

type NavRoute = {
	title: string
	url: string
	icon: React.ComponentType
	isActive?: boolean
	items?: { title: string; url: string }[]
}

export const adminLinks: {
	overview: { label: string; routes: NavRoute[] }
	services: { label: string; routes: NavRoute[] }
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
	services: {
		label: "Services",
		routes: [
			{
				title: "Plans",
				url: "/admin/plans",
				icon: LuChartLine
			},
			{
				title: "Subscriptions",
				url: "/admin/subscriptions",
				icon: CreditCardIcon
			}
		]
	},
	customer: {
		label: "Customer Management",
		routes: [
			{
				title: "Clients",
				url: "/admin/clients",
				icon: LuUser,
				isActive: true,
				items: [
					{
						title: "Payment History",
						url: "/admin/payment-history"
					},
					{
						title: "Invoices",
						url: "/admin/invoices"
					}
				]
			},
			{
				title: "Tickets",
				url: "/admin/tickets",
				icon: LuTicket
			}
		]
	}
}
