"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { ChoiceChip } from "@/components/ChoiceChip";
import { LifeTimeFields } from "@/components/LifeTimeFields";
import { WarningNotice } from "@/components/WarningNotice";
import { isBlockedDrugName } from "@/lib/blockedDrugs";
import { fetchDrugStatus } from "@/lib/drugCheckClient";
import { listDrugNames } from "@/lib/genes";
import { TIMES_PER_DAY_OPTIONS } from "@/lib/medications";
import { toMedicationQuery } from "@/lib/query";
import { DEFAULT_LIFE_TIMES, MEALS } from "@/lib/time";

/**
 * 입력 중인 약. 복용 횟수와 식사 관계는 고르기 전까지 null.
 * status는 약 이름이 실제로 있는지 확인한 결과: unknown(아직) / checking / found / not_found / unchecked(확인 못 함)
 */

/** 이름 입력을 멈추고 이 시간이 지나면 약이 실제로 있는지 묻는다(칸을 벗어날 때가 아니라서, 다른 버튼을 누르는 중에 화면이 밀리지 않는다) */
const CHECK_DELAY_MS = 700;

const MEAL_OPTIONS = [
  { value: "before", label: "식전" },
  { value: "after", label: "식후" },
  { value: "empty", label: "공복" },
  { value: "any", label: "상관없음" },
];

function emptyDraft(id) {
  return { id, name: "", timesPerDay: null, meal: null, status: "unknown" };
}

/** 모두 채워졌고 막아 둔 약이 아닐 때만 약 정보로 바꾼다. 약 이름은 어떤 약이든 받는다 */
function toMedication({ name, timesPerDay, meal }) {
  const trimmed = name.trim();
  if (!trimmed || isBlockedDrugName(trimmed) || timesPerDay === null || meal === null) return null;
  return { name: trimmed, timesPerDay, meal };
}

/**
 * @param {object} props
 * @param {import("@/types").MedicationScheduleInput | null} props.initial 시간표에서 돌아왔거나
 *   유전자 입력에서 넘어왔을 때 채워 둘 값. 약이 비어 있으면 생활 시간만 채운다
 */
