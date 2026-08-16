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
  Tailwind,
} from '@react-email/components';

interface PaymentOverdueNoticeProps {
  subscriberName: string;
  billingEmail: string;
  planName: string;
  nextBillingDate: string;
  amount: number;
  daysOverdue: number;
  paymentUrl?: string;
}

export const PaymentOverdueNotice = ({
  subscriberName = 'Valued Customer',
  billingEmail = 'customer@example.com',
  planName = 'Professional Plan',
  nextBillingDate = 'January 31, 2024',
  amount = 99.99,
  daysOverdue = 3,
  paymentUrl = '#',
}: PaymentOverdueNoticeProps) => {
  const previewText = `URGENT: Payment overdue for your ${planName} subscription`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
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
              {/* Header with urgent red gradient */}
              <div
                style={{
                  background: "linear-gradient(135deg, hsl(0, 84%, 60%) 0%, hsl(0, 72%, 51%) 50%, hsl(0, 79%, 44%) 100%)",
                  padding: "32px 32px 24px 32px",
                }}
              >
                <Heading className="text-white text-2xl font-bold mb-2 text-center">
                  ⚠️ PAYMENT OVERDUE
                </Heading>
                <EmailText className="text-white/90 text-center text-base mb-0">
                  Immediate Action Required - {subscriberName}
                </EmailText>
              </div>

              {/* Content */}
              <div style={{ padding: "32px" }}>
                <EmailText className="text-gray-700 text-base leading-relaxed mb-6 text-center">
                  <strong>Your payment for the {planName} subscription is now overdue.</strong> The payment was due on <strong>{nextBillingDate}</strong> and is currently <strong>{daysOverdue} day{daysOverdue !== 1 ? 's' : ''} overdue</strong>.
                </EmailText>

                {/* Payment Details */}
                <div
                  style={{
                    backgroundColor: "hsl(0, 86%, 97%)",
                    borderRadius: "12px",
                    padding: "24px",
                    marginBottom: "24px",
                    border: "2px solid hsl(0, 50%, 85%)",
                  }}
                >
                  <Heading className="text-gray-800 text-lg font-semibold mb-4 text-center">
                    Overdue Payment Details
                  </Heading>
                  <div style={{ textAlign: "left" }}>
                    <EmailText className="text-gray-700 mb-2">
                      <strong>Plan:</strong> {planName}
                    </EmailText>
                    <EmailText className="text-gray-700 mb-2">
                      <strong>Amount Due:</strong> ₱{amount.toFixed(2)}
                    </EmailText>
                    <EmailText className="text-gray-700 mb-2">
                      <strong>Original Due Date:</strong> {nextBillingDate}
                    </EmailText>
                    <EmailText className="text-red-700 mb-0">
                      <strong>Days Overdue:</strong> {daysOverdue} day{daysOverdue !== 1 ? 's' : ''}
                    </EmailText>
                  </div>
                </div>

                {/* Urgent Action Button */}
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <Button
                    href={paymentUrl}
                    style={{
                      backgroundColor: "hsl(0, 84%, 60%)",
                      color: "white",
                      padding: "16px 32px",
                      borderRadius: "8px",
                      fontWeight: "700",
                      fontSize: "16px",
                      textDecoration: "none",
                      display: "inline-block",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px 0 rgba(220, 38, 38, 0.4)",
                    }}
                  >
                    Pay Now to Avoid Suspension
                  </Button>
                </div>

                {/* Service Suspension Warning */}
                <div
                  style={{
                    backgroundColor: "hsl(45, 86%, 95%)",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "24px",
                    border: "2px solid hsl(45, 50%, 80%)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "hsl(45, 93%, 47%)",
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
                    ⚠
                  </div>
                  <Heading className="text-yellow-800 text-lg font-semibold mb-2">
                    Service Suspension Warning
                  </Heading>
                  <EmailText className="text-yellow-700 mb-0">
                    To avoid interruption of your service, please make your payment immediately. Continued non-payment may result in suspension of your subscription and loss of access to QBYFI services.
                  </EmailText>
                </div>

                {/* Critical Notice */}
                <div
                  style={{
                    backgroundColor: "hsl(0, 86%, 97%)",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "24px",
                    border: "2px solid hsl(0, 50%, 70%)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "hsl(0, 84%, 60%)",
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
                    🚨
                  </div>
                  <Heading className="text-red-800 text-lg font-semibold mb-2">
                    Critical: Payment Required
                  </Heading>
                  <EmailText className="text-red-700 mb-0">
                    Your payment is now {daysOverdue} day{daysOverdue !== 1 ? 's' : ''} overdue. Please settle your account immediately to maintain uninterrupted service.
                  </EmailText>
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
                    <strong>Need help?</strong> If you're experiencing difficulties with payment or have questions about your account, please contact our support team immediately.
                  </EmailText>
                  <EmailText className="text-gray-600 text-sm mb-0">
                    Contact us at <strong>support@qbyfi.com</strong> or call <strong>(02) 8123-4567</strong>
                  </EmailText>
                </div>
              </div>
            </Section>

            {/* Footer */}
            <Section className="text-center">
              <EmailText className="text-gray-500 text-sm mb-3">We value your business and want to help resolve this matter quickly.</EmailText>
              <EmailText className="text-gray-400 text-xs mb-0">© 2024 QBYFI. All rights reserved.</EmailText>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PaymentOverdueNotice; 