import NextAuth from "next-auth"

import { authConfig } from "@/services/authjs/auth.config"

export const {
	auth,
	handlers,
	signIn,
	signOut,
	unstable_update: update
} = NextAuth(authConfig)
