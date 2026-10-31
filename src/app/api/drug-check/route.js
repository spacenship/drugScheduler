import { NextResponse } from "next/server";
import { isBlockedDrugName } from "@/lib/blockedDrugs";
import { checkDrugExists } from "@/lib/drugLookup";

/** 입력 칸의 maxLength와 같다 */
const MAX_NAME_LENGTH = 50;

/**
 * GET /api/drug-check?name=타이레놀 → { status: "found" | "not_found" | "unchecked" }
 * 인증키는 서버에만 있고, 브라우저는 이 주소로만 묻는다.
 */
export async function GET(request) {
  const name = (new URL(request.url).searchParams.get("name") ?? "").trim();
  if (name === "" || name.length > MAX_NAME_LENGTH || isBlockedDrugName(name)) {
    return NextResponse.json({ status: "invalid" }, { status: 400 });
  }
  return NextResponse.json({ status: await checkDrugExists(name) });
}
