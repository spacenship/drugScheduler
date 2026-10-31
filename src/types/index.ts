/** data/data.json의 drugs[약 명칭] 한 건 */
export interface DrugInfo {
  drugName: string;
  ingredient: string;
  mealRelation: string;
  dosingInterval: string;
  sideEffects: string;
  source: string;
}

/** data/gene_data.json의 genes[유전자][유전형] 한 건 */
export interface GeneEntry extends DrugInfo {
  gene: string;
  genotype: string;
  details: string;
}

/** 유전형으로 약을 찾은 결과: 유전형 권고(gene)와 약 기본 정보(drug)를 약 이름으로 연결한다 */
export type LookupResult =
  | { status: "found"; gene: GeneEntry; drug: DrugInfo }
  | { status: "no_data"; message: string; detail: string };
