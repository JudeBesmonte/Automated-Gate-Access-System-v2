import {
	parseAsArrayOf,
	parseAsString,
	parseAsTimestamp,
	type inferParserType
} from "nuqs"
import { createSearchParamsCache, parseAsInteger } from "nuqs/server"

import { getSortingStateParser } from "@/core/lib/parsers"

export const parser = {
	page: parseAsInteger.withDefault(1),
	perPage: parseAsInteger.withDefault(10),
	sort: getSortingStateParser().withDefault([]),
	name: parseAsString.withDefault(""),
	vouchersCount: parseAsArrayOf(parseAsInteger).withDefault([]),
	createdAt: parseAsTimestamp,
	updatedAt: parseAsTimestamp
}

export type ParserType = inferParserType<typeof parser>
export const parserCache = createSearchParamsCache(parser)
