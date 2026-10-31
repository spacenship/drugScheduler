import { TriangleAlert } from "lucide-react";

/** 주의 문구: 빨간 아이콘 + '주의' 글자 + 문장. 색만으로 알리지 않는다 */
export function WarningNotice({ children }) {
  return (
    <div role="status" className="bg-warning-soft flex gap-3 rounded-md p-4">
      <TriangleAlert className="text-warning mt-1 size-6 shrink-0" strokeWidth={2} aria-hidden />
      <p className="text-body-lg">
        <span className="text-title-sm text-warning mr-2">주의</span>
        {children}
      </p>
    </div>
  );
}
