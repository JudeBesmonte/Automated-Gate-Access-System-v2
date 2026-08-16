"use client"

// import { useDeleteProject } from "@/services/ruijie/lib/hooks"
import { Button } from "@/core/components/ui/button"
import { ConfirmModal } from "@/core/components/ui/confirm-modal"
import { DeleteIcon } from "@/core/lib/icons"

import { type DeleteProjectSchema } from "@/features/admin/ruijie/project/server/validations"

export const DeleteProjectButton = ({
	projectId
}: {
	projectId: DeleteProjectSchema["id"]
}) => {
	// const { mutateAsync } = useDeleteProject()

	// const handledelete = async () => {
	// 	await mutateAsync({ id: projectId })
	// }

	return (
		<ConfirmModal
			title="are you sure?"
			description="this action cannot be undone. this will permanently delete the project."
			actionLabel="delete"
			onConfirm={() => console.log("deleted " + projectId)}
			actionClassName="bg-destructive text-destructive-foreground hover:bg-destructive/90"
		>
			<Button size="sm" className="px-2" variant="ghost">
				<DeleteIcon className="size-4! shrink-0" />
			</Button>
		</ConfirmModal>
	)
}
