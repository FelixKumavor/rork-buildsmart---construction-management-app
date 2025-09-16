export interface Project {
  id: number;
  name: string;
  location: string;
  progress: number;
  status: "Active" | "Completed" | "On Hold";
  budget: string;
  team: number;
  startDate: string;
  endDate: string;
  statusColor: string;
}

export interface Task {
  id: number;
  title: string;
  project: string;
  assignee: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed" | "Overdue";
  dueDate: string;
  description: string;
  statusColor: string;
  priorityColor: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  project: string;
  status: "Online" | "Offline" | "On Site";
  location: string;
  phone: string;
  email: string;
  avatar: string;
  statusColor: string;
  lastSeen: string;
}

export interface Document {
  id: number;
  name: string;
  type: "Blueprint" | "Contract" | "Report" | "Photos";
  project: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
  iconColor: string;
}