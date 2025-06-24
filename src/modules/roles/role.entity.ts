import type { User } from "../users/user.entity";

export interface Role {
  id: number;
  name: string;
  description: string | null;
  users: User[] | null;
}