export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">DrugScheduler</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        복용 약 일정을 관리하는 웹앱입니다.
      </p>
    </main>
  );
}