export function MedicationForm({ initial }) {
  const router = useRouter();
  const [drafts, setDrafts] = useState(
    initial && initial.medications.length > 0
      ? initial.medications.map((med, id) => ({ id, ...med, status: "unknown" }))
      : [emptyDraft(0)],
  );
  const [times, setTimes] = useState(
    initial
      ? {
          wakeTime: initial.wakeTime,
          sleepTime: initial.sleepTime,
          breakfast: initial.breakfast,
          lunch: initial.lunch,
          dinner: initial.dinner,
        }
      : DEFAULT_LIFE_TIMES,
  );

  // 새 입력(주소에 값이 없을 때)은 화면을 떠날 때 비워서, 처음부터 다시 시작하면 빈 칸으로 열리게 한다.
  // 유전자 입력 폼과 같은 이유다(Cache Components가 떠난 페이지를 숨겨 두기만 해서 값이 남는다).
  const isNew = initial === null;
  useLayoutEffect(() => {
    if (!isNew) return;
    return () => {
      setDrafts([emptyDraft(0)]);
      setTimes(DEFAULT_LIFE_TIMES);
    };
  }, [isNew]);

  const [submitting, setSubmitting] = useState(false);
  /** 약마다 기다리는 중인 확인 시각 */
  const timers = useRef(new Map());
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // 실제로 없는 약으로 확인된 약이 있으면 시간표를 만들 수 없다
  const canSubmit =
    !submitting &&
    drafts.every((draft) => toMedication(draft) !== null && draft.status !== "not_found");

  // 식후 약이 있는데 거른 끼니가 있으면 안내한다(제출은 막지 않는다)
  const skippedMeals = MEALS.filter(({ key }) => times[key] === null).map(({ label }) => label);
  const showSkipWarning = skippedMeals.length > 0 && drafts.some((draft) => draft.meal === "after");

  function updateDraft(id, patch) {
    setDrafts((prev) => prev.map((draft) => (draft.id === id ? { ...draft, ...patch } : draft)));
  }

  function addDraft() {
    setDrafts((prev) => [...prev, emptyDraft(Math.max(...prev.map((draft) => draft.id)) + 1)]);
  }

  function removeDraft(id) {
    setDrafts((prev) => prev.filter((draft) => draft.id !== id));
  }

  /** 약 이름이 실제로 있는지 묻고 그 약의 상태에 반영한다. 막아 둔 약이나 빈 이름은 묻지 않는다 */
  async function checkDraft(id, rawName) {
    const name = rawName.trim();
    if (name === "" || isBlockedDrugName(name)) return "unknown";
    const apply = (status) =>
      setDrafts((prev) =>
        // 묻는 사이에 이름이 바뀌었으면 결과를 버린다
        prev.map((d) => (d.id === id && d.name.trim() === name ? { ...d, status } : d)),
      );
    apply("checking");
    const status = await fetchDrugStatus(name);
    apply(status);
    return status;
  }

  function changeName(id, name) {
    updateDraft(id, { name, status: "unknown" });
    clearTimeout(timers.current.get(id));
    timers.current.set(
      id,
      setTimeout(() => checkDraft(id, name), CHECK_DELAY_MS),
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const medications = drafts.map(toMedication).filter((med) => med !== null);
    if (medications.length !== drafts.length) return;

    setSubmitting(true);
    const statuses = await Promise.all(drafts.map((d) => checkDraft(d.id, d.name)));
    setSubmitting(false);
    if (statuses.includes("not_found")) return;

    router.push(`/usual/schedule?${toMedicationQuery({ medications, ...times })}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-title-md">복용하는 약</h2>
        <datalist id="drug-names">
          {listDrugNames().map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        <ul className="flex flex-col gap-3">
          {drafts.map((draft, index) => (
            <li key={draft.id} className="border-border flex flex-col gap-5 rounded-lg border p-5">
              <div className="flex min-h-11 items-center justify-between">
                <h3 className="text-title-sm">약 {index + 1}</h3>
                {drafts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDraft(draft.id)}
                    aria-label={`약 ${index + 1} 삭제`}
                    className="bg-surface-muted flex size-11 items-center justify-center rounded-md"
                  >
                    <Trash2 className="size-5" strokeWidth={2} aria-hidden />
                  </button>
                )}
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-label text-ink-secondary flex items-center justify-between">
                  약 이름
                  {draft.status === "checking" && <span role="status">확인하는 중</span>}
                </span>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  list="drug-names"
                  maxLength={50}
                  placeholder="예: 코데인"
                  value={draft.name}
                  onChange={(e) => changeName(draft.id, e.target.value)}
                  className="bg-surface-muted text-body-lg placeholder:text-ink-secondary h-14 rounded-md px-4"
                />
              </label>

              {isBlockedDrugName(draft.name) && (
                <WarningNotice>
                  이 약은 입력할 수 없어요. 마약류나 오남용 위험이 있는 약은 시간표를 만들 수
                  없어요. 처방받은 약이라면 의료진·약사와 상의하세요.
                </WarningNotice>
              )}

              {(draft.status === "not_found" || draft.status === "unchecked") && (
                <div
                  role="status"
                  className="bg-surface-muted flex flex-col items-start gap-2 rounded-md p-4"
                >
                  <span className="bg-ink-secondary text-on-primary text-badge flex h-7 items-center rounded-sm px-2.5">
                    {draft.status === "not_found" ? "찾을 수 없는 정보" : "확인하지 못함"}
                  </span>
                  <p className="text-body-md">
                    {draft.status === "not_found"
                      ? "식약처 의약품 정보에서 찾을 수 없는 약이에요. 이름을 다시 확인해 주세요. 확인되기 전에는 시간표를 만들 수 없어요."
                      : "약이 실제로 있는지 확인하지 못했어요. 입력하신 복용 횟수와 식사 관계대로 시간표를 만들어요."}
                  </p>
                </div>
              )}

              <fieldset className="min-w-0">
                <legend className="text-label text-ink-secondary mb-2">하루 복용 횟수</legend>
                <div className="grid grid-cols-4 gap-2">
                  {TIMES_PER_DAY_OPTIONS.map((count) => (
                    <ChoiceChip
                      key={count}
                      selected={draft.timesPerDay === count}
                      onClick={() => updateDraft(draft.id, { timesPerDay: count })}
                    >
                      {count}회
                    </ChoiceChip>
                  ))}
                </div>
              </fieldset>

              <fieldset className="min-w-0">
                <legend className="text-label text-ink-secondary mb-2">식사와의 관계</legend>
                <div className="grid grid-cols-2 gap-2">
                  {MEAL_OPTIONS.map(({ value, label }) => (
                    <ChoiceChip
                      key={value}
                      selected={draft.meal === value}
                      onClick={() => updateDraft(draft.id, { meal: value })}
                    >
                      {label}
                    </ChoiceChip>
                  ))}
                </div>
              </fieldset>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={addDraft}
          className="text-primary text-button flex h-12 w-full items-center justify-center gap-2"
        >
          <Plus className="size-5" strokeWidth={2} aria-hidden />약 추가
        </button>
      </section>

      <LifeTimeFields
        times={times}
        onChange={(key, value) => setTimes((prev) => ({ ...prev, [key]: value }))}
        skippableMeals
      />

      {showSkipWarning && (
        <WarningNotice>
          식후 약이 있는데 {skippedMeals.join(", ")}을 안 드세요. 식후 약은 식사 뒤에 먹는 약이라
          복용 시간을 정하기 어려울 수 있어요. 가볍게라도 드시거나 의료진·약사와 상의하세요.
        </WarningNotice>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="bg-primary text-on-primary text-button enabled:active:bg-primary-pressed disabled:bg-surface-muted disabled:text-ink-secondary h-14 w-full rounded-md"
      >
        {submitting ? "약 이름을 확인하는 중" : "시간표 만들기"}
      </button>
    </form>
  );
}
