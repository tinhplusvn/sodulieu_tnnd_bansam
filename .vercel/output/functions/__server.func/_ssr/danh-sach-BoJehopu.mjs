import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as SlidersHorizontal, o as Search } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Route$4 } from "./router-DdJZelVg.mjs";
import { a as CLASS_BY_BLOCK, c as PageBody, g as hamletLabel, i as Button, l as PageHeader, n as BLOCKS, p as blockLabel, s as HAMLETS, t as AppFrame, u as ageFromBirthDate, y as useChildrenStore } from "./store-CuEClROJ.mjs";
import { a as stripVi } from "./text-BOI4eKE9.mjs";
import { t as ChildCard } from "./child-card-DIwlM2xG.mjs";
import { n as Input, r as SelectField } from "./input-gt2SgSi0.mjs";
import { t as useHasHydrated } from "./hydrate-V03dGRTC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/danh-sach-BoJehopu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function childMatches(child, filters) {
	if (filters.khoi && child.block !== filters.khoi) return false;
	if (filters.thon && child.hamlet !== filters.thon) return false;
	if (filters.lop && child.className !== filters.lop) return false;
	const q = stripVi(filters.q);
	if (!q) return true;
	return stripVi([
		child.fullName,
		child.fatherName,
		child.motherName,
		child.parentPhone,
		hamletLabel(child.hamlet),
		child.currentAddress,
		blockLabel(child.block),
		child.className,
		child.notes,
		String(child.stt)
	].join(" ")).includes(q);
}
function sortChildren(list, sort) {
	const copy = [...list];
	copy.sort((a, b) => {
		if (sort === "ten") return stripVi(a.fullName).localeCompare(stripVi(b.fullName), "vi");
		if (sort === "tuoi") return (ageFromBirthDate(b.birthDate) ?? 0) - (ageFromBirthDate(a.birthDate) ?? 0);
		return a.stt - b.stt;
	});
	return copy;
}
function filterChildren(list, filters) {
	return sortChildren(list.filter((child) => childMatches(child, filters)), filters.sort);
}
function ListPage() {
	const filters = Route$4.useSearch();
	const navigate = useNavigate({ from: "/danh-sach" });
	const hydrated = useHasHydrated();
	const children = useChildrenStore((s) => s.children);
	const renumber = useChildrenStore((s) => s.renumber);
	const [showFilters, setShowFilters] = (0, import_react.useState)(Boolean(filters.khoi || filters.thon || filters.lop));
	const visible = (0, import_react.useMemo)(() => filterChildren(children, filters), [children, filters]);
	const classOptions = filters.khoi ? CLASS_BY_BLOCK[filters.khoi] ?? [] : [...new Set(children.map((c) => c.className).filter(Boolean))].sort();
	function setFilter(partial) {
		navigate({
			search: (prev) => ({
				...prev,
				...partial
			}),
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Danh sách",
		subtitle: hydrated ? `${visible.length}/${children.length} em` : "Đang tải",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			"aria-label": "Bộ lọc",
			onClick: () => setShowFilters((v) => !v),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-5" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageBody, {
		className: "pt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: filters.q,
					onChange: (e) => setFilter({ q: e.target.value }),
					placeholder: "Tìm tên, bố mẹ, SĐT, thôn…",
					className: "pl-10"
				})]
			}),
			showFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-2 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
						value: filters.khoi,
						onChange: (e) => setFilter({
							khoi: e.target.value,
							lop: ""
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Mọi khối"
						}), BLOCKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.label
						}, item.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
						value: filters.thon,
						onChange: (e) => setFilter({ thon: e.target.value }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Mọi thôn"
						}), HAMLETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.label
						}, item.id))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
						value: filters.lop,
						onChange: (e) => setFilter({ lop: e.target.value }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Mọi lớp"
						}), classOptions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item,
							children: item
						}, item))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
						value: filters.sort,
						onChange: (e) => setFilter({ sort: e.target.value }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "stt",
								children: "Sắp xếp: STT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ten",
								children: "Sắp xếp: Tên"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "tuoi",
								children: "Sắp xếp: Tuổi"
							})
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex gap-2 overflow-x-auto pb-1",
				children: [{
					id: "",
					label: "Tất cả"
				}, ...BLOCKS.filter((b) => b.id !== "khac")].map((item) => {
					const active = filters.khoi === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter({
							khoi: item.id,
							lop: ""
						}),
						className: active ? "h-9 shrink-0 rounded-full bg-primary px-3.5 text-sm font-medium text-primary-fg" : "h-9 shrink-0 rounded-full bg-surface px-3.5 text-sm font-medium text-muted",
						children: item.label
					}, item.id || "all");
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs font-medium text-primary",
					onClick: () => {
						renumber();
						toast.success("Đã đánh lại số thứ tự từ 01");
					},
					children: "Đánh lại STT"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-col gap-2.5",
				children: !hydrated ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-xl bg-surface" }, i)) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-dashed border-border-strong bg-surface px-5 py-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "Không tìm thấy em nào"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Thử xóa bộ lọc hoặc thêm em mới."
					})]
				}) : visible.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChildCard, { child }, child.id))
			})
		]
	})] });
}
//#endregion
export { ListPage as component };
