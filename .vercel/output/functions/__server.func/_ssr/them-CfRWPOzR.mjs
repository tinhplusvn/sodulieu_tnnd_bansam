import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as PageBody, l as PageHeader, t as AppFrame, y as useChildrenStore } from "./store-CuEClROJ.mjs";
import { t as ChildForm } from "./child-form-CR-LJzqD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/them-CfRWPOzR.js
var import_jsx_runtime = require_jsx_runtime();
function AddPage() {
	const navigate = useNavigate();
	const addChild = useChildrenStore((s) => s.addChild);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, {
		hideNav: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Thêm em",
			subtitle: "Số thứ tự sẽ được cấp tự động",
			backTo: "/danh-sach"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, {
			flushNav: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChildForm, {
				submitLabel: "Lưu vào sổ",
				onCancel: () => void navigate({ to: "/danh-sach" }),
				onSubmit: (draft) => {
					const record = addChild(draft);
					toast.success(`Đã thêm ${record.fullName}`);
					navigate({
						to: "/em/$id",
						params: { id: record.id }
					});
				}
			})
		})]
	});
}
//#endregion
export { AddPage as component };
