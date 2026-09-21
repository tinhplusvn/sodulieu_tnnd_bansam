import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as useChildrenStore } from "./store-CuEClROJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hydrate-V03dGRTC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useHasHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const finish = () => setHydrated(true);
		if (useChildrenStore.persist.hasHydrated()) {
			finish();
			return;
		}
		return useChildrenStore.persist.onFinishHydration(finish);
	}, []);
	return hydrated;
}
//#endregion
export { useHasHydrated as t };
