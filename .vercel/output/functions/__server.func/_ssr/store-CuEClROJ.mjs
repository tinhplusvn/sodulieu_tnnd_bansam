import { S as require_jsx_runtime, f as useRouterState, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as House, g as ChevronLeft, m as FileSpreadsheet, s as Plus, t as Users } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CuEClROJ.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function BrandMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-9 shrink-0", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "9",
				fill: "currentColor",
				className: "text-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 10.5h7.2c.6 0 1.1.5 1.1 1.1v11.2c0 .4-.4.7-.8.6l-6.7-1.2a1.1 1.1 0 0 1-.9-1.1V10.5Z",
				fill: "currentColor",
				className: "text-primary-fg",
				opacity: "0.92"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 10.5h-7.2c-.6 0-1.1.5-1.1 1.1v11.2c0 .4.4.7.8.6l6.7-1.2c.5-.1.9-.5.9-1.1V10.5Z",
				fill: "currentColor",
				className: "text-primary-fg",
				opacity: "0.72"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 12.2v10.2",
				stroke: "currentColor",
				className: "text-primary",
				strokeWidth: "1.1",
				strokeLinecap: "round",
				opacity: "0.35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M22.6 8.2c0 1.4-1.1 2-1.8 2.6.8.2 1.5.8 1.5 1.8 0-1-.4-1.4-1.1-1.7.8.1 1.4-.6 1.4-1.4 0-.6-.4-1-.8-1.3.4.1.8.0.8 0Z",
				fill: "currentColor",
				className: "text-primary-soft"
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[transform,background-color,opacity] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] select-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg shadow-soft hover:opacity-90",
			outline: "border border-border-strong bg-surface text-fg hover:bg-primary-soft/60",
			ghost: "text-fg hover:bg-primary-soft/70",
			danger: "bg-danger text-primary-fg hover:opacity-90",
			soft: "bg-primary-soft text-primary hover:bg-primary-soft/80"
		},
		size: {
			sm: "h-9 rounded-sm px-3 text-sm",
			md: "h-11 rounded-md px-4 text-sm",
			lg: "h-12 rounded-lg px-5 text-base",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var NAV = [
	{
		to: "/",
		label: "Trang chủ",
		icon: House
	},
	{
		to: "/danh-sach",
		label: "Danh sách",
		icon: Users
	},
	{
		to: "/excel",
		label: "Excel",
		icon: FileSpreadsheet
	}
];
function AppFrame({ children, hideNav }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const showFab = !hideNav && !pathname.startsWith("/them") && !pathname.endsWith("/sua");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-dvh max-w-6xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-surface p-4 md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2.5 px-1 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-semibold leading-tight",
									children: "Sổ Thiếu Nhi"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted",
									children: "Bản Sấm"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "mt-6 flex flex-1 flex-col gap-1",
							children: NAV.map((item) => {
								const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium", active ? "bg-primary text-primary-fg" : "text-muted hover:bg-primary-soft/70 hover:text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
								}, item.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/them",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Thêm em"]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-dvh min-w-0 flex-1 flex-col",
					children
				})]
			}),
			!hideNav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 backdrop-blur-sm md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-lg grid-cols-3 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1",
					children: NAV.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 text-[11px] font-medium", active ? "text-primary" : "text-muted"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), item.label]
						}, item.to);
					})
				})
			}) : null,
			showFab ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/them",
				className: "fixed right-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-fg shadow-soft md:hidden",
				"aria-label": "Thêm em",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-6" })
			}) : null
		]
	});
}
function PageHeader({ title, subtitle, backTo, actions }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-20 border-b border-border bg-bg/90 px-4 py-3 backdrop-blur-sm md:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				backTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					className: "size-10 shrink-0",
					"aria-label": "Quay lại",
					onClick: () => {
						if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
						else router.history.push(backTo);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "md:hidden" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "truncate text-lg font-semibold tracking-tight",
						children: title
					}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted",
						children: subtitle
					}) : null]
				}),
				actions
			]
		})
	});
}
function PageBody({ children, className, flushNav }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: cn("flex-1 px-4 py-4 md:px-6 md:py-6", flushNav ? "pb-4" : "pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-8", className),
		children
	});
}
function parseIsoDate(iso) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
	const [y, m, d] = iso.split("-").map(Number);
	const date = new Date(y, m - 1, d);
	if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
	return date;
}
function ageFromBirthDate(iso, today = /* @__PURE__ */ new Date()) {
	const birth = parseIsoDate(iso);
	if (!birth) return null;
	let age = today.getFullYear() - birth.getFullYear();
	const monthDelta = today.getMonth() - birth.getMonth();
	if (monthDelta < 0 || monthDelta === 0 && today.getDate() < birth.getDate()) age -= 1;
	return age < 0 ? 0 : age;
}
function blockFromAge(age) {
	if (age >= 3 && age <= 5) return "mam-non";
	if (age >= 6 && age <= 10) return "tieu-hoc";
	if (age >= 11 && age <= 15) return "thcs";
	return "khac";
}
function suggestClass(age) {
	if (age < 3) return "Nhà trẻ";
	if (age === 3) return "Mầm";
	if (age === 4) return "Chồi";
	if (age === 5) return "Lá";
	if (age >= 6 && age <= 14) return `Lớp ${age - 5}`;
	if (age === 15) return "Lớp 9";
	return "";
}
function formatBirthDate(iso) {
	const date = parseIsoDate(iso);
	if (!date) return iso;
	return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}
