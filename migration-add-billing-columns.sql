-- Manual Migration: Add Billing Cycle Columns to Subscription Table
-- Run this SQL in your Supabase SQL Editor when database is available

-- Add the 3 essential billing columns to subscription table
ALTER TABLE "public"."subscription" 
ADD COLUMN "billing_start_date" TIMESTAMP(3),
ADD COLUMN "next_billing_date" TIMESTAMP(3),
ADD COLUMN "grace_period_days" INTEGER NOT NULL DEFAULT 7;

-- Create indexes for better query performance
CREATE INDEX "subscription_next_billing_date_idx" ON "public"."subscription"("next_billing_date");
CREATE INDEX "subscription_billing_start_date_idx" ON "public"."subscription"("billing_start_date");

-- Update existing subscriptions to set billing_start_date = installation_date
UPDATE "public"."subscription" 
SET "billing_start_date" = "installation_date" 
WHERE "installation_date" IS NOT NULL;

-- For ACTIVE subscriptions, calculate next_billing_date
-- Monthly subscriptions: add 1 month to billing_start_date
UPDATE "public"."subscription" 
SET "next_billing_date" = "billing_start_date" + INTERVAL '1 month'
WHERE "subscription_status" = 'ACTIVE' 
  AND "billingInterval" = 'MONTHLY' 
  AND "billing_start_date" IS NOT NULL;

-- Yearly subscriptions: add 1 year to billing_start_date  
UPDATE "public"."subscription" 
SET "next_billing_date" = "billing_start_date" + INTERVAL '1 year'
WHERE "subscription_status" = 'ACTIVE' 
  AND "billingInterval" = 'YEARLY' 
  AND "billing_start_date" IS NOT NULL;

-- Verify the changes
SELECT 
  id,
  subscription_status,
  "billingInterval",
  installation_date,
  billing_start_date,
  next_billing_date,
  grace_period_days
FROM "public"."subscription" 
LIMIT 10; 