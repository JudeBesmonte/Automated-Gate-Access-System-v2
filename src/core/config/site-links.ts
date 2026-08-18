import { CreditCardIcon, UsersIcon } from "lucide-react"
import { LuChartLine, LuHouse, LuTicket, LuUser } from "react-icons/lu"

export const adminLinks = {
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
