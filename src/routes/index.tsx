import { createFileRoute, Link } from "@tanstack/react-router";
import { Cake, FileSpreadsheet, PhoneOff, Plus, Users } from "lucide-react";
import { AppFrame, PageBody } from "@/components/app-frame";
import { BrandMark } from "@/components/brand-mark";
import { ChildCard } from "@/components/child-card";
import { Button } from "@/components/ui/button";
import { ageFromBirthDate, isBirthdayThisMonth } from "@/lib/children/age";
import { BLOCKS, HAMLETS } from "@/lib/children/constants";
import { useHasHydrated } from "@/lib/children/hydrate";
import { useChildrenStore } from "@/lib/children/store";
import type { BlockId, HamletId } from "@/lib/children/types";
import { useEffect, useMemo, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({ component: HomePage });

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Chào buổi sáng";
  if (hour < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}

function HomePage() {
  const hydrated = useHasHydrated();
  const children = useChildrenStore((s) => s.children);

  const stats = useMemo(() => {
    const byBlock: Record<BlockId, number> = { "mam-non": 0, "tieu-hoc": 0, thcs: 0, khac: 0 };
    const byHamlet: Record<HamletId, number> = {
      "sam-1": 0,
      "sam-2": 0,
      "sam-3": 0,
      "bai-ca": 0,
      khac: 0,
    };
    let missingPhone = 0;
    const birthdays = [];
    for (const child of children) {
      byBlock[child.block] += 1;
      byHamlet[child.hamlet] += 1;
      if (!child.parentPhone) missingPhone += 1;
      if (isBirthdayThisMonth(child.birthDate)) birthdays.push(child);
    }
    birthdays.sort((a, b) => {
      const da = Number(a.birthDate.slice(8, 10));
      const db = Number(b.birthDate.slice(8, 10));
      return da - db;
    });
    return { byBlock, byHamlet, missingPhone, birthdays };
  }, [children]);

  const hamletMax = Math.max(1, ...Object.values(stats.byHamlet));

  return (
    <AppFrame>
      <header className="px-4 pb-2 pt-5 md:px-6 md:pt-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted">{greeting()}</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Sổ Thiếu Nhi Bản Sấm</h1>
            <p className="mt-1 text-sm text-muted">Quản lý thiếu niên nhi đồng theo thôn, khối và lớp</p>
          </div>
          <BrandMark className="hidden size-12 md:block" />
        </div>
      </header>
      <PageBody className="pt-2">
        {!hydrated ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-surface" />
            ))}
          </div>
        ) : (
          <>
            <InstallHint />
            <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatCard label="Tổng số" value={children.length} icon={<Users className="size-4" />} />
              {BLOCKS.filter((b) => b.id !== "khac").map((block) => (
                <Link
                  key={block.id}
                  to="/danh-sach"
                  search={{ khoi: block.id }}
                  className="rounded-xl border border-border bg-surface p-4 shadow-soft"
                >
                  <p className="text-xs font-medium text-muted">{block.label}</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
                    {stats.byBlock[block.id]}
                  </p>
                  <p className="mt-1 text-xs text-subtle">{block.hint}</p>
                </Link>
              ))}
            </section>

            <section className="mt-6 rounded-xl border border-border bg-surface p-4 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Theo thôn (địa chỉ cũ)</h2>
                <Link to="/danh-sach" className="text-xs font-medium text-primary">
                  Xem tất cả
                </Link>
              </div>
              <ul className="mt-4 space-y-3">
                {HAMLETS.filter((h) => h.id !== "khac").map((hamlet) => {
                  const count = stats.byHamlet[hamlet.id];
                  return (
                    <li key={hamlet.id}>
                      <Link
                        to="/danh-sach"
                        search={{ thon: hamlet.id }}
                        className="block"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span>{hamlet.label}</span>
                          <span className="tabular-nums text-muted">{count}</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-bg-warm">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${(count / hamletMax) * 100}%` }}
                          />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <section className="rounded-xl border border-border bg-surface p-4 shadow-soft">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <Cake className="size-4 text-primary" />
                  Sinh nhật tháng này
                </h2>
                {stats.birthdays.length === 0 ? (
                  <p className="mt-3 text-sm text-muted">Không có em nào sinh nhật trong tháng.</p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {stats.birthdays.map((child) => (
                      <li key={child.id} className="flex items-center justify-between text-sm">
                        <Link to="/em/$id" params={{ id: child.id }} className="font-medium">
                          {child.fullName}
                        </Link>
                        <span className="tabular-nums text-muted">
                          {child.birthDate.slice(8, 10)}/{child.birthDate.slice(5, 7)}
                          {ageFromBirthDate(child.birthDate) != null
                            ? ` · ${ageFromBirthDate(child.birthDate)} tuổi`
                            : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              <section className="rounded-xl border border-border bg-surface p-4 shadow-soft">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <PhoneOff className="size-4 text-primary" />
                  Thiếu số điện thoại
                </h2>
                <p className="mt-3 text-2xl font-semibold tabular-nums">{stats.missingPhone}</p>
                <p className="mt-1 text-sm text-muted">em chưa có SĐT phụ huynh</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild size="sm">
                    <Link to="/them">
                      <Plus className="size-4" />
                      Thêm em
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/excel">
                      <FileSpreadsheet className="size-4" />
                      Nhập Excel
                    </Link>
                  </Button>
                </div>
              </section>
            </div>

            <section className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Mới cập nhật</h2>
                <Link to="/danh-sach" className="text-xs font-medium text-primary">
                  Danh sách
                </Link>
              </div>
              <div className="flex flex-col gap-2.5">
                {[...children]
                  .sort((a, b) => b.updatedAt - a.updatedAt)
                  .slice(0, 4)
                  .map((child) => (
                    <ChildCard key={child.id} child={child} />
                  ))}
              </div>
            </section>
          </>
        )}
      </PageBody>
    </AppFrame>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-primary p-4 text-primary-fg shadow-soft">
      <p className="flex items-center gap-1.5 text-xs font-medium text-primary-fg/80">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-primary-fg/70">thiếu nhi</p>
    </div>
  );
}

function InstallHint() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      if (window.localStorage.getItem("ban-sam-hide-install") === "1") return;
      setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);
  if (!visible) return null;
  return (
    <div className="mb-4 rounded-xl border border-border bg-primary-soft px-4 py-3 text-sm text-primary md:hidden">
      <p className="font-medium">Dùng như ứng dụng điện thoại</p>
      <p className="mt-1 text-primary/80">
        Trên Android, mở trình đơn trình duyệt rồi chọn Thêm vào màn hình chính.
      </p>
      <button
        type="button"
        className="mt-2 text-xs font-semibold underline"
        onClick={() => {
          try {
            window.localStorage.setItem("ban-sam-hide-install", "1");
          } catch {
            /* ignore */
          }
          setVisible(false);
        }}
      >
        Đã hiểu
      </button>
    </div>
  );
}
