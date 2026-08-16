import { parseAsString, type inferParserType } from "nuqs"
import { parseAsInteger } from "nuqs/server"

import { getSortingStateParser } from "@/core/lib/parsers"

export const subscriptionsSearchParamsParser = {
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser().withDefault([]),
    name: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
    billingCycle: parseAsString.withDefault("")
}

export type SubscriptionsSearchParams = inferParserType<
    typeof subscriptionsSearchParamsParser
> 