import type { Role } from "../roles/role.entity";
import type { Practicum } from "../practicums/practicum.entity";

export interface User {
  id: number;
  studentCode: string;
  documentNumber: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  password: string;

  // Muchos a Muchos
  roles: Role[];

  // Uno a Muchos
  practicums: Practicum[];
}
