import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Phone, d as MapPin } from "../_libs/lucide-react.mjs";
import { d as ageLabel, g as hamletLabel, u as ageFromBirthDate } from "./store-CuEClROJ.mjs";
import { i as padStt, n as formatPhone, r as initials, t as BlockBadge } from "./text-BOI4eKE9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/child-card-DIwlM2xG.js
var import_jsx_runtime = require_jsx_runtime();
function ChildCard({ child }) {
	const age = ageFromBirthDate(child.birthDate);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/em/$id",
		params: { id: child.id },
		className: "flex gap-3 rounded-xl border border-border bg-surface p-3.5 shadow-soft active:scale-[0.99]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-sm font-semibold text-primary",
			children: initials(child.fullName)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate font-semibold tracking-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-2 font-medium tabular-nums text-muted",
							children: padStt(child.stt)
						}), child.fullName]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-sm text-muted",
						children: [ageLabel(age), child.className ? ` · ${child.className}` : ""]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockBadge, { block: child.block })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), hamletLabel(child.hamlet)]
				}), child.parentPhone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }), formatPhone(child.parentPhone)]
				}) : null]
			})]
		})]
	});
}
//#endregion
export { ChildCard as t };
