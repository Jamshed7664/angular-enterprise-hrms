import { Injectable, signal } from '@angular/core';
import {
  AppNotification,
  AttendanceCorrectionRequest,
  AttendanceRecord,
  AuditLog,
  Candidate,
  Department,
  Employee,
  EmployeeDocument,
  Holiday,
  JobOpening,
  LeaveRequest,
  PayrollRecord,
  PerformanceReview,
  RolePermission,
  Timesheet
} from '../models/hrms.models';

@Injectable({ providedIn: 'root' })
export class MockDatabaseService {
  readonly employees = signal<Employee[]>([
    {id:1,employeeCode:'EMP-1001',firstName:'Aarav',lastName:'Sharma',email:'aarav.sharma@example.com',phone:'+91 90000 10001',department:'Engineering',designation:'Senior Software Engineer',manager:'Neha Verma',joinDate:'2023-02-13',status:'Active',location:'Bengaluru',salary:1450000,dateOfBirth:'1994-09-12',address:'Bengaluru, Karnataka',emergencyContact:'Riya Sharma · +91 90000 20001'},
    {id:2,employeeCode:'EMP-1002',firstName:'Meera',lastName:'Iyer',email:'meera.iyer@example.com',phone:'+91 90000 10002',department:'Human Resources',designation:'HR Business Partner',manager:'Vikram Rao',joinDate:'2022-08-01',status:'Active',location:'Hyderabad',salary:1180000,dateOfBirth:'1992-11-28',address:'Hyderabad, Telangana',emergencyContact:'Arun Iyer · +91 90000 20002'},
    {id:3,employeeCode:'EMP-1003',firstName:'Kabir',lastName:'Khan',email:'kabir.khan@example.com',phone:'+91 90000 10003',department:'Sales',designation:'Sales Manager',manager:'Vikram Rao',joinDate:'2021-05-17',status:'On Leave',location:'Noida',salary:1320000,dateOfBirth:'1991-04-07',address:'Noida, Uttar Pradesh',emergencyContact:'Sara Khan · +91 90000 20003'},
    {id:4,employeeCode:'EMP-1004',firstName:'Ananya',lastName:'Gupta',email:'ananya.gupta@example.com',phone:'+91 90000 10004',department:'Finance',designation:'Finance Analyst',manager:'Rohit Mehta',joinDate:'2024-01-08',status:'Active',location:'Gurugram',salary:920000,dateOfBirth:'1996-01-20',address:'Gurugram, Haryana',emergencyContact:'Nitin Gupta · +91 90000 20004'},
    {id:5,employeeCode:'EMP-1005',firstName:'Vihaan',lastName:'Patel',email:'vihaan.patel@example.com',phone:'+91 90000 10005',department:'Engineering',designation:'Frontend Engineer',manager:'Neha Verma',joinDate:'2025-06-02',status:'Active',location:'Pune',salary:980000,dateOfBirth:'1997-06-18',address:'Pune, Maharashtra',emergencyContact:'Kavya Patel · +91 90000 20005'},
    {id:6,employeeCode:'EMP-1006',firstName:'Ishita',lastName:'Singh',email:'ishita.singh@example.com',phone:'+91 90000 10006',department:'Marketing',designation:'Content Strategist',manager:'Priya Menon',joinDate:'2024-09-23',status:'Active',location:'Mumbai',salary:840000,dateOfBirth:'1995-03-14',address:'Mumbai, Maharashtra',emergencyContact:'Amit Singh · +91 90000 20006'}
  ]);

  readonly departments = signal<Department[]>([
    {id:1,name:'Engineering',code:'ENG',head:'Neha Verma',employeeCount:68,location:'Bengaluru'},
    {id:2,name:'Human Resources',code:'HR',head:'Meera Iyer',employeeCount:14,location:'Hyderabad'},
    {id:3,name:'Sales',code:'SAL',head:'Kabir Khan',employeeCount:43,location:'Noida'},
    {id:4,name:'Finance',code:'FIN',head:'Rohit Mehta',employeeCount:19,location:'Gurugram'},
    {id:5,name:'Marketing',code:'MKT',head:'Priya Menon',employeeCount:21,location:'Mumbai'}
  ]);

