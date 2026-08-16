import { faker } from "@faker-js/faker"

import {
	type PaymentStatus,
	type PaymentType,
	type SubscriptionStatus
} from "@/features/payment-history/server/types"

export const generateDummyPayments = (count: number) => {
	return Array.from({ length: count }).map((_, index) => {
		const status = faker.helpers.arrayElement([
			"pending",
			"processing",
			"success",
			"failed"
		] as unknown as PaymentStatus[])

		const subscriptionStatus = faker.helpers.arrayElement([
			"pending",
			"for_payment",
			"processing",
			"for_installation",
			"active",
			"suspended",
			"terminated"
		] as unknown as SubscriptionStatus[])

		const type = faker.helpers.arrayElement([
			"cash",
			"card",
			"gcash",
			"paymaya",
			"grab_pay",
			"qrph"
		] as unknown as PaymentType[])

		return {
			id: `payment-${index + 1}`,
			type,
			amount: parseFloat(faker.finance.amount({ min: 10, max: 20 })),
			paymentDate: faker.date.recent(),
			status,
			description: faker.lorem.sentence(),
			clientName: faker.company.name(),
			siteAddress: faker.location.streetAddress(),
			contactPerson: faker.person.fullName(),
			contactEmail: faker.internet.email(),
			contactNumber: faker.phone.number(),
			subscriptionId: `subscription-${index + 1}`,
			subscriptionStatus,
			createdAt: faker.date.past()
		}
	})
}
