import { Info } from "lucide-react";

export function InfoNotice({ children }) {
  return (
    <div className="bg-surface-muted text-body-md flex items-center gap-3 rounded-md p-4">
      <Info className="text-primary size-6 shrink-0" strokeWidth={2} aria-hidden />
      <p>{children}</p>
    </div>
  );
}
