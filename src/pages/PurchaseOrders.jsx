import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card } from "@/components/common/Card";
import { Badge, statusTone } from "@/components/common/Badge";
import { PurchaseOrderView } from "@/components/purchaseOrder/PurchaseOrderView";
import { api } from "@/services/api";
function PurchaseOrders() {
  const [pos, setPos] = useState([]);
  const [active, setActive] = useState(null);
  useEffect(() => {
    api.getPurchaseOrders().then((p) => {
      setPos(p);
      setActive(p[0]);
    });
  }, []);
  const updateStatus = async (status) => {
    const updated = await api.updatePurchaseOrder(active.id, { status });
    setPos((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    setActive(updated);
  };
  if (!active) return null;
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-5",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h1", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Purchase Orders",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "mt-1 text-sm text-muted-foreground",
            children: "Issue, track and reconcile purchase orders with suppliers.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "grid gap-5 lg:grid-cols-[320px_1fr]",
        children: [
          /* @__PURE__ */ jsx(Card, {
            title: "All Orders",
            padded: false,
            children: /* @__PURE__ */ jsx("ul", {
              className: "divide-y divide-border",
              children: pos.map((p) =>
                /* @__PURE__ */ jsx(
                  "li",
                  {
                    children: /* @__PURE__ */ jsxs("button", {
                      onClick: () => setActive(p),
                      className: `w-full text-left px-5 py-3 hover:bg-muted/40 transition-colors ${active.id === p.id ? "bg-muted/50" : ""}`,
                      children: [
                        /* @__PURE__ */ jsxs("div", {
                          className: "flex items-center justify-between",
                          children: [
                            /* @__PURE__ */ jsx("span", {
                              className: "font-medium text-sm",
                              children: p.id,
                            }),
                            /* @__PURE__ */ jsx(Badge, {
                              tone: statusTone(p.status),
                              children: p.status,
                            }),
                          ],
                        }),
                        /* @__PURE__ */ jsx("div", {
                          className: "mt-1 text-xs text-muted-foreground",
                          children: p.vendor,
                        }),
                        /* @__PURE__ */ jsxs("div", {
                          className: "mt-1 text-xs",
                          children: ["\u20B9", p.total.toLocaleString(), " \xB7 ETA ", p.eta],
                        }),
                      ],
                    }),
                  },
                  p.id,
                ),
              ),
            }),
          }),
          /* @__PURE__ */ jsx(PurchaseOrderView, { po: active, onStatusChange: updateStatus }),
        ],
      }),
    ],
  });
}
export { PurchaseOrders };
