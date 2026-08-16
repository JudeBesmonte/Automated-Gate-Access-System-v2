import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Section,
	Text as EmailText,
	Tailwind
} from "@react-email/components"

interface PaymentSuccessProps {
	name: string
	email: string
	amount: number
	paymentMethod: string
	transactionId: string
	paymentDate: string
	subscriptionName?: string
}

export const PaymentSuccessEmail = ({ 
	name, 
	amount,
	paymentMethod,
	transactionId,
	paymentDate,
	subscriptionName
}: PaymentSuccessProps) => {
	return (
		<Html>
			<Head />
			<Preview>Payment Confirmed - ₱{amount.toLocaleString()}</Preview>
			<Tailwind
				config={{
					theme: {
						extend: {
							colors: {
								primary: "hsl(335, 74.9%, 56.9%)",
								secondary: "hsl(314.7, 61.6%, 85.7%)",
								background: "hsl(340, 15%, 97%)",
							},
						},
					},
				}}
			>
				<Body style={{ backgroundColor: "hsl(340, 15%, 97%)" }} className="font-sans">
					<Container className="mx-auto py-12 px-6 max-w-xl">
						{/* Logo Section */}
						<Section className="text-center mb-12">
							<Img
								src="https://alawrjgtqkfcbnvrelil.supabase.co/storage/v1/object/public/qbyfi//qbyfi-watermark.png"
								alt="QBYFI Logo"
								width="160"
								height="auto"
								className="mx-auto"
							/>
						</Section>

						{/* Main Content Card */}
						<Section className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden mb-8"
							style={{
								boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
							}}
						>
							{/* Header with gradient */}
							<div
								style={{
									background: "linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(125, 72%, 40%) 50%, hsl(110, 68%, 44%) 100%)",
									padding: "32px 32px 24px 32px",
								}}
							>
								<Heading className="text-white text-2xl font-bold mb-2 text-center">
									Payment Successful!
								</Heading>
								<EmailText className="text-white/90 text-center text-base mb-0">
									Thank you for your payment, {name}!
								</EmailText>
							</div>

							{/* Content */}
							<div style={{ padding: "32px" }}>
								<EmailText className="text-gray-700 text-base leading-relaxed mb-6 text-center">
									Your payment has been successfully processed. Thank you for choosing QBYFI. 
									Here are your payment details:
								</EmailText>

								{/* Payment Details */}
								<div
									style={{
										backgroundColor: "hsl(142, 20%, 96%)",
										borderRadius: "12px",
										padding: "24px",
										marginBottom: "24px",
										border: "1px solid hsl(142, 20%, 90%)",
									}}
								>
									<Heading className="text-gray-800 text-lg font-semibold mb-4 text-center">
										Payment Details
									</Heading>
									<div style={{ textAlign: "left" }}>
										<EmailText className="text-gray-700 mb-2">
											<strong>Amount:</strong> ₱{amount.toLocaleString()}
										</EmailText>
										<EmailText className="text-gray-700 mb-2">
											<strong>Payment Method:</strong> {paymentMethod}
										</EmailText>
										<EmailText className="text-gray-700 mb-2">
											<strong>Transaction ID:</strong> <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{transactionId}</span>
										</EmailText>
										<EmailText className="text-gray-700 mb-2">
											<strong>Payment Date:</strong> {paymentDate}
										</EmailText>
										{subscriptionName && (
											<EmailText className="text-gray-700 mb-0">
												<strong>Subscription:</strong> {subscriptionName}
											</EmailText>
										)}
									</div>
								</div>

								{/* Success Status */}
								<div
									style={{
										backgroundColor: "hsl(142, 86%, 95%)",
										borderRadius: "12px",
										padding: "20px",
										marginBottom: "24px",
										border: "2px solid hsl(142, 50%, 70%)",
										textAlign: "center",
									}}
								>
									<div
										style={{
											backgroundColor: "hsl(142, 76%, 36%)",
											color: "white",
											borderRadius: "50%",
											width: "48px",
											height: "48px",
											display: "inline-block",
											textAlign: "center",
											lineHeight: "48px",
											fontSize: "24px",
											marginBottom: "16px",
										}}
									>
										✓
									</div>
									<Heading className="text-green-800 text-lg font-semibold mb-2">
										Payment Confirmed
									</Heading>
									<EmailText className="text-green-700 mb-0">
										Your payment has been successfully processed and confirmed.
									</EmailText>
								</div>

								{/* Action Button */}
								{/* <div style={{ textAlign: "center", marginBottom: "24px" }}>
									<Button
										href="https://qbyfi.com/client/billing-history"
										style={{
											backgroundColor: "hsl(335, 74.9%, 56.9%)",
											color: "white",
											padding: "14px 28px",
											borderRadius: "8px",
											textDecoration: "none",
											fontWeight: "600",
											fontSize: "16px",
											display: "inline-block",
										}}
									>
										View Payment History
									</Button>
								</div> */}

								{/* Support Section */}
								<div
									style={{
										backgroundColor: "hsl(210, 40%, 96%)",
										borderRadius: "12px",
										padding: "20px",
										textAlign: "center",
									}}
								>
									<EmailText className="text-gray-600 text-sm mb-2">
										Need help? Have questions about your payment?
									</EmailText>
									<EmailText className="text-gray-600 text-sm mb-0">
										Contact our support team at <strong>support@qbyfi.com</strong> or call <strong>(02) 8123-4567</strong>
									</EmailText>
								</div>
							</div>
						</Section>

						{/* Footer */}
						<Section className="text-center">
							<EmailText className="text-gray-500 text-sm mb-2">
								This is an automated message. Please do not reply to this email.
							</EmailText>
							<EmailText className="text-gray-500 text-sm mb-0">
								© 2024 QBYFI. All rights reserved.
							</EmailText>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
} 