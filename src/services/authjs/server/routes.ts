import type { Routes } from "@/services/authjs/server/types"

export const ROUTES: Routes = {
	// routes anyone can access, regardless of authentication
	public: ["/", "/privacy-policy", "/terms-of-service", "/playground"],

	// routes any signed-in user can access
	protected: ["/profile", "/notifications"],

	// routes you can only access with a specific user role
	roles: {
		ADMIN: {
			default: "/admin",
			except: []
		},
		STAFF: {
			default: "/staff",
			except: []
		},
		CLIENT: {
			default: "/client",
			except: ["/billing-history", "/dashboard", "/payment", "/plans"]
		}
	},

	// authentication routes (only for non-logged in users)
	auth: ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"]
}
