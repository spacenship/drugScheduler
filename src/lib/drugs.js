import drugData from "../../data/data.json";

const drugs = drugData.drugs;

/** 고를 수 있는 약 이름 목록 */
export function listDrugs() {
  return Object.keys(drugs);
}

/** 약 이름이 표와 똑같을 때만 찾는다. 못 찾으면 null(= noData) */
export function findDrug(name) {
  return drugs[name] ?? null;
}
