import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Download, i as Trash2, n as Upload, p as FileUp } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as PageBody, f as blockFromAge, g as hamletLabel, h as formatBirthDate, i as Button, l as PageHeader, n as BLOCKS, p as blockLabel, s as HAMLETS, t as AppFrame, u as ageFromBirthDate, v as suggestClass, y as useChildrenStore } from "./store-CuEClROJ.mjs";
import { a as stripVi, t as BlockBadge } from "./text-BOI4eKE9.mjs";
import { t as useHasHydrated } from "./hydrate-V03dGRTC.mjs";
import { t as ConfirmDialog } from "./confirm-dialog-YRAyAj8H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/excel-BSoe9bOF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EXCEL_HEADERS = [
	"STT",
	"Họ và tên",
	"Ngày sinh",
	"Giới tính",
	"Tên bố",
	"Tên mẹ",
	"SĐT phụ huynh",
	"Địa chỉ cũ (thôn)",
	"Địa chỉ hiện tại",
	"Khối",
	"Lớp",
	"Ghi chú"
];
var HEADER_ALIASES = {
	stt: [
		"stt",
		"so thu tu",
		"so",
		"stt."
	],
	fullName: [
		"ho va ten",
		"ho ten",
		"ten",
		"ho ten em",
		"ho va ten em",
		"hoten"
	],
	birthDate: [
		"ngay sinh",
		"ns",
		"dob",
		"nam sinh",
		"ngaysinh"
	],
	gender: ["gioi tinh", "gt"],
	fatherName: [
		"ten bo",
		"bo",
		"cha",
		"ho ten bo",
		"ten cha"
	],
	motherName: [
		"ten me",
		"me",
		"ho ten me"
	],
	parentPhone: [
		"sdt phu huynh",
		"sdt",
		"dien thoai",
		"so dien thoai",
		"dien thoai phu huynh",
		"phone"
	],
	hamlet: [
		"dia chi cu",
		"thon",
		"thon dia chi cu",
		"dia chi cu thon"
	],
	currentAddress: [
		"dia chi hien tai",
		"dia chi moi",
		"dia chi",
		"dia chi chi tiet"
	],
	block: ["khoi", "nganh"],
	className: ["lop", "lop hoc"],
	notes: [
		"ghi chu",
		"notes",
		"ghichu"
	]
};
function cellString(value) {
	if (value == null) return "";
	if (value instanceof Date) return formatBirthDate(toIsoDate(value));
	if (typeof value === "number") return String(value);
	return String(value).trim();
}
function toIsoDate(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function parseBirthDate(value) {
	if (value instanceof Date && !Number.isNaN(value.getTime())) return toIsoDate(value);
	if (typeof value === "number" && Number.isFinite(value)) {
		const utc = new Date(Math.round((value - 25569) * 86400 * 1e3));
		return `${utc.getUTCFullYear()}-${String(utc.getUTCMonth() + 1).padStart(2, "0")}-${String(utc.getUTCDate()).padStart(2, "0")}`;
	}
	const raw = cellString(value);
	if (!raw) return "";
	const dmy = raw.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/);
	if (dmy) return `${dmy[3]}-${dmy[2].padStart(2, "0")}-${dmy[1].padStart(2, "0")}`;
	const ymd = raw.match(/^(\d{4})[/\-.](\d{1,2})[/\-.](\d{1,2})$/);
	if (ymd) return `${ymd[1]}-${ymd[2].padStart(2, "0")}-${ymd[3].padStart(2, "0")}`;
	return "";
}
function parseGender(value) {
	const key = stripVi(value);
	if ([
		"nu",
		"gai",
		"female",
		"f",
		"girl"
	].includes(key)) return "nu";
	return "nam";
}
function parseHamlet(value) {
	const key = stripVi(value);
	if (!key) return "khac";
	if (key.includes("bai ca") || key.includes("baica")) return "bai-ca";
	if (key.includes("sam 1") || key.includes("sam1")) return "sam-1";
	if (key.includes("sam 2") || key.includes("sam2")) return "sam-2";
	if (key.includes("sam 3") || key.includes("sam3")) return "sam-3";
	if (key.includes("khac")) return "khac";
	return HAMLETS.find((h) => stripVi(h.label) === key || h.id === key)?.id ?? "khac";
}
function parseBlock(value, age) {
	const key = stripVi(value);
	if (key.includes("mam non") || key.includes("mau giao") || key === "mn") return "mam-non";
	if (key.includes("tieu hoc") || key === "th") return "tieu-hoc";
	if (key.includes("thcs") || key.includes("trung hoc")) return "thcs";
	if (key.includes("khac")) return "khac";
	const exact = BLOCKS.find((b) => stripVi(b.label) === key);
	if (exact) return exact.id;
	return age === null ? "khac" : blockFromAge(age);
}
function mapHeaders(headerRow) {
	const map = {};
	headerRow.forEach((cell, index) => {
		const key = stripVi(cellString(cell)).replace(/[():]/g, " ").replace(/\s+/g, " ").trim();
		Object.keys(HEADER_ALIASES).forEach((field) => {
			if (map[field] != null) return;
			if (HEADER_ALIASES[field].some((alias) => key === alias || key.includes(alias))) map[field] = index;
		});
	});
	return map;
}
function looksLikeHeader(row) {
	const joined = stripVi(row.map(cellString).join(" "));
	return joined.includes("ho") && (joined.includes("ten") || joined.includes("sinh"));
}
function defaultMap() {
	return {
		stt: 0,
		fullName: 1,
		birthDate: 2,
		gender: 3,
		fatherName: 4,
		motherName: 5,
		parentPhone: 6,
		hamlet: 7,
		currentAddress: 8,
		block: 9,
		className: 10,
		notes: 11
	};
}
async function parseChildrenWorkbook(file) {
	const XLSX = await import("../_libs/xlsx.mjs").then((n) => n.t);
	const buffer = await file.arrayBuffer();
	const workbook = XLSX.read(buffer, {
		type: "array",
		cellDates: true
	});
	const sheetName = workbook.SheetNames[0];
	if (!sheetName) return {
		drafts: [],
		issues: [{
			row: 0,
			message: "File không có sheet"
		}],
		skipped: 0
	};
	const sheet = workbook.Sheets[sheetName];
	const rows = XLSX.utils.sheet_to_json(sheet, {
		header: 1,
		raw: true,
		defval: ""
	});
	if (rows.length === 0) return {
		drafts: [],
		issues: [{
			row: 0,
			message: "File trống"
		}],
		skipped: 0
	};
	let start = 0;
	let indexMap = defaultMap();
	if (looksLikeHeader(rows[0] ?? [])) {
		indexMap = {
			...defaultMap(),
			...mapHeaders(rows[0] ?? [])
		};
		start = 1;
	}
	const drafts = [];
	const issues = [];
	let skipped = 0;
	for (let i = start; i < rows.length; i += 1) {
		const row = rows[i] ?? [];
		const get = (field) => row[indexMap[field] ?? -1];
		const fullName = cellString(get("fullName"));
		if (!fullName) {
			if (row.every((cell) => cellString(cell) === "")) continue;
			skipped += 1;
			issues.push({
				row: i + 1,
				message: "Thiếu họ và tên"
			});
			continue;
		}
		const birthDate = parseBirthDate(get("birthDate"));
		if (!birthDate) {
			skipped += 1;
			issues.push({
				row: i + 1,
				message: `Không đọc được ngày sinh của ${fullName}`
			});
			continue;
		}
		const age = ageFromBirthDate(birthDate);
		const sttRaw = Number(cellString(get("stt")));
		drafts.push({
			fullName,
			birthDate,
			gender: parseGender(cellString(get("gender"))),
			fatherName: cellString(get("fatherName")),
			motherName: cellString(get("motherName")),
			parentPhone: cellString(get("parentPhone")),
			hamlet: parseHamlet(cellString(get("hamlet"))),
			currentAddress: cellString(get("currentAddress")),
			block: parseBlock(cellString(get("block")), age),
			className: cellString(get("className")) || (age === null ? "" : suggestClass(age)),
			notes: cellString(get("notes")),
			stt: Number.isFinite(sttRaw) && sttRaw > 0 ? sttRaw : void 0
		});
	}
	return {
		drafts,
		issues,
		skipped
	};
}
function sheetRows(children) {
	return [[...EXCEL_HEADERS], ...children.map((child) => [
		child.stt,
		child.fullName,
		formatBirthDate(child.birthDate),
		child.gender === "nu" ? "Nữ" : "Nam",
		child.fatherName,
		child.motherName,
		child.parentPhone,
		hamletLabel(child.hamlet),
		child.currentAddress,
		blockLabel(child.block),
		child.className,
		child.notes
	])];
}
async function downloadChildrenExcel(children, filename) {
	const XLSX = await import("../_libs/xlsx.mjs").then((n) => n.t);
	const worksheet = XLSX.utils.aoa_to_sheet(sheetRows(children));
	worksheet["!cols"] = [
		6,
		24,
		14,
		10,
		22,
		22,
		16,
		18,
		24,
		12,
		12,
		28
	].map((wch) => ({ wch }));
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Thieu nhi");
	XLSX.writeFile(workbook, filename);
}
async function downloadExcelTemplate() {
	await downloadChildrenExcel([{
		id: "tpl-1",
		stt: 1,
		fullName: "Nguyễn Văn An",
		birthDate: "2018-03-12",
		gender: "nam",
		fatherName: "Nguyễn Văn Bình",
		motherName: "Trần Thị Hoa",
		parentPhone: "0912345678",
		hamlet: "sam-1",
		currentAddress: "",
		block: "tieu-hoc",
		className: "Lớp 3",
		notes: "Dòng mẫu — xóa khi nhập thật",
		createdAt: 0,
		updatedAt: 0
	}, {
		id: "tpl-2",
		stt: 2,
		fullName: "Lê Thị Bé",
		birthDate: "2022-08-20",
		gender: "nu",
		fatherName: "Lê Văn Cường",
		motherName: "Phạm Thị Lan",
		parentPhone: "0987654321",
		hamlet: "bai-ca",
		currentAddress: "",
		block: "mam-non",
		className: "Chồi",
		notes: "",
		createdAt: 0,
		updatedAt: 0
	}], "mau-danh-sach-thieu-nhi-ban-sam.xlsx");
}
function exportFileName(prefix = "danh-sach-thieu-nhi-ban-sam") {
	const now = /* @__PURE__ */ new Date();
	return `${prefix}-${`${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`}.xlsx`;
}
function ExcelPage() {
	const hydrated = useHasHydrated();
	const children = useChildrenStore((s) => s.children);
	const appendMany = useChildrenStore((s) => s.appendMany);
	const replaceAll = useChildrenStore((s) => s.replaceAll);
	const restoreSample = useChildrenStore((s) => s.restoreSample);
	const clearAll = useChildrenStore((s) => s.clearAll);
	const fileRef = (0, import_react.useRef)(null);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [issues, setIssues] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [confirmReplace, setConfirmReplace] = (0, import_react.useState)(false);
	const [confirmClear, setConfirmClear] = (0, import_react.useState)(false);
	async function onFile(file) {
		if (!file) return;
		setBusy(true);
		try {
			const result = await parseChildrenWorkbook(file);
			setPreview(result.drafts);
			setIssues(result.issues.map((item) => `Dòng ${item.row}: ${item.message}`));
			if (result.drafts.length === 0) toast.error("Không đọc được dòng hợp lệ nào");
			else toast.success(`Đọc được ${result.drafts.length} em`);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Không đọc được file");
		} finally {
			setBusy(false);
			if (fileRef.current) fileRef.current.value = "";
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Excel",
			subtitle: "Nhập và xuất danh sách"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageBody, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Xuất file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Tải toàn bộ sổ ra Excel để in, lưu hoặc gửi cho giáo lý viên."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "flex-1",
							disabled: !hydrated || children.length === 0,
							onClick: async () => {
								await downloadChildrenExcel(children, exportFileName());
								toast.success("Đã tải file Excel");
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }),
								"Xuất ",
								hydrated ? children.length : "…",
								" em"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "flex-1",
							onClick: async () => {
								await downloadExcelTemplate();
								toast.success("Đã tải file mẫu");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "size-4" }), "Tải file mẫu"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-xl border border-border bg-surface p-4 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Nhập từ Excel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Cột: STT, Họ và tên, Ngày sinh, Giới tính, Tên bố, Tên mẹ, SĐT phụ huynh, Địa chỉ cũ (thôn), Địa chỉ hiện tại, Khối, Lớp, Ghi chú. Khối sẽ được tính lại theo tuổi nếu để trống."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: ".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
						className: "sr-only",
						onChange: (e) => void onFile(e.target.files?.[0])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "soft",
						className: "mt-4 w-full",
						disabled: busy,
						onClick: () => fileRef.current?.click(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), busy ? "Đang đọc…" : "Chọn file Excel"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-subtle",
						children: "Thôn hợp lệ: Thôn Sấm 1, Thôn Sấm 2, Thôn Sấm 3, Thôn Bãi Cả."
					})
				]
			}),
			preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-xl border border-border bg-surface p-4 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-sm font-semibold",
						children: [
							"Xem trước (",
							preview.length,
							" em)"
						]
					}),
					issues.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1 text-xs text-danger",
						children: issues.slice(0, 6).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 max-h-72 overflow-auto rounded-lg border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[36rem] text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "sticky top-0 bg-bg-warm text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-2 font-medium",
										children: "Tên"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-2 font-medium",
										children: "Sinh"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-2 font-medium",
										children: "Khối"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-2 py-2 font-medium",
										children: "Thôn"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: preview.slice(0, 40).map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2 font-medium",
										children: row.fullName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-2 py-2 tabular-nums",
										children: [formatBirthDate(row.birthDate), ageFromBirthDate(row.birthDate) != null ? ` · ${ageFromBirthDate(row.birthDate)}t` : ""]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockBadge, { block: row.block })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-2",
										children: hamletLabel(row.hamlet)
									})
								]
							}, `${row.fullName}-${index}`)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								const added = appendMany(preview);
								setPreview(null);
								toast.success(`Đã thêm ${added} em vào sổ`);
							},
							children: "Thêm vào danh sách"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setConfirmReplace(true),
							children: "Thay thế toàn bộ sổ"
						})]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-xl border border-border bg-surface p-4 shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Dữ liệu trên máy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Sổ lưu trên điện thoại này. Xóa dữ liệu trình duyệt sẽ mất sổ — hãy xuất Excel để sao lưu."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "flex-1",
							onClick: () => restoreSample(),
							children: "Khôi phục dữ liệu mẫu"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "danger",
							className: "flex-1",
							onClick: () => setConfirmClear(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Xóa hết sổ"]
						})]
					})
				]
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: confirmReplace,
			danger: true,
			title: "Thay thế toàn bộ sổ?",
			description: "Danh sách hiện tại sẽ bị xóa và thay bằng file vừa chọn.",
			confirmLabel: "Thay thế",
			onClose: () => setConfirmReplace(false),
			onConfirm: () => {
				if (!preview) return;
				const count = replaceAll(preview);
				setPreview(null);
				toast.success(`Đã thay sổ bằng ${count} em`);
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
			open: confirmClear,
			danger: true,
			title: "Xóa hết danh sách?",
			description: "Toàn bộ thiếu nhi sẽ bị xóa khỏi máy này.",
			confirmLabel: "Xóa hết",
			onClose: () => setConfirmClear(false),
			onConfirm: () => {
				clearAll();
				toast.success("Đã xóa sổ");
			}
		})
	] });
}
//#endregion
export { ExcelPage as component };
