import "pretendard/dist/web/static/pretendard.css";
import "./globals.css";
export const metadata = {
  title: {
    default: "복약 스케줄러",
    template: "%s | 복약 스케줄러",
  },
  description:
    "유전형과 생활 시간을 넣으면 결과 카드와 하루 복약 시간표를 보여 주는 교육용 시뮬레이터입니다. 실제 처방 도구가 아닙니다.",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFFFF",
};
export default function RootLayout({ children }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full justify-center">
        {/* 앱 영역: 기준 폭 390px, 최대 430px. 넓은 화면에서는 모서리 24px */}
        <div className="bg-surface flex min-h-dvh w-full max-w-[430px] flex-col min-[431px]:my-6 min-[431px]:min-h-[calc(100dvh-3rem)] min-[431px]:rounded-xl">
          {children}
        </div>
      </body>
    </html>
  );
}
