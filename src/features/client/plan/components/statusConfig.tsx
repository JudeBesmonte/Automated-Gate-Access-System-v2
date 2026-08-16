import { CheckCircle, Clock, XCircle } from "lucide-react"

export const statusConfig = {
	PENDING: {
		icon: <Clock className="h-4 w-4 text-yellow-500" />,
		color: "bg-blue-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
	},
	FOR_PAYMENT: {
		icon: <Clock className="h-4 w-4 text-purple-500" />,
		color:
			"bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
	},
	FOR_INSTALLATION: {
		icon: <Clock className="h-4 w-4 text-orange-500" />,
		color:
			"bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
	},
	ACTIVE: {
		icon: <CheckCircle className="h-4 w-4 text-green-500" />,
		color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
	},
	SUSPENDED: {
		icon: <XCircle className="h-4 w-4 text-red-500" />,
		color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
	},
	TERMINATED: {
		icon: <XCircle className="h-4 w-4 text-gray-500" />,
		color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
	}
}
