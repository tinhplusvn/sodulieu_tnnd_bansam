import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, FileSpreadsheet, House, Plus, Users } from "lucide-react";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { useHasHydrated } from "@/lib/children/hydrate";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Trang chủ", icon: House },
  { to: "/danh-sach", label: "Danh sách", icon: Users },
  { to: "/excel", label: "Excel", icon: FileSpreadsheet },
] as const;

export function AppFrame({
  children,
  hideNav,
}: {
  children: ReactNode;
  hideNav?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useHasHydrated();
  const showFab = !hideNav && !pathname.startsWith("/them") && !pathname.endsWith("/sua");

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto flex min-h-dvh max-w-6xl">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-surface p-4 md:flex">
          <Link to="/" className="flex items-center gap-2.5 px-1 py-2">
            <BrandMark />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-tight">Sổ Thiếu Nhi</p>
              <p className="truncate text-xs text-muted">Bản Sấm</p>
            </div>
          </Link>
          <nav className="mt-6 flex flex-1 flex-col gap-1">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium",
                    active ? "bg-primary text-primary-fg" : "text-muted hover:bg-primary-soft/70 hover:text-fg",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Button asChild className="w-full">
            <Link to="/them">
              <Plus className="size-4" />
              Thêm em
            </Link>
          </Button>
        </aside>

        <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
          {children}
        </div>
      </div>

      {!hideNav ? (
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-sm md:hidden">
          <div className="mx-auto grid max-w-lg grid-cols-3 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] font-medium",
                    active ? "text-primary" : "text-muted",
                  )}
                >
                  <item.icon className="size-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}

      {showFab ? (
        <Link
          to="/them"
          className="fixed right-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-fg shadow-soft md:hidden"
          aria-label="Thêm em"
        >
          <Plus className="size-6" />
        </Link>
      ) : null}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  backTo,
  actions,
}: {
  title: string;
  subtitle?: string;
  backTo?: string;
  actions?: ReactNode;
}) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/90 px-4 py-3 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-3">
        {backTo ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-10 shrink-0"
            aria-label="Quay lại"
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                router.history.back();
              } else {
                router.history.push(backTo);
              }
            }}
          >
            <ChevronLeft className="size-5" />
          </Button>
        ) : (
          <BrandMark className="md:hidden" />
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight">{title}</h1>
          {subtitle ? <p className="truncate text-xs text-muted">{subtitle}</p> : null}
        </div>
        {actions}
      </div>
    </header>
  );
}

export function PageBody({
  children,
  className,
  flushNav,
}: {
  children: ReactNode;
  className?: string;
  flushNav?: boolean;
}) {
  return (
    <main
      className={cn(
        "flex-1 px-4 py-4 md:px-6 md:py-6",
        flushNav ? "pb-4" : "pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-8",
        className,
      )}
    >
      {children}
    </main>
  );
}
