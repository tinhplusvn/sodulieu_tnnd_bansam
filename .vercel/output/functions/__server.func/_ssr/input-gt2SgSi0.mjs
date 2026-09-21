import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as cn } from "./store-CuEClROJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-gt2SgSi0.js
var import_jsx_runtime = require_jsx_runtime();
var fieldClass = "h-12 w-full rounded-md border border-border bg-surface-2 px-3 text-base text-fg shadow-[inset_0_1px_0_color-mix(in_oklab,var(--color-fg)_4%,transparent)] placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30";
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn(fieldClass, className),
		...props
	});
}
function SelectField({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(fieldClass, "appearance-none pr-9", className),
		...props,
		children
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn(fieldClass, "h-24 resize-none py-3 leading-normal", className),
		...props
	});
}
function Field({ label, hint, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-fg",
				children: label
			}),
			children,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium text-danger",
				children: error
			}) : hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted",
				children: hint
			}) : null
		]
	});
}
//#endregion
export { Textarea as i, Input as n, SelectField as r, Field as t };
