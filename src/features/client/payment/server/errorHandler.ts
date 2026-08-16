import axios from "axios"

/**
 * Handles errors from Axios or general errors.
 * @param error - The error object.
 * @param context - A custom context message for better debugging.
 * @throws {Error} A formatted error message.
 */
export const handleApiError = (error: unknown, context: string): never => {
	if (axios.isAxiosError(error)) {
		console.error(
			`${context} - Axios error:`,
			error.response?.data ?? error.message
		)
		const errorDetail = (
			error.response?.data as { errors?: { detail: string }[] }
		)?.errors?.[0]?.detail
		throw new Error(`${context} - ${errorDetail ?? error.message}`)
	} else if (error instanceof Error) {
		console.error(`${context} - General error:`, error.message)
		throw new Error(`${context} - ${error.message}`)
	} else {
		console.error(`${context} - Unknown error:`, error)
		throw new Error(`${context} - Unknown error occurred.`)
	}
}
