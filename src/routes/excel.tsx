import { createFileRoute } from "@tanstack/react-router";
import { Download, FileUp, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { AppFrame, PageBody, PageHeader } from "@/components/app-frame";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { BlockBadge } from "@/components/ui/badge";
import { ageFromBirthDate, formatBirthDate } from "@/lib/children/age";
import { hamletLabel } from "@/lib/children/constants";
import {
  downloadChildrenExcel,
  downloadExcelTemplate,
  exportFileName,
  parseChildrenWorkbook,
} from "@/lib/children/excel";
import { useHasHydrated } from "@/lib/children/hydrate";
import { useChildrenStore } from "@/lib/children/store";
import type { ChildDraft } from "@/lib/children/types";

export const Route = createFileRoute("/excel")({ component: ExcelPage });

function ExcelPage() {
  const hydrated = useHasHydrated();
  const children = useChildrenStore((s) => s.children);
  const appendMany = useChildrenStore((s) => s.appendMany);
  const replaceAll = useChildrenStore((s) => s.replaceAll);
  const restoreSample = useChildrenStore((s) => s.restoreSample);
  const clearAll = useChildrenStore((s) => s.clearAll);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<ChildDraft[] | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const result = await parseChildrenWorkbook(file);
      setPreview(result.drafts);
      setIssues(result.issues.map((item) => `Dòng ${item.row}: ${item.message}`));
      if (result.drafts.length === 0) {
        toast.error("Không đọc được dòng hợp lệ nào");
      } else {
        toast.success(`Đọc được ${result.drafts.length} em`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không đọc được file");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <AppFrame>
      <PageHeader title="Excel" subtitle="Nhập và xuất danh sách" />
      <PageBody>
        <section className="rounded-xl border border-border bg-surface p-4 shadow-soft">
          <h2 className="text-sm font-semibold">Xuất file</h2>
          <p className="mt-1 text-sm text-muted">
            Tải toàn bộ sổ ra Excel để in, lưu hoặc gửi cho giáo lý viên.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button
              className="flex-1"
              disabled={!hydrated || children.length === 0}
              onClick={async () => {
                await downloadChildrenExcel(children, exportFileName());
                toast.success("Đã tải file Excel");
              }}
            >
              <Download className="size-4" />
              Xuất {hydrated ? children.length : "…"} em
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={async () => {
                await downloadExcelTemplate();
                toast.success("Đã tải file mẫu");
              }}
            >
              <FileUp className="size-4" />
              Tải file mẫu
            </Button>
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-border bg-surface p-4 shadow-soft">
          <h2 className="text-sm font-semibold">Nhập từ Excel</h2>
          <p className="mt-1 text-sm text-muted">
            Cột: STT, Họ và tên, Ngày sinh, Giới tính, Tên bố, Tên mẹ, SĐT phụ huynh, Địa chỉ cũ
            (thôn), Địa chỉ hiện tại, Khối, Lớp, Ghi chú. Khối sẽ được tính lại theo tuổi nếu để
            trống.
          </p>
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            className="sr-only"
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
          <Button
            variant="soft"
            className="mt-4 w-full"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
          >
            <Upload className="size-4" />
            {busy ? "Đang đọc…" : "Chọn file Excel"}
          </Button>
          <p className="mt-2 text-xs text-subtle">
            Thôn hợp lệ: Thôn Sấm 1, Thôn Sấm 2, Thôn Sấm 3, Thôn Bãi Cả.
          </p>
        </section>

        {preview ? (
          <section className="mt-4 rounded-xl border border-border bg-surface p-4 shadow-soft">
            <h2 className="text-sm font-semibold">Xem trước ({preview.length} em)</h2>
            {issues.length > 0 ? (
              <ul className="mt-2 space-y-1 text-xs text-danger">
                {issues.slice(0, 6).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            <div className="mt-3 max-h-72 overflow-auto rounded-lg border border-border">
              <table className="w-full min-w-[36rem] text-left text-xs">
                <thead className="sticky top-0 bg-bg-warm text-muted">
                  <tr>
                    <th className="px-2 py-2 font-medium">Tên</th>
                    <th className="px-2 py-2 font-medium">Sinh</th>
                    <th className="px-2 py-2 font-medium">Khối</th>
                    <th className="px-2 py-2 font-medium">Thôn</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.slice(0, 40).map((row, index) => (
                    <tr key={`${row.fullName}-${index}`} className="border-t border-border">
                      <td className="px-2 py-2 font-medium">{row.fullName}</td>
                      <td className="px-2 py-2 tabular-nums">
                        {formatBirthDate(row.birthDate)}
                        {ageFromBirthDate(row.birthDate) != null
                          ? ` · ${ageFromBirthDate(row.birthDate)}t`
                          : ""}
                      </td>
                      <td className="px-2 py-2">
                        <BlockBadge block={row.block} />
                      </td>
                      <td className="px-2 py-2">{hamletLabel(row.hamlet)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button
                onClick={() => {
                  const added = appendMany(preview);
                  setPreview(null);
                  toast.success(`Đã thêm ${added} em vào sổ`);
                }}
              >
                Thêm vào danh sách
              </Button>
              <Button variant="outline" onClick={() => setConfirmReplace(true)}>
                Thay thế toàn bộ sổ
              </Button>
            </div>
          </section>
        ) : null}

        <section className="mt-4 rounded-xl border border-border bg-surface p-4 shadow-soft">
          <h2 className="text-sm font-semibold">Dữ liệu trên máy</h2>
          <p className="mt-1 text-sm text-muted">
            Sổ lưu trên điện thoại này. Xóa dữ liệu trình duyệt sẽ mất sổ — hãy xuất Excel để sao
            lưu.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="flex-1" onClick={() => restoreSample()}>
              Khôi phục dữ liệu mẫu
            </Button>
            <Button variant="danger" className="flex-1" onClick={() => setConfirmClear(true)}>
              <Trash2 className="size-4" />
              Xóa hết sổ
            </Button>
          </div>
        </section>
      </PageBody>

      <ConfirmDialog
        open={confirmReplace}
        danger
        title="Thay thế toàn bộ sổ?"
        description="Danh sách hiện tại sẽ bị xóa và thay bằng file vừa chọn."
        confirmLabel="Thay thế"
        onClose={() => setConfirmReplace(false)}
        onConfirm={() => {
          if (!preview) return;
          const count = replaceAll(preview);
          setPreview(null);
          toast.success(`Đã thay sổ bằng ${count} em`);
        }}
      />
      <ConfirmDialog
        open={confirmClear}
        danger
        title="Xóa hết danh sách?"
        description="Toàn bộ thiếu nhi sẽ bị xóa khỏi máy này."
        confirmLabel="Xóa hết"
        onClose={() => setConfirmClear(false)}
        onConfirm={() => {
          clearAll();
          toast.success("Đã xóa sổ");
        }}
      />
    </AppFrame>
  );
}
