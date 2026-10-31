import geneData from "../../data/gene_data.json";
import type { GeneEntry } from "@/types";

const genes = geneData.genes as unknown as Record<string, Record<string, GeneEntry>>;

/** 입력 화면에서 고를 수 있는 유전자명 목록 */
export function listGenes(): string[] {
  return Object.keys(genes);
}

/** 유전자에 등록된 유전형 목록. 없는 유전자면 빈 배열 */
export function listGenotypes(gene: string): string[] {
  return Object.keys(genes[gene] ?? {});
}

/** 유전자명과 유전형이 표와 똑같을 때만 찾는다. 못 찾으면 null(= noData) */
export function findGeneEntry(gene: string, genotype: string): GeneEntry | null {
  return genes[gene]?.[genotype] ?? null;
}
