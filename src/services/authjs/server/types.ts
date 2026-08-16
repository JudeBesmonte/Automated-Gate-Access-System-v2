import type { UserRole } from "@prisma/client"

/**
 * Configuration for a role-specific routing
 */
export type RoleConfig = {
	/** The default path where users of this role will be redirected */
	default: string
	/** List of paths outside the default path that this role can access */
	except: string[]
}

/**
 * Maps each role to its routing configuration
 */
export type RoleRoutes = Record<UserRole, RoleConfig>

/**
 * Routes configuration for the entire application
 */
export type Routes = {
	/**
	 * Routes that can be accessed by anyone, regardless of authentication status.
	 * @example ["/about", "/contact", "/privacy-policy"]
	 */
	public: string[]
	/**
	 * Routes that can be accessed by any authenticated user.
	 * @example ["/profile", "/notifications"]
	 */
	protected: string[]

	/**
	 * Routes that can only be accessed with a specific user role.
	 * Users are restricted to their role's default path unless specified in except.
	 */
	roles: RoleRoutes

	/**
	 * Authentication routes that can only be accessed by non-logged in users.
	 * Logged in users will be redirected to their role's default route.
	 * @example ["/sign-in", "/sign-up", "/forgot-password"]
	 */
	auth: string[]
}
