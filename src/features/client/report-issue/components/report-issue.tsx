"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, Send, Clock, Phone, MessageCircle, CreditCard, User, Package, Settings, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/core/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card"
import { Input } from "@/core/components/ui/input"
import { Label } from "@/core/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select"
import { Textarea } from "@/core/components/ui/textarea"
import { Badge } from "@/core/components/ui/badge"
import { Separator } from "@/core/components/ui/separator"

interface FormData {
  category: string
  priority: string
  subscription: string
  subject: string
  description: string
  email: string
  phone: string
}

interface FormErrors {
  [key: string]: string
}

export const ReportIssue: React.FC = () => {
  const [attachments, setAttachments] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    category: "",
    priority: "medium",
    subscription: "",
    subject: "",
    description: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.category) newErrors.category = "Please select an issue category"
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024) // 10MB limit
    
    if (files.length !== validFiles.length) {
      // Could add toast notification here
      console.warn("Some files were too large and were not added")
    }
    
    setAttachments(prev => [...prev, ...validFiles])
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
    } catch (error) {
      console.error("Failed to submit support request:", error)
      // Could add error handling here
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Support Request Submitted</h2>
            <p className="text-muted-foreground mb-6">
              We've received your support request and will get back to you soon. You should receive a confirmation email shortly.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/client">Return to Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  category: "",
                  priority: "medium",
                  subscription: "",
                  subject: "",
                  description: "",
                  email: "",
                  phone: "",
                })
                setAttachments([])
              }}>
                Submit Another Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3 mb-8">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Support Request Details</CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help us resolve your issue quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Issue Category */}
              <div className="grid gap-2">
                <Label htmlFor="category">Issue Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select the type of issue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="billing">Billing & Payments</SelectItem>
                    <SelectItem value="subscription">Subscription Management</SelectItem>
                    <SelectItem value="technical">Technical Issues</SelectItem>
                    <SelectItem value="account">Account Access</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              </div>

              {/* Priority Level */}
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value) => handleInputChange("priority", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Low - General inquiry
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Medium - Standard issue
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        High - Urgent issue
                      </div>
                    </SelectItem>
                    <SelectItem value="critical">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        Critical - Service down
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Related Subscription */}
              {/* <div className="grid gap-2">
                <Label htmlFor="subscription">Related Subscription (Optional)</Label>
                <Select 
                  value={formData.subscription} 
                  onValueChange={(value) => handleInputChange("subscription", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select affected subscription" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pro-monthly">Pro Plan - Monthly</SelectItem>
                    <SelectItem value="business-yearly">Business Plan - Yearly</SelectItem>
                    <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                    <SelectItem value="starter">Starter Plan</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

              {/* Subject */}
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input 
                  id="subject" 
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Brief description of your issue" 
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Please describe your issue in detail. Include any error messages, steps to reproduce the problem, and what you expected to happen."
                  className={`min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>

              File Attachments
              <div className="grid gap-2">
                <Label htmlFor="attachments">Attachments (Optional)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</div>
                  <Input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    Choose Files
                  </Button>
                  <div className="text-xs text-muted-foreground mt-2">
                    Max 10MB per file. Supported: JPG, PNG, PDF, DOC, TXT
                  </div>
                </div>

                {/* Attachment List */}
                {attachments.length > 0 && (
                  <div className="space-y-2 mt-4">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md border">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium truncate max-w-[200px]">{file.name}</div>
                          <Badge variant="secondary" className="text-xs">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </Badge>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeAttachment(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com" 
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567" 
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Support Request
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/client">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Support Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Need Immediate Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Live Chat</h4>
              <p className="text-sm text-muted-foreground mb-2">Available Monday-Friday, 9 AM - 6 PM EST</p>
              <Button variant="outline" size="sm" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Live Chat
              </Button>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Support
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                Call us at: <span className="font-medium">1-800-SUPPORT</span>
              </p>
              <p className="text-xs text-muted-foreground">Available for Premium and Enterprise customers</p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Common Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/help/billing" className="flex items-center gap-3 text-sm hover:text-primary transition-colors p-2 rounded hover:bg-muted/50">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                Billing and payment issues
              </Link>
              <Link href="/help/account" className="flex items-center gap-3 text-sm hover:text-primary transition-colors p-2 rounded hover:bg-muted/50">
                <User className="w-4 h-4 text-muted-foreground" />
                Account access problems
              </Link>
              <Link href="/help/subscriptions" className="flex items-center gap-3 text-sm hover:text-primary transition-colors p-2 rounded hover:bg-muted/50">
                <Package className="w-4 h-4 text-muted-foreground" />
                Managing subscriptions
              </Link>
              <Link href="/help/technical" className="flex items-center gap-3 text-sm hover:text-primary transition-colors p-2 rounded hover:bg-muted/50">
                <Settings className="w-4 h-4 text-muted-foreground" />
                Technical troubleshooting
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">Speed Issue Resolved</div>
                <div className="text-xs text-muted-foreground">Ticket #12345 • 2 days ago</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">Equipment Replacement</div>
                <div className="text-xs text-muted-foreground">Ticket #12344 • In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ReportIssue
