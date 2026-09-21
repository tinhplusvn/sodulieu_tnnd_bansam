import { ageFromBirthDate, blockFromAge, formatBirthDate, suggestClass } from "./age";
import { BLOCKS, HAMLETS, blockLabel, hamletLabel } from "./constants";
import { stripVi } from "./text";
import type { BlockId, ChildDraft, ChildRecord, Gender, HamletId } from "./types";

export const EXCEL_HEADERS = [
  "STT",
  "Họ và tên",
  "Ngày sinh",
  "Giới tính",
  "Tên bố",
  "Tên mẹ",
  "SĐT phụ huynh",
  "Địa chỉ cũ (thôn)",
  "Địa chỉ hiện tại",
  "Khối",
  "Lớp",
  "Ghi chú",
] as const;

const HEADER_ALIASES: Record<keyof ChildDraft | "stt", string[]> = {
  stt: ["stt", "so thu tu", "so", "stt."],
  fullName: ["ho va ten", "ho ten", "ten", "ho ten em", "ho va ten em", "hoten"],
  birthDate: ["ngay sinh", "ns", "dob", "nam sinh", "ngaysinh"],
  gender: ["gioi tinh", "gt"],
  fatherName: ["ten bo", "bo", "cha", "ho ten bo", "ten cha"],
  motherName: ["ten me", "me", "ho ten me"],
  parentPhone: [
    "sdt phu huynh",
    "sdt",
    "dien thoai",
    "so dien thoai",
    "dien thoai phu huynh",
    "phone",
  ],
  hamlet: ["dia chi cu", "thon", "thon dia chi cu", "dia chi cu thon"],
  currentAddress: ["dia chi hien tai", "dia chi moi", "dia chi", "dia chi chi tiet"],
  block: ["khoi", "nganh"],
  className: ["lop", "lop hoc"],
  notes: ["ghi chu", "notes", "ghichu"],
};

export type ImportIssue = { row: number; message: string };

export type ImportResult = {
  drafts: ChildDraft[];
  issues: ImportIssue[];
  skipped: number;
};

function cellString(value: unknown): string {
  if (value == null) return "";
  if (value instanceof Date) return formatBirthDate(toIsoDate(value));
  if (typeof value === "number") return String(value);
  return String(value).trim();
}

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseBirthDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return toIsoDate(value);
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    const utc = new Date(Math.round((value - 25569) * 86400 * 1000));
    return `${utc.getUTCFullYear()}-${String(utc.getUTCMonth() + 1).padStart(2, "0")}-${String(utc.getUTCDate()).padStart(2, "0")}`;
  }
  const raw = cellString(value);
  if (!raw) return "";
  const dmy = raw.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/);
  if (dmy) {
    return `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}`;
  }
  const ymd = raw.match(/^(\d{4})[/\-.](\d{1,2})[/\-.](\d{1,2})$/);
  if (ymd) {
    return `${ymd[1]}-${ymd[2].padStart(2, "0")}-${ymd[3].padStart(2, "0")}`;
  }
  return "";
}

function parseGender(value: string): Gender {
  const key = stripVi(value);
  if (["nu", "gai", "female", "f", "girl"].includes(key)) return "nu";
  return "nam";
}

function parseHamlet(value: string): HamletId {
  const key = stripVi(value);
  if (!key) return "khac";
  if (key.includes("bai ca") || key.includes("baica")) return "bai-ca";
  if (key.includes("sam 1") || key.includes("sam1")) return "sam-1";
  if (key.includes("sam 2") || key.includes("sam2")) return "sam-2";
  if (key.includes("sam 3") || key.includes("sam3")) return "sam-3";
  if (key.includes("khac")) return "khac";
  const exact = HAMLETS.find((h) => stripVi(h.label) === key || h.id === key);
  return exact?.id ?? "khac";
}

function parseBlock(value: string, age: number | null): BlockId {
  const key = stripVi(value);
  if (key.includes("mam non") || key.includes("mau giao") || key === "mn") return "mam-non";
  if (key.includes("tieu hoc") || key === "th") return "tieu-hoc";
  if (key.includes("thcs") || key.includes("trung hoc")) return "thcs";
  if (key.includes("khac")) return "khac";
  const exact = BLOCKS.find((b) => stripVi(b.label) === key);
  if (exact) return exact.id;
  return age === null ? "khac" : blockFromAge(age);
}

function mapHeaders(headerRow: unknown[]): Partial<Record<keyof ChildDraft | "stt", number>> {
  const map: Partial<Record<keyof ChildDraft | "stt", number>> = {};
  headerRow.forEach((cell, index) => {
    const key = stripVi(cellString(cell)).replace(/[():]/g, " ").replace(/\s+/g, " ").trim();
    (Object.keys(HEADER_ALIASES) as Array<keyof typeof HEADER_ALIASES>).forEach((field) => {
      if (map[field] != null) return;
      if (HEADER_ALIASES[field].some((alias) => key === alias || key.includes(alias))) {
        map[field] = index;
      }
    });
  });
  return map;
}

