import type { UserRole } from "@prisma/client"
import type { Session } from "next-auth"
import { z } from "zod"

import { auth } from "@/services/authjs/auth"

// Import the new error handling functions
import { createErr, parseErr } from "@/core/lib/errors"

/**
 * Type representing the context provided to actions.
 *
 * Combines the authenticated session with any additional validated input parameters.
 *
 * @template I - Type of the validated input data (defaults to unknown)
 */
type AuthContext<I = unknown> = Readonly<{ session: Session | null } & I>

/**
 * Function signature for an action handler.
 *
 * @template I - Input type for the action after validation
 * @template R - Return type of the action
 */
type ActionFn<I, R> = (context: AuthContext<I>) => Promise<R> | R

/**
 * Guards server actions with authentication checks and input validation.
 *
 * Provides a fluent API for defining and protecting server-side actions with:
 * - Role-based access control via {@link AuthGuard.roles}
 * - Input validation via {@link AuthGuard.schema}
 * - Action execution via {@link AuthGuard.action}
 *
 * The guard follows this sequence:
 * 1. Verify user session and role permissions
 * 2. Validate input data against the schema
 * 3. Execute the protected action with validated context
 *
 * @template I - Type of validated input data. Defaults to {@link unknown}.
 */
class AuthGuard<I = unknown> {
	/**
	 * Creates a new AuthGuard instance.
	 *
	 * @param {readonly UserRole[] | undefined} _roles - Optional array of user roles allowed to access the action
	 * @param {z.ZodType<I>} _schema - Optional Zod schema for validating input (defaults to accepting any value)
	 *
	 * @example
	 * // Create a guard that allows only ADMIN and CLIENT roles
	 * const adminGuard = new AuthGuard(["ADMIN", "CLIENT"]);
	 *
	 * @example
	 * // Create a guard with input validation for a user creation form
	 * const userFormGuard = new AuthGuard(
	 *   undefined,
	 *   z.object({
	 *     username: z.string().min(3),
	 *     email: z.string().email()
	 *   })
	 * );
	 */
	constructor(
		private readonly _roles?: readonly UserRole[],
		private readonly _schema: z.ZodType<I> = z.custom<I>()
	) {}

	/**
	 * Validates the current user session against the required roles.
	 *
	 * Checks if the user is signed in, then verifies the user's role is included in the allowed roles.
	 * When no roles are specified, all authenticated sessions are accepted.
	 *
	 * @returns {Promise<Session>} The validated session
	 * @throws {AppError} With code "UNAUTHENTICATED" if not signed in, or "UNAUTHORIZED" if lacking required role
	 *
	 * @private
	 */
	private async validateSession(): Promise<Session> {
		const session = await auth()

		if (!session) {
			throw createErr({
				code: "UNAUTHORIZED",
				message: "User is not signed in"
			})
		}

		if (
			this._roles?.length &&
			(!session.user?.role || !this._roles.includes(session.user.role))
		) {
			throw createErr({
				code: "UNAUTHORIZED",
				message: "User does not have required role"
			})
		}

		return session
	}

	/**
	 * Validates input arguments against the configured Zod schema.
	 *
	 * Takes the first argument passed to the action and validates it against the schema.
	 * If no arguments are provided, returns an empty object as the input.
	 *
	 * @param {readonly unknown[]} args - Arguments array provided to the action
	 * @returns {I} The validated input conforming to type I
	 * @throws {z.ZodError} If validation fails against the schema
	 *
	 * @private
	 *
	 * @example
	 * // With schema expecting { username: string }
	 * // Input: [{ username: "john" }]
	 * // Output: { username: "john" }
	 */
	private validateInput(args: readonly unknown[]): I {
		if (!args.length) return {} as I
		return this._schema.parse(args[0])
	}

	/**
	 * Restricts the AuthGuard to specific user roles.
	 *
	 * Creates a new AuthGuard instance with updated role restrictions while preserving
	 * the existing input validation schema.
	 *
	 * @param {readonly UserRole[]} roles - Array of allowed user roles
	 * @returns {AuthGuard<I>} A new AuthGuard instance with the specified role restrictions
	 *
	 * @example
	 * // Restrict actions to only ADMIN users
	 * const adminGuard = guard.roles(["ADMIN"]);
	 *
	 * @example
	 * // Allow multiple roles to access an action
	 * const moderationGuard = guard.roles(["ADMIN", "CLIENT"]);
	 */
	roles(roles: readonly UserRole[]): AuthGuard<I> {
		return new AuthGuard<I>([...roles], this._schema)
	}

