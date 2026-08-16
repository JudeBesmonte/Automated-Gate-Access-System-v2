import {
	parseAsArrayOf,
	parseAsString,
	parseAsTimestamp,
	type inferParserType
} from "nuqs"
import { parseAsInteger } from "nuqs/server"

import { getSortingStateParser } from "@/core/lib/parsers"

export const projectSearchParamsParser = {
	page: parseAsInteger.withDefault(1),
	perPage: parseAsInteger.withDefault(10),
	sort: getSortingStateParser().withDefault([]),
	name: parseAsString.withDefault(""),
	voucherGroupsCount: parseAsArrayOf(parseAsInteger).withDefault([]),
	vouchersCount: parseAsArrayOf(parseAsInteger).withDefault([]),
	createdAt: parseAsTimestamp,
	updatedAt: parseAsTimestamp
}

export type ProjectSearchParams = inferParserType<
	typeof projectSearchParamsParser
>
