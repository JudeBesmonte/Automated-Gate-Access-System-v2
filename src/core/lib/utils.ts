import type { Prisma } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges multiple class values into a single string.
 * @param inputs - The class values to merge.
 * @returns The merged class string.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Checks if a given date is a valid JavaScript Date object.
 *
 * @param date - The Date object to validate
 * @returns True if the date is valid, false if it's invalid or NaN
 *
 * @example
 * ```typescript
 * isValidDate(new Date()) // true
 * isValidDate(new Date('invalid')) // false
 * ```
 */
export function isValidDate(date: Date): boolean {
	return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Creates a Prisma DateTimeFilter for a date range.
 * @param dateRange A tuple [startDate, endDate]. Either can be null.
 * @returns A Prisma.DateTimeFilter object or undefined if the range is invalid or empty.
 */
export const dateRangeFilter = (
	dateRange: [Date | null, Date | null] | undefined
): Prisma.DateTimeFilter | undefined => {
	if (!dateRange) {
		return undefined
	}

	const [start, end] = dateRange
	const filter: Prisma.DateTimeFilter = {}

	if (start) {
		try {
			// Ensure 'start' is a valid Date. Using toISOString() and new Date() can help normalize it.
			const startDate = new Date(start.toISOString()) // Or just `new Date(start)` if `start` is already a Date object
			filter.gte = startDate
		} catch (e) {
			console.error("Invalid start date provided to dateRangeFilter:", start, e)
			// Decide how to handle invalid date part: ignore, throw, or return undefined for the whole filter
		}
	}

	if (end) {
		try {
			// Ensure 'end' is a valid Date.
			const endDateObj = new Date(end.toISOString()) // Or just `new Date(end)`
			// To include the entire end day, set time to the end of that day.
			// Using UTC methods is generally safer for consistency if your dates are timezone-agnostic.
			// If dates are local, use local methods like setHours.
			endDateObj.setUTCHours(23, 59, 59, 999) // Sets time to 23:59:59.999 UTC
			filter.lte = endDateObj
		} catch (e) {
			console.error("Invalid end date provided to dateRangeFilter:", end, e)
		}
	}

	// Only return a filter object if it actually has conditions
	if (Object.keys(filter).length > 0) {
		return filter
	}
	return undefined // Return undefined if no valid start or end date was processed
}

/**
 * Safely converts a value to a Date object
 * @param date - The date to convert
 * @returns A valid Date object or null if invalid
 */
function toValidDate(date: Date | string | number): Date | null {
	if (date instanceof Date) return isNaN(date.getTime()) ? null : date
	if (typeof date === "number" && isNaN(date)) return null

	try {
		const parsed = new Date(date)
		return isNaN(parsed.getTime()) ? null : parsed
	} catch {
		return null
	}
}

/**
 * Formats a date according to the specified options.
 * @param date - The date to format.
 * @param opts - The options for formatting the date.
 * @returns The formatted date string.
 */
export function formatDate(
	date: Date | string | number | null | undefined,
	opts: Intl.DateTimeFormatOptions = {}
) {
	if (date === null || date === undefined || date === "") return ""
	const validDate = toValidDate(date)
	if (!validDate) return "Invalid date"

	return new Intl.DateTimeFormat("en-US", {
		month: opts.month ?? "short",
		day: opts.day ?? "numeric",
		year: opts.year ?? "numeric",
		...opts
	}).format(validDate)
}

/**
 * Formats minutes into a human-readable duration string.
 * @param minutes - The number of minutes to format
 * @returns Formatted duration string
 */
export function formatTime(minutes: number): string {
	if (isNaN(minutes) || minutes < 0) return "Invalid time"

	const days = Math.floor(minutes / 1440)
	const hours = Math.floor((minutes % 1440) / 60)
	const mins = minutes % 60

	const parts = []
	if (days > 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`)
	if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`)
	if (mins > 0) parts.push(`${mins} min${mins !== 1 ? "s" : ""}`)

	return parts.length > 0 ? parts.join(", ") : ""
}

/**
 * Generates initials from a name string.
 * Takes the first two words, gets the first letter of each, and converts to uppercase.
 * @param name - The full name string.
 * @returns The initials string (e.g., "JD" for "John Doe").
 */
export function getInitials(name: string): string {
	if (!name || typeof name !== "string") return ""
	return name
		.split(" ")
		.slice(0, 2)
		.map((n) => n[0])
		.join("")
		.toUpperCase()
}

/**
 * Formats a number as a Philippine Peso currency string without decimal places.
 * @param price - The number to format.
 * @returns The formatted price string (e.g., "1,000").
 *
 * @example
 * formatPeso(1000) // "1,000"
 */
export function formatPeso(price: number): string {
	return new Intl.NumberFormat("en-PH", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(price)
}

/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
