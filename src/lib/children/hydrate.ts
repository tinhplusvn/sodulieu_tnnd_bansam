import { useEffect, useState } from "react";
import { createSeedRecords } from "./seed";
import { useChildrenStore } from "./store";

export function useHasHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeout = 0;

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      window.clearTimeout(timeout);
      const state = useChildrenStore.getState();
      if (!state.hasSeeded && state.children.length === 0) {
        useChildrenStore.setState({
          children: createSeedRecords(),
          hasSeeded: true,
        });
      }
      setHydrated(true);
    };

    timeout = window.setTimeout(finish, 600);
    Promise.resolve(useChildrenStore.persist.rehydrate()).then(finish).catch(finish);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  return hydrated;
}
