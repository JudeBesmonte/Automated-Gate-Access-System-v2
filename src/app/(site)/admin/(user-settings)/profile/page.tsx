import { PageBreadcrumb, PageContainer } from "@/core/components/ui/page"

import { ProfileCard } from "@/features/user-settings/components/profile-card"

export default function Profile() {
	const breadcrumbItems = [{ label: "Settings" }, { label: "Profile" }]
	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />

			<PageContainer>
				<ProfileCard />
			</PageContainer>
		</>
	)
}
