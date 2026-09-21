import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Cake, l as PhoneOff, m as FileSpreadsheet, s as Plus, t as Users } from "../_libs/lucide-react.mjs";
import { _ as isBirthdayThisMonth, c as PageBody, i as Button, n as BLOCKS, r as BrandMark, s as HAMLETS, t as AppFrame, u as ageFromBirthDate, y as useChildrenStore } from "./store-CuEClROJ.mjs";
import { t as ChildCard } from "./child-card-DIwlM2xG.mjs";
import { t as useHasHydrated } from "./hydrate-V03dGRTC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BQpSoopG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function greeting() {
	const hour = (/* @__PURE__ */ new Date()).getHours();
	if (hour < 12) return "Chào buổi sáng";
	if (hour < 18) return "Chào buổi chiều";
	return "Chào buổi tối";
}
function HomePage() {
	const hydrated = useHasHydrated();
	const children = useChildrenStore((s) => s.children);
	const stats = (0, import_react.useMemo)(() => {
		const byBlock = {
			"mam-non": 0,
			"tieu-hoc": 0,
			thcs: 0,
			khac: 0
		};
		const byHamlet = {
			"sam-1": 0,
			"sam-2": 0,
			"sam-3": 0,
			"bai-ca": 0,
			khac: 0
		};
		let missingPhone = 0;
		const birthdays = [];
		for (const child of children) {
			byBlock[child.block] += 1;
			byHamlet[child.hamlet] += 1;
			if (!child.parentPhone) missingPhone += 1;
			if (isBirthdayThisMonth(child.birthDate)) birthdays.push(child);
		}
		birthdays.sort((a, b) => {
			return Number(a.birthDate.slice(8, 10)) - Number(b.birthDate.slice(8, 10));
		});
		return {
			byBlock,
			byHamlet,
			missingPhone,
			birthdays
		};
	}, [children]);
	const hamletMax = Math.max(1, ...Object.values(stats.byHamlet));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "px-4 pb-2 pt-5 md:px-6 md:pt-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: greeting()
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-semibold tracking-tight",
					children: "Sổ Thiếu Nhi Bản Sấm"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Quản lý thiếu niên nhi đồng theo thôn, khối và lớp"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { className: "hidden size-12 md:block" })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, {
		className: "pt-2",
		children: !hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-4",
			children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-xl bg-surface" }, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallHint, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Tổng số",
					value: children.length,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" })
				}), BLOCKS.filter((b) => b.id !== "khac").map((block) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/danh-sach",
					search: {
						q: "",
						khoi: block.id,
						thon: "",
						lop: "",
						sort: "stt"
					},
					className: "rounded-xl border border-border bg-surface p-4 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted",
							children: block.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-2xl font-semibold tabular-nums tracking-tight",
							children: stats.byBlock[block.id]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: block.hint
						})
					]
				}, block.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-xl border border-border bg-surface p-4 shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Theo thôn (địa chỉ cũ)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/danh-sach",
						className: "text-xs font-medium text-primary",
						children: "Xem tất cả"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: HAMLETS.filter((h) => h.id !== "khac").map((hamlet) => {
						const count = stats.byHamlet[hamlet.id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/danh-sach",
							search: {
								q: "",
								khoi: "",
								thon: hamlet.id,
								lop: "",
								sort: "stt"
							},
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hamlet.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-muted",
									children: count
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-bg-warm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary",
									style: { width: `${count / hamletMax * 100}%` }
								})
							})]
						}) }, hamlet.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface p-4 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cake, { className: "size-4 text-primary" }), "Sinh nhật tháng này"]
					}), stats.birthdays.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Không có em nào sinh nhật trong tháng."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: stats.birthdays.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/em/$id",
								params: { id: child.id },
								className: "font-medium",
								children: child.fullName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-muted",
								children: [
									child.birthDate.slice(8, 10),
									"/",
									child.birthDate.slice(5, 7),
									ageFromBirthDate(child.birthDate) != null ? ` · ${ageFromBirthDate(child.birthDate)} tuổi` : ""
								]
							})]
						}, child.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface p-4 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-sm font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneOff, { className: "size-4 text-primary" }), "Thiếu số điện thoại"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-2xl font-semibold tabular-nums",
							children: stats.missingPhone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "em chưa có SĐT phụ huynh"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/them",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Thêm em"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/excel",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-4" }), "Nhập Excel"]
								})
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Mới cập nhật"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/danh-sach",
						className: "text-xs font-medium text-primary",
						children: "Danh sách"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2.5",
					children: [...children].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 4).map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChildCard, { child }, child.id))
				})]
			})
		] })
	})] });
}
function StatCard({ label, value, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-primary p-4 text-primary-fg shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-1.5 text-xs font-medium text-primary-fg/80",
				children: [icon, label]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-2xl font-semibold tabular-nums tracking-tight",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-primary-fg/70",
				children: "thiếu nhi"
			})
		]
	});
}
function InstallHint() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			if (window.localStorage.getItem("ban-sam-hide-install") === "1") return;
			setVisible(true);
		} catch {
			setVisible(true);
		}
	}, []);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 rounded-xl border border-border bg-primary-soft px-4 py-3 text-sm text-primary md:hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: "Dùng như ứng dụng điện thoại"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-primary/80",
				children: "Trên Android, mở trình đơn trình duyệt rồi chọn Thêm vào màn hình chính."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-2 text-xs font-semibold underline",
				onClick: () => {
					try {
						window.localStorage.setItem("ban-sam-hide-install", "1");
					} catch {}
					setVisible(false);
				},
				children: "Đã hiểu"
			})
		]
	});
}
//#endregion
export { HomePage as component };
