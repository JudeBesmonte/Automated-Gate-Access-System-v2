import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { PaymentDashboard } from "@/features/payment-history/components/payment-dashboard"

export default function Page() {
	const breadcrumbItems = [{ label: "Payment History" }]
	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />
			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Payment History</PageHeaderTitle>
					<PageHeaderDescription>
						View past payments and review the history of client payments
					</PageHeaderDescription>
				</PageHeader>
				<PageContent>
					<PaymentDashboard></PaymentDashboard>
				</PageContent>
			</PageContainer>
		</>
	)
}
