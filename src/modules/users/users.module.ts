import type { Practicum } from "../practicums/practicum.entity";
import { getPracticumById } from "../practicums/practicums.module";
import type { Role } from "../roles/role.entity";
import { getRoleById } from "../roles/roles.module";
import type { User } from "./user.entity";

const userDb: User[] = [
  {
    id: 1,
    studentCode: "S001",
    documentNumber: "12345678",
    username: "alice.smith",
    fullName: "Alice Smith",
    email: "alice@email.com",
    phoneNumber: "123-456-7890",
    isActive: true,
    password: "alice",
    roles: [getRoleById(1) as Role],
    practicums: [getPracticumById(1) as Practicum],
  },
  {
    id: 2,
    studentCode: "S002",
    documentNumber: "87654321",
    username: "bob.johnson",
    fullName: "Bob Johnson",
    email: "bob@email.com",
    phoneNumber: "098-765-4321",
    isActive: true,
    password: "bob",
    roles: [getRoleById(1) as Role],
    practicums: [getPracticumById(2) as Practicum],
  },
  {
    id: 3,
    studentCode: "ADM001",
    documentNumber: "11111111",
    username: "admin",
    fullName: "Administrator",
    email: "admin@email.com",
    phoneNumber: "111-111-1111",
    isActive: true,
    password: "admin",
    roles: [getRoleById(3) as Role],
    practicums: [],
  },
  {
    id: 4,
    studentCode: "SUP001",
    documentNumber: "22222222",
    username: "supervisor",
    fullName: "Supervisor User",
    email: "supervisor@email.com",
    phoneNumber: "222-222-2222",
    isActive: true,
    password: "supervisor",
    roles: [getRoleById(2) as Role],
    practicums: [],
  },
];

export function getUsers(): User[] {
  return userDb;
}

export function getUserById(id: number): User | undefined {
  return userDb.find((user) => user.id === id);
}

export function login(username: string, password: string): User | undefined {
  return userDb.find(
    (user) => user.username === username && user.password === password
  );
}