  readonly attendance = signal<AttendanceRecord[]>([
    {id:1,employeeId:1,employeeName:'Aarav Sharma',date:'2026-08-26',checkIn:'09:04',checkOut:'18:12',hours:8.4,status:'Present',department:'Engineering'},
    {id:2,employeeId:2,employeeName:'Meera Iyer',date:'2026-08-26',checkIn:'09:42',checkOut:'18:30',hours:8.1,status:'Late',department:'Human Resources'},
    {id:3,employeeId:3,employeeName:'Kabir Khan',date:'2026-08-26',checkIn:'—',checkOut:'—',hours:0,status:'Absent',department:'Sales'},
    {id:4,employeeId:4,employeeName:'Ananya Gupta',date:'2026-08-26',checkIn:'09:00',checkOut:'17:45',hours:8,status:'Present',department:'Finance'},
    {id:5,employeeId:5,employeeName:'Vihaan Patel',date:'2026-08-26',checkIn:'09:15',checkOut:'18:05',hours:8.2,status:'Work From Home',department:'Engineering'}
  ]);

  readonly corrections = signal<AttendanceCorrectionRequest[]>([
    {id:1,employeeName:'Vihaan Patel',date:'2026-08-24',requestedStatus:'Work From Home',reason:'Approved client support from home',status:'Pending'}
  ]);

  readonly leaveRequests = signal<LeaveRequest[]>([
    {id:1,employeeId:3,employeeName:'Kabir Khan',type:'Annual Leave',fromDate:'2026-08-25',toDate:'2026-08-28',days:4,reason:'Family travel',status:'Approved',managerComment:'Approved. Handover received.'},
    {id:2,employeeId:5,employeeName:'Vihaan Patel',type:'Sick Leave',fromDate:'2026-08-28',toDate:'2026-08-28',days:1,reason:'Medical appointment',status:'Pending'},
    {id:3,employeeId:4,employeeName:'Ananya Gupta',type:'Annual Leave',fromDate:'2026-09-03',toDate:'2026-09-04',days:2,reason:'Personal work',status:'Pending'}
  ]);

  readonly timesheets = signal<Timesheet[]>([
    {id:1,employeeId:1,employeeName:'Aarav Sharma',week:'24–30 Aug 2026',totalHours:40,billableHours:32,status:'Submitted',entries:[{id:1,date:'2026-08-24',project:'HRMS Modernization',task:'Employee module',hours:8,billable:true}]},
    {id:2,employeeId:5,employeeName:'Vihaan Patel',week:'24–30 Aug 2026',totalHours:38,billableHours:30,status:'Draft',entries:[{id:2,date:'2026-08-24',project:'Design System',task:'Responsive components',hours:7.5,billable:true}]}
  ]);

  readonly payroll = signal<PayrollRecord[]>([
    {id:1,employeeId:1,employeeName:'Aarav Sharma',month:'August 2026',basic:76000,allowances:42000,deductions:11500,netPay:106500,status:'Processed'},
    {id:2,employeeId:2,employeeName:'Meera Iyer',month:'August 2026',basic:65000,allowances:35000,deductions:9200,netPay:90800,status:'Processed'},
    {id:3,employeeId:4,employeeName:'Ananya Gupta',month:'August 2026',basic:51000,allowances:27000,deductions:7100,netPay:70900,status:'Draft'}
  ]);

  readonly performance = signal<PerformanceReview[]>([
    {id:1,employeeId:1,employeeName:'Aarav Sharma',cycle:'H1 2026',rating:4.6,manager:'Neha Verma',feedback:'Strong delivery and mentoring impact.',status:'Completed',goals:[{id:1,title:'Improve platform performance',progress:92,dueDate:'2026-09-30',status:'On Track'}]},
    {id:2,employeeId:5,employeeName:'Vihaan Patel',cycle:'H1 2026',rating:4.2,manager:'Neha Verma',feedback:'Consistent frontend quality and ownership.',status:'Completed',goals:[{id:2,title:'Complete design system migration',progress:78,dueDate:'2026-10-15',status:'On Track'}]}
  ]);

