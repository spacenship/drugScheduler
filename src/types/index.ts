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

/** data.json의 drugs[약 명칭] 한 건. 유전자와 무관한 약 기본 정보 */
export type Drug = Omit<GeneEntry, "gene" | "genotype" | "details">;

/** 생활 시간. 시각은 "HH:mm" 형식 */
export interface LifeTimes {
  wakeTime: string;
  sleepTime: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

/** 입력 화면에서 받는 값 */
export interface ScheduleInput extends LifeTimes {
  gene: string;
  genotype: string;
}

/** 하루 시간표의 복용 한 번 */
export interface DoseSlot {
  /** 하루 0시부터의 분. 자정을 넘기면 1440 이상 */
  minutes: number;
  /** "HH:mm" */
  time: string;
  /** 시각을 정한 이유. 예: "아침 식사 30분 뒤" */
  note: string;
}

/** 시간표 계산 결과. 시각을 정할 수 없으면 이유를 돌려준다 */
export type ScheduleResult =
  { status: "ok"; doses: DoseSlot[] } | { status: "unschedulable"; reason: string };
