"use client"

import Link from "next/link"
import { useState } from "react"

import { Badge } from "@/core/components/ui/badge"
import { Button } from "@/core/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/core/components/ui/card"
import { Separator } from "@/core/components/ui/separator"

import { PaymentHistoryTable } from "./payment-history-table"

// Mock data
const mockPayments = [
	{
		id: "PAY-001",
		date: "2024-05-15",
		amount: 89.99,
		status: "paid" as const,
		description: "Monthly Internet Service - Premium Plan",
		method: "Credit Card ****4532"
	},
	{
		id: "PAY-002",
		date: "2024-04-15",
		amount: 89.99,
		status: "paid" as const,
		description: "Monthly Internet Service - Premium Plan",
		method: "Credit Card ****4532"
	},
	{
		id: "PAY-003",
		date: "2024-03-15",
		amount: 89.99,
		status: "paid" as const,
		description: "Monthly Internet Service - Premium Plan",
		method: "Credit Card ****4532"
	},
	{
		id: "PAY-004",
		date: "2024-02-15",
		amount: 89.99,
		status: "paid" as const,
		description: "Monthly Internet Service - Premium Plan",
		method: "Credit Card ****4532"
	},
	{
		id: "PAY-005",
		date: "2024-01-15",
		amount: 89.99,
		status: "paid" as const,
		description: "Monthly Internet Service - Premium Plan",
		method: "Credit Card ****4532"
	}
]

const mockPlans = [
	{
		id: "PLAN-001",
		name: "Premium Internet",
		speed: "1000 Mbps",
		price: 89.99,
		status: "active",
		nextBilling: "2024-06-15"
	},
	{
		id: "PLAN-002",
		name: "Mobile Hotspot Add-on",
		data: "50GB",
		price: 25.0,
		status: "active",
		nextBilling: "2024-06-15"
	}
]

const currentBill = {
	amount: 114.99,
	dueDate: "2024-06-15",
	status: "pending",
	description: "Monthly service charges"
}

export default function Dashboard() {
	const [showPaymentForm, setShowPaymentForm] = useState(false)

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "paid":
				return (
					<Badge variant="secondary" className="bg-green-100 text-green-800">
						Paid
					</Badge>
				)
			case "pending":
				return (
					<Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
						Pending
					</Badge>
				)
			case "failed":
				return <Badge variant="destructive">Failed</Badge>
			default:
				return <Badge variant="outline">{status}</Badge>
		}
	}

	const isPastDue = new Date(currentBill.dueDate) < new Date()

	return (
		<div className="min-h-screen p-4 md:p-6">
			{/* Welcome Section */}
			<div className="mb-6">
				<h2 className="text-2xl font-bold tracking-tight">
					Welcome back, John!
				</h2>
				<p className="text-muted-foreground">
					Here&apos;s what&apos;s happening with your account today.
				</p>
			</div>

			<div className="mb-6 grid gap-4 md:grid-cols-1 lg:grid-cols-2">
				{/* Current Bill & Quick Pay */}
				<Card className="w-auto">
					<CardHeader>
						<CardTitle>Current Bill</CardTitle>
						<CardDescription>
							Your current billing cycle and payment status
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between rounded-lg border p-4">
							<div>
								<p className="font-medium">{currentBill.description}</p>
								<p className="text-sm text-muted-foreground">
									Due: {new Date(currentBill.dueDate).toLocaleDateString()}
								</p>
							</div>
							<div className="text-right">
								<p className="text-2xl font-bold">${currentBill.amount}</p>
								{getStatusBadge(currentBill.status)}
							</div>
						</div>

						{currentBill.status === "pending" && (
							<Card
								className={isPastDue ? "border-red-200" : "border-blue-200"}
							>
								<CardContent className="p-4">
									<div className="flex items-center justify-between">
										<div>
											<h4
												className={`font-medium ${isPastDue ? "text-red-900" : "text-blue-900"}`}
											>
												{isPastDue ? "Payment Overdue" : "Payment Due Soon"}
											</h4>
											<p
												className={`text-sm ${isPastDue ? "text-red-700" : "text-blue-700"}`}
											>
												{isPastDue
													? "Your payment is past due. Please pay now to avoid service interruption."
													: "Your monthly payment is due soon. Pay now to avoid late fees."}
											</p>
										</div>
										<Button
											className={isPastDue ? "bg-red-600 hover:bg-red-700" : ""}
											onClick={() => setShowPaymentForm(!showPaymentForm)}
										>
											Pay Now
										</Button>
									</div>
								</CardContent>
							</Card>
						)}

						{showPaymentForm && (
							<Card>
								<CardContent className="p-4">
									<h4 className="mb-3 font-medium">Quick Payment</h4>
									<div className="space-y-3">
										<div className="flex items-center justify-between text-sm">
											<span>Amount:</span>
											<span className="font-medium">${currentBill.amount}</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span>Payment Method:</span>
											<span>Credit Card ****4532</span>
										</div>
										<Separator />
										<div className="flex gap-2">
											<Button className="flex-1">Confirm Payment</Button>
											<Button
												variant="outline"
												onClick={() => setShowPaymentForm(false)}
											>
												Cancel
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						)}
					</CardContent>
				</Card>

				{/* Active Plans */}
				<Card className="w-full">
					<CardHeader>
						<CardTitle>Active Plans</CardTitle>
						<CardDescription>
							Your current service subscriptions
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{mockPlans.map((plan) => (
							<div
								key={plan.id}
								className="flex items-center justify-between rounded-lg border p-3"
							>
								<div>
									<p className="font-medium">{plan.name}</p>
									<p className="text-sm text-muted-foreground">
										{plan.speed ?? plan.data} • ${plan.price}/month
									</p>
								</div>
								<Badge
									variant="secondary"
									className="bg-green-100 text-green-800"
								>
									Active
								</Badge>
							</div>
						))}
						<Button variant="outline" className="w-full" asChild>
							<Link href="/client">Manage Plans</Link>
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Payment History */}
			<PaymentHistoryTable data={mockPayments} />
		</div>
	)
}
