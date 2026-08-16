import { parseAsString, parseAsTimestamp, type inferParserType } from "nuqs"
import { parseAsInteger } from "nuqs/server"

import { getSortingStateParser } from "@/core/lib/parsers"

export const subscriptionParser = {
	page: parseAsInteger.withDefault(1),
	perPage: parseAsInteger.withDefault(10),
	sort: getSortingStateParser().withDefault([]),

	planName: parseAsString.withDefault(""),

	installationDate: parseAsTimestamp,
	createdAt: parseAsTimestamp,
	updatedAt: parseAsTimestamp
}
export type SubscriptionParserType = inferParserType<typeof subscriptionParser>

export const planParser = {
	page: parseAsInteger.withDefault(1),
	perPage: parseAsInteger.withDefault(10),
	sort: getSortingStateParser().withDefault([]),

	name: parseAsString.withDefault(""),

	createdAt: parseAsTimestamp,
	updatedAt: parseAsTimestamp
}
export type PlanParserType = inferParserType<typeof planParser>
