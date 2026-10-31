import type { Metadata } from "next";
import { UsualScheduleView } from "@/components/UsualScheduleView";

export const metadata: Metadata = { title: "평소 복약 시간표" };

/** 평소 먹는 약을 골라 하루 시간표로 보는 화면 */
export default function UsualPage() {
  return <UsualScheduleView />;
}
