import { faker } from "@faker-js/faker"
import {
	BillingInterval,
	PaymentStatus,
	PaymentType,
	PlanType,
	PrismaClient,
	SubscriptionStatus,
	UserRole
} from "@prisma/client"

export async function seedPayments(db: PrismaClient) {
	console.log("Creating subscriber details...")

	// Helper function to generate random date between Jan 2025 and now
	const getRandomDate = () => {
		const start = new Date("2025-01-01")
		const end = new Date()
		return faker.date.between({ from: start, to: end })
	}

	// Get existing plans and users
	const plans = await db.plan.findMany()
	const users = await db.user.findMany()

	if (plans.length === 0 || users.length === 0) {
		throw new Error(
			"No plans or users found. Please ensure users and plans are seeded first."
		)
	}

	// Create SubscriberDetails
	const subscriberDetails = []
	for (let i = 0; i < 15; i++) {
		const subscriberDetail = await db.subscriberDetail.create({
			data: {
				clientName: faker.company.name(),
				siteAddress: faker.location.streetAddress({ useFullAddress: true }),
				contactPerson: faker.person.fullName(),
				contactEmail: faker.internet.email(),
				contactNumber: faker.phone.number(),
				contactDesignation: faker.person.jobTitle(),
				createdAt: getRandomDate(),
				updatedAt: getRandomDate()
			}
		})
		subscriberDetails.push(subscriberDetail)
	}

	console.log("Creating billing details...")

	// Create BillingDetails
	const billingDetails = []
	for (let i = 0; i < 15; i++) {
		const billingDetail = await db.billingDetail.create({
			data: {
				billingName: faker.company.name(),
				billingEmail: faker.internet.email(),
				billingPhone: faker.phone.number(),
				createdAt: getRandomDate(),
				updatedAt: getRandomDate()
			}
		})
		billingDetails.push(billingDetail)
	}

	console.log("Creating subscriptions...")

	// Create Subscriptions
	const subscriptions = []
	for (let i = 0; i < 15; i++) {
		const randomPlan = faker.helpers.arrayElement(plans)
		const randomUser = faker.helpers.arrayElement(users)

		// Use non-null assertion since we know these exist (we created exactly 15 of each)
		const subscriberDetail = subscriberDetails[i]!
		const billingDetail = billingDetails[i]!

		const installationDate = getRandomDate()

		const subscription = await db.subscription.create({
			data: {
				planType: randomPlan.planType,
				billingInterval: faker.helpers.arrayElement(
					Object.values(BillingInterval)
				),
				price: parseFloat(faker.commerce.price({ min: 100, max: 1000 })),
				discount: faker.number.float({ min: 0, max: 100, multipleOf: 0.01 }),
				installationDate,
				subscriptionStatus: faker.helpers.arrayElement(
					Object.values(SubscriptionStatus)
				),
				subscriberId: randomUser.id,
				planId: randomPlan.id,
				subscriberDetailId: subscriberDetail.id,
				billingDetailId: billingDetail.id,
				createdAt: getRandomDate(),
				updatedAt: getRandomDate()
			}
		})
		subscriptions.push(subscription)
	}

	console.log("Creating payment history...")

	// Create PaymentHistory
	const paymentHistory = []
	for (let i = 0; i < 20; i++) {
		const randomSubscription = faker.helpers.arrayElement(subscriptions)
		const paymentDate = getRandomDate()

		const payment = await db.paymentHistory.create({
			data: {
				type: faker.helpers.arrayElement(Object.values(PaymentType)),
				amount: parseFloat(faker.commerce.price({ min: 100, max: 2000 })),
				paymentDate,
				description: faker.lorem.sentence(),
				status: faker.helpers.arrayElement(Object.values(PaymentStatus)),
				billingName: faker.company.name(),
				billingEmail: faker.internet.email(),
				billingPhone: faker.phone.number(),
				paymentIntentId: `pi_${faker.string.alphanumeric(24)}`,
				clientKey: `pk_test_${faker.string.alphanumeric(32)}`,
				subscriptionId: randomSubscription.id,
				createdAt: paymentDate,
				updatedAt: faker.date.between({ from: paymentDate, to: new Date() })
			}
		})
		paymentHistory.push(payment)
	}

	return {
		subscriberDetails: subscriberDetails.length,
		billingDetails: billingDetails.length,
		subscriptions: subscriptions.length,
		paymentHistory: paymentHistory.length,
		total:
			subscriberDetails.length +
			billingDetails.length +
			subscriptions.length +
			paymentHistory.length
	}
}
