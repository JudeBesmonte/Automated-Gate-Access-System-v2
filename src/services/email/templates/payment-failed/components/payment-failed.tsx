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

interface PaymentFailedProps {
	name: string
	email: string
	amount: number
	paymentMethod: string
	transactionId: string
	paymentDate: string
	failureReason?: string
	subscriptionName?: string
}

export const PaymentFailedEmail = ({ 
	name, 
	amount,
	paymentMethod,
	transactionId,
	paymentDate,
	failureReason,
	subscriptionName
}: PaymentFailedProps) => {
	return (
		<Html>
			<Head />
			<Preview>Payment Failed - Action Required</Preview>
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
									background: "linear-gradient(135deg, hsl(0, 65%, 51%) 0%, hsl(15, 70%, 48%) 50%, hsl(30, 75%, 45%) 100%)",
									padding: "32px 32px 24px 32px",
								}}
							>
								<Heading className="text-white text-2xl font-bold mb-2 text-center">
									Payment Failed
								</Heading>
								<EmailText className="text-white/90 text-center text-base mb-0">
									We couldn't process your payment, {name}
								</EmailText>
							</div>

							{/* Content */}
							<div style={{ padding: "32px" }}>
								<EmailText className="text-gray-700 text-base leading-relaxed mb-6 text-center">
									We were unable to process your payment. Please review the details below and try again, 
									or contact our support team for assistance.
								</EmailText>

								{/* Payment Details */}
								<div
									style={{
										backgroundColor: "hsl(0, 20%, 96%)",
										borderRadius: "12px",
										padding: "24px",
										marginBottom: "24px",
										border: "1px solid hsl(0, 20%, 90%)",
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
											<strong>Attempted Date:</strong> {paymentDate}
										</EmailText>
										{subscriptionName && (
											<EmailText className="text-gray-700 mb-2">
												<strong>Subscription:</strong> {subscriptionName}
											</EmailText>
										)}
										{failureReason && (
											<EmailText className="text-gray-700 mb-0">
												<strong>Reason:</strong> <span className="text-red-600">{failureReason}</span>
											</EmailText>
										)}
									</div>
								</div>

								{/* Failure Status */}
								<div
									style={{
										backgroundColor: "hsl(0, 86%, 95%)",
										borderRadius: "12px",
										padding: "20px",
										marginBottom: "24px",
										border: "2px solid hsl(0, 50%, 70%)",
										textAlign: "center",
									}}
								>
									<div
										style={{
											backgroundColor: "hsl(0, 65%, 51%)",
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
										✕
									</div>
									<Heading className="text-red-800 text-lg font-semibold mb-2">
										Payment Declined
									</Heading>
									<EmailText className="text-red-700 mb-0">
										Your payment could not be processed at this time.
									</EmailText>
								</div>

								{/* Next Steps */}
								<div
									style={{
										backgroundColor: "hsl(210, 40%, 96%)",
										borderRadius: "12px",
										padding: "24px",
										marginBottom: "24px",
										border: "1px solid hsl(210, 40%, 90%)",
									}}
								>
									<Heading className="text-gray-800 text-lg font-semibold mb-3 text-center">
										What You Can Do
									</Heading>
									<div style={{ textAlign: "left" }}>
										<EmailText className="text-gray-700 mb-3 flex items-center">
											<span
												style={{
													backgroundColor: "hsl(335, 74.9%, 56.9%)",
													color: "white",
													borderRadius: "50%",
													width: "24px",
													height: "24px",
													display: "inline-block",
													textAlign: "center",
													lineHeight: "24px",
													fontSize: "12px",
													fontWeight: "bold",
													marginRight: "12px",
													verticalAlign: "middle",
												}}
											>
												1
											</span>
											Check your payment information and try again
										</EmailText>
										<EmailText className="text-gray-700 mb-3 flex items-center">
											<span
												style={{
													backgroundColor: "hsl(335, 74.9%, 56.9%)",
													color: "white",
													borderRadius: "50%",
													width: "24px",
													height: "24px",
													display: "inline-block",
													textAlign: "center",
													lineHeight: "24px",
													fontSize: "12px",
													fontWeight: "bold",
													marginRight: "12px",
													verticalAlign: "middle",
												}}
											>
												2
											</span>
											Try using a different payment method
										</EmailText>
										<EmailText className="text-gray-700 mb-0 flex items-center">
											<span
												style={{
													backgroundColor: "hsl(335, 74.9%, 56.9%)",
													color: "white",
													borderRadius: "50%",
													width: "24px",
													height: "24px",
													display: "inline-block",
													textAlign: "center",
													lineHeight: "24px",
													fontSize: "12px",
													fontWeight: "bold",
													marginRight: "12px",
													verticalAlign: "middle",
												}}
											>
												3
											</span>
											Contact your bank or card provider if issues persist
										</EmailText>
									</div>
								</div>

								{/* Action Button */}
								<div style={{ textAlign: "center", marginBottom: "24px" }}>
									<Button
										href="https://qbyfi.com/client/payment"
										style={{
											backgroundColor: "hsl(0, 65%, 51%)",
											color: "white",
											padding: "14px 28px",
											borderRadius: "8px",
											textDecoration: "none",
											fontWeight: "600",
											fontSize: "16px",
											display: "inline-block",
										}}
									>
										Try Payment Again
									</Button>
								</div>

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
										Having trouble? Need assistance with your payment?
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