	/**
	 * Configures input validation for the AuthGuard.
	 *
	 * Creates a new AuthGuard instance with the specified schema while preserving
	 * any existing role restrictions. The generic type parameter enforces type checking
	 * and provides better IDE autocomplete in the action handler.
	 *
	 * @template T - The expected input type after validation
	 * @param {z.ZodType<T>} [schema] - Zod schema for validating input (optional, defaults to accepting any input that matches type T)
	 * @returns {AuthGuard<T>} A new AuthGuard instance with the updated schema
	 *
	 * @example
	 * // Define an action expecting email input with validation
	 * const emailGuard = guard.schema<{ email: string }>(
	 *   z.object({ email: z.string().email() })
	 * );
	 *
	 * @example
	 * // Using type information without runtime validation
	 * const typedGuard = guard.schema<{ id: number; name: string }>();
	 * // TypeScript will enforce the types, but no runtime validation will occur
	 */
	schema<T>(schema: z.ZodType<T>): AuthGuard<T>
	schema<T = unknown>(): AuthGuard<T>
	schema<T>(schema?: z.ZodType<T>): AuthGuard<T> {
		return new AuthGuard<T>(this._roles, schema ?? z.custom<T>())
	}

	/**
	 * Creates a protected action function with authentication and input validation.
	 *
	 * Wraps the provided action function with session validation and input parsing logic.
	 * The action function receives a context object containing:
	 * - The authenticated session (null if not authenticated)
	 * - All validated input properties spread into the context
	 *
	 * @template R - Return type of the action
	 * @param {ActionFn<I, R>} actionFn - Function to execute if validation passes
	 * @returns {(input: I extends Record<string, never> ? undefined : I) => Promise<R>} A wrapped function that handles authentication, validation, and error handling
	 *
	 * @example
	 * // Create a protected user creation action
	 * export const createUser = guard
	 *   .roles(["ADMIN"])
	 *   .schema(z.object({
	 *     username: z.string().min(3),
	 *     email: z.string().email()
	 *   }))
	 *   .action(async ({ session, username, email }) => {
	 *     // Implementation using validated inputs
	 *     return { success: true, user: { username, email } };
	 *   });
	 *
	 * // Using the action (client-side)
	 * await createUser({ username: "john_doe", email: "john@example.com" });
	 */
	action<R>(
		actionFn: ActionFn<I, R>
	): (input?: I extends Record<string, never> ? undefined : I) => Promise<R> {
		return async (input) => {
			try {
				const session = await this.validateSession()
				const validatedInput = this.validateInput(input ? [input] : [])
				return await actionFn({ session, ...validatedInput })
			} catch (error) {
				throw parseErr(error)
			}
		}
	}
}

/**
 * Pre-configured AuthGuard instance for protecting server actions.
 *
 * This singleton instance has no default restrictions - use method chaining to apply:
 * - Role-based access control with `.roles([...])`
 * - Input validation with `.schema(...)`
 * - Action execution with `.action(...)`
 *
 * Intended for use with Next.js server actions or any server-side functions
 * that require authentication and input validation.
 *
 * @example
 * // Create a protected action requiring ADMIN role with input validation
 * export const createArticle = guard
 *   .roles(["ADMIN"])
 *   .schema(z.object({
 *     title: z.string().min(5).max(100),
 *     content: z.string().min(10)
 *   }))
 *   .action(async ({ session, title, content }) => {
 *     // Admin-only article creation logic
 *     console.log(`Admin ${session?.user?.name} created article: ${title}`);
 *     return { id: generateId(), title, authorId: session.user.id };
 *   });
 *
 * @example
 * // Create an action allowing any authenticated user
 * export const fetchUserData = guard
 *   .action(async ({ session }) => {
 *     if (!session?.user) {
 *       // Use the new createError function
 *       throw createError({
 *         code: "UNAUTHORIZED",
 *         message: "Authentication required"
 *       });
 *     }
 *
 *     return await getUserProfile(session.user.id);
 *   });
 *
 * @example
 * // Strongly-typed action with optional runtime validation
 * export const updateSettings = guard
 *   .schema<{
 *     userId: string;
 *     preferences: { theme: "light" | "dark"; notifications: boolean }
 *   }>()
 *   .action(async ({ session, userId, preferences }) => {
 *     // TypeScript enforces the input shape without runtime validation
 *     return await saveUserPreferences(userId, preferences);
 *   });
 */
export const guard = new AuthGuard()
