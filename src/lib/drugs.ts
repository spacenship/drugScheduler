import drugData from "../../data/data.json";
import type { Drug } from "@/types";

const drugs = drugData.drugs as unknown as Record<string, Drug>;

/** 고를 수 있는 약 이름 목록 */
export function listDrugs(): string[] {
  return Object.keys(drugs);
}

/** 약 이름이 표와 똑같을 때만 찾는다. 못 찾으면 null(= noData) */
export function findDrug(name: string): Drug | null {
  return drugs[name] ?? null;
}
