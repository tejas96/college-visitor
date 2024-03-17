export interface IRegistrationForm {
  id?: string;
  firstName: string;
  lastName: string;
  contactNo: string;
  comment?: string;
  isApproved?: boolean;
  createdAt?: number;
  updatedAt?: number;
  uid?: string;
  isRequestedByVisitor?: boolean;
  expireDays: number;
}
