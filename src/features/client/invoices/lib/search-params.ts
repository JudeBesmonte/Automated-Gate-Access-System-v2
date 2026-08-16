import { parseAsString, parseAsTimestamp, type inferParserType } from "nuqs"
import { parseAsInteger } from "nuqs/server"

import { getSortingStateParser } from "@/core/lib/parsers"

export const invoicesSearchParamsParser = {
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser().withDefault([]),
    invoiceNumber: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
    amount: parseAsString.withDefault(""),
    createdAt: parseAsTimestamp,
    dueDate: parseAsTimestamp
}

export type InvoicesSearchParams = inferParserType<
    typeof invoicesSearchParamsParser
> 