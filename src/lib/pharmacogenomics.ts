import drugData from "../../data.json";
import geneData from "../../gene_data.json";
import type { DrugInfo, GeneDrugEntry, LookupResult } from "@/types";

const drugs = drugData.drugs as Record<string, DrugInfo>;
const genes = geneData.genes as Record<string, Record<string, GeneDrugEntry>>;

const noData = geneData.noData as { message: string; detail: string };

/** 표에 있는 유전자명 목록 */
export function getGeneNames(): string[] {
  return Object.keys(genes);
}

/** 유전자에 등록된 유전형 목록. 없는 유전자면 빈 배열 */
export function getGenotypes(gene: string): string[] {
  return Object.hasOwn(genes, gene) ? Object.keys(genes[gene]) : [];
}

/** 약 이름으로 약 기본 정보를 찾는다. 없으면 null */
export function getDrug(drugName: string): DrugInfo | null {
  return Object.hasOwn(drugs, drugName) ? drugs[drugName] : null;
}

/**
 * 유전자명과 유전형으로 추천 약을 찾고, 같은 약 이름의 기본 정보와 연결한다.
 * 유전자명·유전형은 표와 글자가 똑같아야 하며, 못 찾으면 no_data를 돌려준다.
 */
export function lookupByGenotype(gene: string, genotype: string): LookupResult {
  const entry = Object.hasOwn(genes, gene) ? genes[gene][genotype] : undefined;
  const drug = entry ? getDrug(entry.drugName) : null;
  if (!entry || !drug) return { status: "no_data", ...noData };
  return { status: "found", gene: entry, drug };
}

/** 약 이름으로, 그 약과 연결된 유전자·유전형 목록을 찾는다. */
export function findGenesForDrug(drugName: string): GeneDrugEntry[] {
  return Object.values(genes)
    .flatMap((byGenotype) => Object.values(byGenotype))
    .filter((entry) => entry.drugName === drugName);
}
