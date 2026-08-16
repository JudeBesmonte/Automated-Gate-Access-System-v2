import { Button } from "@/core/components/ui/button"

export const Pagination = ({
	currentPage,
	totalPages,
	setCurrentPage
}: {
	currentPage: number
	totalPages: number
	setCurrentPage: (page: number) => void
}) => {
	return (
		<div className="flex justify-end">
			<Button
				variant="outline"
				className="mr-2"
				onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
				disabled={currentPage === 1}
			>
				Previous
			</Button>
			<Button
				variant="outline"
				onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
				disabled={currentPage === totalPages}
			>
				Next
			</Button>
		</div>
	)
}
