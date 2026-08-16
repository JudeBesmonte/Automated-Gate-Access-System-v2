import { type inferParserType } from "nuqs"
import {
	createSearchParamsCache,
	parseAsInteger,
	parseAsString,
	parseAsStringEnum
} from "nuqs/server"

import { getSortingStateParser, parseAsDateRange } from "@/core/lib/parsers"

import {
	PaymentStatus,
	PaymentType
} from "@/features/payment-history/server/types"

export const paymentsSearchParamsParser = {
	page: parseAsInteger.withDefault(1),
	perPage: parseAsInteger.withDefault(10),
	sort: getSortingStateParser().withDefault([]),
	name: parseAsString.withDefault(""),
	email: parseAsString.withDefault(""),
	type: parseAsStringEnum(Object.values(PaymentType)),
	status: parseAsStringEnum(Object.values(PaymentStatus)),
	date: parseAsDateRange.withDefault([null, null])
}

export const paymentsSearchParamsCache = createSearchParamsCache(
	paymentsSearchParamsParser
)

export type PaymentsSearchParams = inferParserType<
	typeof paymentsSearchParamsParser
>
