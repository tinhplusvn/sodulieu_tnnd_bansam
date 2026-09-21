import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppFrame, PageBody, PageHeader } from "@/components/app-frame";
import { ChildForm } from "@/components/child-form";
import { useChildrenStore } from "@/lib/children/store";

export const Route = createFileRoute("/them")({ component: AddPage });

function AddPage() {
  const navigate = useNavigate();
  const addChild = useChildrenStore((s) => s.addChild);

  return (
    <AppFrame hideNav>
      <PageHeader title="Thêm em" subtitle="Số thứ tự sẽ được cấp tự động" backTo="/danh-sach" />
      <PageBody flushNav>
        <ChildForm
          submitLabel="Lưu vào sổ"
          onCancel={() => void navigate({ to: "/danh-sach" })}
          onSubmit={(draft) => {
            const record = addChild(draft);
            toast.success(`Đã thêm ${record.fullName}`);
            void navigate({ to: "/em/$id", params: { id: record.id } });
          }}
        />
      </PageBody>
    </AppFrame>
  );
}
