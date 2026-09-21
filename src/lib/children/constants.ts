import type { BlockId, HamletId } from "./types";

export const HAMLETS: { id: HamletId; label: string }[] = [
  { id: "sam-1", label: "Thôn Sấm 1" },
  { id: "sam-2", label: "Thôn Sấm 2" },
  { id: "sam-3", label: "Thôn Sấm 3" },
  { id: "bai-ca", label: "Thôn Bãi Cả" },
  { id: "khac", label: "Khác" },
];

export const BLOCKS: { id: BlockId; label: string; hint: string }[] = [
  { id: "mam-non", label: "Mầm non", hint: "3–5 tuổi" },
  { id: "tieu-hoc", label: "Tiểu học", hint: "6–10 tuổi" },
  { id: "thcs", label: "THCS", hint: "11–15 tuổi" },
  { id: "khac", label: "Khác", hint: "Dưới 3 hoặc trên 15" },
];

export const CLASS_BY_BLOCK: Record<BlockId, string[]> = {
  "mam-non": ["Nhà trẻ", "Mầm", "Chồi", "Lá"],
  "tieu-hoc": ["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"],
  thcs: ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"],
  khac: ["Nhà trẻ", "Lớp 10", "Khác"],
};

export const GENDERS = [
  { id: "nam" as const, label: "Nam" },
  { id: "nu" as const, label: "Nữ" },
];

export const STORAGE_KEY = "ban-sam-thieu-nhi-v1";

export function hamletLabel(id: HamletId): string {
  return HAMLETS.find((h) => h.id === id)?.label ?? id;
}

export function blockLabel(id: BlockId): string {
  return BLOCKS.find((b) => b.id === id)?.label ?? id;
}
