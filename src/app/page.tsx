import { InfoNotice } from "@/components/InfoNotice";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-8 px-5 py-6">
      <InfoNotice>교육용 시뮬레이터입니다. 실제 처방이 아닙니다</InfoNotice>

      <div className="flex flex-col gap-2">
        <h1 className="text-display">유전자 맞춤 약 정보</h1>
        <p className="text-body-md text-ink-secondary">
          유전자와 유전형에 맞는 추천 약과 약 정보를 보여 줍니다
        </p>
      </div>
    </main>
  );
}
