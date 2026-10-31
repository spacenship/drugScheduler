/**
 * 하루 시간표에 시각을 넣을 수 없는 약(예: 3주마다 맞는 주사, 하루 4번 식후)을 이유와 함께 보여 준다
 * @param {{ items: { drug: import("@/types").DrugInfo, reason: string }[] }} props
 */
export function UnschedulableList({ items }) {
  if (items.length === 0) return null;
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-title-md">시간을 정할 수 없는 약</h2>
      {items.map(({ drug, reason }) => (
        <div
          key={drug.drugName}
          className="bg-surface-muted flex flex-col items-start gap-2 rounded-lg p-5"
        >
          <span className="bg-ink-secondary text-on-primary text-badge flex h-7 items-center rounded-sm px-2.5">
            시간을 정할 수 없음
          </span>
          <span className="text-title-sm">{drug.drugName}</span>
          <span className="text-body-lg">{reason}</span>
        </div>
      ))}
    </section>
  );
}
