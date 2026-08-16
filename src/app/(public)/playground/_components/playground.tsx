"use client"

import { ButtonLoading } from "@/core/components/button-loading"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"

import {
	useBatchData,
	useCombinedQueries,
	useEditProjectImageUrl
	// useMySession,
	// useProject,
	// useProjects
} from "../_lib/hooks"

export const PlaygroundComponent = () => {
	// Example 1: Optimized batch fetch (fetches everything in one request)
	const {
		data: batchData,
		isLoading: batchLoading,
		isError: batchIsError,
		error: batchError
	} = useBatchData({ projectId: "7016348" })

	// Example 2: Individual queries (non-optimized approach)
	// const { data: mySession, isLoading: mySessionIsLoading } = useMySession()

	// const {
	// 	data: project,
	// 	isLoading: projectIsLoading,
	// 	error: projectError,
	// 	isError: projectIsError
	// } = useProject({ projectId: "7016348s" })

	// const {
	// 	data: projects,
	// 	isLoading: projectsIsLoading,
	// 	error: projectsError,
	// 	isError: projectsIsError
	// } = useProjects()

	const {
		data: editProjectImageUrlData,
		mutate: editProjectImageUrl,
		isPending: editProjectImageUrlIsPending
	} = useEditProjectImageUrl()

	const projectId = "7016348s"
	const [sessionQuery, projectsQuery, projectQuery] =
		useCombinedQueries(projectId)

	const {
		data: mySession,
		isLoading: sessionIsLoading,
		isError: sessionIsError,
		error: sessionError
	} = sessionQuery
	const {
		data: project,
		isLoading: projectIsLoading,
		isError: projectIsError,
		error: projectError
	} = projectQuery
	const {
		data: projects,
		isLoading: projectsIsLoading,
		isError: projectsIsError,
		error: projectsError
	} = projectsQuery

	return (
		<div className="grid grid-cols-2 gap-6">
			{/* Non-Optimized Section */}
			<div className="space-y-6">
				<h2 className="text-xl font-bold">
					Non-Optimized (Individual Queries)
				</h2>

				{/* Session Card */}
				<Card>
					{sessionIsLoading ? (
						<CardHeader>
							<CardTitle className="animate-pulse">
								My Session is Loading...
							</CardTitle>
						</CardHeader>
					) : (
						<>
							<CardHeader>
								<CardTitle>My Session</CardTitle>
								<CardDescription>
									Individual session data request
								</CardDescription>
							</CardHeader>
							<CardContent>
								{sessionIsError && (
									<p className="text-red-500">{sessionError.message}</p>
								)}
								{!sessionIsError && (
									<pre className="max-h-40 overflow-auto rounded-md border p-2">
										<code>{JSON.stringify(mySession, null, 2)}</code>
									</pre>
								)}
							</CardContent>
						</>
					)}
				</Card>

				{/* Project Card */}
				<Card>
					{projectIsLoading ? (
						<CardHeader>
							<CardTitle className="animate-pulse">
								Project is Loading...
							</CardTitle>
						</CardHeader>
					) : (
						<>
							<CardHeader>
								<CardTitle>Project</CardTitle>
								<CardDescription>
									Individual project data request
								</CardDescription>
							</CardHeader>
							<CardContent>
								{projectIsLoading ? (
									<div className="animate-pulse">Project Loading...</div>
								) : (
									<pre className="max-h-40 overflow-auto rounded-md border p-2">
										<code>{JSON.stringify(project, null, 2)}</code>
									</pre>
								)}
								{projectIsError && (
									<p className="text-red-500">{projectError.message}</p>
								)}
							</CardContent>
						</>
					)}
				</Card>

				{/* Projects Card */}
				<Card>
					{projectsIsLoading ? (
						<CardHeader>
							<CardTitle className="animate-pulse">
								Projects is Loading...
							</CardTitle>
						</CardHeader>
					) : (
						<>
							<CardHeader>
								<CardTitle>Projects</CardTitle>
								<CardDescription>
									Individual projects list request
								</CardDescription>
							</CardHeader>
							<CardContent>
								{projectsIsLoading ? (
									<div className="animate-pulse">Projects Loading...</div>
								) : (
									<pre className="max-h-40 overflow-auto rounded-md border p-2">
										<code>{JSON.stringify(projects, null, 2)}</code>
									</pre>
								)}
								{projectsIsError && (
									<p className="text-red-500">{projectsError.message}</p>
								)}
							</CardContent>
						</>
					)}
				</Card>

				{/* Update Project Image URL Card */}
				<Card>
					{editProjectImageUrlIsPending ? (
						<CardHeader>
							<CardTitle className="animate-pulse">
								Updating Project Image URL...
							</CardTitle>
						</CardHeader>
					) : (
						<>
							<CardHeader>
								<CardTitle>Update Project Image URL</CardTitle>
								<CardDescription>
									Update project image URL mutation
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ButtonLoading
									onClick={() =>
										editProjectImageUrl({
											projectId: "701634s",
											imageUrl: `${Math.random().toString(36).substring(2)}`
										})
									}
									isLoading={editProjectImageUrlIsPending}
									disabled={editProjectImageUrlIsPending}
									className="mb-4"
								>
									Update Project Image URL
								</ButtonLoading>

								<pre className="max-h-40 overflow-auto rounded-md border p-2">
									<code>
										{JSON.stringify(editProjectImageUrlData, null, 2)}
									</code>
								</pre>
							</CardContent>
						</>
					)}
				</Card>
			</div>

			{/* Optimized Section */}
			<div className="space-y-6">
				<h2 className="text-xl font-bold">Optimized (Single Batch Request)</h2>

				{/* Batch Data Card */}
				<Card>
					{batchLoading ? (
						<CardHeader>
							<CardTitle className="animate-pulse">
								Batch Request Data is Loading...
							</CardTitle>
						</CardHeader>
					) : (
						<>
							<CardHeader>
								<CardTitle>Batch Request Data</CardTitle>
								<CardDescription>
									All data in a single optimized request
								</CardDescription>
							</CardHeader>
							<CardContent>
								{batchLoading ? (
									<div className="animate-pulse">Loading all data...</div>
								) : batchIsError ? (
									<p className="text-red-500">
										{batchError?.message || "An error occurred"}
									</p>
								) : (
									<div className="space-y-6">
										<div>
											<h3 className="mb-2 text-lg font-medium">
												Batch Session:
											</h3>
											<pre className="max-h-40 overflow-auto rounded-md border p-2">
												<code>
													{JSON.stringify(batchData?.session, null, 2)}
												</code>
											</pre>
										</div>

										<div>
											<h3 className="mb-2 text-lg font-medium">
												Batch Project:
											</h3>
											<pre className="max-h-40 overflow-auto rounded-md border p-2">
												<code>
													{JSON.stringify(batchData?.project, null, 2)}
												</code>
											</pre>
										</div>

										<div>
											<h3 className="mb-2 text-lg font-medium">
												Batch Projects:
											</h3>
											<pre className="max-h-40 overflow-auto rounded-md border p-2">
												<code>
													{JSON.stringify(batchData?.projects, null, 2)}
												</code>
											</pre>
										</div>
									</div>
								)}
							</CardContent>
						</>
					)}
				</Card>
			</div>
		</div>
	)
}
