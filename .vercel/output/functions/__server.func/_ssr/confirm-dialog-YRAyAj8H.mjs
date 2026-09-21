import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Button } from "./store-CuEClROJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/confirm-dialog-YRAyAj8H.js
var import_jsx_runtime = require_jsx_runtime();
function ConfirmDialog({ open, title, description, confirmLabel = "Xác nhận", cancelLabel = "Hủy", danger, onConfirm, onClose }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-fg/40",
			"aria-label": "Đóng",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "confirm-title",
			className: "relative w-full max-w-md rounded-2xl bg-surface p-5 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "confirm-title",
					className: "text-lg font-semibold tracking-tight",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "flex-1",
						onClick: onClose,
						children: cancelLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: danger ? "danger" : "default",
						className: "flex-1",
						onClick: () => {
							onConfirm();
							onClose();
						},
						children: confirmLabel
					})]
				})
			]
		})]
	});
}
//#endregion
export { ConfirmDialog as t };
