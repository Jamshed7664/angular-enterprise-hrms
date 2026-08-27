export type UserRole = 'Super Admin' | 'HR Manager' | 'Manager' | 'Employee' | 'Payroll Viewer';
export type EmployeeStatus = 'Active' | 'Inactive' | 'On Leave' | 'Terminated';
export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Half Day' | 'Work From Home';
export type WorkflowStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
export type TimesheetStatus = 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
export type CandidateStage = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
export interface User { id:number; name:string; email:string; role:UserRole; }
export interface Employee { id:number; employeeCode:string; firstName:string; lastName:string; email:string; phone:string; department:string; designation:string; manager:string; joinDate:string; status:EmployeeStatus; location:string; salary:number; dateOfBirth:string; address:string; emergencyContact:string; }
export interface Department { id:number; name:string; code:string; head:string; employeeCount:number; location:string; }
export interface AttendanceRecord { id:number; employeeId:number; employeeName:string; date:string; checkIn:string; checkOut:string; hours:number; status:AttendanceStatus; department:string; }
export interface AttendanceCorrectionRequest { id:number; employeeName:string; date:string; requestedStatus:AttendanceStatus; reason:string; status:WorkflowStatus; }
export interface LeaveRequest { id:number; employeeId:number; employeeName:string; type:string; fromDate:string; toDate:string; days:number; reason:string; status:WorkflowStatus; managerComment?:string; }
export interface TimeEntry { id:number; date:string; project:string; task:string; hours:number; billable:boolean; }
export interface Timesheet { id:number; employeeId:number; employeeName:string; week:string; totalHours:number; billableHours:number; status:TimesheetStatus; entries:TimeEntry[]; }
export interface PayrollRecord { id:number; employeeId:number; employeeName:string; month:string; basic:number; allowances:number; deductions:number; netPay:number; status:'Draft'|'Processed'|'Paid'; }
export interface Goal { id:number; title:string; progress:number; dueDate:string; status:'On Track'|'At Risk'|'Completed'; }
export interface PerformanceReview { id:number; employeeId:number; employeeName:string; cycle:string; rating:number; manager:string; feedback:string; status:'Draft'|'In Review'|'Completed'; goals:Goal[]; }
export interface JobOpening { id:number; title:string; department:string; location:string; type:string; openings:number; applicants:number; status:'Open'|'Closed'|'On Hold'; postedDate:string; }
export interface Candidate { id:number; name:string; email:string; phone:string; jobTitle:string; stage:CandidateStage; experience:number; appliedDate:string; rating:number; notes:string; }
export interface EmployeeDocument { id:number; employeeName:string; category:string; fileName:string; expiryDate?:string; status:'Valid'|'Expiring'|'Expired'; }
export interface Holiday { id:number; name:string; date:string; type:'Public'|'Optional'|'Company'; }
export interface AppNotification { id:number; title:string; message:string; createdAt:string; read:boolean; type:'info'|'success'|'warning'; }
export interface AuditLog { id:number; actor:string; action:string; module:string; timestamp:string; details:string; }
export interface RolePermission { role:UserRole; permissions:string[]; }

export interface Permission {
  id: number;
  key: string;
  name: string;
  module: string;
}

export interface EmployeeContact {
  employeeId: number;
  type: 'Personal' | 'Work';
  email: string;
  phone: string;
}

export interface EmergencyContact {
  employeeId: number;
  name: string;
  relationship: string;
  phone: string;
}

export interface Designation {
  id: number;
  name: string;
  department: string;
  level: string;
}

export interface Team {
  id: number;
  name: string;
  department: string;
  manager: string;
  memberCount: number;
}

export interface OfficeLocation {
  id: number;
  name: string;
  city: string;
  country: string;
  employeeCount: number;
}

export interface LeaveBalance {
  employeeId: number;
  leaveType: string;
  allocated: number;
  used: number;
  available: number;
}

export interface LeaveType {
  id: number;
  name: string;
  annualAllowance: number;
  requiresApproval: boolean;
}

export interface SalaryComponent {
  id: number;
  name: string;
  type: 'Earning' | 'Deduction';
  amount: number;
}

export interface Interview {
  id: number;
  candidateId: number;
  candidateName: string;
  scheduledAt: string;
  interviewer: string;
  round: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

