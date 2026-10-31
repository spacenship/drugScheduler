import drugData from "../../data/data.json";
import geneData from "../../data/gene_data.json";
import type { DrugInfo, GeneEntry, LookupResult } from "@/types";

const genes = geneData.genes as unknown as Record<string, Record<string, GeneEntry>>;
const drugs = drugData.drugs as unknown as Record<string, DrugInfo>;
const noData = geneData.noData as { message: string; detail: string };

/** 입력 화면에서 고를 수 있는 유전자명 목록 */
export function listGenes(): string[] {
  return Object.keys(genes);
}

/** 유전자에 등록된 유전형 목록. 없는 유전자면 빈 배열 */
export function listGenotypes(gene: string): string[] {
  return Object.hasOwn(genes, gene) ? Object.keys(genes[gene]) : [];
}

/** 유전자명과 유전형이 표와 똑같을 때만 찾는다. 못 찾으면 null(= noData) */
export function findGeneEntry(gene: string, genotype: string): GeneEntry | null {
  if (!Object.hasOwn(genes, gene) || !Object.hasOwn(genes[gene], genotype)) return null;
  return genes[gene][genotype];
}

/** 약 이름으로 data.json의 약 기본 정보를 찾는다. 없으면 null */
export function getDrug(drugName: string): DrugInfo | null {
  return Object.hasOwn(drugs, drugName) ? drugs[drugName] : null;
}

/**
 * 유전자명과 유전형으로 추천 약을 찾고, 같은 약 이름의 기본 정보와 연결한다.
 * 유전자명·유전형은 표와 글자가 똑같아야 하며, 못 찾으면 no_data를 돌려준다.
 */
export function lookupByGenotype(gene: string, genotype: string): LookupResult {
  const entry = findGeneEntry(gene, genotype);
  const drug = entry ? getDrug(entry.drugName) : null;
  if (!entry || !drug) return { status: "no_data", ...noData };
  return { status: "found", gene: entry, drug };
}

/** 약 이름으로, 그 약과 연결된 유전자·유전형 목록을 찾는다 */
export function findGenesForDrug(drugName: string): GeneEntry[] {
  return Object.values(genes)
    .flatMap((byGenotype) => Object.values(byGenotype))
    .filter((entry) => entry.drugName === drugName);
}
