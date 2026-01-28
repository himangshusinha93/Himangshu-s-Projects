
import { Lead, LeadSource, LeadStatus, User, UserRole, Task, LeaveRequest, Quotation, Invoice, Expense } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Arjun Mehta', email: 'arjun@crm.com', role: UserRole.ADMIN },
  { id: 'u2', name: 'Priya Sharma', email: 'priya@crm.com', role: UserRole.SALES_MANAGER },
  { id: 'u3', name: 'Rahul Gupta', email: 'rahul@crm.com', role: UserRole.SALES_EXECUTIVE },
  { id: 'u4', name: 'Anjali Nair', email: 'anjali@crm.com', role: UserRole.SALES_EXECUTIVE },
];

export const PIPELINE_STAGES = [
  'New',
  'Qualified',
  'Contacted',
  'Quote',
  'Converted',
  'Lost'
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'L1',
    phone_number: '+91 9876543210',
    name: 'Rajesh Kumar',
    source: LeadSource.INDIAMART,
    status: LeadStatus.NEW,
    stage: 'New',
    assigned_to: 'u3',
    ai_score: 8,
    ai_summary: 'High intent buyer looking for bulk furniture for new office setup in Bangalore.',
    notes: [
      { id: 'n1', text: 'System created lead from IndiaMart inquiry.', createdAt: '2024-05-10T10:00:00Z', author: 'System' }
    ],
    worked_flag: false,
    created_at: '2024-05-10T10:00:00Z',
    last_activity_at: '2024-05-10T10:00:00Z'
  },
  {
    id: 'L2',
    phone_number: '+91 9123456789',
    name: 'Suresh Raina',
    source: LeadSource.WHATSAPP,
    status: LeadStatus.CONTACTED,
    stage: 'Contacted',
    assigned_to: 'u3',
    ai_score: 5,
    ai_summary: 'Interested in general pricing, seems to be window shopping for now.',
    notes: [
      { id: 'n2', text: 'Spoke over WhatsApp. Shared brochure.', createdAt: '2024-05-09T14:00:00Z', author: 'Rahul Gupta' }
    ],
    worked_flag: true,
    created_at: '2024-05-08T09:00:00Z',
    last_activity_at: '2024-05-09T14:00:00Z'
  },
  {
    id: 'L3',
    phone_number: '+91 8887776665',
    name: 'Meena Iyer',
    source: LeadSource.MISSED_CALL,
    status: LeadStatus.NEW,
    stage: 'New',
    assigned_to: 'u4',
    ai_score: 9,
    ai_summary: 'Repeat customer inquiry. Highly likely to convert if handled quickly.',
    notes: [],
    worked_flag: false,
    created_at: '2024-05-11T11:30:00Z',
    last_activity_at: '2024-05-11T11:30:00Z'
  }
];

export const MOCK_TASKS: Task[] = [
  { id: 't1', title: 'Follow up with Rajesh', dueDate: '2024-05-12', priority: 'High', status: 'Pending', assignedTo: 'u3', linkedEntity: 'Rajesh Kumar' },
  { id: 't2', title: 'Prepare Quote for Amit', dueDate: '2024-05-13', priority: 'Medium', status: 'In Progress', assignedTo: 'u3', linkedEntity: 'Amit Patel' },
];

export const MOCK_LEAVES: LeaveRequest[] = [
  { id: 'lv1', userId: 'u3', type: 'Sick', startDate: '2024-05-15', endDate: '2024-05-16', reason: 'Viral fever', status: 'Approved' },
];

export const MOCK_QUOTES: Quotation[] = [
  { id: 'Q101', clientId: 'L4', clientName: 'Amit Patel', total: 45000, status: 'Sent', validUntil: '2024-06-01', items: [{ name: 'Office Chairs', qty: 10, rate: 4500 }] },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-201', quotationId: 'Q101', clientName: 'Amit Patel', total: 45000, paidAmount: 20000, dueDate: '2024-05-30', status: 'Partially Paid' },
];

export const MOCK_EXPENSES: Expense[] = [
  { id: 'e1', category: 'Marketing', amount: 5000, date: '2024-05-01', paidBy: 'Arjun Mehta', remarks: 'Facebook Ad campaign' },
];
