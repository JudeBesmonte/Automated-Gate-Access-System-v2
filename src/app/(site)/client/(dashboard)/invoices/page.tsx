import type { Metadata } from "next"

import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { InvoiceTable } from "@/features/client/invoices/components/invoice-table"

export const metadata: Metadata = {
	title: "Invoices",
	description: "View and manage your invoices"
}

export default function InvoicesPage() {
	const breadcrumbItems = [
		{ label: "Dashboard", href: "/client" },
		{ label: "Invoices" }
	]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />
			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Invoices</PageHeaderTitle>
				</PageHeader>
				<PageContent className="w-full">
					<p className="text-muted-foreground mb-6">
						View and manage your subscription invoices
					</p>
					<InvoiceTable />
				</PageContent>
			</PageContainer>
		</>
	)
}
