import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route } from "./router-DdJZelVg.mjs";
import { c as PageBody, l as PageHeader, t as AppFrame, y as useChildrenStore } from "./store-CuEClROJ.mjs";
import { t as useHasHydrated } from "./hydrate-V03dGRTC.mjs";
import { t as ChildForm } from "./child-form-CR-LJzqD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/em._id.sua-Dkfviaqk.js
var import_jsx_runtime = require_jsx_runtime();
function EditPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const hydrated = useHasHydrated();
	const child = useChildrenStore((s) => s.children.find((item) => item.id === id));
	const updateChild = useChildrenStore((s) => s.updateChild);
	if (hydrated && !child) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, {
		hideNav: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Không tìm thấy",
			backTo: "/danh-sach"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, {
			flushNav: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Em này không còn trong sổ."
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, {
		hideNav: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Sửa thông tin",
			subtitle: child?.fullName,
			backTo: `/em/${id}`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, {
			flushNav: true,
			children: child ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChildForm, {
				initial: child,
				submitLabel: "Lưu thay đổi",
				onCancel: () => void navigate({
					to: "/em/$id",
					params: { id }
				}),
				onSubmit: (draft) => {
					updateChild(id, draft);
					toast.success("Đã lưu thay đổi");
					navigate({
						to: "/em/$id",
						params: { id }
					});
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-xl bg-surface" })
		})]
	});
}
//#endregion
export { EditPage as component };
