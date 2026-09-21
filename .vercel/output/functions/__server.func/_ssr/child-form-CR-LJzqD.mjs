import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as string, i as object, t as _enum } from "../_libs/zod.mjs";
import { a as CLASS_BY_BLOCK, f as blockFromAge, i as Button, n as BLOCKS, o as GENDERS, p as blockLabel, s as HAMLETS, u as ageFromBirthDate, v as suggestClass } from "./store-CuEClROJ.mjs";
import { i as Textarea, n as Input, r as SelectField, t as Field } from "./input-gt2SgSi0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/child-form-CR-LJzqD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var childDraftSchema = object({
	fullName: string().trim().min(1, "Nhập họ và tên"),
	birthDate: string().regex(/^\d{4}-\d{2}-\d{2}$/, "Chọn ngày sinh hợp lệ"),
	gender: _enum(["nam", "nu"]),
	fatherName: string(),
	motherName: string(),
	parentPhone: string().refine((value) => {
		const compact = value.replace(/[\s.()\-]/g, "");
		if (!compact) return true;
		return /^(0\d{9}|\+84\d{9}|84\d{9})$/.test(compact);
	}, "Số điện thoại gồm 10 số, bắt đầu bằng 0"),
	hamlet: _enum([
		"sam-1",
		"sam-2",
		"sam-3",
		"bai-ca",
		"khac"
	]),
	currentAddress: string(),
	block: _enum([
		"mam-non",
		"tieu-hoc",
		"thcs",
		"khac"
	]),
	className: string(),
	notes: string()
});
var emptyDraft = {
	fullName: "",
	birthDate: "",
	gender: "nam",
	fatherName: "",
	motherName: "",
	parentPhone: "",
	hamlet: "sam-1",
	currentAddress: "",
	block: "khac",
	className: "",
	notes: ""
};
function ChildForm({ initial, submitLabel, onSubmit, onCancel }) {
	const [draft, setDraft] = (0, import_react.useState)({
		...emptyDraft,
		...initial
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [blockManual, setBlockManual] = (0, import_react.useState)(Boolean(initial?.block));
	const [classManual, setClassManual] = (0, import_react.useState)(Boolean(initial?.className));
	const age = (0, import_react.useMemo)(() => ageFromBirthDate(draft.birthDate), [draft.birthDate]);
	const suggestedBlock = age === null ? null : blockFromAge(age);
	const classOptions = CLASS_BY_BLOCK[draft.block];
	function patch(partial) {
		setDraft((prev) => {
			const next = {
				...prev,
				...partial
			};
			if (partial.birthDate && !blockManual) {
				const nextAge = ageFromBirthDate(partial.birthDate);
				if (nextAge !== null) {
					next.block = blockFromAge(nextAge);
					if (!classManual) next.className = suggestClass(nextAge);
				}
			}
			if (partial.block && !classManual) {
				const nextAge = ageFromBirthDate(next.birthDate);
				next.className = nextAge === null ? "" : suggestClass(nextAge);
			}
			return next;
		});
	}
	function handleSubmit(event) {
		event.preventDefault();
		const parsed = childDraftSchema.safeParse(draft);
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) {
				const key = String(issue.path[0] ?? "fullName");
				if (!next[key]) next[key] = issue.message;
			}
			setErrors(next);
			return;
		}
		setErrors({});
		onSubmit(parsed.data);
	}
	const today = /* @__PURE__ */ new Date();
	const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "mx-auto flex max-w-xl flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Họ và tên",
				error: errors.fullName,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: draft.fullName,
					onChange: (e) => patch({ fullName: e.target.value }),
					placeholder: "Nguyễn Văn An",
					autoComplete: "name"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Ngày sinh",
					error: errors.birthDate,
					hint: age === null ? "Khối được tính tự động theo tuổi" : `${age} tuổi · gợi ý ${suggestedBlock ? blockLabel(suggestedBlock) : "Khác"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: draft.birthDate,
						max: maxDate,
						min: "2005-01-01",
						onChange: (e) => patch({ birthDate: e.target.value })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Giới tính",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-12 grid-cols-2 rounded-md border border-border bg-surface-2 p-1",
						children: GENDERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => patch({ gender: item.id }),
							className: draft.gender === item.id ? "rounded-sm bg-primary text-sm font-medium text-primary-fg" : "rounded-sm text-sm font-medium text-muted",
							children: item.label
						}, item.id))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Tên bố",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft.fatherName,
						onChange: (e) => patch({ fatherName: e.target.value }),
						placeholder: "Họ tên bố"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Tên mẹ",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft.motherName,
						onChange: (e) => patch({ motherName: e.target.value }),
						placeholder: "Họ tên mẹ"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "SĐT phụ huynh",
				error: errors.parentPhone,
				hint: "10 số, bắt đầu bằng 0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "tel",
					inputMode: "tel",
					value: draft.parentPhone,
					onChange: (e) => patch({ parentPhone: e.target.value }),
					placeholder: "0912 345 678"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Địa chỉ cũ (thôn)",
				error: errors.hamlet,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					value: draft.hamlet,
					onChange: (e) => patch({ hamlet: e.target.value }),
					children: HAMLETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: item.id,
						children: item.label
					}, item.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Địa chỉ hiện tại",
				hint: "Để trống nếu vẫn ở thôn cũ",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: draft.currentAddress,
					onChange: (e) => patch({ currentAddress: e.target.value }),
					placeholder: "Số nhà, đường, nơi ở mới…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Khối",
					hint: "Mầm non 3–5 · Tiểu học 6–10 · THCS đến 15 tuổi",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
						value: draft.block,
						onChange: (e) => {
							setBlockManual(true);
							patch({ block: e.target.value });
						},
						children: BLOCKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: item.id,
							children: [
								item.label,
								" (",
								item.hint,
								")"
							]
						}, item.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Lớp",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectField, {
						value: classOptions.includes(draft.className) ? draft.className : "",
						onChange: (e) => {
							setClassManual(true);
							patch({ className: e.target.value });
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Chọn lớp"
						}), classOptions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item,
							children: item
						}, item))]
					})
				})]
			}),
			!classOptions.includes(draft.className) && draft.className ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Lớp (tùy chỉnh)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: draft.className,
					onChange: (e) => {
						setClassManual(true);
						patch({ className: e.target.value });
					}
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hoặc nhập tên lớp khác",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: classOptions.includes(draft.className) ? "" : draft.className,
					onChange: (e) => {
						setClassManual(true);
						patch({ className: e.target.value });
					},
					placeholder: "Ví dụ: Dự bị, Giáo lý…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Ghi chú",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: draft.notes,
					onChange: (e) => patch({ notes: e.target.value }),
					placeholder: "Ghi chú thêm nếu cần"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky bottom-0 -mx-4 mt-2 flex gap-2 border-t border-border bg-bg px-4 py-3 md:static md:mx-0 md:border-0 md:bg-transparent md:px-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					className: "flex-1",
					onClick: onCancel,
					children: "Hủy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "flex-1",
					children: submitLabel
				})]
			})
		]
	});
}
//#endregion
export { ChildForm as t };
