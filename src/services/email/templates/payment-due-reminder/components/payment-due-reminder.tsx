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

interface PaymentDueReminderProps {
  subscriberName: string;
  billingEmail: string;
  planName: string;
  nextBillingDate: string;
  amount: number;
  gracePeriodDays: number;
  paymentUrl?: string;
}

export const PaymentDueReminder = ({
  subscriberName = 'Valued Customer',
  billingEmail = 'customer@example.com',
  planName = 'Professional Plan',
  nextBillingDate = 'January 31, 2024',
  amount = 99.99,
  gracePeriodDays = 7,
  paymentUrl = '#',
}: PaymentDueReminderProps) => {
  const previewText = `Payment due reminder for your ${planName} subscription`;

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
              {/* Header with gradient */}
              <div
                style={{
                  background: "linear-gradient(135deg, hsl(45, 93%, 47%) 0%, hsl(38, 92%, 50%) 50%, hsl(32, 95%, 44%) 100%)",
                  padding: "32px 32px 24px 32px",
                }}
              >
                <Heading className="text-white text-2xl font-bold mb-2 text-center">
                  Payment Due Reminder
                </Heading>
                <EmailText className="text-white/90 text-center text-base mb-0">
                  Hi {subscriberName}, your payment is due soon
                </EmailText>  
              </div>

              {/* Content */}
              <div style={{ padding: "32px" }}>
                <EmailText className="text-gray-700 text-base leading-relaxed mb-6 text-center">
                  This is a friendly reminder that your payment for the <strong>{planName}</strong> subscription is due on <strong>{nextBillingDate}</strong>.
                </EmailText>

                {/* Payment Details */}
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
                    Payment Details
                  </Heading>
                  <div style={{ textAlign: "left" }}>
                    <EmailText className="text-gray-700 mb-2">
                      <strong>Plan:</strong> {planName}
                    </EmailText>
                    <EmailText className="text-gray-700 mb-2">
                      <strong>Amount Due:</strong> ₱{amount.toFixed(2)}
                    </EmailText>
                    <EmailText className="text-gray-700 mb-2">
                      <strong>Due Date:</strong> {nextBillingDate}
                    </EmailText>
                    <EmailText className="text-gray-700 mb-0">
                      <strong>Billing Email:</strong> {billingEmail}
                    </EmailText>
                  </div>
                </div>

                {/* Action Button */}
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <Button
                    href={paymentUrl}
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
                    Make Payment
                  </Button>
                </div>

                {/* Important Notice */}
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
                    Important Notice
                  </Heading>
                  <EmailText className="text-yellow-700 mb-0">
                    If payment is not received by the due date, you will have a {gracePeriodDays}-day grace period before your service may be suspended.
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
                    If you have any questions about your subscription or billing, please don't hesitate to contact our support team.
                  </EmailText>
                  <EmailText className="text-gray-600 text-sm mb-0">
                    Contact us at <strong>support@qbyfi.com</strong> or call <strong>(02) 8123-4567</strong>
                  </EmailText>
                </div>
              </div>
            </Section>

            {/* Footer */}
            <Section className="text-center">
              <EmailText className="text-gray-500 text-sm mb-3">Thank you for choosing QBYFI!</EmailText>
              <EmailText className="text-gray-400 text-xs mb-0">© 2024 QBYFI. All rights reserved.</EmailText>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PaymentDueReminder; 