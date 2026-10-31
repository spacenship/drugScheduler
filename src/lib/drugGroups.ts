import { listDrugs } from "@/lib/drugs";
import type { Theme } from "@/lib/theme";

/** 비슷한 약끼리 묶은 계열. 같은 계열은 모든 화면에서 같은 색이다 */
export interface DrugGroup {
  key: string;
  label: string;
  theme: Theme;
  /** data.json의 drugName */
  drugs: string[];
}

/** 약학적 계열(치료 목적) 기준 분류. 시트에 없는 정보라 여기서 정한다 */
export const DRUG_GROUPS: DrugGroup[] = [
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

/** 분류에 없는 약은 회색 '기타'로 보인다 */
const OTHER: DrugGroup = { key: "other", label: "기타", theme: "gray", drugs: [] };

export function groupOf(drugName: string): DrugGroup {
  return DRUG_GROUPS.find((group) => group.drugs.includes(drugName)) ?? OTHER;
}

/** data.json에 있는 약을 계열별로 묶는다. 분류에 없는 약은 맨 끝 '기타'로 모은다 */
export function listDrugsByGroup(): { group: DrugGroup; names: string[] }[] {
  const all = listDrugs();
  const grouped = DRUG_GROUPS.map((group) => ({
    group,
    names: group.drugs.filter((name) => all.includes(name)),
  }));
  const others = all.filter((name) => groupOf(name) === OTHER);
  return [...grouped, ...(others.length > 0 ? [{ group: OTHER, names: others }] : [])].filter(
    ({ names }) => names.length > 0,
  );
}
