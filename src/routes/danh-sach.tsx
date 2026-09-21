import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AppFrame, PageBody, PageHeader } from "@/components/app-frame";
import { ChildCard } from "@/components/child-card";
import { Button } from "@/components/ui/button";
import { Input, SelectField } from "@/components/ui/input";
import { BLOCKS, CLASS_BY_BLOCK, HAMLETS } from "@/lib/children/constants";
import { filterChildren } from "@/lib/children/filter";
import { useHasHydrated } from "@/lib/children/hydrate";
import { useChildrenStore } from "@/lib/children/store";
import type { ListFilters } from "@/lib/children/types";

export const Route = createFileRoute("/danh-sach")({
  validateSearch: (search: Record<string, unknown>): ListFilters => ({
    q: typeof search.q === "string" ? search.q : undefined,
    khoi: typeof search.khoi === "string" ? search.khoi : undefined,
    thon: typeof search.thon === "string" ? search.thon : undefined,
    lop: typeof search.lop === "string" ? search.lop : undefined,
    sort: search.sort === "ten" || search.sort === "tuoi" || search.sort === "stt" ? search.sort : undefined,
  }),
  component: ListPage,
});

function ListPage() {
  const filters = Route.useSearch();
  const navigate = useNavigate({ from: "/danh-sach" });
  const hydrated = useHasHydrated();
  const children = useChildrenStore((s) => s.children);
  const renumber = useChildrenStore((s) => s.renumber);
  const [showFilters, setShowFilters] = useState(
    Boolean(filters.khoi || filters.thon || filters.lop),
  );

  const visible = useMemo(() => filterChildren(children, filters), [children, filters]);
  const classOptions = filters.khoi
    ? CLASS_BY_BLOCK[filters.khoi as keyof typeof CLASS_BY_BLOCK] ?? []
    : [...new Set(children.map((c) => c.className).filter(Boolean))].sort();

  function setFilter(partial: Partial<ListFilters>) {
    void navigate({
      search: (prev) => ({ ...prev, ...partial }),
      replace: true,
    });
  }

  return (
    <AppFrame>
      <PageHeader
        title="Danh sách"
        subtitle={hydrated ? `${visible.length}/${children.length} em` : "Đang tải"}
        actions={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Bộ lọc"
            onClick={() => setShowFilters((v) => !v)}
          >
            <SlidersHorizontal className="size-5" />
          </Button>
        }
      />
      <PageBody className="pt-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <Input
            value={filters.q ?? ""}
            onChange={(e) => setFilter({ q: e.target.value })}
            placeholder="Tìm tên, bố mẹ, SĐT, thôn…"
            className="pl-10"
          />
        </div>

        {showFilters ? (
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            <SelectField
              value={filters.khoi ?? ""}
              onChange={(e) => setFilter({ khoi: e.target.value || undefined, lop: undefined })}
            >
              <option value="">Mọi khối</option>
              {BLOCKS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </SelectField>
            <SelectField value={filters.thon ?? ""} onChange={(e) => setFilter({ thon: e.target.value || undefined })}>
              <option value="">Mọi thôn</option>
              {HAMLETS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </SelectField>
            <SelectField value={filters.lop ?? ""} onChange={(e) => setFilter({ lop: e.target.value || undefined })}>
              <option value="">Mọi lớp</option>
              {classOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectField>
            <SelectField
              value={filters.sort ?? "stt"}
              onChange={(e) => setFilter({ sort: e.target.value as ListFilters["sort"] })}
            >
              <option value="stt">Sắp xếp: STT</option>
              <option value="ten">Sắp xếp: Tên</option>
              <option value="tuoi">Sắp xếp: Tuổi</option>
            </SelectField>
          </div>
        ) : (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {[
              { id: "", label: "Tất cả" },
              ...BLOCKS.filter((b) => b.id !== "khac"),
            ].map((item) => {
              const active = (filters.khoi ?? "") === item.id;
              return (
                <button
                  key={item.id || "all"}
                  type="button"
                  onClick={() => setFilter({ khoi: item.id || undefined, lop: undefined })}
                  className={
                    active
                      ? "h-9 shrink-0 rounded-full bg-primary px-3.5 text-sm font-medium text-primary-fg"
                      : "h-9 shrink-0 rounded-full bg-surface px-3.5 text-sm font-medium text-muted"
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            className="text-xs font-medium text-primary"
            onClick={() => {
              renumber();
              toast.success("Đã đánh lại số thứ tự từ 01");
            }}
          >
            Đánh lại STT
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-2.5">
          {!hydrated ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-surface" />
            ))
          ) : visible.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border-strong bg-surface px-5 py-12 text-center">
              <p className="font-semibold">Không tìm thấy em nào</p>
              <p className="mt-1 text-sm text-muted">Thử xóa bộ lọc hoặc thêm em mới.</p>
            </div>
          ) : (
            visible.map((child) => <ChildCard key={child.id} child={child} />)
          )}
        </div>
      </PageBody>
    </AppFrame>
  );
}
