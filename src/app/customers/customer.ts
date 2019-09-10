export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  invoices?: any[];
  user?: any;
  totalAmount: number;
  paidAmount: number;
  unpaidAmount: number;
}
