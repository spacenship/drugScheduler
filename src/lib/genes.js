import drugData from "../../data/data.json";
import geneData from "../../data/gene_data.json";

const genes = geneData.genes;
const drugs = drugData.drugs;
const noData = geneData.noData;

/** 직접 입력한 글자를 비교할 때, 공백을 없애고 소문자로 바꿔 대소문자·띄어쓰기 차이를 무시한다 */
function normalize(text) {
  return text.replace(/\s+/g, "").toLowerCase();
}

/** 입력한 이름과 같은 키를 찾아 표에 적힌 원래 글자로 돌려준다. 없으면 undefined */
function findKey(record, name) {
  const target = normalize(name);
  return Object.keys(record).find((key) => normalize(key) === target);
}

/** 입력 칸의 자동완성 제안으로 쓸 유전자명 목록 */
export function listGenes() {
  return Object.keys(genes);
}

/** 유전자에 등록된 유전형 목록. 없는 유전자면 빈 배열 */
export function listGenotypes(gene) {
  const key = findKey(genes, gene);
  return key ? Object.keys(genes[key]) : [];
}

/** 유전자명과 유전형으로 표의 한 건을 찾는다(대소문자·띄어쓰기는 무시). 못 찾으면 null */
export function findGeneEntry(gene, genotype) {
  const geneKey = findKey(genes, gene);
  if (!geneKey) return null;
  const genotypeKey = findKey(genes[geneKey], genotype);
  return genotypeKey ? genes[geneKey][genotypeKey] : null;
}

function noDataResult(reason, query) {
  return { status: "no_data", ...noData, reason, query };
}

/** data.json에 있는 약 이름 목록. 약 이름 입력의 자동완성에 쓴다 */
export function listDrugNames() {
  return Object.keys(drugs);
}

/** 약 이름으로 data.json의 약 기본 정보를 찾는다. 없으면 null */
export function getDrug(drugName) {
  return Object.hasOwn(drugs, drugName) ? drugs[drugName] : null;
}

/**
 * 유전자명과 유전형으로 추천 약을 찾고, 같은 약 이름의 기본 정보와 연결한다.
 * 못 찾으면 no_data를 돌려주고, reason에 없는 유전자인지·없는 유전형인지 담는다.
 */
export function lookupByGenotype(gene, genotype) {
  const query = { gene: gene.trim(), genotype: genotype.trim() };

  const geneKey = findKey(genes, gene);
  if (!geneKey) return noDataResult("unknown_gene", query);

  const entry = findGeneEntry(gene, genotype);
  if (!entry) {
    return noDataResult("unknown_genotype", { ...query, gene: geneKey });
  }

  const drug = getDrug(entry.drugName);
  if (!drug) return noDataResult("unknown_drug", query);
  return { status: "found", gene: entry, drug };
}

/** 약 이름으로, 그 약과 연결된 유전자·유전형 목록을 찾는다 */
export function findGenesForDrug(drugName) {
  return Object.values(genes)
    .flatMap((byGenotype) => Object.values(byGenotype))
    .filter((entry) => entry.drugName === drugName);
}