function looksLikeHeader(row: unknown[]): boolean {
  const joined = stripVi(row.map(cellString).join(" "));
  return joined.includes("ho") && (joined.includes("ten") || joined.includes("sinh"));
}

function defaultMap(): Record<keyof ChildDraft | "stt", number> {
  return {
    stt: 0,
    fullName: 1,
    birthDate: 2,
    gender: 3,
    fatherName: 4,
    motherName: 5,
    parentPhone: 6,
    hamlet: 7,
    currentAddress: 8,
    block: 9,
    className: 10,
    notes: 11,
  };
}

export async function parseChildrenWorkbook(file: File): Promise<ImportResult> {
  const XLSX = await import("xlsx");
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) return { drafts: [], issues: [{ row: 0, message: "File không có sheet" }], skipped: 0 };
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true, defval: "" }) as unknown[][];
  if (rows.length === 0) return { drafts: [], issues: [{ row: 0, message: "File trống" }], skipped: 0 };

  let start = 0;
  let indexMap: Partial<Record<keyof ChildDraft | "stt", number>> = defaultMap();
  if (looksLikeHeader(rows[0] ?? [])) {
    indexMap = { ...defaultMap(), ...mapHeaders(rows[0] ?? []) };
    start = 1;
  }

  const drafts: ChildDraft[] = [];
  const issues: ImportIssue[] = [];
  let skipped = 0;

  for (let i = start; i < rows.length; i += 1) {
    const row = rows[i] ?? [];
    const get = (field: keyof ChildDraft | "stt") => row[indexMap[field] ?? -1];
    const fullName = cellString(get("fullName"));
    if (!fullName) {
      const empty = row.every((cell) => cellString(cell) === "");
      if (empty) continue;
      skipped += 1;
      issues.push({ row: i + 1, message: "Thiếu họ và tên" });
      continue;
    }
    const birthDate = parseBirthDate(get("birthDate"));
    if (!birthDate) {
      skipped += 1;
      issues.push({ row: i + 1, message: `Không đọc được ngày sinh của ${fullName}` });
      continue;
    }
    const age = ageFromBirthDate(birthDate);
    const sttRaw = Number(cellString(get("stt")));
    drafts.push({
      fullName,
      birthDate,
      gender: parseGender(cellString(get("gender"))),
      fatherName: cellString(get("fatherName")),
      motherName: cellString(get("motherName")),
      parentPhone: cellString(get("parentPhone")),
      hamlet: parseHamlet(cellString(get("hamlet"))),
      currentAddress: cellString(get("currentAddress")),
      block: parseBlock(cellString(get("block")), age),
      className: cellString(get("className")) || (age === null ? "" : suggestClass(age)),
      notes: cellString(get("notes")),
      stt: Number.isFinite(sttRaw) && sttRaw > 0 ? sttRaw : undefined,
    });
  }

  return { drafts, issues, skipped };
}

function sheetRows(children: ChildRecord[]): (string | number)[][] {
  return [
    [...EXCEL_HEADERS],
    ...children.map((child) => [
      child.stt,
      child.fullName,
      formatBirthDate(child.birthDate),
      child.gender === "nu" ? "Nữ" : "Nam",
      child.fatherName,
      child.motherName,
      child.parentPhone,
      hamletLabel(child.hamlet),
      child.currentAddress,
      blockLabel(child.block),
      child.className,
      child.notes,
    ]),
  ];
}

export async function downloadChildrenExcel(children: ChildRecord[], filename: string) {
  const XLSX = await import("xlsx");
  const worksheet = XLSX.utils.aoa_to_sheet(sheetRows(children));
  worksheet["!cols"] = [6, 24, 14, 10, 22, 22, 16, 18, 24, 12, 12, 28].map((wch) => ({ wch }));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Thieu nhi");
  XLSX.writeFile(workbook, filename);
}

export async function downloadExcelTemplate() {
  const sample: ChildRecord[] = [
    {
      id: "tpl-1",
      stt: 1,
      fullName: "Nguyễn Văn An",
      birthDate: "2018-03-12",
      gender: "nam",
      fatherName: "Nguyễn Văn Bình",
      motherName: "Trần Thị Hoa",
      parentPhone: "0912345678",
      hamlet: "sam-1",
      currentAddress: "",
      block: "tieu-hoc",
      className: "Lớp 3",
      notes: "Dòng mẫu — xóa khi nhập thật",
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: "tpl-2",
      stt: 2,
      fullName: "Lê Thị Bé",
      birthDate: "2022-08-20",
      gender: "nu",
      fatherName: "Lê Văn Cường",
      motherName: "Phạm Thị Lan",
      parentPhone: "0987654321",
      hamlet: "bai-ca",
      currentAddress: "",
      block: "mam-non",
      className: "Chồi",
      notes: "",
      createdAt: 0,
      updatedAt: 0,
    },
  ];
  await downloadChildrenExcel(sample, "mau-danh-sach-thieu-nhi-ban-sam.xlsx");
}

export function exportFileName(prefix = "danh-sach-thieu-nhi-ban-sam"): string {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  return `${prefix}-${stamp}.xlsx`;
}
