import { Input } from "@/core/components/ui/input"
import { SearchIcon } from "@/core/lib/icons"

interface ProjectFilterProps {
	filters: {
		search: string
	}
	setFilters: (filters: { search: string }) => void
}

export const ProjectFilter = ({ filters, setFilters }: ProjectFilterProps) => {
	return (
		<div className="flex w-full flex-wrap items-center gap-2">
			<div className="relative max-w-xs flex-grow">
				<SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
				<Input
					className="border-border bg-card pl-9 dark:border-secondary dark:bg-secondary/70 dark:text-secondary-foreground"
					placeholder="Search projects"
					value={filters.search}
					onChange={(e) => setFilters({ search: e.target.value })}
					name="search"
				/>
			</div>
		</div>
	)
}
