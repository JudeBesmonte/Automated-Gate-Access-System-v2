import { notFound } from "next/navigation"

import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderDescription,
	PageHeaderTitle
} from "@/core/components/ui/page"
import { getQueryClient } from "@/core/lib/get-query-client"

import { ClientDetail } from "@/features/admin/clients/components/client-detail"
import { clientDetailsOptions } from "@/features/admin/clients/lib/hooks"

export default async function ClientDetailPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const queryClient = getQueryClient()
	const { id } = await params

	void queryClient.prefetchQuery(clientDetailsOptions({ id }))

	const client = await queryClient.fetchQuery(clientDetailsOptions({ id }))

	const breadcrumbItems = [
		{ label: "Client", href: "/admin/client" },
		{ label: client?.name ?? "Client Details" }
	]

	if (!client?.id || !client?.name) notFound()

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />
			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>{client.name}</PageHeaderTitle>
					<PageHeaderDescription>
						{`Manage details, plans, and billing for ${client.name}.`}
					</PageHeaderDescription>
				</PageHeader>
				<PageContent className="w-full">
					<ClientDetail clientId={client.id} />
				</PageContent>
			</PageContainer>
		</>
	)
}
