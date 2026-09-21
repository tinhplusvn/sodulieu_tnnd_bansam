import { ageFromBirthDate } from "./age";
import { blockLabel, hamletLabel } from "./constants";
import { stripVi } from "./text";
import type { ChildRecord, ListFilters } from "./types";

export function childMatches(child: ChildRecord, filters: ListFilters): boolean {
  if (filters.khoi && child.block !== filters.khoi) return false;
  if (filters.thon && child.hamlet !== filters.thon) return false;
  if (filters.lop && child.className !== filters.lop) return false;
  const q = stripVi(filters.q ?? "");
  if (!q) return true;
  const haystack = stripVi(
    [
      child.fullName,
      child.fatherName,
      child.motherName,
      child.parentPhone,
      hamletLabel(child.hamlet),
      child.currentAddress,
      blockLabel(child.block),
      child.className,
      child.notes,
      String(child.stt),
    ].join(" "),
  );
  return haystack.includes(q);
}

export function sortChildren(list: ChildRecord[], sort: ListFilters["sort"]): ChildRecord[] {
  const copy = [...list];
  copy.sort((a, b) => {
    if (sort === "ten") {
      return stripVi(a.fullName).localeCompare(stripVi(b.fullName), "vi");
    }
    if (sort === "tuoi") {
      return (ageFromBirthDate(b.birthDate) ?? 0) - (ageFromBirthDate(a.birthDate) ?? 0);
    }
    return a.stt - b.stt;
  });
  return copy;
}

export function filterChildren(list: ChildRecord[], filters: ListFilters): ChildRecord[] {
  return sortChildren(list.filter((child) => childMatches(child, filters)), filters.sort ?? "stt");
}
