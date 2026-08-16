"use client"

import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getSession, signOut } from "next-auth/react"
import { toast } from "sonner"

import { signIn, signUp } from "@/features/auth/server/actions"

export const useAuthSession = () =>
	useQuery({
		queryKey: ["authSession"],
		queryFn: () => getSession()
	})

export const useSignUp = () => {
	const router = useRouter()
	return useMutation({
		mutationKey: ["signUp"],
		mutationFn: signUp,
		onSuccess: (data) => {
			toast.success(data.success)
			router.push("/sign-in")
		},
		onError: (err) => toast.error(err.message)
	})
}

export const useSignIn = () => {
	const router = useRouter()
	return useMutation({
		mutationKey: ["signIn"],
		mutationFn: signIn,
		onSuccess: (data) => {
			toast.success(data.success)
			router.refresh()
		},
		onError: (err) => toast.error(err.message)
	})
}

export const useSignOut = () => {
	return useMutation({
		mutationKey: ["signOut"],
		mutationFn: async () => await signOut(),
		onSuccess: () => {
			toast.success("Signed out successfully")
			window.location.href = "/"
		},
		onError: (err) => toast.error(err.message)
	})
}