  readonly jobs = signal<JobOpening[]>([
    {id:1,title:'Senior Angular Engineer',department:'Engineering',location:'Bengaluru',type:'Full Time',openings:2,applicants:34,status:'Open',postedDate:'2026-08-10'},
    {id:2,title:'HR Operations Specialist',department:'Human Resources',location:'Hyderabad',type:'Full Time',openings:1,applicants:18,status:'Open',postedDate:'2026-08-16'},
    {id:3,title:'Account Executive',department:'Sales',location:'Noida',type:'Full Time',openings:3,applicants:41,status:'Open',postedDate:'2026-08-05'}
  ]);

  readonly candidates = signal<Candidate[]>([
    {id:1,name:'Rohan Das',email:'rohan.das@example.com',phone:'+91 90000 30001',jobTitle:'Senior Angular Engineer',stage:'Screening',experience:6,appliedDate:'2026-08-18',rating:4.4,notes:'Strong Angular and architecture background.'},
    {id:2,name:'Sneha Rao',email:'sneha.rao@example.com',phone:'+91 90000 30002',jobTitle:'Senior Angular Engineer',stage:'Interview',experience:5,appliedDate:'2026-08-19',rating:4.6,notes:'Technical round scheduled.'},
    {id:3,name:'Arjun Nair',email:'arjun.nair@example.com',phone:'+91 90000 30003',jobTitle:'Account Executive',stage:'Offer',experience:4,appliedDate:'2026-08-12',rating:4.1,notes:'Compensation discussion in progress.'}
  ]);

  readonly documents = signal<EmployeeDocument[]>([
    {id:1,employeeName:'Aarav Sharma',category:'Identity',fileName:'employee-id-proof.pdf',expiryDate:'2030-09-12',status:'Valid'},
    {id:2,employeeName:'Meera Iyer',category:'Certification',fileName:'hr-certification.pdf',expiryDate:'2026-09-18',status:'Expiring'},
    {id:3,employeeName:'Ananya Gupta',category:'Compliance',fileName:'finance-compliance.pdf',expiryDate:'2026-07-30',status:'Expired'}
  ]);

  readonly holidays = signal<Holiday[]>([
    {id:1,name:'Independence Day',date:'2026-08-15',type:'Public'},
    {id:2,name:'Gandhi Jayanti',date:'2026-10-02',type:'Public'},
    {id:3,name:'Diwali Holiday',date:'2026-11-09',type:'Company'}
  ]);

  readonly notifications = signal<AppNotification[]>([
    {id:1,title:'Leave approval pending',message:'Vihaan Patel submitted a sick leave request.',createdAt:'2026-08-26T11:30:00',read:false,type:'warning'},
    {id:2,title:'New candidate',message:'A candidate applied for Senior Angular Engineer.',createdAt:'2026-08-26T09:15:00',read:false,type:'info'},
    {id:3,title:'Payroll processed',message:'August payroll processing completed.',createdAt:'2026-08-25T17:45:00',read:true,type:'success'}
  ]);

  readonly auditLogs = signal<AuditLog[]>([
    {id:1,actor:'Meera Iyer',action:'Approved leave',module:'Leave',timestamp:'2026-08-26 10:42',details:'Approved request #1'},
    {id:2,actor:'HR Admin',action:'Updated employee',module:'Employees',timestamp:'2026-08-26 09:30',details:'Updated EMP-1005 job information'}
  ]);

  readonly rolePermissions = signal<RolePermission[]>([
    {role:'Super Admin',permissions:['all']},
    {role:'HR Manager',permissions:['employees.manage','attendance.manage','leave.approve','recruitment.manage','reports.view']},
    {role:'Manager',permissions:['team.view','attendance.approve','leave.approve','timesheet.approve','performance.manage']},
    {role:'Employee',permissions:['self.view','attendance.self','leave.self','timesheet.self','documents.self']},
    {role:'Payroll Viewer',permissions:['payroll.view','reports.payroll']}
  ]);
}
