import { Input } from "@/core/components/ui/input"
import { SearchIcon } from "@/core/lib/icons"

interface KioskFilterProps {
	filters: { search: string }
	setFilters: (filters: { search: string }) => void
}

export const KioskFilter = ({ filters, setFilters }: KioskFilterProps) => {
	return (
		<div className="flex w-full flex-wrap items-center gap-2">
			<div className="relative max-w-xs flex-grow">
				<SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
				<Input
					className="!bg-card pl-9"
					placeholder="Search kiosks"
					value={filters.search}
					onChange={(e) => setFilters({ search: e.target.value })}
					name="search"
				/>
			</div>
		</div>
	)
}
