import { type UserRole } from "@prisma/client"
import { compare } from "bcryptjs"
import {
	type DefaultSession,
	type NextAuthConfig,
	type Session,
	type User
} from "next-auth"
import { type DefaultJWT, type JWT } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"

import { getUserByEmail, getUserById } from "@/services/authjs/data"

import { signInSchema } from "@/features/auth/server/types"

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string
			name: string
			email: string
			image: string
			role: UserRole
		}
	}

	interface User {
		role: UserRole
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		image: string
		role: UserRole
	}
}

export const authConfig: NextAuthConfig = {
	pages: {
		signIn: "/sign-in",
		error: "/error"
	},

	callbacks: {
		async signIn({ user }) {
			const existingUser = await getUserById(user.id ?? "")
			if (!existingUser || existingUser instanceof Error) return false
			return true
		},

		async session({ token, session }) {
			if (session.user && token.sub) {
				session.user.id = token.sub
				session.user.image = token.image
				session.user.role = token.role
			}
			return session
		},

		async jwt({
			token,
			user,
			trigger,
			session
		}: {
			token: JWT
			user?: User
			trigger?: "signIn" | "signUp" | "update"
			session?: Session
		}) {
			if (trigger === "update" && session?.user) {
				if (session.user.name) token.name = session.user.name
				if (session.user.image) token.image = session.user.image
				if (session.user.email) token.email = session.user.email
				if (session.user.role) token.role = session.user.role
			}

			if (user) {
				token.sub = user.id
				token.image = user.image ?? ""
				token.role = user.role
			}

			return token
		}
	},

	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = signInSchema.safeParse({
					email: credentials?.email,
					password: credentials?.password,
					rememberMe: credentials?.rememberMe === "true"
				})

				if (!validatedFields.success) return null
				const { email, password } = validatedFields.data

				const user = await getUserByEmail(email)
				if (user instanceof Error) return null
				if (!user?.password) return null

				const isPasswordValid = await compare(password, user.password)
				if (!isPasswordValid) return null

				return user
			}
		})
	],

	session: { strategy: "jwt" }
} satisfies NextAuthConfig
