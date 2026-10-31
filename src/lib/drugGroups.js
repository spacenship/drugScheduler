/**
 * 약학적 계열(치료 목적) 기준 분류. 시트에 없는 정보라 여기서 정한다.
 * 같은 계열은 모든 화면에서 같은 색이다.
 * @type {import("@/types").DrugGroup[]}
 */
export const DRUG_GROUPS = [
  { key: "analgesic", label: "진통제", theme: "pink", drugs: ["코데인"] },
  {
    key: "anticancer",
    label: "항암제",
    theme: "purple",
    drugs: ["카페시타빈", "이리노테칸 주사제"],
  },
  {
    key: "immunosuppressant",
    label: "면역억제제",
    theme: "orange",
    drugs: ["아자티오프린", "타크로리무스 캡슐"],
  },
  {
    key: "anti-infective",
    label: "항감염제",
    theme: "sky",
    drugs: ["에파비렌즈", "이소니아지드"],
  },
];

/**
 * 약 이름으로 계열을 찾는다. 분류에 없는 약(직접 입력한 약 포함)은 null
 * @param {string} drugName
 * @returns {import("@/types").DrugGroup | null}
 */
export function groupOf(drugName) {
  return DRUG_GROUPS.find((group) => group.drugs.includes(drugName)) ?? null;
}
