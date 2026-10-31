// 자료 구조 설명용 JSDoc 타입 정의. 실행 코드는 없고, 편집기에서 `import("@/types").이름`으로 가져다 쓴다.

/**
 * any = 식사 무관 / before = 식전 / after = 식후 / empty = 공복
 * @typedef {"any" | "before" | "after" | "empty"} Meal
 */

/**
 * 시간표 계산용 복용 규칙 (data.json / gene_data.json의 schedule)
 * @typedef {{ type: "daily", timesPerDay: number, meal: Meal, minutesAfterMeal?: number, minutesBeforeMeal?: number }
 *   | { type: "interval", everyHours: number, meal: Meal, minutesAfterMeal?: number, minutesBeforeMeal?: number }
 *   | { type: "every_n_days", everyDays: number, meal: Meal, minutesAfterMeal?: number, minutesBeforeMeal?: number }} Schedule
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
 * 약 이름이 실제로 있는 약인지 확인한 결과. unchecked는 확인하지 못했다는 뜻(인증키 없음·API 오류 등)이고 막지 않는다
 * @typedef {"found" | "not_found" | "unchecked"} DrugCheck
 */

/**
 * 평소 복용하는 약 한 가지
 * @typedef {object} Medication
 * @property {string} name
 * @property {number} timesPerDay
 * @property {Meal} meal
 */

/**
 * 평소 복약 입력의 생활 시간. 끼니를 거르면 그 시각이 null이다
 * @typedef {object} MedicationLifeTimes
 * @property {string} wakeTime
 * @property {string} sleepTime
 * @property {string | null} breakfast
 * @property {string | null} lunch
 * @property {string | null} dinner
 */

/**
 * 복용 약 입력 화면에서 받는 값
 * @typedef {MedicationLifeTimes & { medications: Medication[] }} MedicationScheduleInput
 */

/**
 * 하루 시간표의 복용 한 번
 * @typedef {object} DoseSlot
 * @property {number} minutes 하루 0시부터의 분. 자정을 넘기면 1440 이상
 * @property {string} time "HH:mm"
 * @property {string} note 시각을 정한 이유. 예: "아침 식사 30분 뒤"
 * @property {DoseMeal} [meal] 식후·공복 약이면 맞추는 식사
 */

/**
 * 시간표 계산 결과. 시각을 정할 수 없으면 이유를 돌려준다
 * @typedef {{ status: "ok", doses: DoseSlot[] } | { status: "unschedulable", reason: string }} ScheduleResult
 */

/**
 * 카드·배지·아이콘 타일의 색 테마
 * @typedef {"green" | "pink" | "purple" | "orange" | "sky" | "gray"} Theme
 */

/**
 * 비슷한 약끼리 묶은 계열. 같은 계열은 모든 화면에서 같은 색이다
 * @typedef {object} DrugGroup
 * @property {string} key
 * @property {string} label
 * @property {Theme} theme
 * @property {string[]} drugs data.json의 drugName
 */

/**
 * 시간표에 들어갈 약 한 번 복용
 * @typedef {{ drug: DrugInfo, dose: DoseSlot }} TimelineDose
 */

/**
 * 식후·공복 약이 맞추는 식사. when은 그 식사 전(공복)인지 뒤(식후)인지
 * @typedef {{ key: "breakfast" | "lunch" | "dinner", when: "before" | "after" }} DoseMeal
 */

/**
 * 하루 시간표의 일정 하나. 기상·식사·복용·취침을 같은 줄에 시각 순서로 놓는다.
 * minutes는 하루 0시부터의 분(자정을 넘기면 1440 이상), title은 "기상"·"아침 식사"·약 이름, note는 복용 이유
 * @typedef {{ kind: "wake" | "meal" | "dose" | "sleep", key: string, minutes: number, time: string, title: string, note?: string, meal?: DoseMeal }} TimelineItem
 */

/**
 * 시간표 화면에 그리는 줄. gap은 일정 사이의 빈 시간(minutes분, 높이 height px),
 * item은 일정 하나(showTime이 false면 앞 줄과 시각이 같아 시각을 다시 쓰지 않는다).
 * group은 식사 묶음 안에서의 위치이고 묶음이 아니면 null
 * @typedef {{ type: "gap", key: string, minutes: number, height: number, group: "middle" | null }
 *   | { type: "item", key: string, item: TimelineItem, showTime: boolean, group: "first" | "middle" | "last" | null }} TimelineRow
 */

export {};
