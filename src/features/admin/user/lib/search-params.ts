import { UserRole } from "@prisma/client"
import {
	parseAsString,
	parseAsStringEnum,
	parseAsTimestamp,
	type inferParserType
} from "nuqs"
import { createSearchParamsCache, parseAsInteger } from "nuqs/server"

import { getSortingStateParser } from "@/core/lib/parsers"

export const usersSearchParamsParser = {
	page: parseAsInteger.withDefault(1),
	perPage: parseAsInteger.withDefault(10),
	sort: getSortingStateParser().withDefault([]),
	name: parseAsString.withDefault(""),
	role: parseAsStringEnum(Object.values(UserRole)),
	createdAt: parseAsTimestamp,
	updatedAt: parseAsTimestamp
}

export const usersSearchParamsCache = createSearchParamsCache(
	usersSearchParamsParser
)

export type UsersSearchParams = inferParserType<typeof usersSearchParamsParser>
