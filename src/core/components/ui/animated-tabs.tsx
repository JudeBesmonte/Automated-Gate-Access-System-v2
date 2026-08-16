"use client"

import React from "react"
import { AnimatePresence, motion } from "motion/react"

import { useTabs, type Tab } from "@/core/hooks/use-tabs"
import { cn } from "@/core/lib/utils"

interface AnimatedTabsProps {
	tabs: Tab[]
	renderContent: (tab: Tab) => React.ReactNode
}

const transition = {
	type: "tween",
	ease: "easeOut",
	duration: 0.15
}

const getHoverAnimationProps = (hoveredRect: DOMRect, navRect: DOMRect) => ({
	x: hoveredRect.left - navRect.left - 10,
	y: hoveredRect.top - navRect.top - 4,
	width: hoveredRect.width + 20,
	height: hoveredRect.height + 8
})

const Tabs = ({
	tabs,
	selectedTabIndex,
	setSelectedTab
}: {
	tabs: Tab[]
	selectedTabIndex: number
	setSelectedTab: (input: [number, number]) => void
}): React.ReactElement => {
	const [buttonRefs, setButtonRefs] = React.useState<
		Array<HTMLButtonElement | null>
	>([])

	React.useEffect(() => {
		setButtonRefs((prev) => prev.slice(0, tabs.length))
	}, [tabs.length])

	const navRef = React.useRef<HTMLDivElement>(null)
	const navRect = navRef.current?.getBoundingClientRect()

	const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect()

	const [hoveredTabIndex, setHoveredTabIndex] = React.useState<number | null>(
		null
	)
	const hoveredRect = buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect()

	return (
		<nav
			ref={navRef}
			className="relative z-0 flex flex-shrink-0 items-center justify-center py-2"
			onPointerLeave={() => setHoveredTabIndex(null)}
		>
			{tabs.map((item, i) => {
				const isActive = selectedTabIndex === i

				return (
					<button
						key={item.value}
						className="relative z-20 flex h-8 cursor-pointer select-none items-center rounded-md bg-transparent px-4 text-base transition-colors"
						onPointerEnter={() => setHoveredTabIndex(i)}
						onFocus={() => setHoveredTabIndex(i)}
						onClick={() => setSelectedTab([i, i > selectedTabIndex ? 1 : -1])}
					>
						<span
							ref={(el) => {
								buttonRefs[i] = el as HTMLButtonElement
							}}
							className={cn("block", {
								"text-muted-foreground": !isActive,
								"font-semibold text-foreground": isActive
							})}
						>
							<small
								className={item.value === "danger-zone" ? "text-red-500" : ""}
							>
								{item.label}
							</small>
						</span>
					</button>
				)
			})}

			<AnimatePresence>
				{hoveredRect && navRect && (
					<motion.div
						key="hover"
						className={`absolute left-0 top-0 z-10 rounded-md ${
							hoveredTabIndex ===
							tabs.findIndex(({ value }) => value === "danger-zone")
								? "bg-red-100 dark:bg-red-500/30"
								: "bg-muted dark:bg-muted"
						}`}
						initial={{
							...getHoverAnimationProps(hoveredRect, navRect),
							opacity: 0
						}}
						animate={{
							...getHoverAnimationProps(hoveredRect, navRect),
							opacity: 1
						}}
						exit={{
							...getHoverAnimationProps(hoveredRect, navRect),
							opacity: 0
						}}
						transition={transition}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{selectedRect && navRect && (
					<motion.div
						className={`absolute bottom-0 left-0 z-10 h-[2px] ${
							selectedTabIndex ===
							tabs.findIndex(({ value }) => value === "danger-zone")
								? "bg-red-500"
								: "bg-black dark:bg-white"
						}`}
						initial={false}
						animate={{
							width: selectedRect.width + 18,
							x: `calc(${selectedRect.left - navRect.left - 9}px)`,
							opacity: 1
						}}
						transition={transition}
					/>
				)}
			</AnimatePresence>
		</nav>
	)
}

export function AnimatedTabs({ tabs, renderContent }: AnimatedTabsProps) {
	const [hookProps] = React.useState(() => {
		const initialTabId =
			tabs.find((tab) => tab.value === "home")?.value ??
			tabs[0]?.value ??
			"home"

		return {
			tabs: tabs.map(({ label, value, subRoutes }) => ({
				label,
				value,
				subRoutes
			})),
			initialTabId
		}
	})

	const framer = useTabs(hookProps)

	return (
		<div className="w-full">
			<div className="dark:border-dark-4 relative flex w-full items-center justify-between overflow-x-auto overflow-y-hidden border-b">
				<Tabs {...framer.tabProps} />
			</div>
			<AnimatePresence mode="wait">
				{framer.selectedTab && (
					<div key={framer.selectedTab.value} className="w-full">
						{renderContent(framer.selectedTab)}
					</div>
				)}
			</AnimatePresence>
		</div>
	)
}
