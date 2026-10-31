/** 하루 복용 횟수로 고를 수 있는 값. 입력 화면의 칩과 주소의 값 검사가 같이 쓴다 */
export const TIMES_PER_DAY_OPTIONS = [1, 2, 3, 4];

/** 식후는 식사 30분 뒤로 본다(data.json의 식후 약과 같은 기준) */
const AFTER_MEAL_MINUTES = 30;
/** 식전은 식사 30분 전으로 본다 */
const BEFORE_MEAL_MINUTES = 30;

const MEAL_LABEL = {
  before: `식전 ${BEFORE_MEAL_MINUTES}분`,
  after: `식후 ${AFTER_MEAL_MINUTES}분`,
  empty: "공복",
  any: "식사 무관",
};

/**
 * 직접 입력한 약을 시간표 계산이 쓰는 약 정보로 바꾼다. 입력하지 않는 항목은 빈 글자로 둔다
 * @param {import("@/types").Medication} medication
 * @returns {import("@/types").DrugInfo}
 */
export function medicationToDrug({ name, timesPerDay, meal }) {
  return {
    drugName: name,
    ingredient: "",
    mealRelation: MEAL_LABEL[meal],
    dosingInterval: `1일 ${timesPerDay}회`,
    sideEffects: "",
    source: "",
    schedule: {
      type: "daily",
      timesPerDay,
      meal,
      ...(meal === "after" ? { minutesAfterMeal: AFTER_MEAL_MINUTES } : {}),
      ...(meal === "before" ? { minutesBeforeMeal: BEFORE_MEAL_MINUTES } : {}),
    },
  };
}
