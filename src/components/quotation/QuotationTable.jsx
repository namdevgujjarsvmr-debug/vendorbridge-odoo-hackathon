import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, statusTone } from "@/components/common/Badge";
function QuotationTable({ quotations }) {
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
                children: "Quote ID",
              }),
              /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-medium", children: "RFQ" }),
              /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-medium", children: "Vendor" }),
              /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-medium", children: "Price" }),
              /* @__PURE__ */ jsx("th", {
                className: "px-5 py-3 font-medium",
                children: "Delivery",
              }),
              /* @__PURE__ */ jsx("th", {
                className: "px-5 py-3 font-medium",
                children: "Warranty",
              }),
              /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-medium", children: "Status" }),
            ],
          }),
        }),
        /* @__PURE__ */ jsx("tbody", {
          children: quotations.map((q) =>
            /* @__PURE__ */ jsxs(
              "tr",
              {
                className: "border-b border-border last:border-0 hover:bg-muted/40",
                children: [
                  /* @__PURE__ */ jsx("td", { className: "px-5 py-3 font-medium", children: q.id }),
                  /* @__PURE__ */ jsx("td", {
                    className: "px-5 py-3 text-muted-foreground",
                    children: q.rfqId,
                  }),
                  /* @__PURE__ */ jsx("td", { className: "px-5 py-3", children: q.vendor }),
                  /* @__PURE__ */ jsxs("td", {
                    className: "px-5 py-3 font-medium",
                    children: ["\u20B9", q.price.toLocaleString()],
                  }),
                  /* @__PURE__ */ jsx("td", {
                    className: "px-5 py-3 text-muted-foreground",
                    children: q.delivery,
                  }),
                  /* @__PURE__ */ jsx("td", {
                    className: "px-5 py-3 text-muted-foreground",
                    children: q.warranty,
                  }),
                  /* @__PURE__ */ jsx("td", {
                    className: "px-5 py-3",
                    children: /* @__PURE__ */ jsx(Badge, {
                      tone: statusTone(q.status),
                      children: q.status,
                    }),
                  }),
                ],
              },
              q.id,
            ),
          ),
        }),
      ],
    }),
  });
}
export { QuotationTable };
