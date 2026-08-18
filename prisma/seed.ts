import { db } from "./seed/config"
import { createUsers } from "./seed/users/users"

async function main() {
	console.log("\n=== 🌱 Starting Database Seed ===\n")

	try {
		// Clean existing data
		console.log("Cleaning existing data...")
		await db.$transaction([db.user.deleteMany()])

		// Create entities and collect stats
		console.log("Creating users...")
		const userStats = await createUsers()

		// Output final statistics
		const stats = {
			users: {
				admins: userStats.admin.total,
				clients: userStats.client.total,
				staffs: userStats.staff.total
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
