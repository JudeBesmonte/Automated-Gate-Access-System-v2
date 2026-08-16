"use client"

import { SidebarLayout } from "@/core/components/layouts/clientSidebarLayout"

import { PaymentForm } from "@/features/client/payment/components/form/payment-form"
import { Summary } from "@/features/client/payment/components/payment-summary"

export function PaymentPage() {
	return (
		<SidebarLayout showSidebar={true}>
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3">
					<div className="md:col-span-2">
						<PaymentForm />
					</div>
					<Summary />
				</div>
			</div>
		</SidebarLayout>
	)
}

export default PaymentPage
