import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Phone, i as Trash2, u as Pencil } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Route$1 } from "./router-DdJZelVg.mjs";
import { c as PageBody, d as ageLabel, g as hamletLabel, h as formatBirthDate, i as Button, l as PageHeader, t as AppFrame, u as ageFromBirthDate, y as useChildrenStore } from "./store-CuEClROJ.mjs";
import { i as padStt, n as formatPhone, r as initials, t as BlockBadge } from "./text-BOI4eKE9.mjs";
import { t as useHasHydrated } from "./hydrate-V03dGRTC.mjs";
import { t as ConfirmDialog } from "./confirm-dialog-YRAyAj8H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/em._id-BCi2rnsX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DetailPage() {
	const { id } = Route$1.useParams();
	const navigate = useNavigate();
	const hydrated = useHasHydrated();
	const child = useChildrenStore((s) => s.children.find((item) => item.id === id));
	const deleteChild = useChildrenStore((s) => s.deleteChild);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	if (hydrated && !child) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Không tìm thấy",
		backTo: "/danh-sach"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Em này không còn trong sổ."
	}) })] });
	if (!child) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Chi tiết",
		backTo: "/danh-sach"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-surface" }) })] });
	const age = ageFromBirthDate(child.birthDate);
	const rows = [
		{
			label: "Ngày sinh",
			value: `${formatBirthDate(child.birthDate)} · ${ageLabel(age)}`
		},
		{
			label: "Giới tính",
			value: child.gender === "nu" ? "Nữ" : "Nam"
		},
		{
			label: "Tên bố",
			value: child.fatherName || "—"
		},
		{
			label: "Tên mẹ",
			value: child.motherName || "—"
		},
		{
			label: "SĐT phụ huynh",
			value: child.parentPhone ? formatPhone(child.parentPhone) : "—"
		},
		{
			label: "Địa chỉ cũ",
			value: hamletLabel(child.hamlet)
		},
		{
			label: "Địa chỉ hiện tại",
			value: child.currentAddress || "Trùng địa chỉ cũ"
		},
		{
			label: "Khối",
			value: child.block
		},
		{
			label: "Lớp",
			value: child.className || "—"
		},
		{
			label: "Ghi chú",
			value: child.notes || "—"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `STT ${padStt(child.stt)}`,
			backTo: "/danh-sach",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "icon",
				"aria-label": "Sửa",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/em/$id/sua",
					params: { id: child.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageBody, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-xl border border-border bg-surface p-5 shadow-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-14 items-center justify-center rounded-lg bg-primary-soft text-base font-semibold text-primary",
						children: initials(child.fullName)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold tracking-tight",
							children: child.fullName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockBadge, { block: child.block }), child.className ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: child.className
							}) : null]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-4 overflow-hidden rounded-xl border border-border bg-surface shadow-soft",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4 border-b border-border px-4 py-3 last:border-b-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "shrink-0 text-sm text-muted",
						children: row.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-right text-sm font-medium",
						children: row.label === "Khối" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockBadge, { block: child.block }) : row.value
					})]
				}, row.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-2",
				children: [
					child.parentPhone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `tel:${child.parentPhone}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), "Gọi phụ huynh"]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						disabled: true,
						children: "Chưa có SĐT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/em/$id/sua",
							params: { id: child.id },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Sửa"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "danger",
						className: "col-span-2",
						onClick: () => setConfirm(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Xóa khỏi sổ"]
					})
				]
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: confirm,
			danger: true,
			title: "Xóa em này?",
			description: `${child.fullName} sẽ bị xóa khỏi sổ. Thao tác không hoàn tác được.`,
			confirmLabel: "Xóa",
			onClose: () => setConfirm(false),
			onConfirm: () => {
				deleteChild(child.id);
				toast.success("Đã xóa khỏi sổ");
				navigate({ to: "/danh-sach" });
			}
		})
	] });
}
//#endregion
export { DetailPage as component };
