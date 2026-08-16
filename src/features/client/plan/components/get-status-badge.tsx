import { CheckCheck, Clock, X } from "lucide-react"
import { Badge } from "@/core/components/ui/badge"
export const getStatusBadge = (status: string) => {
  
	switch (status) {
		case "approved":
			return (
				<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
					<CheckCheck className="mr-1 h-3 w-3" />
					Approved
				</Badge>
			)
		case "pending":
			return (
				<Badge className="border-yellow-300 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
					<Clock className="mr-1 h-3 w-3" />
					Pending
				</Badge>
			)
		case "rejected":
			return (
				<Badge className="border-red-300 bg-red-100 text-red-800 hover:bg-red-100">
					<X className="mr-1 h-3 w-3" />
					Rejected
				</Badge>
			)
		default:
			return <Badge>{status}</Badge>
	}
}
