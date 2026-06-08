import { jsx, jsxs } from "react/jsx-runtime";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
function ComparisonTable({ quotations }) {
  const lowest = Math.min(...quotations.map((q) => q.price));
  const fastest = Math.min(...quotations.map((q) => parseInt(q.delivery)));
  return /* @__PURE__ */ jsx("div", {
    className: "overflow-x-auto",
    children: /* @__PURE__ */ jsxs("table", {
      className: "w-full text-sm",
      children: [
        /* @__PURE__ */ jsx("thead", {
          children: /* @__PURE__ */ jsxs("tr", {
            className:
              "border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground",
            children: [
              /* @__PURE__ */ jsx("th", {
                className: "px-5 py-3 font-medium",
                children: "Criteria",
              }),
              quotations.map((q) =>
                /* @__PURE__ */ jsx(
                  "th",
                  { className: "px-5 py-3 font-medium", children: q.vendor },
                  q.id,
                ),
              ),
            ],
          }),
        }),
        /* @__PURE__ */ jsxs("tbody", {
          children: [
            /* @__PURE__ */ jsx(Row, {
              label: "Price (\u20B9)",
              values: quotations.map((q) => ({
                text: `\u20B9${q.price.toLocaleString()}`,
                best: q.price === lowest,
              })),
            }),
            /* @__PURE__ */ jsx(Row, {
              label: "Delivery",
              values: quotations.map((q) => ({
                text: q.delivery,
                best: parseInt(q.delivery) === fastest,
              })),
            }),
            /* @__PURE__ */ jsx(Row, {
              label: "Warranty",
              values: quotations.map((q) => ({ text: q.warranty })),
            }),
            /* @__PURE__ */ jsx(Row, {
              label: "Status",
              values: quotations.map((q) => ({ text: q.status })),
            }),
          ],
        }),
      ],
    }),
  });
}
function Row({ label, values }) {
  return /* @__PURE__ */ jsxs("tr", {
    className: "border-b border-border last:border-0",
    children: [
      /* @__PURE__ */ jsx("td", {
        className: "px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground",
        children: label,
      }),
      values.map((v, i) =>
        /* @__PURE__ */ jsx(
          "td",
          {
            className: cn(
              "px-5 py-3",
              v.best && "bg-success/40 font-semibold text-success-foreground",
            ),
            children: /* @__PURE__ */ jsxs("span", {
              className: "inline-flex items-center gap-1.5",
              children: [
                v.best && /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }),
                v.text,
              ],
            }),
          },
          i,
        ),
      ),
    ],
  });
}
export { ComparisonTable };
