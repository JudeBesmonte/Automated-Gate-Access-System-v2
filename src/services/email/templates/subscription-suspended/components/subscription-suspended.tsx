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

interface SubscriptionSuspendedProps {
	name: string
	email: string
	planName: string
	price: number
	subscriptionId: string
	suspensionDate: string
	reason?: string
}

export const SubscriptionSuspendedEmail = ({ 
	name, 
	planName, 
	price, 
	subscriptionId,
	suspensionDate,
	reason = "Account review required"
}: SubscriptionSuspendedProps) => {
	return (
		<Html>
			<Head />
			<Preview>Service Suspended - {planName} Temporarily Unavailable</Preview>
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
									background: "linear-gradient(135deg, hsl(38, 92%, 50%) 0%, hsl(45, 90%, 45%) 50%, hsl(52, 85%, 55%) 100%)",
									padding: "32px 32px 24px 32px",
								}}
							>
								<Heading className="text-white text-2xl font-bold mb-2 text-center">
									Service Temporarily Suspended
								</Heading>
								<EmailText className="text-white/90 text-center text-base mb-0">
									Your {planName} service has been paused, {name}
								</EmailText>
							</div>

							{/* Content */}
							<div style={{ padding: "32px" }}>
								<EmailText className="text-gray-700 text-base leading-relaxed mb-6 text-center">
									We're writing to inform you that your QBYFI subscription has been temporarily suspended. 
									This is usually a temporary measure, and we're here to help you restore your service quickly.
								</EmailText>

								{/* Suspension Details */}
								<div
									style={{
										backgroundColor: "hsl(45, 20%, 96%)",
										borderRadius: "12px",
										padding: "24px",
										marginBottom: "24px",
										border: "1px solid hsl(45, 20%, 90%)",
									}}
								>
									<Heading className="text-gray-800 text-lg font-semibold mb-4 text-center">
										Suspension Details
									</Heading>
									<div style={{ textAlign: "left" }}>
										<EmailText className="text-gray-700 mb-2">
											<strong>Plan:</strong> {planName}
										</EmailText>
										<EmailText className="text-gray-700 mb-2">
											<strong>Monthly Rate:</strong> ₱{price.toLocaleString()}
										</EmailText>
										<EmailText className="text-gray-700 mb-2">
											<strong>Status:</strong> <span className="text-orange-600 font-semibold">Suspended</span>
										</EmailText>
										<EmailText className="text-gray-700 mb-2">
											<strong>Suspension Date:</strong> {suspensionDate}
										</EmailText>
										<EmailText className="text-gray-700 mb-2">
											<strong>Reason:</strong> {reason}
										</EmailText>
										<EmailText className="text-gray-700 mb-0">
											<strong>Subscription ID:</strong> <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{subscriptionId}</span>
										</EmailText>
									</div>
								</div>

								{/* What This Means */}
								<div
									style={{
										backgroundColor: "hsl(38, 90%, 96%)",
										borderRadius: "12px",
										padding: "24px",
										marginBottom: "24px",
										border: "1px solid hsl(38, 90%, 85%)",
									}}
								>
									<Heading className="text-gray-800 text-lg font-semibold mb-3 text-center">
										What This Means
									</Heading>
									<div style={{ textAlign: "left" }}>
										<EmailText className="text-gray-700 mb-3 flex items-center">
											<span
												style={{
													backgroundColor: "hsl(38, 92%, 50%)",
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
												⏸
											</span>
											Your internet service is temporarily paused
										</EmailText>
										<EmailText className="text-gray-700 mb-3 flex items-center">
											<span
												style={{
													backgroundColor: "hsl(38, 92%, 50%)",
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
												💰
											</span>
											Billing will be paused during suspension period
										</EmailText>
										<EmailText className="text-gray-700 mb-0 flex items-center">
											<span
												style={{
													backgroundColor: "hsl(38, 92%, 50%)",
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
												🔄
											</span>
											Service can be restored once resolved
										</EmailText>
									</div>
								</div>

								{/* Resolution Steps */}
								<div
									style={{
										backgroundColor: "hsl(142, 86%, 95%)",
										borderRadius: "12px",
										padding: "20px",
										marginBottom: "24px",
										border: "1px solid hsl(142, 86%, 85%)",
									}}
								>
									<EmailText className="text-gray-700 text-center mb-0">
										<span style={{ fontSize: "18px", marginRight: "8px" }}>🛠️</span>
										<strong>Ready to Restore Service?</strong> Contact our support team to resolve this matter 
										and get your internet connection back online as soon as possible.
									</EmailText>
								</div>

								{/* CTA Buttons */}
								{/* <div style={{ textAlign: "center" }}>
									<Button
										href="https://your-domain.com/support"
										className="bg-primary text-white font-semibold py-3 px-8 rounded-lg mr-3 mb-2 inline-block"
										style={{
											backgroundColor: "hsl(335, 74.9%, 56.9%)",
											boxShadow: "0 4px 14px 0 rgba(219, 39, 119, 0.3)",
										}}
									>
										Contact Support
									</Button>
									<Button
										href="https://your-domain.com/dashboard"
										className="bg-white text-primary font-semibold py-3 px-8 rounded-lg border-2 mb-2 inline-block"
										style={{
											color: "hsl(335, 74.9%, 56.9%)",
											borderColor: "hsl(335, 74.9%, 56.9%)",
										}}
									>
										View Account
									</Button>
								</div> */}
							</div>
						</Section>

						{/* Footer */}
						<Section className="text-center">
							<EmailText className="text-gray-500 text-sm mb-3">
								We're committed to resolving this matter quickly. Thank you for your patience.
							</EmailText>
							<EmailText className="text-gray-400 text-xs mb-0">© 2024 QBYFI. All rights reserved.</EmailText>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}

export default SubscriptionSuspendedEmail 