function isBirthdayThisMonth(iso, today = /* @__PURE__ */ new Date()) {
	const date = parseIsoDate(iso);
	if (!date) return false;
	return date.getMonth() === today.getMonth();
}
function ageLabel(age) {
	if (age === null) return "Chưa rõ tuổi";
	return `${age} tuổi`;
}
var HAMLETS = [
	{
		id: "sam-1",
		label: "Thôn Sấm 1"
	},
	{
		id: "sam-2",
		label: "Thôn Sấm 2"
	},
	{
		id: "sam-3",
		label: "Thôn Sấm 3"
	},
	{
		id: "bai-ca",
		label: "Thôn Bãi Cả"
	},
	{
		id: "khac",
		label: "Khác"
	}
];
var BLOCKS = [
	{
		id: "mam-non",
		label: "Mầm non",
		hint: "3–5 tuổi"
	},
	{
		id: "tieu-hoc",
		label: "Tiểu học",
		hint: "6–10 tuổi"
	},
	{
		id: "thcs",
		label: "THCS",
		hint: "11–15 tuổi"
	},
	{
		id: "khac",
		label: "Khác",
		hint: "Dưới 3 hoặc trên 15"
	}
];
var CLASS_BY_BLOCK = {
	"mam-non": [
		"Nhà trẻ",
		"Mầm",
		"Chồi",
		"Lá"
	],
	"tieu-hoc": [
		"Lớp 1",
		"Lớp 2",
		"Lớp 3",
		"Lớp 4",
		"Lớp 5"
	],
	thcs: [
		"Lớp 6",
		"Lớp 7",
		"Lớp 8",
		"Lớp 9"
	],
	khac: [
		"Nhà trẻ",
		"Lớp 10",
		"Khác"
	]
};
var GENDERS = [{
	id: "nam",
	label: "Nam"
}, {
	id: "nu",
	label: "Nữ"
}];
var STORAGE_KEY = "ban-sam-thieu-nhi-v1";
function hamletLabel(id) {
	return HAMLETS.find((h) => h.id === id)?.label ?? id;
}
function blockLabel(id) {
	return BLOCKS.find((b) => b.id === id)?.label ?? id;
}
var ROWS = [
	{
		fullName: "Nguyễn Văn Minh",
		birthDate: "2012-11-20",
		gender: "nam",
		fatherName: "Nguyễn Văn Thành",
		motherName: "Phạm Thị Hoa",
		parentPhone: "0912345678",
		hamlet: "sam-1",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Trần Thị Ánh",
		birthDate: "2018-02-08",
		gender: "nu",
		fatherName: "Trần Văn Bình",
		motherName: "Lê Thị Hằng",
		parentPhone: "0987654321",
		hamlet: "sam-2",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Lê Đức Phúc",
		birthDate: "2022-06-14",
		gender: "nam",
		fatherName: "Lê Văn Cường",
		motherName: "Hoàng Thị Nga",
		parentPhone: "0903123456",
		hamlet: "sam-3",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Hoàng Thị Lan",
		birthDate: "2011-01-30",
		gender: "nu",
		fatherName: "Hoàng Văn Sơn",
		motherName: "Đỗ Thị Huệ",
		parentPhone: "0934567890",
		hamlet: "bai-ca",
		currentAddress: "",
		notes: "Lớp trưởng"
	},
	{
		fullName: "Phạm Văn Hùng",
		birthDate: "2020-09-03",
		gender: "nam",
		fatherName: "Phạm Văn Dũng",
		motherName: "Ngô Thị Mai",
		parentPhone: "0978123456",
		hamlet: "sam-1",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Đỗ Thị Ngọc",
		birthDate: "2016-12-22",
		gender: "nu",
		fatherName: "Đỗ Văn Hải",
		motherName: "Bùi Thị Lý",
		parentPhone: "0945678901",
		hamlet: "sam-2",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Bùi Quang Hải",
		birthDate: "2023-03-18",
		gender: "nam",
		fatherName: "Bùi Văn Phong",
		motherName: "Vũ Thị Oanh",
		parentPhone: "0966789012",
		hamlet: "sam-3",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Vũ Thị Mai",
		birthDate: "2014-07-09",
		gender: "nu",
		fatherName: "Vũ Văn Long",
		motherName: "Cao Thị Yến",
		parentPhone: "0911222333",
		hamlet: "bai-ca",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Ngô Văn Tuấn",
		birthDate: "2019-05-25",
		gender: "nam",
		fatherName: "Ngô Văn Đạt",
		motherName: "Lý Thị Hương",
		parentPhone: "0888123456",
		hamlet: "sam-1",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Lý Thị Hương",
		birthDate: "2021-10-11",
		gender: "nu",
		fatherName: "Lý Văn Tâm",
		motherName: "Trịnh Thị Hà",
		parentPhone: "",
		hamlet: "sam-2",
		currentAddress: "",
		notes: "Chưa có SĐT phụ huynh"
	},
	{
		fullName: "Trịnh Văn Long",
		birthDate: "2015-08-19",
		gender: "nam",
		fatherName: "Trịnh Văn Hòa",
		motherName: "Mai Thị Nhung",
		parentPhone: "0923456789",
		hamlet: "sam-3",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Mai Thị Hà",
		birthDate: "2017-04-05",
		gender: "nu",
		fatherName: "Mai Văn Kiên",
		motherName: "Đặng Thị Thu",
		parentPhone: "0933222111",
		hamlet: "bai-ca",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Đặng Văn Nam",
		birthDate: "2021-01-28",
		gender: "nam",
		fatherName: "Đặng Văn Phú",
		motherName: "Cao Thị Lệ",
		parentPhone: "0955667788",
		hamlet: "sam-1",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Cao Thị Yến",
		birthDate: "2013-09-16",
		gender: "nu",
		fatherName: "Cao Văn Hưng",
		motherName: "Phan Thị Dung",
		parentPhone: "0977000111",
		hamlet: "sam-2",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Phan Văn Dũng",
		birthDate: "2024-02-02",
		gender: "nam",
		fatherName: "Phan Văn Toàn",
		motherName: "Lương Thị Thảo",
		parentPhone: "0909000111",
		hamlet: "sam-3",
		currentAddress: "",
		notes: "Chưa đến tuổi mầm non"
	},
	{
		fullName: "Lương Thị Thảo",
		birthDate: "2010-06-21",
		gender: "nu",
		fatherName: "Lương Văn Bình",
		motherName: "Hồ Thị Xuân",
		parentPhone: "0918000222",
		hamlet: "bai-ca",
		currentAddress: "",
		notes: "Trên 15 tuổi"
	},
	{
		fullName: "Hồ Văn Khoa",
		birthDate: "2018-11-07",
		gender: "nam",
		fatherName: "Hồ Văn Quang",
		motherName: "Đinh Thị Linh",
		parentPhone: "0988111222",
		hamlet: "sam-1",
		currentAddress: "",
		notes: ""
	},
	{
		fullName: "Đinh Thị Linh",
		birthDate: "2022-12-01",
		gender: "nu",
		fatherName: "Đinh Văn Thắng",
		motherName: "Nguyễn Thị Tuyết",
		parentPhone: "0944333222",
		hamlet: "sam-2",
		currentAddress: "",
		notes: ""
	}
];
function draftFromSeed(row) {
	const age = ageFromBirthDate(row.birthDate) ?? 0;
	return {
		...row,
		block: blockFromAge(age),
		className: suggestClass(age)
	};
}
function createSeedRecords(now = Date.now()) {
	return ROWS.map((row, index) => {
		const draft = draftFromSeed(row);
		return {
			id: `seed-${String(index + 1).padStart(2, "0")}`,
			stt: index + 1,
			...draft,
			createdAt: now - (ROWS.length - index) * 864e5,
			updatedAt: now - (ROWS.length - index) * 864e5
		};
	});
}
function nextStt(list) {
	return list.reduce((max, child) => Math.max(max, child.stt), 0) + 1;
}
function completeDraft(draft) {
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
		block: draft.block || (age === null ? "khac" : blockFromAge(age))
	};
}
function toRecord(draft, id, stt, now) {
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
		updatedAt: now
	};
}
var useChildrenStore = create()(persist((set, get) => ({
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
		set({ children: get().children.map((child) => child.id === id ? {
			...toRecord(draft, child.id, draft.stt ?? child.stt, child.createdAt),
			updatedAt: now
		} : child) });
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
		const incoming = drafts.map((draft, index) => toRecord(draft, crypto.randomUUID(), draft.stt && draft.stt > 0 ? draft.stt : index + 1, now + index));
		set({
			children: incoming,
			hasSeeded: true
		});
		return incoming.length;
	},
	renumber: () => {
		set({ children: [...get().children].sort((a, b) => a.stt - b.stt).map((child, index) => ({
			...child,
			stt: index + 1,
			updatedAt: Date.now()
		})) });
	},
	restoreSample: () => {
		set({
			children: createSeedRecords(),
			hasSeeded: true
		});
	},
	clearAll: () => {
		set({
			children: [],
			hasSeeded: true
		});
	}
}), {
	name: STORAGE_KEY,
	version: 1,
	onRehydrateStorage: () => (state) => {
		if (!state) return;
		if (!state.hasSeeded && state.children.length === 0) useChildrenStore.setState({
			children: createSeedRecords(),
			hasSeeded: true
		});
	}
}));
//#endregion
export { isBirthdayThisMonth as _, CLASS_BY_BLOCK as a, PageBody as c, ageLabel as d, blockFromAge as f, hamletLabel as g, formatBirthDate as h, Button as i, PageHeader as l, cn as m, BLOCKS as n, GENDERS as o, blockLabel as p, BrandMark as r, HAMLETS as s, AppFrame as t, ageFromBirthDate as u, suggestClass as v, useChildrenStore as y };
