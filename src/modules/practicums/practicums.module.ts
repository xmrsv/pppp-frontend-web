import type { Company } from "../companies/company.entity";
import type { User } from "../users/user.entity";
import type { Practicum } from "./practicum.entity";
import { PracticumStatus } from "./practicum.entity";

const practicumDb: Practicum[] = [
  {
    id: 1,
    title: "Software Development Internship",
    description: "An internship focused on software development practices.",
    hours: 160,
    startDate: new Date("2023-06-01"),
    student: { id: 1, fullName: "Alice Smith" } as User,
    company: { id: 1, name: "Tech Innovations Inc." } as Company,
    status: PracticumStatus.PENDING,
  },
  {
    id: 2,
    title: "Data Science Internship",
    description: "An internship focused on data science and analytics.",
    hours: 160,
    startDate: new Date("2023-06-01"),
    student: { id: 2, fullName: "Bob Johnson" } as User,
    company: { id: 2, name: "Data Solutions Ltd." } as Company,
    status: PracticumStatus.APPROVED,
  },
];

export function getPracticums(): Practicum[] {
  return practicumDb;
}

export function getPracticumById(id: number): Practicum | undefined {
  return practicumDb.find((practicum) => practicum.id === id);
}

export function getPracticumsByStudentId(studentId: number): Practicum[] {
  return practicumDb.filter((practicum) => practicum.student.id === studentId);
}
