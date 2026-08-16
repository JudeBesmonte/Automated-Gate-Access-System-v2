import { format, isValid, parseISO } from "date-fns"
import { type Parser } from "nuqs"
import { createParser } from "nuqs/server"
import { z } from "zod"

import { dataTableConfig } from "@/core/config/data-table"
import type {
	ExtendedColumnFilter,
	ExtendedColumnSort
} from "@/core/types/data-table"

const sortingItemSchema = z.object({
	id: z.string(),
	desc: z.boolean()
})

export const getSortingStateParser = <TData>(
	columnIds?: string[] | Set<string>
) => {
	const validKeys = columnIds
		? columnIds instanceof Set
			? columnIds
			: new Set(columnIds)
		: null

	return createParser({
		parse: (value) => {
			try {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const parsed = JSON.parse(value)
				const result = z.array(sortingItemSchema).safeParse(parsed)

				if (!result.success) return null

				if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
					return null
				}

				return result.data as ExtendedColumnSort<TData>[]
			} catch {
				return null
			}
		},
		serialize: (value) => JSON.stringify(value),
		eq: (a, b) =>
			a.length === b.length &&
			a.every(
				(item, index) =>
					item.id === b[index]?.id && item.desc === b[index]?.desc
			)
	})
}

const filterItemSchema = z.object({
	id: z.string(),
	value: z.union([z.string(), z.array(z.string())]),
	variant: z.enum(dataTableConfig.filterVariants),
	operator: z.enum(dataTableConfig.operators),
	filterId: z.string()
})

export type FilterItemSchema = z.infer<typeof filterItemSchema>

export const getFiltersStateParser = <TData>(
	columnIds?: string[] | Set<string>
) => {
	const validKeys = columnIds
		? columnIds instanceof Set
			? columnIds
			: new Set(columnIds)
		: null

	return createParser({
		parse: (value) => {
			try {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const parsed = JSON.parse(value)
				const result = z.array(filterItemSchema).safeParse(parsed)

				if (!result.success) return null

				if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
					return null
				}

				return result.data as ExtendedColumnFilter<TData>[]
			} catch {
				return null
			}
		},
		serialize: (value) => JSON.stringify(value),
		eq: (a, b) =>
			a.length === b.length &&
			a.every(
				(filter, index) =>
					filter.id === b[index]?.id &&
					filter.value === b[index]?.value &&
					filter.variant === b[index]?.variant &&
					filter.operator === b[index]?.operator
			)
	})
}
export const parseAsDateRange = createParser({
	parse: (value: string): [Date | null, Date | null] => {
		if (!value) return [null, null]

		try {
			const parts = value.split(",")
			if (parts.length !== 2) return [null, null]

			const startDate = parts[0] ? new Date(parts[0]) : null
			const endDate = parts[1] ? new Date(parts[1]) : null

			// Validate dates
			if (startDate && isNaN(startDate.getTime())) return [null, null]
			if (endDate && isNaN(endDate.getTime())) return [null, null]

			return [startDate, endDate]
		} catch {
			return [null, null]
		}
	},
	serialize: (value: [Date | null, Date | null]): string => {
		const [start, end] = value
		const startStr = start ? start.toISOString() : ""
		const endStr = end ? end.toISOString() : ""
		return `${startStr},${endStr}`
	}
})
