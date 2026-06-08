import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "@/components/common/Button";
import { Badge, statusTone } from "@/components/common/Badge";
import { downloadText } from "@/lib/export";
function InvoiceView({ invoice, onMarkPaid }) {
  const lines = [
    { desc: "Workstation Desk \u2014 Model X", qty: 20, rate: 12500 },
    { desc: "Ergonomic Chair \u2014 Mesh", qty: 20, rate: 8800 },
    { desc: "Setup & on-site assembly", qty: 1, rate: 18e3 },
  ];
  const subtotal = lines.reduce((s, l) => s + l.qty * l.rate, 0);
  const tax = Math.round(subtotal * 0.18);
  const printable = `Invoice ${invoice.id}
Vendor: ${invoice.vendor}
PO: ${invoice.po}
Due: ${invoice.due}
Amount: INR ${invoice.amount}
Status: ${invoice.status}`;
  return /* @__PURE__ */ jsxs("div", {
    className: "card-surface overflow-hidden",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-wrap items-start justify-between gap-4 border-b border-border px-8 py-6",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsx("div", {
                className: "text-2xl font-semibold tracking-tight",
                children: "Invoice",
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "mt-0.5 text-xs text-muted-foreground",
                children: [invoice.id, " \xB7 Linked PO ", invoice.po],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "text-right",
            children: [
              /* @__PURE__ */ jsx("div", {
                className: "text-[11px] uppercase tracking-wider text-muted-foreground",
                children: "Amount Due",
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "text-2xl font-semibold",
                children: ["\u20B9", invoice.amount.toLocaleString()],
              }),
              /* @__PURE__ */ jsx(Badge, {
                tone: statusTone(invoice.status),
                className: "mt-1",
                children: invoice.status,
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 gap-6 px-8 py-6 sm:grid-cols-3",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsx("div", {
                className:
                  "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                children: "From",
              }),
              /* @__PURE__ */ jsx("div", {
                className: "mt-1 text-sm font-medium",
                children: invoice.vendor,
              }),
              /* @__PURE__ */ jsx("div", {
                className: "text-xs text-muted-foreground",
                children: "b2b@vertex.tech \xB7 GSTIN 06AAA\u2026",
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsx("div", {
                className:
                  "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                children: "To",
              }),
              /* @__PURE__ */ jsx("div", {
                className: "mt-1 text-sm font-medium",
                children: "SupplySaathi Pvt Ltd",
              }),
              /* @__PURE__ */ jsx("div", {
                className: "text-xs text-muted-foreground",
                children: "14F Tower B, Cyber City \xB7 Gurgaon",
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsx("div", {
                className:
                  "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                children: "Due Date",
              }),
              /* @__PURE__ */ jsx("div", {
                className: "mt-1 text-sm font-medium",
                children: invoice.due,
              }),
              /* @__PURE__ */ jsx("div", {
                className: "text-xs text-muted-foreground",
                children: "Net 30 \xB7 Bank transfer",
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
                  className: "px-8 py-2.5 font-medium",
                  children: "Description",
                }),
                /* @__PURE__ */ jsx("th", {
                  className: "px-8 py-2.5 font-medium text-right",
                  children: "Qty",
                }),
                /* @__PURE__ */ jsx("th", {
                  className: "px-8 py-2.5 font-medium text-right",
                  children: "Rate",
                }),
                /* @__PURE__ */ jsx("th", {
                  className: "px-8 py-2.5 font-medium text-right",
                  children: "Amount",
                }),
              ],
            }),
          }),
          /* @__PURE__ */ jsx("tbody", {
            children: lines.map((l, i) =>
              /* @__PURE__ */ jsxs(
                "tr",
                {
                  className: "border-b border-border last:border-0",
                  children: [
                    /* @__PURE__ */ jsx("td", { className: "px-8 py-3", children: l.desc }),
                    /* @__PURE__ */ jsx("td", {
                      className: "px-8 py-3 text-right",
                      children: l.qty,
                    }),
                    /* @__PURE__ */ jsxs("td", {
                      className: "px-8 py-3 text-right",
                      children: ["\u20B9", l.rate.toLocaleString()],
                    }),
                    /* @__PURE__ */ jsxs("td", {
                      className: "px-8 py-3 text-right font-medium",
                      children: ["\u20B9", (l.qty * l.rate).toLocaleString()],
                    }),
                  ],
                },
                i,
              ),
            ),
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col items-end gap-1 border-t border-border px-8 py-5 text-sm",
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
          "flex items-center justify-end gap-2 border-t border-border bg-muted/30 px-8 py-3",
        children: [
          /* @__PURE__ */ jsx(Button, {
            variant: "secondary",
            size: "sm",
            onClick: () => window.print(),
            children: "Print",
          }),
          /* @__PURE__ */ jsx(Button, {
            variant: "secondary",
            size: "sm",
            onClick: () => downloadText(`${invoice.id}.txt`, printable),
            children: "Download PDF",
          }),
          /* @__PURE__ */ jsx(Button, {
            size: "sm",
            disabled: invoice.status === "Paid",
            onClick: onMarkPaid,
            children: invoice.status === "Paid" ? "Paid" : "Mark Paid",
          }),
        ],
      }),
    ],
  });
}
export { InvoiceView };
