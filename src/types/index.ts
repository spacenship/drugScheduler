/** 시간표 계산용 복용 규칙 (data.json / gene_data.json의 schedule) */
export type Schedule =
  | { type: "daily"; timesPerDay: number; meal: Meal; minutesAfterMeal?: number }
  | { type: "interval"; everyHours: number; meal: Meal; minutesAfterMeal?: number }
  | { type: "every_n_days"; everyDays: number; meal: Meal; minutesAfterMeal?: number };

/** any = 식사 무관 / after = 식후 / empty = 공복 */
export type Meal = "any" | "after" | "empty";

/** data/data.json의 drugs[약 명칭] 한 건 */
export interface DrugInfo {
  drugName: string;
  ingredient: string;
  mealRelation: string;
  dosingInterval: string;
  sideEffects: string;
  source: string;
  schedule: Schedule;
}

/** data/gene_data.json의 genes[유전자][유전형] 한 건 */
export interface GeneEntry extends DrugInfo {
  gene: string;
  genotype: string;
  details: string;
}

/** 못 찾은 이유: 표에 없는 유전자 / 있는 유전자지만 없는 유전형 / 추천 약의 기본 정보가 없음 */
export type NoDataReason = "unknown_gene" | "unknown_genotype" | "unknown_drug";

/** 자료가 없을 때의 결과. suggestions는 정보가 있는 유전자(또는 유전형) 목록 */
export interface NoDataResult {
  status: "no_data";
  message: string;
  detail: string;
  reason: NoDataReason;
  query: { gene: string; genotype: string };
  suggestions: string[];
}

/** 유전형으로 약을 찾은 결과: 유전형 권고(gene)와 약 기본 정보(drug)를 약 이름으로 연결한다 */
export type LookupResult = { status: "found"; gene: GeneEntry; drug: DrugInfo } | NoDataResult;

/** 생활 시간. 시각은 "HH:mm" 형식 */
export interface LifeTimes {
  wakeTime: string;
  sleepTime: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}

/** 유전형 입력 화면에서 받는 값 */
export interface ScheduleInput extends LifeTimes {
  gene: string;
  genotype: string;
}

/** 평소 복용하는 약 한 가지 */
export interface Medication {
  name: string;
  timesPerDay: number;
  meal: Meal;
}

/** 복용 약 입력 화면에서 받는 값 */
export interface MedicationScheduleInput extends LifeTimes {
  medications: Medication[];
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
