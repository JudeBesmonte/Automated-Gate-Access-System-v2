import { Fragment } from "react"
import { Slot } from "@radix-ui/react-slot"

import { BreadcrumbThemeToggle } from "@/core/components/nav/breadcrumb-theme-toggle"
import { LeftSvg, RightSvg } from "@/core/components/nav/sidebar-svg"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/core/components/ui/breadcrumb"
import { Separator } from "@/core/components/ui/separator"
import { SidebarTrigger } from "@/core/components/ui/sidebar"
import { cn } from "@/core/lib/utils"

interface PageBreadcrumbProps {
	items?: {
		label: string
		url?: string
	}[]
}

export const PageBreadcrumb = ({ items }: PageBreadcrumbProps) => {
	return (
		<header className="sticky top-0 z-20 md:relative">
			<div className="h-3 border-b border-sidebar-border bg-sidebar-noise md:hidden" />
			<div className="relative h-9 w-full overflow-x-clip">
				<div className="absolute left-3 z-10 flex items-center gap-2 md:top-2">
					<SidebarTrigger className="rounded-br-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-border))] md:rounded-br-md" />
					<Separator
						orientation="vertical"
						className="mr-1.5 hidden h-4 bg-muted-foreground/30 md:block"
					/>
					{items && (
						<Breadcrumb className="hidden md:block">
							<BreadcrumbList>
								{items.map(({ label, url }, index, array) => (
									<Fragment key={index}>
										<BreadcrumbItem>
											{url ? (
												<BreadcrumbLink href={url}>{label}</BreadcrumbLink>
											) : (
												<BreadcrumbPage>{label}</BreadcrumbPage>
											)}
										</BreadcrumbItem>
										{index < array.length - 1 && <BreadcrumbSeparator />}
									</Fragment>
								))}
							</BreadcrumbList>
						</Breadcrumb>
					)}
				</div>
				<RightSvg />

				<BreadcrumbThemeToggle className="absolute right-3 z-10" />
				<LeftSvg />
			</div>
		</header>
	)
}

export const PageHeader = ({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<section
			className={cn(
				"flex flex-col items-start gap-1 px-2 pb-4 pt-2 md:px-4 md:pb-6 md:pt-4",
				className
			)}
			{...props}
		>
			{children}
		</section>
	)
}

export const PageHeaderTitle = ({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
	return (
		<h1
			className={cn(
				"text-xl font-bold leading-tight tracking-tighter md:text-2xl",
				className
			)}
			{...props}
		/>
	)
}

export const PageHeaderDescription = ({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
	return (
		<p
			className={cn(
				"text-balance text-base font-light text-muted-foreground",
				className
			)}
			{...props}
		/>
	)
}

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	asChild?: boolean
}

export const PageContainer = ({
	className,
	asChild = false,
	...props
}: PageContainerProps) => {
	const Comp = asChild ? Slot : "div"

	return (
		<Comp
			className={cn(
				"container mx-auto px-2 pt-4 md:px-4 lg:px-6 2xl:px-8",
				className
			)}
			{...props}
		/>
	)
}

interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
	asChild?: boolean
}
export const PageContent = ({
	className,
	asChild = false,
	...props
}: PageContentProps) => {
	const Comp = asChild ? Slot : "section"

	return (
		<Comp
			className={cn("flex flex-col items-start gap-4 px-2 md:px-4", className)}
			{...props}
		/>
	)
}
