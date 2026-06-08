import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card } from "@/components/common/Card";
import { Badge, statusTone } from "@/components/common/Badge";
import { InvoiceView } from "@/components/invoice/InvoiceView";
import { api } from "@/services/api";
function Invoice() {
  const [invs, setInvs] = useState([]);
  const [active, setActive] = useState(null);
  useEffect(() => {
    api.getInvoices().then((d) => {
      setInvs(d);
      setActive(d[0]);
    });
  }, []);
  const markPaid = async () => {
    const updated = await api.updateInvoice(active.id, { status: "Paid" });
    setInvs((current) => current.map((item) => (item.id === updated.id ? updated : item)));
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
            children: "Invoices",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "mt-1 text-sm text-muted-foreground",
            children: "Review supplier invoices, three-way match and approve payment.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "grid gap-5 lg:grid-cols-[320px_1fr]",
        children: [
          /* @__PURE__ */ jsx(Card, {
            title: "Inbox",
            padded: false,
            children: /* @__PURE__ */ jsx("ul", {
              className: "divide-y divide-border",
              children: invs.map((i) =>
                /* @__PURE__ */ jsx(
                  "li",
                  {
                    children: /* @__PURE__ */ jsxs("button", {
                      onClick: () => setActive(i),
                      className: `w-full text-left px-5 py-3 hover:bg-muted/40 transition-colors ${active.id === i.id ? "bg-muted/50" : ""}`,
                      children: [
                        /* @__PURE__ */ jsxs("div", {
                          className: "flex items-center justify-between",
                          children: [
                            /* @__PURE__ */ jsx("span", {
                              className: "font-medium text-sm",
                              children: i.id,
                            }),
                            /* @__PURE__ */ jsx(Badge, {
                              tone: statusTone(i.status),
                              children: i.status,
                            }),
                          ],
                        }),
                        /* @__PURE__ */ jsx("div", {
                          className: "mt-1 text-xs text-muted-foreground",
                          children: i.vendor,
                        }),
                        /* @__PURE__ */ jsxs("div", {
                          className: "mt-1 text-xs",
                          children: ["\u20B9", i.amount.toLocaleString(), " \xB7 Due ", i.due],
                        }),
                      ],
                    }),
                  },
                  i.id,
                ),
              ),
            }),
          }),
          /* @__PURE__ */ jsx(InvoiceView, { invoice: active, onMarkPaid: markPaid }),
        ],
      }),
    ],
  });
}
export { Invoice };
