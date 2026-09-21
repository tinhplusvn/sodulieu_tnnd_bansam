import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, SelectField, Textarea } from "@/components/ui/input";
import { ageFromBirthDate, blockFromAge, suggestClass } from "@/lib/children/age";
import { BLOCKS, CLASS_BY_BLOCK, GENDERS, HAMLETS, blockLabel } from "@/lib/children/constants";
import { childDraftSchema } from "@/lib/children/schema";
import type { ChildDraft } from "@/lib/children/types";

const emptyDraft: ChildDraft = {
  fullName: "",
  birthDate: "",
  gender: "nam",
  fatherName: "",
  motherName: "",
  parentPhone: "",
  hamlet: "sam-1",
  currentAddress: "",
  block: "khac",
  className: "",
  notes: "",
};

export function ChildForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<ChildDraft>;
  submitLabel: string;
  onSubmit: (draft: ChildDraft) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<ChildDraft>({ ...emptyDraft, ...initial });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [blockManual, setBlockManual] = useState(Boolean(initial?.block));
  const [classManual, setClassManual] = useState(Boolean(initial?.className));

  const age = useMemo(() => ageFromBirthDate(draft.birthDate), [draft.birthDate]);
  const suggestedBlock = age === null ? null : blockFromAge(age);
  const classOptions = CLASS_BY_BLOCK[draft.block];

  function patch(partial: Partial<ChildDraft>) {
    setDraft((prev) => {
      const next = { ...prev, ...partial };
      if (partial.birthDate && !blockManual) {
        const nextAge = ageFromBirthDate(partial.birthDate);
        if (nextAge !== null) {
          next.block = blockFromAge(nextAge);
          if (!classManual) next.className = suggestClass(nextAge);
        }
      }
      if (partial.block && !classManual) {
        const nextAge = ageFromBirthDate(next.birthDate);
        next.className = nextAge === null ? "" : suggestClass(nextAge);
      }
      return next;
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = childDraftSchema.safeParse(draft);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "fullName");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  }

  const today = new Date();
  const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-4">
      <Field label="Họ và tên" error={errors.fullName}>
        <Input
          value={draft.fullName}
          onChange={(e) => patch({ fullName: e.target.value })}
          placeholder="Nguyễn Văn An"
          autoComplete="name"
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Ngày sinh"
          error={errors.birthDate}
          hint={
            age === null
              ? "Khối được tính tự động theo tuổi"
              : `${age} tuổi · gợi ý ${suggestedBlock ? blockLabel(suggestedBlock) : "Khác"}`
          }
        >
          <Input
            type="date"
            value={draft.birthDate}
            max={maxDate}
            min="2005-01-01"
            onChange={(e) => patch({ birthDate: e.target.value })}
          />
        </Field>

        <Field label="Giới tính">
          <div className="grid h-12 grid-cols-2 rounded-md border border-border bg-surface-2 p-1">
            {GENDERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => patch({ gender: item.id })}
                className={
                  draft.gender === item.id
                    ? "rounded-sm bg-primary text-sm font-medium text-primary-fg"
                    : "rounded-sm text-sm font-medium text-muted"
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Tên bố">
          <Input
            value={draft.fatherName}
            onChange={(e) => patch({ fatherName: e.target.value })}
            placeholder="Họ tên bố"
          />
        </Field>
        <Field label="Tên mẹ">
          <Input
            value={draft.motherName}
            onChange={(e) => patch({ motherName: e.target.value })}
            placeholder="Họ tên mẹ"
          />
        </Field>
      </div>

      <Field label="SĐT phụ huynh" error={errors.parentPhone} hint="10 số, bắt đầu bằng 0">
        <Input
          type="tel"
          inputMode="tel"
          value={draft.parentPhone}
          onChange={(e) => patch({ parentPhone: e.target.value })}
          placeholder="0912 345 678"
        />
      </Field>

      <Field label="Địa chỉ cũ (thôn)" error={errors.hamlet}>
        <SelectField
          value={draft.hamlet}
          onChange={(e) => patch({ hamlet: e.target.value as ChildDraft["hamlet"] })}
        >
          {HAMLETS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </SelectField>
      </Field>

      <Field label="Địa chỉ hiện tại" hint="Để trống nếu vẫn ở thôn cũ">
        <Input
          value={draft.currentAddress}
          onChange={(e) => patch({ currentAddress: e.target.value })}
          placeholder="Số nhà, đường, nơi ở mới…"
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Khối"
          hint="Mầm non 3–5 · Tiểu học 6–10 · THCS đến 15 tuổi"
        >
          <SelectField
            value={draft.block}
            onChange={(e) => {
              setBlockManual(true);
              patch({ block: e.target.value as ChildDraft["block"] });
            }}
          >
            {BLOCKS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label} ({item.hint})
              </option>
            ))}
          </SelectField>
        </Field>
        <Field label="Lớp">
          <SelectField
            value={classOptions.includes(draft.className) ? draft.className : ""}
            onChange={(e) => {
              setClassManual(true);
              patch({ className: e.target.value });
            }}
          >
            <option value="">Chọn lớp</option>
            {classOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </SelectField>
        </Field>
      </div>

      {!classOptions.includes(draft.className) && draft.className ? (
        <Field label="Lớp (tùy chỉnh)">
          <Input
            value={draft.className}
            onChange={(e) => {
              setClassManual(true);
              patch({ className: e.target.value });
            }}
          />
        </Field>
      ) : (
        <Field label="Hoặc nhập tên lớp khác">
          <Input
            value={classOptions.includes(draft.className) ? "" : draft.className}
            onChange={(e) => {
              setClassManual(true);
              patch({ className: e.target.value });
            }}
            placeholder="Ví dụ: Dự bị, Giáo lý…"
          />
        </Field>
      )}

      <Field label="Ghi chú">
        <Textarea
          value={draft.notes}
          onChange={(e) => patch({ notes: e.target.value })}
          placeholder="Ghi chú thêm nếu cần"
        />
      </Field>

      <div className="sticky bottom-0 -mx-4 mt-2 flex gap-2 border-t border-border bg-bg px-4 py-3 md:static md:mx-0 md:border-0 md:bg-transparent md:px-0">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit" className="flex-1">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
