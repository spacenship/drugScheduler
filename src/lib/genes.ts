import drugData from "../../data/data.json";
import geneData from "../../data/gene_data.json";
import type { DrugInfo, GeneEntry, LookupResult, NoDataReason } from "@/types";

const genes = geneData.genes as unknown as Record<string, Record<string, GeneEntry>>;
const drugs = drugData.drugs as unknown as Record<string, DrugInfo>;
const noData = geneData.noData as { message: string; detail: string };

/** 직접 입력한 글자를 비교할 때, 공백을 없애고 소문자로 바꿔 대소문자·띄어쓰기 차이를 무시한다 */
function normalize(text: string): string {
  return text.replace(/\s+/g, "").toLowerCase();
}

/** 입력한 이름과 같은 키를 찾아 표에 적힌 원래 글자로 돌려준다. 없으면 undefined */
function findKey(record: Record<string, unknown>, name: string): string | undefined {
  const target = normalize(name);
  return Object.keys(record).find((key) => normalize(key) === target);
}

/** 입력 칸의 자동완성 제안으로 쓸 유전자명 목록 */
export function listGenes(): string[] {
  return Object.keys(genes);
}

/** 유전자에 등록된 유전형 목록. 없는 유전자면 빈 배열 */
export function listGenotypes(gene: string): string[] {
  const key = findKey(genes, gene);
  return key ? Object.keys(genes[key]) : [];
}

/** 유전자명과 유전형으로 표의 한 건을 찾는다(대소문자·띄어쓰기는 무시). 못 찾으면 null */
export function findGeneEntry(gene: string, genotype: string): GeneEntry | null {
  const geneKey = findKey(genes, gene);
  if (!geneKey) return null;
  const genotypeKey = findKey(genes[geneKey], genotype);
  return genotypeKey ? genes[geneKey][genotypeKey] : null;
}

function noDataResult(
  reason: NoDataReason,
  query: { gene: string; genotype: string },
  suggestions: string[] = [],
): LookupResult {
  return { status: "no_data", ...noData, reason, query, suggestions };
}

/** 약 이름으로 data.json의 약 기본 정보를 찾는다. 없으면 null */
export function getDrug(drugName: string): DrugInfo | null {
  return Object.hasOwn(drugs, drugName) ? drugs[drugName] : null;
}

/**
 * 유전자명과 유전형으로 추천 약을 찾고, 같은 약 이름의 기본 정보와 연결한다.
 * 못 찾으면 no_data를 돌려주고, reason에 없는 유전자인지·없는 유전형인지 담는다.
 */
export function lookupByGenotype(gene: string, genotype: string): LookupResult {
  const query = { gene: gene.trim(), genotype: genotype.trim() };

  const geneKey = findKey(genes, gene);
  if (!geneKey) return noDataResult("unknown_gene", query, listGenes());

  const entry = findGeneEntry(gene, genotype);
  if (!entry) {
    return noDataResult(
      "unknown_genotype",
      { ...query, gene: geneKey },
      Object.keys(genes[geneKey]),
    );
  }

  const drug = getDrug(entry.drugName);
  if (!drug) return noDataResult("unknown_drug", query);
  return { status: "found", gene: entry, drug };
}

/** 약 이름으로, 그 약과 연결된 유전자·유전형 목록을 찾는다 */
export function findGenesForDrug(drugName: string): GeneEntry[] {
  return Object.values(genes)
    .flatMap((byGenotype) => Object.values(byGenotype))
    .filter((entry) => entry.drugName === drugName);
}
