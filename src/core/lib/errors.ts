import { type PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { AuthError } from "next-auth"
import { ZodError } from "zod"

/**
 * Standardized error codes with their corresponding HTTP status, name, and message
 */
const ErrorCode = {
	// General Errors
	ERROR: {
		status: 400,
		name: "Error",
		message: "An error occurred"
	},
	INTERNAL_SERVER_ERROR: {
		status: 500,
		name: "Internal Server Error",
		message: "An internal server error occurred"
	},
	UNKNOWN_ERROR: {
		status: 500,
		name: "Unknown Error",
		message: "An unknown error occurred"
	},

	// Authentication & Authorization Errors
	UNAUTHORIZED: {
		status: 401,
		name: "Unauthorized",
		message: "Authentication required to access this resource"
	},
	FORBIDDEN: {
		status: 403,
		name: "Forbidden",
		message: "You don't have permission to access this resource"
	},
	INVALID_CREDENTIALS: {
		status: 401,
		name: "Invalid Credentials",
		message: "The provided credentials are invalid"
	},
	ACCESS_DENIED: {
		status: 403,
		name: "Access Denied",
		message: "Access to the requested resource was denied"
	},
	AUTH_ERROR: {
		status: 401,
		name: "Authentication Error",
		message: "An authentication error occurred"
	},
	SESSION_ERROR: {
		status: 401,
		name: "Session Error",
		message: "A session error occurred"
	},
	SECURITY_ERROR: {
		status: 403,
		name: "Security Error",
		message: "A security violation occurred"
	},

	// Request/Response Errors
	BAD_REQUEST: {
		status: 400,
		name: "Bad Request",
		message: "Invalid request parameters"
	},
	NOT_FOUND: {
		status: 404,
		name: "Not Found",
		message: "The requested resource was not found"
	},
	VALIDATION_ERROR: {
		status: 400,
		name: "Validation Error",
		message: "Invalid input data"
	},

	// Database Errors
	DATABASE_ERROR: {
		status: 500,
		name: "Database Error",
		message: "A database error occurred"
	},
	DATABASE_CONNECTION_ERROR: {
		status: 503,
		name: "Database Connection Error",
		message: "Unable to connect to the database"
	},
	UNIQUE_CONSTRAINT_VIOLATION: {
		status: 409,
		name: "Unique Constraint Violation",
		message: "A unique constraint was violated"
	},
	FOREIGN_KEY_CONSTRAINT_FAILED: {
		status: 409,
		name: "Foreign Key Constraint Failed",
		message: "A foreign key constraint was violated"
	},
	REQUIRED_RELATION_VIOLATION: {
		status: 409,
		name: "Required Relation Violation",
		message: "A required relation is missing"
	},
	CONFLICT: {
		status: 409,
		name: "Conflict",
		message: "A conflict occurred"
	},

	// OAuth Errors
	ACCOUNT_NOT_LINKED: {
		status: 400,
		name: "Account Not Linked",
		message: "The account is not linked"
	},
	OAUTH_CALLBACK_ERROR: {
		status: 400,
		name: "OAuth Callback Error",
		message: "An OAuth callback error occurred"
	},
	EMAIL_SIGNIN_ERROR: {
		status: 400,
		name: "Email Sign In Error",
		message: "An email sign in error occurred"
	}
} as const

/**
 * Type representing valid error code keys from the ErrorCode object
 */
type ErrCode = keyof typeof ErrorCode

/**
 * Type representing either a standard error code or a custom string error code
 */
type CustomCode = ErrCode | (string & {})

/**
 * Mapping of external error codes to our standardized error codes
 */
const errorMap = {
	// Prisma errors
	P1001: "DATABASE_CONNECTION_ERROR",
	P2002: "UNIQUE_CONSTRAINT_VIOLATION",
	P2003: "FOREIGN_KEY_CONSTRAINT_FAILED",
	P2014: "REQUIRED_RELATION_VIOLATION",
	P2025: "NOT_FOUND",

	// Auth errors
	CredentialsSignin: "INVALID_CREDENTIALS",
	AccessDenied: "ACCESS_DENIED"
} as const

/**
 * Error options interface for creating or parsing errors
 */
export interface ErrOptions {
	/** The error code, can be standard or custom */
	code?: CustomCode
	/** Custom error name */
	name?: string
	/** Error message */
	message?: string
	/** HTTP status code */
	status?: number
	/** Whether to override the original error message (used in parseErr) */
	overrideMessage?: boolean
}

/**
 * Standardized application error class that normalizes all error types
 *
 * @example
 * ```ts
 * // Create a basic error
 * const error = new AppErr({ message: "Something went wrong" });
 *
 * // Create an error with a standard code
 * const notFoundError = new AppErr({
 *   code: "NOT_FOUND"
 * });
 *
 * // Custom error with specific status
 * const customError = new AppErr({
 *   code: "CUSTOM_ERROR",
 *   status: 422,
 *   name: "Custom Validation Error",
 *   message: "A custom validation error occurred"
 * });
 * ```
 */
export class AppErr extends Error {
	readonly code: string
	readonly status: number

	/**
	 * Creates a new AppErr instance
	 *
	 * @param options - Configuration options for the error
	 */
	constructor(options: Omit<ErrOptions, "overrideMessage">) {
		const code = options.code ?? "ERROR"
		const isStandardCode = code in ErrorCode
		const defaults = isStandardCode
			? ErrorCode[code as keyof typeof ErrorCode]
			: null

		// Use provided message or default from ErrorCode
		const message = options.message ?? defaults?.message ?? "An error occurred"
		super(message)

		// Use provided name or default from ErrorCode
		this.name = options.name ?? defaults?.name ?? "Error"
		this.code = code
		this.status = options.status ?? defaults?.status ?? 400

		// Make message enumerable and capture stack trace
		Object.defineProperty(this, "message", { enumerable: true })
		Error.captureStackTrace?.(this, AppErr)
	}

	/**
	 * Converts the error to a JSON representation
	 *
	 * @returns A plain object representation of the error
	 */
	toJSON() {
		return {
			code: this.code,
			status: this.status,
			name: this.name,
			message: this.message
		}
	}
}

/**
 * Creates a standardized application error with consistent format
 *
 * @param options - Error options or a simple error message string
 * @returns An AppErr instance
 *
 * @example
 * ```ts
 * // Simple error with just a message
 * const error = createErr("Something went wrong");
 *
 * // Error with specific options
 * const notFoundError = createErr({
 *   code: "NOT_FOUND"
 * });
 * ```
 */
export function createErr(
	options: Omit<ErrOptions, "overrideMessage"> | string
): AppErr {
	if (typeof options === "string") return new AppErr({ message: options })
	return new AppErr(options)
}

/**
 * Helper for creating error response with appropriate error details
 *
 */
function createErrorDetails(
	error: Error,
	options: ErrOptions | undefined,
	defaultCode: CustomCode
): AppErr {
	return new AppErr({
		code: options?.code ?? defaultCode,
		name: options?.name,
		message: options?.overrideMessage
			? options?.message
			: (options?.message ?? error.message),
		status: options?.status
	})
}

/**
 * Parses any error type into a standardized AppErr
 *
 * Handles different error types (Prisma, Zod, NextAuth, etc.) and normalizes them
 * into a consistent AppErr format with appropriate error codes and details.
 *
 * @param error - The error to parse (can be any type)
 * @param options - Optional configuration to override default error properties
 * @returns A standardized AppErr instance
 *
 * @example
 * ```ts
 * // Normalize any error
 * try {
 *   await someOperation();
 * } catch (error) {
 *   const appError = parseErr(error);
 *   // appError is now a standardized AppErr
 * }
 *
 * // Parse with custom options
 * const error = parseErr(someError, {
 *   code: "CUSTOM_ERROR",
 *   status: 422,
 *   name: "Custom Validation Error",
 *   message: "A custom validation error occurred"
 * });
 * ```
 */
export function parseErr(error: unknown, options?: ErrOptions): AppErr {
	// Handle Next.js redirect errors by ignoring them completely
	if (error instanceof Error && error.message?.startsWith("NEXT_REDIRECT")) {
		return new AppErr({
			code: "ERROR", // This will be ignored in practice
			message: "Redirect ignored"
		})
	}

	// Handle existing AppError instances
	if (error instanceof AppErr) {
		// If no options provided, return the original error
		if (!options) return error

		// Create new error with merged options
		return new AppErr({
			code: options.code ?? error.code,
			name: options.name ?? error.name,
			message: options.overrideMessage
				? options.message
				: (options.message ?? error.message),
			status: options.status ?? error.status
		})
	}

	// Handle Prisma errors - safely check using constructor name to avoid Edge compatibility issues
	if (
		error instanceof Error &&
		error.constructor.name === "PrismaClientKnownRequestError"
	) {
		// Safe access to error code using type assertion
		const prismaError = error as PrismaClientKnownRequestError
		const mappedCode =
			(errorMap[prismaError.code as keyof typeof errorMap] as CustomCode) ||
			"DATABASE_ERROR"
		return createErrorDetails(error, options, mappedCode)
	}

	// Handle Zod validation errors
	if (error instanceof ZodError) {
		return createErrorDetails(error, options, "VALIDATION_ERROR")
	}

	// Handle NextAuth errors
	if (error instanceof AuthError) {
		const mappedCode =
			(errorMap[error.type as keyof typeof errorMap] as CustomCode) ||
			"AUTH_ERROR"
		return createErrorDetails(error, options, mappedCode)
	}

	// Handle standard Error objects
	if (error instanceof Error) {
		return createErrorDetails(error, options, "ERROR")
	}

	// Handle any other values
	return new AppErr({
		code: options?.code ?? "UNKNOWN_ERROR",
		name: options?.name,
		message: options?.overrideMessage
			? options?.message
			: (options?.message ?? String(error)),
		status: options?.status
	})
}

/**
 * Safely awaits a promise and catches any errors, returning a tuple result
 *
 * Useful for safely handling async operations without try/catch blocks.
 * Returns a tuple where the first element is the result (if successful)
 * and the second element is the error (if failed).
 *
 * @template T - The type that the promise resolves to
 * @param promise - The promise to await
 * @param options - Optional error handling options
 * @returns A tuple of [result, null] on success or [null, error] on failure
 *
 * @example
 * ```ts
 * // Basic usage
 * const [data, error] = await catchErr(fetchData());
 * if (error) {
 *   // Handle error
 *   console.error(error);
 *   return;
 * }
 * // Use data safely
 *
 * // With custom error options
 * const [user, error] = await catchErr(getUserById(id), {
 *   code: "USER_NOT_FOUND",
 *   message: `User with ID ${id} not found`,
 *   status: 404
 * });
 * ```
 */
export async function catchErr<T>(
	promise: Promise<T>,
	options?: ErrOptions
): Promise<[T, null] | [null, AppErr]> {
	try {
		const result = await promise
		return [result, null]
	} catch (error) {
		// Completely ignore NEXT_REDIRECT errors
		if (error instanceof Error && error.message?.startsWith("NEXT_REDIRECT")) {
			// Return a dummy successful result to prevent the error from propagating
			return [null as unknown as T, null]
		}
		return [null, parseErr(error, options)]
	}
}
