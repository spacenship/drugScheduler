import { redirect } from "next/navigation";

/** 복용 약 입력은 평소 복약 시간표(/usual)로 합쳤다. 예전 주소로 들어와도 같은 화면으로 보낸다 */
export default function MedicationsPage() {
  redirect("/usual");
}
