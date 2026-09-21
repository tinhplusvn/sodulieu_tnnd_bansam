import { z } from "zod";

export const childDraftSchema = z.object({
  fullName: z.string().trim().min(1, "Nhập họ và tên"),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Chọn ngày sinh hợp lệ"),
  gender: z.enum(["nam", "nu"]),
  fatherName: z.string(),
  motherName: z.string(),
  parentPhone: z
    .string()
    .refine((value) => {
      const compact = value.replace(/[\s.()\-]/g, "");
      if (!compact) return true;
      return /^(0\d{9}|\+84\d{9}|84\d{9})$/.test(compact);
    }, "Số điện thoại gồm 10 số, bắt đầu bằng 0"),
  hamlet: z.enum(["sam-1", "sam-2", "sam-3", "bai-ca", "khac"]),
  currentAddress: z.string(),
  block: z.enum(["mam-non", "tieu-hoc", "thcs", "khac"]),
  className: z.string(),
  notes: z.string(),
});

export type ChildDraftInput = z.infer<typeof childDraftSchema>;
