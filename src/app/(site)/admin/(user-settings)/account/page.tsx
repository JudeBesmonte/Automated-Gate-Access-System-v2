import { PageBreadcrumb, PageContainer } from "@/core/components/ui/page"

import { AccountCard } from "@/features/user-settings/components/account-card"

export default function Account() {
	const breadcrumbItems = [{ label: "Settings" }, { label: "Account" }]
	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />

			<PageContainer>
				<AccountCard />
			</PageContainer>
		</>
	)
}
