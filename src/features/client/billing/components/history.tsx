import { Badge } from "lucide-react"

import { Sidebar } from "@/core/components/nav/client/sidebar-old"

export default function BillingHistoryPage() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<div className="flex flex-col gap-8 md:flex-row">
					<Sidebar />
					{/* Main Content */}
					<div className="flex-1">
						<div className="overflow-hidden rounded-lg border border-zinc-800">
							<InvoiceRow month="December" year="2024" amount="$20.00" />
							<InvoiceRow month="November" year="2024" amount="$20.00" />
							<InvoiceRow month="March" year="2024" amount="$0.00" />
							<InvoiceRow month="February" year="2024" amount="$0.00" />
							<InvoiceRow month="January" year="2024" amount="$0.00" />
							<InvoiceRow month="December" year="2023" amount="$0.00" />
							<InvoiceRow month="November" year="2023" amount="$0.00" />
							<InvoiceRow month="October" year="2023" amount="$0.00" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function InvoiceRow({
	month,
	year,
	amount
}: {
	month: string
	year: string
	amount: string
}) {
	return (
		<div className="border-b border-zinc-800 last:border-b-0">
			<div className="flex items-center justify-between p-4">
				<div>
					<div className="font-medium">
						{month} {year}
					</div>
					<div className="mt-1 flex items-center gap-2">
						<span className="text-sm text-zinc-400">v0 Credits</span>
						<Badge className="rounded-sm bg-green-900 px-2 py-0 text-xs text-green-400 hover:bg-green-900">
							Paid
						</Badge>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div>
						<div className="text-sm text-zinc-400">Total Due</div>
						<div className="font-medium">{amount}</div>
					</div>
					<button className="h-8 w-8 border-none bg-transparent p-0">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="h-4 w-4"
						>
							<circle cx="12" cy="12" r="1" />
							<circle cx="19" cy="12" r="1" />
							<circle cx="5" cy="12" r="1" />
						</svg>
						<span className="sr-only">More options</span>
					</button>
				</div>
			</div>
		</div>
	)
}
