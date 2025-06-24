import type { Company } from "../companies/company.entity";
import type { User } from "../users/user.entity";

export enum PracticumStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface Practicum {
  id: number;
  title: string;
  description: string;
  hours: number;
  startDate: Date;
  student: User;
  company: Company;
  status: PracticumStatus
}