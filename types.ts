
export enum UserRole {
  ADMIN = 'ADMIN',
  SALES_MANAGER = 'SALES_MANAGER',
  SALES_EXECUTIVE = 'SALES_EXECUTIVE'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export enum LeadSource {
  MISSED_CALL = 'missed_call',
  WHATSAPP = 'whatsapp',
  FACEBOOK = 'facebook',
  INDIAMART = 'indiamart',
  MANUAL = 'manual'
}

export enum LeadStatus {
  NEW = 'New',
  QUALIFIED = 'Qualified',
  CONTACTED = 'Contacted',
  QUOTE = 'Quote',
  CONVERTED = 'Converted',
  LOST = 'Lost'
}

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export interface Lead {
  id: string;
  phone_number: string;
  name: string;
  source: LeadSource;
  sub_source?: string;
  status: LeadStatus;
  stage: string;
  assigned_to?: string; // user_id
  ai_score: number; // 1-10
  ai_summary: string;
  notes: LeadNote[];
  worked_flag: boolean;
  created_at: string;
  last_activity_at: string;
}

// --- New Types ---

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo: string;
  linkedEntity?: string;
}

export interface AttendanceRecord {
  userId: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  status: 'Present' | 'Absent' | 'Half-day' | 'On Leave';
}

export interface LeaveRequest {
  id: string;
  userId: string;
  type: 'Casual' | 'Sick' | 'Paid' | 'Unpaid';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approverRemarks?: string;
}

export interface Quotation {
  id: string;
  clientId: string;
  clientName: string;
  items: { name: string; qty: number; rate: number }[];
  total: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
  validUntil: string;
}

export interface Invoice {
  id: string;
  quotationId: string;
  clientName: string;
  total: number;
  paidAmount: number;
  dueDate: string;
  status: 'Unpaid' | 'Partially Paid' | 'Paid' | 'Overdue';
}

export interface Expense {
  id: string;
  category: 'Marketing' | 'Operations' | 'Salaries' | 'Travel' | 'Software' | 'Other';
  amount: number;
  date: string;
  paidBy: string;
  remarks: string;
}

export interface Commission {
  id: string;
  userId: string;
  dealId: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Paid';
}
