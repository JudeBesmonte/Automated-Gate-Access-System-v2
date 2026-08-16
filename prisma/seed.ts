import { db } from "./seed/config"
import { seedPayments } from "./seed/payments/payments"
import { seedPlans } from "./seed/plans/plans"
import { createUsers } from "./seed/users/users"

async function main() {
	console.log("\n=== 🌱 Starting Database Seed ===\n")

	try {
		// Clean existing data (including payment-related tables)
		console.log("Cleaning existing data...")
		await db.$transaction([
			db.paymentHistory.deleteMany(),
			db.subscription.deleteMany(),
			db.subscriberDetail.deleteMany(),
			db.billingDetail.deleteMany(),
			db.user.deleteMany(),
			db.plan.deleteMany()
		])

		// Create entities and collect stats
		console.log("Creating users...")
		const userStats = await createUsers()

		console.log("Creating plans...")
		const planStats = await seedPlans(db)

		console.log("Creating payment data...")
		const paymentStats = await seedPayments(db)

		// Output final statistics
		const stats = {
			users: {
				admins: userStats.admin.total,
				clients: userStats.client.total,
				staffs: userStats.staff.total
			},
			plans: planStats.total,
			payments: {
				subscriberDetails: paymentStats.subscriberDetails,
				billingDetails: paymentStats.billingDetails,
				subscriptions: paymentStats.subscriptions,
				paymentHistory: paymentStats.paymentHistory,
				total: paymentStats.total
			}
		}

		console.log("\n=== 🌱 Database Seed Complete ===")
		console.log("\nStatistics:", stats)
		console.log("\n")
	} catch (error) {
		console.error("Seed failed:", error)
		process.exit(1)
	}
}

main()
	.catch((error) => {
		console.error("Fatal error:", error)
		process.exit(1)
	})
	.finally(() => {
		void (async () => {
			await db.$disconnect()
		})()
	})
