/** 복용 일정에 등록되는 약 정보 */
export interface Drug {
  id: string;
  name: string;
  dosage: string;
}

/** 복용 시간표 계산용 규칙 (data.json / gene_data.json의 schedule) */
export type Schedule =
  | { type: "daily"; timesPerDay: number; meal: MealKind; minutesAfterMeal?: number }
  | { type: "interval"; everyHours: number; meal: MealKind }
  | { type: "every_n_days"; everyDays: number; meal: MealKind };

export type MealKind = "any" | "after" | "empty";

/** data.json의 약 정보 */
export interface DrugInfo {
  drugName: string;
  ingredient: string;
  mealRelation: string;
  dosingInterval: string;
  sideEffects: string;
  source: string;
  schedule: Schedule;
}

/** gene_data.json의 유전형별 약 정보 */
export interface GeneDrugEntry extends DrugInfo {
  gene: string;
  genotype: string;
  details: string;
}

/** 유전형으로 약을 찾은 결과: 유전형 권고(gene)와 약 기본 정보(drug)를 약 이름으로 연결한다. */
export type LookupResult =
  | { status: "found"; gene: GeneDrugEntry; drug: DrugInfo }
  | { status: "no_data"; message: string; detail: string };
