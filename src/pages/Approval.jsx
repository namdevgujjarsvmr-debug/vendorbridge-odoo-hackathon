import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ApprovalPanel } from "@/components/approval/ApprovalPanel";
import { api } from "@/services/api";
function Approval() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api.getApprovals().then(setItems);
  }, []);
  const updateStatus = async (id, status) => {
    const updated = await api.updateApproval(id, { status });
    setItems((current) => current.map((item) => (item.id === id ? updated : item)));
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-5",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h1", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Approval Workflow",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "mt-1 text-sm text-muted-foreground",
            children: "Multi-stage approvals across requesters, managers and finance.",
          }),
        ],
      }),
      /* @__PURE__ */ jsx(ApprovalPanel, { items, onStatusChange: updateStatus }),
    ],
  });
}
export { Approval };
