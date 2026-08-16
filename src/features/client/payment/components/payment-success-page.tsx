"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Download, Home } from "lucide-react"
import { Button } from "@/core/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/core/components/ui/card"
import { Separator } from "@/core/components/ui/separator"

interface PaymentSuccessProps {
  orderNumber?: string
  amount?: string
  date?: string
  email?: string
}

export default function PaymentSuccessPage({
  orderNumber = "ORD-12345",
  amount = "$149.99",
  date = new Date().toLocaleDateString(),
  email = "user@example.com",
}: PaymentSuccessProps) {


  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-lg">
        <CardHeader className="pb-8 pt-8">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
              className="mb-2 rounded-full bg-green-100 p-2"
            >
              <CheckCircle className="h-12 w-12 text-green-600" strokeWidth={1.5} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-green-800"
            >
              Payment Successful!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground"
            >
              Your transaction has been completed
            </motion.p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-lg bg-muted/50 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Order Number</span>
              <span className="font-mono text-sm font-bold">{orderNumber}</span>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Amount Paid</span>
              <span className="text-lg font-bold text-green-600">{amount}</span>
            </div>
            <Separator className="my-2" />
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Date</span>
              <span className="text-sm">{date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Email</span>
              <span className="text-sm">{email}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="rounded-md bg-green-50 p-3 text-center text-sm text-green-800"
          >
            A confirmation email has been sent to your inbox
          </motion.div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 bg-muted/20 p-6">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <Home className="mr-2 h-4 w-4" /> Return to Dashboard
          </Button>
          <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" /> Receipt
            </Button>
            <Button variant="outline" className="flex-1">
              View Order <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
