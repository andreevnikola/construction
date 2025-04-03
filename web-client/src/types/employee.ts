export interface IEmployee {
  id?: string;
  position: "obshtak" | "maistor";
  name: string;
  wage: number;
  baseline_income: number;
  createdAt?: string;
  updatedAt?: string;
}
