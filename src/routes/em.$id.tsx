import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Pencil, Phone, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppFrame, PageBody, PageHeader } from "@/components/app-frame";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { BlockBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ageFromBirthDate, ageLabel, formatBirthDate } from "@/lib/children/age";
import { hamletLabel } from "@/lib/children/constants";
import { useHasHydrated } from "@/lib/children/hydrate";
import { useChildrenStore } from "@/lib/children/store";
import { formatPhone, initials, padStt } from "@/lib/children/text";

export const Route = createFileRoute("/em/$id")({ component: DetailPage });

function DetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const hydrated = useHasHydrated();
  const child = useChildrenStore((s) => s.children.find((item) => item.id === id));
  const deleteChild = useChildrenStore((s) => s.deleteChild);
  const [confirm, setConfirm] = useState(false);

  if (hydrated && !child) {
    return (
      <AppFrame>
        <PageHeader title="Không tìm thấy" backTo="/danh-sach" />
        <PageBody>
          <p className="text-sm text-muted">Em này không còn trong sổ.</p>
        </PageBody>
      </AppFrame>
    );
  }

  if (!child) {
    return (
      <AppFrame>
        <PageHeader title="Chi tiết" backTo="/danh-sach" />
        <PageBody>
          <div className="h-40 animate-pulse rounded-xl bg-surface" />
        </PageBody>
      </AppFrame>
    );
  }

  const age = ageFromBirthDate(child.birthDate);
  const rows = [
    { label: "Ngày sinh", value: `${formatBirthDate(child.birthDate)} · ${ageLabel(age)}` },
    { label: "Giới tính", value: child.gender === "nu" ? "Nữ" : "Nam" },
    { label: "Tên bố", value: child.fatherName || "—" },
    { label: "Tên mẹ", value: child.motherName || "—" },
    { label: "SĐT phụ huynh", value: child.parentPhone ? formatPhone(child.parentPhone) : "—" },
    { label: "Địa chỉ cũ", value: hamletLabel(child.hamlet) },
    { label: "Địa chỉ hiện tại", value: child.currentAddress || "Trùng địa chỉ cũ" },
    { label: "Khối", value: child.block },
    { label: "Lớp", value: child.className || "—" },
    { label: "Ghi chú", value: child.notes || "—" },
  ];

  return (
    <AppFrame>
      <PageHeader
        title={`STT ${padStt(child.stt)}`}
        backTo="/danh-sach"
        actions={
          <Button asChild variant="ghost" size="icon" aria-label="Sửa">
            <Link to="/em/$id/sua" params={{ id: child.id }}>
              <Pencil className="size-4" />
            </Link>
          </Button>
        }
      />
      <PageBody>
        <section className="rounded-xl border border-border bg-surface p-5 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="flex size-14 items-center justify-center rounded-lg bg-primary-soft text-base font-semibold text-primary">
              {initials(child.fullName)}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold tracking-tight">{child.fullName}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <BlockBadge block={child.block} />
                {child.className ? (
                  <span className="text-sm text-muted">{child.className}</span>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <dl className="mt-4 overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-4 border-b border-border px-4 py-3 last:border-b-0"
            >
              <dt className="shrink-0 text-sm text-muted">{row.label}</dt>
              <dd className="text-right text-sm font-medium">
                {row.label === "Khối" ? <BlockBadge block={child.block} /> : row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {child.parentPhone ? (
            <Button asChild variant="soft">
              <a href={`tel:${child.parentPhone}`}>
                <Phone className="size-4" />
                Gọi phụ huynh
              </a>
            </Button>
          ) : (
            <Button variant="outline" disabled>
              Chưa có SĐT
            </Button>
          )}
          <Button asChild>
            <Link to="/em/$id/sua" params={{ id: child.id }}>
              <Pencil className="size-4" />
              Sửa
            </Link>
          </Button>
          <Button variant="danger" className="col-span-2" onClick={() => setConfirm(true)}>
            <Trash2 className="size-4" />
            Xóa khỏi sổ
          </Button>
        </div>
      </PageBody>
      <ConfirmDialog
        open={confirm}
        danger
        title="Xóa em này?"
        description={`${child.fullName} sẽ bị xóa khỏi sổ. Thao tác không hoàn tác được.`}
        confirmLabel="Xóa"
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          deleteChild(child.id);
          toast.success("Đã xóa khỏi sổ");
          void navigate({ to: "/danh-sach" });
        }}
      />
    </AppFrame>
  );
}
