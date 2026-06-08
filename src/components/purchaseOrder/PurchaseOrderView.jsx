import { jsx, jsxs } from "react/jsx-runtime";
import { Boxes } from "lucide-react";
import { Button } from "@/components/common/Button";
import { downloadText } from "@/lib/export";
function PurchaseOrderView({ po, onStatusChange }) {
  const lines = [
    { sku: "AL-BRK-04", desc: "CNC Aluminum Bracket \u2014 Type A", qty: 200, rate: 480 },
    { sku: "AL-BRK-08", desc: "CNC Aluminum Bracket \u2014 Type B", qty: 150, rate: 620 },
    { sku: "FAS-M6", desc: "M6 Hex Fasteners (pack of 100)", qty: 30, rate: 410 },
  ];
  const subtotal = lines.reduce((s, l) => s + l.qty * l.rate, 0);
  const tax = Math.round(subtotal * 0.18);
  const printable = `Purchase Order ${po.id}
Supplier: ${po.vendor}
Issued: ${po.date}
ETA: ${po.eta}
Total: INR ${po.total}
Status: ${po.status}`;
  return /* @__PURE__ */ jsxs("div", {
    className: "card-surface overflow-hidden",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex items-start justify-between gap-4 border-b border-border bg-muted/40 px-6 py-5",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsx("div", {
                className:
                  "flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground",
                children: /* @__PURE__ */ jsx(Boxes, { className: "h-5 w-5" }),
              }),
              /* @__PURE__ */ jsxs("div", {
                children: [
                  /* @__PURE__ */ jsx("div", {
                    className: "text-xs text-muted-foreground",
                    children: "Purchase Order",
                  }),
                  /* @__PURE__ */ jsx("div", {
                    className: "text-base font-semibold",
                    children: po.id,
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "text-right text-xs text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxs("div", {
                children: [
                  "Issued: ",
                  /* @__PURE__ */ jsx("span", { className: "text-foreground", children: po.date }),
                ],
              }),
              /* @__PURE__ */ jsxs("div", {
                children: [
                  "ETA: ",
                  /* @__PURE__ */ jsx("span", { className: "text-foreground", children: po.eta }),
                ],
              }),
              /* @__PURE__ */ jsxs("div", {
                children: [
                  "Status: ",
                  /* @__PURE__ */ jsx("span", {
                    className: "text-foreground",
                    children: po.status,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 gap-6 px-6 py-5 sm:grid-cols-2",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsx("div", {
                className:
                  "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                children: "Buyer",
              }),
              /* @__PURE__ */ jsx("div", {
                className: "mt-1 text-sm font-medium",
                children: "SupplySaathi Pvt Ltd",
              }),
              /* @__PURE__ */ jsx("div", {
                className: "text-xs text-muted-foreground",
                children: "14F Tower B, Cyber City \xB7 Gurgaon, IN",
              }),
              /* @__PURE__ */ jsx("div", {
                className: "text-xs text-muted-foreground",
                children: "GSTIN 06AAACS1234C1Z5",
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsx("div", {
                className:
                  "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                children: "Supplier",
              }),
              /* @__PURE__ */ jsx("div", {
                className: "mt-1 text-sm font-medium",
                children: po.vendor,
              }),
              /* @__PURE__ */ jsx("div", {
                className: "text-xs text-muted-foreground",
                children: "Industrial Area Phase II \xB7 Jamshedpur, IN",
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("table", {
        className: "w-full text-sm",
        children: [
          /* @__PURE__ */ jsx("thead", {
            children: /* @__PURE__ */ jsxs("tr", {
              className:
                "border-y border-border bg-muted/30 text-left text-[11px] uppercase tracking-wider text-muted-foreground",
              children: [
                /* @__PURE__ */ jsx("th", {
                  className: "px-6 py-2.5 font-medium",
                  children: "SKU",
                }),
                /* @__PURE__ */ jsx("th", {
                  className: "px-6 py-2.5 font-medium",
                  children: "Description",
                }),
                /* @__PURE__ */ jsx("th", {
                  className: "px-6 py-2.5 font-medium text-right",
                  children: "Qty",
                }),
                /* @__PURE__ */ jsx("th", {
                  className: "px-6 py-2.5 font-medium text-right",
                  children: "Rate",
                }),
                /* @__PURE__ */ jsx("th", {
                  className: "px-6 py-2.5 font-medium text-right",
                  children: "Amount",
                }),
              ],
            }),
          }),
          /* @__PURE__ */ jsx("tbody", {
            children: lines.map((l) =>
              /* @__PURE__ */ jsxs(
                "tr",
                {
                  className: "border-b border-border last:border-0",
                  children: [
                    /* @__PURE__ */ jsx("td", {
                      className: "px-6 py-3 font-mono text-xs",
                      children: l.sku,
                    }),
                    /* @__PURE__ */ jsx("td", { className: "px-6 py-3", children: l.desc }),
                    /* @__PURE__ */ jsx("td", {
                      className: "px-6 py-3 text-right",
                      children: l.qty,
                    }),
                    /* @__PURE__ */ jsxs("td", {
                      className: "px-6 py-3 text-right",
                      children: ["\u20B9", l.rate],
                    }),
                    /* @__PURE__ */ jsxs("td", {
                      className: "px-6 py-3 text-right font-medium",
                      children: ["\u20B9", (l.qty * l.rate).toLocaleString()],
                    }),
                  ],
                },
                l.sku,
              ),
            ),
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col items-end gap-1 border-t border-border px-6 py-4 text-sm",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "flex w-64 justify-between text-muted-foreground",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxs("span", { children: ["\u20B9", subtotal.toLocaleString()] }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex w-64 justify-between text-muted-foreground",
            children: [
              /* @__PURE__ */ jsx("span", { children: "GST (18%)" }),
              /* @__PURE__ */ jsxs("span", { children: ["\u20B9", tax.toLocaleString()] }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className:
              "mt-1 flex w-64 justify-between border-t border-border pt-2 text-base font-semibold",
            children: [
              /* @__PURE__ */ jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxs("span", {
                children: ["\u20B9", (subtotal + tax).toLocaleString()],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex items-center justify-end gap-2 border-t border-border bg-muted/30 px-6 py-3",
        children: [
          /* @__PURE__ */ jsx(Button, {
            variant: "secondary",
            size: "sm",
            onClick: () => downloadText(`${po.id}.txt`, printable),
            children: "Download PDF",
          }),
          /* @__PURE__ */ jsx(Button, {
            size: "sm",
            disabled: po.status === "Sent",
            onClick: () => onStatusChange?.("Sent"),
            children: po.status === "Sent" ? "Sent" : "Send to Supplier",
          }),
        ],
      }),
    ],
  });
}
export { PurchaseOrderView };
