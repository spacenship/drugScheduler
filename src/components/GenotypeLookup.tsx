"use client";

import { useState } from "react";
import { Pill, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGeneNames, getGenotypes, lookupByGenotype } from "@/lib/pharmacogenomics";

const geneNames = getGeneNames();

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "text-title-sm h-14 rounded-md px-4",
        selected ? "bg-primary text-on-primary" : "bg-surface-muted text-ink",
      )}
    >
      {children}
    </button>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 py-3">
      <span className="text-label text-ink-secondary">{label}</span>
      <span className="text-body-lg">{value}</span>
    </div>
  );
}

export function GenotypeLookup() {
  const [gene, setGene] = useState<string | null>(null);
  const [genotype, setGenotype] = useState<string | null>(null);

  const result = gene && genotype ? lookupByGenotype(gene, genotype) : null;

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-title-md">유전자</h2>
        <div className="grid grid-cols-2 gap-3">
          {geneNames.map((name) => (
            <Chip
              key={name}
              selected={gene === name}
              onClick={() => {
                setGene(name);
                setGenotype(null);
              }}
            >
              {name}
            </Chip>
          ))}
        </div>
      </section>

      {gene && (
        <section className="flex flex-col gap-3">
          <h2 className="text-title-md">유전형</h2>
          <div className="grid grid-cols-2 gap-3">
            {getGenotypes(gene).map((type) => (
              <Chip key={type} selected={genotype === type} onClick={() => setGenotype(type)}>
                {type}
              </Chip>
            ))}
          </div>
        </section>
      )}

      {result?.status === "found" && (
        <section className="flex flex-col gap-3" aria-live="polite">
          <h2 className="text-title-md">추천 약</h2>
          <div className="bg-green-soft flex flex-col gap-4 rounded-lg p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-2">
                <span className="bg-green-strong text-badge text-on-primary w-fit rounded-sm px-2.5 py-2">
                  {result.gene.gene} {result.gene.genotype}
                </span>
                <p className="text-display">{result.drug.drugName}</p>
                <p className="text-body-md text-ink-secondary">성분: {result.drug.ingredient}</p>
              </div>
              <div className="bg-green-strong text-on-primary flex size-12 shrink-0 items-center justify-center rounded-md">
                <Pill strokeWidth={2} aria-hidden />
              </div>
            </div>
            <p className="text-body-lg">{result.gene.details}</p>
          </div>

          <div className="bg-surface-muted divide-border flex flex-col divide-y rounded-md px-4">
            <InfoRow label="복용 간격" value={result.drug.dosingInterval} />
            <InfoRow label="식사 관계" value={result.drug.mealRelation} />
          </div>

          <div className="bg-warning-soft flex gap-3 rounded-md p-4">
            <TriangleAlert className="text-warning size-6 shrink-0" strokeWidth={2} aria-hidden />
            <p className="text-body-lg">
              <span className="text-title-sm text-warning">주의</span> {result.drug.sideEffects}
            </p>
          </div>

          <p className="text-body-md text-ink-secondary">근거: {result.drug.source}</p>
        </section>
      )}

      {result?.status === "no_data" && (
        <section className="bg-surface-muted flex flex-col gap-2 rounded-lg p-5" aria-live="polite">
          <span className="bg-ink-secondary text-badge text-on-primary w-fit rounded-sm px-2.5 py-2">
            {result.message}
          </span>
          <p className="text-body-lg">{result.detail}</p>
        </section>
      )}
    </div>
  );
}
