export interface BillingInfo {
  id: string;
  companyName: string;
  officeAddress: string;
  contactNumber: string;
  emailAddress: string;
  contactPerson?: string | null;
  designation?: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}