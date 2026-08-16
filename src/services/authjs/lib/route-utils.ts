import type { UserRole } from "@prisma/client"

import { ROUTES } from "@/services/authjs/server/routes"

/**
 * Checks if a given route is allowed for the current role
 */
export function isRouteAllowed(route: string, role: UserRole | null): boolean {
	// Allow public routes for everyone
	if (ROUTES.public.includes(route)) {
		return true
	}

	// Allow auth routes for non-authenticated users
	if (ROUTES.auth.includes(route)) return role === null

	// Block non-authenticated users from accessing protected routes
	if (!role) return false

	const roleConfig = ROUTES.roles[role]

	// Allow protected routes for any authenticated user
	if (ROUTES.protected.includes(route)) return true

	// Allow routes in user's except list
	if (roleConfig.except.includes(route)) return true

	// For all other routes, only allow if it starts with user's role prefix
	// This ensures users can only access their own role's routes
	return route.startsWith(roleConfig.default)
}

/**
 * Gets the default route for a given role
 */
export function getDefaultRoute(role: UserRole): string {
	return ROUTES.roles[role].default
}
