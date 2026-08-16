import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

import { getQueryClient } from "@/core/lib/get-query-client"

import type { UsersSearchParams } from "@/features/admin/user/lib/search-params"
import {
	addUser,
	deleteUser,
	editUser,
	getUsers
} from "@/features/admin/user/server/actions"

export const useUsers = (params: UsersSearchParams) => {
	return useQuery({
		queryKey: ["users", params],
		queryFn: () => getUsers(params)
	})
}

export const useAddUser = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["addUser"],
		mutationFn: addUser,
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Failed to add user")
		},
		onSuccess: () => toast.success("User added successfully"),
		onSettled: () => void queryClient.invalidateQueries({ queryKey: ["users"] })
	})
}

export const useEditUser = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["editUser"],
		mutationFn: editUser,
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Failed to update user")
		},
		onSuccess: () => toast.success("User updated successfully"),
		onSettled: () => void queryClient.invalidateQueries({ queryKey: ["users"] })
	})
}

export const useDeleteUser = () => {
	const queryClient = getQueryClient()

	return useMutation({
		mutationKey: ["deleteUser"],
		mutationFn: deleteUser,
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Failed to delete user")
		},
		onSuccess: () => toast.success("User deleted successfully"),
		onSettled: () => void queryClient.invalidateQueries({ queryKey: ["users"] })
	})
}
