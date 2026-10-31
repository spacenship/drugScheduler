// 자료 구조 설명용 JSDoc 타입 정의. 실행 코드는 없고, 편집기에서 `import("@/types").이름`으로 가져다 쓴다.

/**
 * any = 식사 무관 / after = 식후 / empty = 공복
 * @typedef {"any" | "after" | "empty"} Meal
 */

/**
 * 시간표 계산용 복용 규칙 (data.json / gene_data.json의 schedule)
 * @typedef {{ type: "daily", timesPerDay: number, meal: Meal, minutesAfterMeal?: number }
 *   | { type: "interval", everyHours: number, meal: Meal, minutesAfterMeal?: number }
 *   | { type: "every_n_days", everyDays: number, meal: Meal, minutesAfterMeal?: number }} Schedule
 */

/**
 * data/data.json의 drugs[약 명칭] 한 건
 * @typedef {object} DrugInfo
 * @property {string} drugName
 * @property {string} ingredient
 * @property {string} mealRelation
 * @property {string} dosingInterval
 * @property {string} sideEffects
 * @property {string} source
 * @property {Schedule} schedule
 */

/**
 * data/gene_data.json의 genes[유전자][유전형] 한 건
 * @typedef {DrugInfo & { gene: string, genotype: string, details: string }} GeneEntry
 */

/**
 * 못 찾은 이유: 표에 없는 유전자 / 있는 유전자지만 없는 유전형 / 추천 약의 기본 정보가 없음
 * @typedef {"unknown_gene" | "unknown_genotype" | "unknown_drug"} NoDataReason
 */

/**
 * 자료가 없을 때의 결과. query는 입력한 유전자·유전형(유전자는 표에 있으면 표의 글자)
 * @typedef {object} NoDataResult
 * @property {"no_data"} status
 * @property {string} message
 * @property {string} detail
 * @property {NoDataReason} reason
 * @property {{ gene: string, genotype: string }} query
 */

/**
 * 찾은 결과: 유전형 권고(gene)와 약 기본 정보(drug)를 약 이름으로 연결한다
 * @typedef {{ status: "found", gene: GeneEntry, drug: DrugInfo }} FoundResult
 */

/**
 * 유전형으로 약을 찾은 결과
 * @typedef {FoundResult | NoDataResult} LookupResult
 */

/**
 * 생활 시간. 시각은 "HH:mm" 형식
 * @typedef {object} LifeTimes
 * @property {string} wakeTime
 * @property {string} sleepTime
 * @property {string} breakfast
 * @property {string} lunch
 * @property {string} dinner
 */

/**
 * 유전형 입력 화면에서 받는 값
 * @typedef {LifeTimes & { gene: string, genotype: string }} ScheduleInput
 */

/**
 * 평소 복용하는 약 한 가지
 * @typedef {object} Medication
 * @property {string} name
 * @property {number} timesPerDay
 * @property {Meal} meal
 */

/**
 * 복용 약 입력 화면에서 받는 값
 * @typedef {LifeTimes & { medications: Medication[] }} MedicationScheduleInput
 */

/**
 * 하루 시간표의 복용 한 번
 * @typedef {object} DoseSlot
 * @property {number} minutes 하루 0시부터의 분. 자정을 넘기면 1440 이상
 * @property {string} time "HH:mm"
 * @property {string} note 시각을 정한 이유. 예: "아침 식사 30분 뒤"
 */

/**
 * 시간표 계산 결과. 시각을 정할 수 없으면 이유를 돌려준다
 * @typedef {{ status: "ok", doses: DoseSlot[] } | { status: "unschedulable", reason: string }} ScheduleResult
 */

/**
 * 평소 복약 시간표에서 하루를 나누는 복용 시점
 * @typedef {"wake" | "breakfast" | "lunch" | "dinner" | "sleep"} SlotKey
 */

/**
 * 평소 복약 시간표의 한 번 복용
 * @typedef {{ drug: DrugInfo, dose: DoseSlot }} UsualDose
 */

/**
 * 하루를 나누는 복용 시점 한 칸. time은 그 칸의 기준 생활 시각
 * @typedef {{ key: SlotKey, label: string, time: string, doses: UsualDose[] }} UsualSlot
 */

/**
 * 평소 복약 시간표. unschedulable은 하루 시간표에 시각을 넣을 수 없는 약과 그 이유
 * @typedef {{ slots: UsualSlot[], unschedulable: { drug: DrugInfo, reason: string }[] }} UsualSchedule
 */

export {};
