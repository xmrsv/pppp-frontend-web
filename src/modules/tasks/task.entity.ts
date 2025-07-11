export enum EnumTaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: EnumTaskStatus;
}
