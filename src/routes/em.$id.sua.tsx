import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppFrame, PageBody, PageHeader } from "@/components/app-frame";
import { ChildForm } from "@/components/child-form";
import { useHasHydrated } from "@/lib/children/hydrate";
import { useChildrenStore } from "@/lib/children/store";

export const Route = createFileRoute("/em/$id/sua")({ component: EditPage });

function EditPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const hydrated = useHasHydrated();
  const child = useChildrenStore((s) => s.children.find((item) => item.id === id));
  const updateChild = useChildrenStore((s) => s.updateChild);

  if (hydrated && !child) {
    return (
      <AppFrame hideNav>
        <PageHeader title="Không tìm thấy" backTo="/danh-sach" />
        <PageBody flushNav>
          <p className="text-sm text-muted">Em này không còn trong sổ.</p>
        </PageBody>
      </AppFrame>
    );
  }

  return (
    <AppFrame hideNav>
      <PageHeader title="Sửa thông tin" subtitle={child?.fullName} backTo={`/em/${id}`} />
      <PageBody flushNav>
        {child ? (
          <ChildForm
            initial={child}
            submitLabel="Lưu thay đổi"
            onCancel={() => void navigate({ to: "/em/$id", params: { id } })}
            onSubmit={(draft) => {
              updateChild(id, draft);
              toast.success("Đã lưu thay đổi");
              void navigate({ to: "/em/$id", params: { id } });
            }}
          />
        ) : (
          <div className="h-64 animate-pulse rounded-xl bg-surface" />
        )}
      </PageBody>
    </AppFrame>
  );
}
