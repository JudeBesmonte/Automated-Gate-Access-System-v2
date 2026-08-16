import type { Metadata } from "next"

import {
	PageBreadcrumb,
	PageContainer,
	PageContent,
	PageHeader,
	PageHeaderTitle
} from "@/core/components/ui/page"

import { ReportIssue } from "@/features/client/report-issue/components/report-issue"

export const metadata: Metadata = {
	title: "Report an Issue",
	description: "Submit a support request and get help from our team"
}

export default function ReportIssuePage() {
	const breadcrumbItems = [
		{ label: "Dashboard", href: "/client" },
		{ label: "Report Issue" }
	]

	return (
		<>
			<PageBreadcrumb items={breadcrumbItems} />
			<PageContainer>
				<PageHeader>
					<PageHeaderTitle>Report an Issue</PageHeaderTitle>
				</PageHeader>
				<PageContent className="w-full">
					<p className="text-muted-foreground mb-6">
						Submit a support request and our team will get back to you as soon as possible
					</p>
					<ReportIssue />
				</PageContent>
			</PageContainer>
		</>
	)
}
