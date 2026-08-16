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

interface SubscriptionRequestProps {
	name: string
	email: string
	planName: string
	price: number
	subscriptionId: string
}

export const SubscriptionRequestEmail = ({ 
	name, 
	planName, 
	price, 
	subscriptionId 
}: SubscriptionRequestProps) => {
	return (
		<Html>
			<Head />
			<Preview>Subscription Request Received - We're Processing Your Request!</Preview>
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
									background: "linear-gradient(135deg, hsl(335, 74.9%, 56.9%) 0%, hsl(320, 65%, 52%) 50%, hsl(310, 70%, 58%) 100%)",
									padding: "32px 32px 24px 32px",
								}}
							>
								<Heading className="text-white text-2xl font-bold mb-2 text-center">
									Request Received!
								</Heading>
								<EmailText className="text-white/90 text-center text-base mb-0">
									Hi {name}, we've received your subscription request
								</EmailText>
							</div>

							{/* Content */}
							<div style={{ padding: "32px" }}>
								<EmailText className="text-gray-700 text-base leading-relaxed mb-6 text-center">
									Thank you for choosing QBYFI! We've received your subscription request for {planName} and 
									our team is now processing it.
								</EmailText>

								{/* Request Details */}
								<div
									style={{
										backgroundColor: "hsl(340, 20%, 96%)",
										borderRadius: "12px",
										padding: "24px",
										marginBottom: "24px",
										border: "1px solid hsl(335, 20%, 90%)",
									}}
								>
									<Heading className="text-gray-800 text-lg font-semibold mb-4 text-center">
										Request Details
									</Heading>
									<div style={{ textAlign: "left" }}>
										<EmailText className="text-gray-700 mb-2">
											<strong>Plan:</strong> {planName}
										</EmailText>
										<EmailText className="text-gray-700 mb-2">
											<strong>Price:</strong> ₱{price.toLocaleString()}
										</EmailText>
										<EmailText className="text-gray-700 mb-2">
											<strong>Status:</strong> <span className="text-primary font-semibold">Processing</span>
										</EmailText>
										<EmailText className="text-gray-700 mb-0">
											<strong>Request ID:</strong> <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{subscriptionId}</span>
										</EmailText>
									</div>
								</div>

								{/* What's Next Steps */}
								<div
									style={{
										backgroundColor: "hsl(200, 20%, 96%)",
										borderRadius: "12px",
										padding: "24px",
										marginBottom: "24px",
										border: "1px solid hsl(200, 20%, 90%)",
									}}
								>
									<Heading className="text-gray-800 text-lg font-semibold mb-3 text-center">
										What Happens Next?
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
											Our team will review your subscription request
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
											We'll verify your information and process payment
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
												3
											</span>
											You'll receive a confirmation email once approved
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
												4
											</span>
											Our team will contact you for installation scheduling
										</EmailText>
									</div>
								</div>

								{/* Processing Time Notice */}
								<div
									style={{
										backgroundColor: "hsl(45, 86%, 95%)",
										borderRadius: "12px",
										padding: "20px",
										marginBottom: "24px",
										border: "1px solid hsl(45, 86%, 85%)",
									}}
								>
									<EmailText className="text-gray-700 text-center mb-0">
										<span style={{ fontSize: "18px", marginRight: "8px" }}>⏱️</span>
										<strong>Processing Time:</strong> We typically process subscription requests within 1-2 business days. 
										You'll receive updates via email.
									</EmailText>
								</div>

								{/* CTA Button */}
								{/* <div style={{ textAlign: "center" }}>
									<Button
										href="https://your-domain.com/dashboard"
										style={{
											backgroundColor: "hsl(335, 74.9%, 56.9%)",
											color: "white",
											padding: "14px 32px",
											borderRadius: "8px",
											fontWeight: "600",
											fontSize: "16px",
											textDecoration: "none",
											display: "inline-block",
											border: "none",
											cursor: "pointer",
											boxShadow: "0 4px 14px 0 rgba(219, 39, 119, 0.3)",
										}}
									>
										View Request Status
									</Button>
								</div> */}
							</div>
						</Section>

						{/* Footer */}
						<Section className="text-center">
							<EmailText className="text-gray-500 text-sm mb-3">
								Questions about your request? Our support team is here to help.
							</EmailText>
							<EmailText className="text-gray-400 text-xs mb-0">© 2024 QBYFI. All rights reserved.</EmailText>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}

export default SubscriptionRequestEmail 