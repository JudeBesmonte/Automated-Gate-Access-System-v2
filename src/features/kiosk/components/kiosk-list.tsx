"use client"

import { useState } from "react"

// import { Card, CardContent } from "@/core/components/ui/card"
// import { EmptyIcon } from "@/core/lib/icons"

import { AddKioskButton } from "@/features/kiosk/components/action/add-kiosk-button"
// import { KioskCard } from "@/features/kiosk/components/kiosk-card"
import { KioskFilter } from "@/features/kiosk/components/kiosk-filter"
import { KioskCardSkeleton } from "@/features/kiosk/components/skeleton/kiosk-card-skeleton"
import { useKiosks } from "@/features/kiosk/lib/hooks"

export const KioskList = ({ projectId }: { projectId: string }) => {
	const { isLoading } = useKiosks(projectId)

	const [filters, setFilters] = useState({
		search: ""
	})

	// const filteredKiosks = useMemo(() => {
	// 	const searchTerm = filters.search.toLowerCase()
	// 	if (!searchTerm) return data

	// 	// return data?.filter((kiosk) =>
	// 	// 	kiosk.name.toLowerCase().includes(searchTerm)
	// 	// )
	// }, [data, filters])

	// const hasKiosks = filteredKiosks && filteredKiosks.length > 0

	return (
		<>
			<div className="flex w-full justify-between">
				<KioskFilter filters={filters} setFilters={setFilters} />
				<AddKioskButton projectId={projectId} />
			</div>

			<div className="grid w-full gap-4">
				{isLoading &&
					Array.from({ length: 3 }).map((_, i) => (
						<KioskCardSkeleton key={i} />
					))}

				{/* {!isLoading && !hasKiosks && (
					<Card className="border-dashed">
						<CardContent className="flex flex-col items-center justify-center py-8 text-center">
							<EmptyIcon className="h-8 w-8 text-muted-foreground/50" />
							<h3 className="mt-4 text-lg font-semibold">No kiosks found</h3>
							<p className="mt-2 text-sm text-muted-foreground">
								Add a kiosk to get started.
							</p>
						</CardContent>
					</Card>
				)} */}

				{/* {filteredKiosks?.map((kiosk) => (
					<KioskCard key={kiosk.id} kiosk={kiosk} />
				))} */}
			</div>
		</>
	)
}
