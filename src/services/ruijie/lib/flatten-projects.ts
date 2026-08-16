import type { Project } from "@prisma/client"

import type {
	GetProjectRequest,
	SubGroup
} from "@/services/ruijie/server/types"

/**
 * Creates a Project object from a SubGroup
 *
 * @param {SubGroup} group - The SubGroup to convert into a Project
 * @returns {Project} A new Project object with properties mapped from the SubGroup
 */
function createProject(group: SubGroup): Project {
	return {
		id: group.groupId.toString(),
		name: group.name,
		description: group.description,
		image: "",
		timezone: group.timezone,
		createdAt: new Date(group.createTime),
		updatedAt: new Date()
	}
}

/**
 * Recursively processes a SubGroup and its children to extract Projects
 *
 * @param {SubGroup} group - The SubGroup to process
 * @returns {Project[]} Array of Projects extracted from the SubGroup and its children
 */
function processSubGroup(group: SubGroup): Project[] {
	// Skip ROOT groups but process their children
	if (group.type === "ROOT") {
		return group.subGroups?.flatMap(processSubGroup) ?? []
	}

	const projects = [createProject(group)]

	if (group.subGroups) {
		projects.push(...group.subGroups.flatMap(processSubGroup))
	}

	return projects
}

/**
 * Ensures a value is always an array
 *
 * @template T - The type of elements in the array
 * @param {T | T[]} value - Value that might be an array or a single item
 * @returns {T[]} An array containing the value(s)
 */
function ensureArray<T>(value: T | T[]): T[] {
	return Array.isArray(value) ? value : [value]
}

/**
 * Flattens a hierarchical group structure into a list of Projects
 *
 * @param {GetProjectRequest} req - The request object containing groups data
 * @returns {Project[]} Flattened array of all Projects from the group hierarchy
 */
export function flattenProjects(req: GetProjectRequest): Project[] {
	const groups = ensureArray(req.groups)
	return groups.flatMap((group) =>
		group.subGroups ? group.subGroups.flatMap(processSubGroup) : []
	)
}
