"use client";

import { createContext, useContext, useState } from "react";

interface UsualDrugsValue {
  selected: string[];
  setSelected: (names: string[]) => void;
}

const UsualDrugsContext = createContext<UsualDrugsValue | null>(null);

/**
 * 평소 복약 시간표에서 고른 약 이름. layout에 두면 페이지를 옮겨 다녀도(홈 ↔ 평소 복약) 남고,
 * 새로고침하면 사라진다.
 */
export function UsualDrugsProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);
  return <UsualDrugsContext value={{ selected, setSelected }}>{children}</UsualDrugsContext>;
}

export function useUsualDrugs(): UsualDrugsValue {
  const value = useContext(UsualDrugsContext);
  if (!value) throw new Error("useUsualDrugs는 UsualDrugsProvider 안에서만 쓸 수 있습니다");
  return value;
}
