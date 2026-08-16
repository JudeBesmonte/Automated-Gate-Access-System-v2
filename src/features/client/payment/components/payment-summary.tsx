import { Card, CardContent } from "@/core/components/ui/card"

export function Summary() {
	return (
		<Card>
			<CardContent className="p-6">
				<div className="mb-6 flex items-start justify-between">
					<h2 className="text-xl font-semibold">SUMMARY</h2>
				</div>

				<div className="space-y-4">
					<div>
						<p className="text-sm text-muted-foreground">Account No.</p>
						<p>0919102079027</p>
					</div>

					<div>
						<p className="text-sm text-muted-foreground">Service Address</p>
						<p className="text-sm">
							PUROK 1, PNR RD, N/A, BARANGAY 14 (POB.), BACACAY, 4509, ALBAY
						</p>
					</div>

					<div>
						<p className="text-sm text-muted-foreground">Billing Address</p>
						<p className="text-sm">
							PUROK 1, PNR RD, N/A, BARANGAY 14 (POB.), BACACAY, 4509, ALBAY
						</p>
					</div>

					<div>
						<p className="text-sm text-muted-foreground">Contact</p>
						<p>+63 932 428 8744</p>
						<p className="text-sm">miraclequiambao@gmail.com</p>
					</div>

					<div>
						<p className="text-sm text-muted-foreground">
							Monthly Recurring Fee:
						</p>
						<p>FIBER X 1500</p>
					</div>

					<div className="border-t pt-4">
						<div className="flex justify-between">
							<p className="font-semibold">TOTAL</p>
							<p className="font-semibold">₱ 1,500.00</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
