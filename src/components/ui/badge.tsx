import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { BlockId } from "@/lib/children/types";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function BlockBadge({ block }: { block: BlockId }) {
  const styles: Record<BlockId, string> = {
    "mam-non": "bg-primary-soft text-primary",
    "tieu-hoc": "bg-bg-warm text-fg",
    thcs: "border border-border-strong bg-surface text-fg",
    khac: "bg-border/70 text-muted",
  };
  const labels: Record<BlockId, string> = {
    "mam-non": "Mầm non",
    "tieu-hoc": "Tiểu học",
    thcs: "THCS",
    khac: "Khác",
  };
  return <Badge className={styles[block]}>{labels[block]}</Badge>;
}
