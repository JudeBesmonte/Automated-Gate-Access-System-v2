import { NextResponse } from "next/server"

import { catchErr } from "@/core/lib/errors"

import {
	getProject,
	getProjects
} from "@/app/(public)/playground/_server/actions"

export async function GET() {
	const [projects, error] = await catchErr(getProjects())
	if (error) {
		return NextResponse.json(error, { status: error.status })
	}
	return NextResponse.json(projects)
}

export async function POST() {
	const [projects, error] = await catchErr(getProject({ projectId: "" }))
	if (error) {
		return NextResponse.json(error, { status: error.status })
	}
	return NextResponse.json(projects)
}
