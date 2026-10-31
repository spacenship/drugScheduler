/** 복용 일정에 등록되는 약 정보 */
export interface Drug {
  id: string;
  name: string;
  dosage: string;
}

/** 시간표 계산용 복용 규칙 (data.json / gene_data.json의 schedule) */
export type Schedule =
  | { type: "daily"; timesPerDay: number; meal: Meal; minutesAfterMeal?: number }
  | { type: "interval"; everyHours: number; meal: Meal; minutesAfterMeal?: number }
  | { type: "every_n_days"; everyDays: number; meal: Meal; minutesAfterMeal?: number };

/** any = 식사 무관 / after = 식후 / empty = 공복 */
export type Meal = "any" | "after" | "empty";

/** gene_data.json의 genes[유전자][유전형] 한 건 */
export interface GeneEntry {
  gene: string;
  genotype: string;
  drugName: string;
  ingredient: string;
  mealRelation: string;
  dosingInterval: string;
  sideEffects: string;
  details: string;
  source: string;
  schedule: Schedule;
}

/** 입력 화면에서 받는 값. 시각은 "HH:mm" 형식 */
export interface ScheduleInput {
  gene: string;
  genotype: string;
  wakeTime: string;
  sleepTime: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}
