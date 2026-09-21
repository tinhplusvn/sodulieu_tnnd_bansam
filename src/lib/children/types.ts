export type Gender = "nam" | "nu";
export type HamletId = "sam-1" | "sam-2" | "sam-3" | "bai-ca" | "khac";
export type BlockId = "mam-non" | "tieu-hoc" | "thcs" | "khac";

export type ChildRecord = {
  id: string;
  stt: number;
  fullName: string;
  birthDate: string;
  gender: Gender;
  fatherName: string;
  motherName: string;
  parentPhone: string;
  hamlet: HamletId;
  currentAddress: string;
  block: BlockId;
  className: string;
  notes: string;
  createdAt: number;
  updatedAt: number;
};

export type ChildDraft = {
  fullName: string;
  birthDate: string;
  gender: Gender;
  fatherName: string;
  motherName: string;
  parentPhone: string;
  hamlet: HamletId;
  currentAddress: string;
  block: BlockId;
  className: string;
  notes: string;
  stt?: number;
};

export type ListFilters = {
  q?: string;
  khoi?: string;
  thon?: string;
  lop?: string;
  sort?: "stt" | "ten" | "tuoi";
};
