import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { BlockBadge } from "@/components/ui/badge";
import { ageFromBirthDate, ageLabel } from "@/lib/children/age";
import { hamletLabel } from "@/lib/children/constants";
import { formatPhone, initials, padStt } from "@/lib/children/text";
import type { ChildRecord } from "@/lib/children/types";

export function ChildCard({ child }: { child: ChildRecord }) {
  const age = ageFromBirthDate(child.birthDate);
  return (
    <Link
      to="/em/$id"
      params={{ id: child.id }}
      className="flex gap-3 rounded-xl border border-border bg-surface p-3.5 shadow-soft active:scale-[0.99]"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-sm font-semibold text-primary">
        {initials(child.fullName)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-semibold tracking-tight">
              <span className="mr-2 font-medium tabular-nums text-muted">{padStt(child.stt)}</span>
              {child.fullName}
            </p>
            <p className="mt-0.5 text-sm text-muted">
              {ageLabel(age)}
              {child.className ? ` · ${child.className}` : ""}
            </p>
          </div>
          <BlockBadge block={child.block} />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" />
            {hamletLabel(child.hamlet)}
          </span>
          {child.parentPhone ? (
            <span className="inline-flex items-center gap-1">
              <Phone className="size-3.5" />
              {formatPhone(child.parentPhone)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
