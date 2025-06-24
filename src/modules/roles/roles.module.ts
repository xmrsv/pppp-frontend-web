import type { Role } from "./role.entity";

const rolesDb: Role[] = [
  {
    id: 1,
    name: "Student",
    description: "A user who is enrolled in a course or program",
    users: null,
  },
  {
    id: 2,
    name: "Supervisor",
    description: "A user who supervises students during their practicums",
    users: null,
  },
  {
    id: 3,
    name: "Admin",
    description: "Administrator with full access to all system features",
    users: null,
  },
];

export function getRoles(): Role[] {
  return rolesDb;
}

export function getRoleById(id: number): Role | undefined {
  return rolesDb.find((role) => role.id === id);
}