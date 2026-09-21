import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as cn } from "./store-CuEClROJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/text-BOI4eKE9.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", className),
		children
	});
}
function BlockBadge({ block }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		className: {
			"mam-non": "bg-primary-soft text-primary",
			"tieu-hoc": "bg-bg-warm text-fg",
			thcs: "border border-border-strong bg-surface text-fg",
			khac: "bg-border/70 text-muted"
		}[block],
		children: {
			"mam-non": "Mầm non",
			"tieu-hoc": "Tiểu học",
			thcs: "THCS",
			khac: "Khác"
		}[block]
	});
}
function stripVi(value) {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase().trim();
}
function compactPhone(value) {
	return value.replace(/[\s.()\-]/g, "");
}
function formatPhone(value) {
	const digits = compactPhone(value);
	if (digits.length === 10) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
	if (digits.length === 11 && digits.startsWith("84")) return `+84 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
	return value.trim();
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function padStt(stt) {
	return String(stt).padStart(2, "0");
}
//#endregion
export { stripVi as a, padStt as i, formatPhone as n, initials as r, BlockBadge as t };
