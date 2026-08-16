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

interface InstallationScheduledProps {
	name: string
	email: string
	planName: string
	price: number
	subscriptionId: string
	installationDate: string
	siteAddress?: string
	contactNumber: string
}

export const InstallationScheduledEmail = ({ 
	name, 
	planName, 
	price, 
	subscriptionId,
	installationDate,
	siteAddress,
	contactNumber
}: InstallationScheduledProps) => {
	return (
		<Html>
			<Head />
			<Preview>Installation Scheduled - {planName} Setup Confirmed for {installationDate}</Preview>
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
									background: "linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(158, 64%, 52%) 50%, hsl(160, 84%, 39%) 100%)",
									padding: "32px 32px 24px 32px",
								}}
							>
								<Heading className="text-white text-2xl font-bold mb-2 text-center">
									Installation Scheduled!
								</Heading>
								<EmailText className="text-white/90 text-center text-base mb-0">
									Your {planName} installation is confirmed, {name}!
								</EmailText>
							</div>

							{/* Content */}
							<div style={{ padding: "32px" }}>
								<EmailText className="text-gray-700 text-base leading-relaxed mb-6 text-center">
									Great news! We've scheduled your QBYFI installation. Our technical team will visit your location 
									to set up your internet connection and ensure everything is working perfectly.
								</EmailText>

								{/* Installation Details */}
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
										Installation Details
									</Heading>
									<div style={{ textAlign: "left" }}>
										<EmailText className="text-gray-700 mb-2">
											<strong>Plan:</strong> {planName}
										</EmailText>
										<EmailText className="text-gray-700 mb-2">
											<strong>Monthly Rate:</strong> ₱{price.toLocaleString()}
										</EmailText>
										<EmailText className="text-gray-700 mb-2">
											<strong>Installation Date:</strong> <span className="text-green-600 font-semibold">{installationDate}</span>
										</EmailText>
										{siteAddress && (
											<EmailText className="text-gray-700 mb-2">
												<strong>Installation Address:</strong> {siteAddress}
											</EmailText>
										)}
										<EmailText className="text-gray-700 mb-2">
											<strong>Contact Number:</strong> {contactNumber}
										</EmailText>
										<EmailText className="text-gray-700 mb-0">
											<strong>Subscription ID:</strong> <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{subscriptionId}</span>
										</EmailText>
									</div>
								</div>

								{/* What to Expect */}
								<div
									style={{
										backgroundColor: "hsl(200, 86%, 95%)",
										borderRadius: "12px",
										padding: "24px",
										marginBottom: "24px",
										border: "1px solid hsl(200, 86%, 85%)",
									}}
								>
									<Heading className="text-gray-800 text-lg font-semibold mb-3 text-center">
										What to Expect
									</Heading>
									<div style={{ textAlign: "left" }}>
										<EmailText className="text-gray-700 mb-3 flex items-center">
											<span
												style={{
													backgroundColor: "hsl(142, 76%, 36%)",
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
											Our technician will contact you 24 hours before installation
										</EmailText>
										<EmailText className="text-gray-700 mb-3 flex items-center">
											<span
												style={{
													backgroundColor: "hsl(142, 76%, 36%)",
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
											Installation typically takes 2-4 hours to complete
										</EmailText>
										<EmailText className="text-gray-700 mb-0 flex items-center">
											<span
												style={{
													backgroundColor: "hsl(142, 76%, 36%)",
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
											You'll receive network credentials and setup instructions
										</EmailText>
									</div>
								</div>

								{/* Preparation Steps */}
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
										<span style={{ fontSize: "18px", marginRight: "8px" }}>📋</span>
										<strong>Please Prepare:</strong> Ensure someone 18+ is available at the installation address 
										and that the installation area is accessible for our technical team.
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
								Thank you for choosing QBYFI! We're excited to get you connected.
							</EmailText>
							<EmailText className="text-gray-400 text-xs mb-0">© 2024 QBYFI. All rights reserved.</EmailText>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	)
}

export default InstallationScheduledEmail 