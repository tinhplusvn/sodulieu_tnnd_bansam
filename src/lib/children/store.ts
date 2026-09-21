import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ageFromBirthDate, blockFromAge, suggestClass } from "./age";
import { STORAGE_KEY } from "./constants";
import { createSeedRecords } from "./seed";
import type { ChildDraft, ChildRecord } from "./types";

type ChildrenState = {
  children: ChildRecord[];
  hasSeeded: boolean;
  addChild: (draft: ChildDraft) => ChildRecord;
  updateChild: (id: string, draft: ChildDraft) => void;
  deleteChild: (id: string) => void;
  appendMany: (drafts: ChildDraft[]) => number;
  replaceAll: (drafts: ChildDraft[]) => number;
  renumber: () => void;
  restoreSample: () => void;
  clearAll: () => void;
};

function nextStt(list: ChildRecord[]): number {
  return list.reduce((max, child) => Math.max(max, child.stt), 0) + 1;
}

function completeDraft(draft: ChildDraft): ChildDraft {
  const age = ageFromBirthDate(draft.birthDate);
  return {
    ...draft,
    fullName: draft.fullName.trim(),
    fatherName: draft.fatherName.trim(),
    motherName: draft.motherName.trim(),
    parentPhone: draft.parentPhone.replace(/[\s.()\-]/g, ""),
    currentAddress: draft.currentAddress.trim(),
    className: draft.className.trim() || (age === null ? "" : suggestClass(age)),
    notes: draft.notes.trim(),
    block: draft.block || (age === null ? "khac" : blockFromAge(age)),
  };
}

function toRecord(draft: ChildDraft, id: string, stt: number, now: number): ChildRecord {
  const complete = completeDraft(draft);
  return {
    id,
    stt,
    fullName: complete.fullName,
    birthDate: complete.birthDate,
    gender: complete.gender,
    fatherName: complete.fatherName,
    motherName: complete.motherName,
    parentPhone: complete.parentPhone,
    hamlet: complete.hamlet,
    currentAddress: complete.currentAddress,
    block: complete.block,
    className: complete.className,
    notes: complete.notes,
    createdAt: now,
    updatedAt: now,
  };
}

export const useChildrenStore = create<ChildrenState>()(
  persist(
    (set, get) => ({
      children: [],
      hasSeeded: false,
      addChild: (draft) => {
        const now = Date.now();
        const list = get().children;
        const record = toRecord(draft, crypto.randomUUID(), draft.stt ?? nextStt(list), now);
        set({ children: [...list, record] });
        return record;
      },
      updateChild: (id, draft) => {
        const now = Date.now();
        set({
          children: get().children.map((child) =>
            child.id === id
              ? {
                  ...toRecord(draft, child.id, draft.stt ?? child.stt, child.createdAt),
                  updatedAt: now,
                }
              : child,
          ),
        });
      },
      deleteChild: (id) => {
        set({ children: get().children.filter((child) => child.id !== id) });
      },
      appendMany: (drafts) => {
        const now = Date.now();
        const existing = get().children;
        let stt = nextStt(existing);
        const used = new Set(existing.map((c) => c.stt));
        const incoming = drafts.map((draft, index) => {
          let value = draft.stt && draft.stt > 0 && !used.has(draft.stt) ? draft.stt : stt;
          if (used.has(value)) value = stt;
          used.add(value);
          while (used.has(stt)) stt += 1;
          return toRecord(draft, crypto.randomUUID(), value, now + index);
        });
        set({ children: [...existing, ...incoming] });
        return incoming.length;
      },
      replaceAll: (drafts) => {
        const now = Date.now();
        const incoming = drafts.map((draft, index) =>
          toRecord(
            draft,
            crypto.randomUUID(),
            draft.stt && draft.stt > 0 ? draft.stt : index + 1,
            now + index,
          ),
        );
        set({ children: incoming, hasSeeded: true });
        return incoming.length;
      },
      renumber: () => {
        const sorted = [...get().children].sort((a, b) => a.stt - b.stt);
        set({
          children: sorted.map((child, index) => ({
            ...child,
            stt: index + 1,
            updatedAt: Date.now(),
          })),
        });
      },
      restoreSample: () => {
        set({ children: createSeedRecords(), hasSeeded: true });
      },
      clearAll: () => {
        set({ children: [], hasSeeded: true });
      },
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (!state.hasSeeded && state.children.length === 0) {
          useChildrenStore.setState({
            children: createSeedRecords(),
            hasSeeded: true,
          });
        }
      },
    },
  ),
);
