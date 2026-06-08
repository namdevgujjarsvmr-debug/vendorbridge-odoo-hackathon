import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, statusTone } from "@/components/common/Badge";
import { Star, MoreHorizontal } from "lucide-react";
function VendorTable({ vendors }) {
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
              /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-medium", children: "Vendor" }),
              /* @__PURE__ */ jsx("th", {
                className: "px-5 py-3 font-medium",
                children: "Category",
              }),
              /* @__PURE__ */ jsx("th", {
                className: "px-5 py-3 font-medium",
                children: "Location",
              }),
              /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-medium", children: "Rating" }),
              /* @__PURE__ */ jsx("th", {
                className: "px-5 py-3 font-medium",
                children: "On-time",
              }),
              /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-medium", children: "Spend" }),
              /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-medium", children: "Status" }),
              /* @__PURE__ */ jsx("th", { className: "px-5 py-3 font-medium" }),
            ],
          }),
        }),
        /* @__PURE__ */ jsx("tbody", {
          children: vendors.map((v, i) =>
            /* @__PURE__ */ jsxs(
              "tr",
              {
                className:
                  "border-b border-border last:border-0 transition-colors animate-fade-up hover:bg-muted/40",
                style: { animationDelay: `${60 + i * 45}ms` },
                children: [
                  /* @__PURE__ */ jsx("td", {
                    className: "px-5 py-3",
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-3",
                      children: [
                        /* @__PURE__ */ jsx("div", {
                          className:
                            "flex h-8 w-8 items-center justify-center rounded-md bg-primary text-[11px] font-semibold text-primary-foreground",
                          children: v.name
                            .split(" ")
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join(""),
                        }),
                        /* @__PURE__ */ jsxs("div", {
                          children: [
                            /* @__PURE__ */ jsx("div", {
                              className: "font-medium",
                              children: v.name,
                            }),
                            /* @__PURE__ */ jsxs("div", {
                              className: "text-[11px] text-muted-foreground",
                              children: [v.id, " \xB7 ", v.contact],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  /* @__PURE__ */ jsx("td", {
                    className: "px-5 py-3 text-muted-foreground",
                    children: v.category,
                  }),
                  /* @__PURE__ */ jsx("td", {
                    className: "px-5 py-3 text-muted-foreground",
                    children: v.location,
                  }),
                  /* @__PURE__ */ jsx("td", {
                    className: "px-5 py-3",
                    children: /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-1",
                      children: [
                        /* @__PURE__ */ jsx(Star, {
                          className: "h-3.5 w-3.5 fill-amber-400 text-amber-400",
                        }),
                        /* @__PURE__ */ jsx("span", {
                          className: "tabular-nums",
                          children: v.rating,
                        }),
                      ],
                    }),
                  }),
                  /* @__PURE__ */ jsxs("td", {
                    className: "px-5 py-3 tabular-nums",
                    children: [v.onTime, "%"],
                  }),
                  /* @__PURE__ */ jsxs("td", {
                    className: "px-5 py-3 font-medium tabular-nums",
                    children: ["\u20B9", v.spend.toLocaleString()],
                  }),
                  /* @__PURE__ */ jsx("td", {
                    className: "px-5 py-3",
                    children: /* @__PURE__ */ jsx(Badge, {
                      tone: statusTone(v.status),
                      children: v.status,
                    }),
                  }),
                  /* @__PURE__ */ jsx("td", {
                    className: "px-5 py-3 text-right",
                    children: /* @__PURE__ */ jsx("button", {
                      className:
                        "rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                      children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
                    }),
                  }),
                ],
              },
              v.id,
            ),
          ),
        }),
      ],
    }),
  });
}
export { VendorTable };
