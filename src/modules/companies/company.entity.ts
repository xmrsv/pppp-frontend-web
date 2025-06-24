import type { Practicum } from "../practicums/practicum.entity";

export interface Company {
  id: number;
  name: string;
  address: string;
  practicums: Practicum[];
}