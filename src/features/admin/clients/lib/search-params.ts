import { parseAsString, parseAsTimestamp, type inferParserType } from "nuqs"
import { parseAsInteger } from "nuqs/server"

import { getSortingStateParser } from "@/core/lib/parsers"

export const clientsSearchParamsParser = {
	page: parseAsInteger.withDefault(1),
	perPage: parseAsInteger.withDefault(10),
	sort: getSortingStateParser().withDefault([]),
	name: parseAsString.withDefault(""),
	email: parseAsString.withDefault(""),
	createdAt: parseAsTimestamp,
	updatedAt: parseAsTimestamp
}

export type ClientsSearchParams = inferParserType<
	typeof clientsSearchParamsParser
>
