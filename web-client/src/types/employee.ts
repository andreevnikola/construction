export interface IEmployee {
  id?: string;
  position: "obshtak" | "maistor";
  name: string;
  wage: number;
  baseline_income: number;
  created?: string;
  updated?: string;
}
