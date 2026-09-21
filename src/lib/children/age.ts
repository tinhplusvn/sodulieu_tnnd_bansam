import type { BlockId } from "./types";

export function parseIsoDate(iso: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return null;
  }
  return date;
}

export function ageFromBirthDate(iso: string, today = new Date()): number | null {
  const birth = parseIsoDate(iso);
  if (!birth) return null;
  let age = today.getFullYear() - birth.getFullYear();
  const monthDelta = today.getMonth() - birth.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age < 0 ? 0 : age;
}

export function blockFromAge(age: number): BlockId {
  if (age >= 3 && age <= 5) return "mam-non";
  if (age >= 6 && age <= 10) return "tieu-hoc";
  if (age >= 11 && age <= 15) return "thcs";
  return "khac";
}

export function suggestClass(age: number): string {
  if (age < 3) return "Nhà trẻ";
  if (age === 3) return "Mầm";
  if (age === 4) return "Chồi";
  if (age === 5) return "Lá";
  if (age >= 6 && age <= 14) return `Lớp ${age - 5}`;
  if (age === 15) return "Lớp 9";
  return "";
}

export function formatBirthDate(iso: string): string {
  const date = parseIsoDate(iso);
  if (!date) return iso;
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${date.getFullYear()}`;
}

export function isBirthdayThisMonth(iso: string, today = new Date()): boolean {
  const date = parseIsoDate(iso);
  if (!date) return false;
  return date.getMonth() === today.getMonth();
}

export function ageLabel(age: number | null): string {
  if (age === null) return "Chưa rõ tuổi";
  return `${age} tuổi`;
}
