import type { UserRole } from "@prisma/client"
import NextAuth from "next-auth"

import { authConfig } from "@/services/authjs/auth.config"
import {
	getDefaultRoute,
	isRouteAllowed
} from "@/services/authjs/lib/route-utils"
import { ROUTES } from "@/services/authjs/server/routes"

const { auth: middleware } = NextAuth(authConfig)

export default middleware((req) => {
	const { nextUrl, auth } = req
	const isAuthenticated = !!auth?.user
	const role = auth?.user?.role as UserRole | null
	const currentPath = nextUrl.pathname
	const userId = auth?.user?.id

	// Handle callback URL redirects after authentication
	const callbackUrl = nextUrl.searchParams.get("callbackUrl")
	if (isAuthenticated && callbackUrl && isRouteAllowed(callbackUrl, role)) {
		return Response.redirect(new URL(callbackUrl, nextUrl))
	}

	// Allow access if route is permitted for current auth status and role
	if (isRouteAllowed(currentPath, role)) return

	// For authenticated users: redirect to their default route
	if (isAuthenticated) {
		return Response.redirect(new URL(getDefaultRoute(role!), nextUrl))
	}

	// Add the `X-User-ID` header to all requests if the user is authenticated
	if (userId) req.headers.set("X-User-ID", userId)

	// For unauthenticated users: only allow public and auth routes
	const isPublicRoute = ROUTES.public.includes(currentPath)
	const isAuthRoute = ROUTES.auth.includes(currentPath)

	if (!isPublicRoute && !isAuthRoute) {
		const signInUrl = new URL("/sign-in", nextUrl)
		signInUrl.searchParams.set("callbackUrl", currentPath)
		return Response.redirect(signInUrl)
	}
})

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|assets).*)"]
}
