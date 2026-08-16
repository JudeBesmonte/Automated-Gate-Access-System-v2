import { headers } from "next/headers"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY!

export const getSupabaseClient = async () => {
	const headersList = await headers()
	const userId = headersList.get("X-User-ID")

	const supabase = createClient(supabaseUrl, supabaseKey, {
		global: {
			headers: { "X-User-ID": userId ?? "" }
		}
	})

	return supabase
}
