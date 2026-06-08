import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { ComparisonTable } from "@/components/comparison/ComparisonTable";
import { Award, Truck, Wallet } from "lucide-react";
import { api } from "@/services/api";
function Comparison() {
  const [q, setQ] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    api.getQuotations().then((all) => setQ(all.filter((x) => x.rfqId === "RFQ-2042")));
  }, []);
  if (q.length === 0) return null;
  const lowest = q.reduce((a, b) => (a.price < b.price ? a : b));
  const award = async () => {
    const updated = await api.awardQuotation(lowest.id);
    setQ((current) =>
      current.map((item) =>
        item.rfqId === updated.rfqId
          ? { ...item, status: item.id === updated.id ? "Awarded" : "Rejected" }
          : item,
      ),
    );
    setMessage(`Contract awarded to ${updated.vendor}.`);
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-5",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h1", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Vendor Comparison",
          }),
          /* @__PURE__ */ jsxs("p", {
            className: "mt-1 text-sm text-muted-foreground",
            children: [
              "Side-by-side analysis for ",
              /* @__PURE__ */ jsx("span", {
                className: "font-medium text-foreground",
                children: "RFQ-2042 \xB7 Lithium-ion Cells 18650",
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "grid gap-4 lg:grid-cols-3",
        children: [
          /* @__PURE__ */ jsxs(Card, {
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "flex items-start justify-between",
                children: [
                  /* @__PURE__ */ jsxs("div", {
                    children: [
                      /* @__PURE__ */ jsx("div", {
                        className:
                          "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                        children: "Recommended Vendor",
                      }),
                      /* @__PURE__ */ jsx("div", {
                        className: "mt-1 text-base font-semibold",
                        children: lowest.vendor,
                      }),
                      /* @__PURE__ */ jsx("div", {
                        className: "mt-0.5 text-xs text-muted-foreground",
                        children: "Best price + competitive delivery",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsx("div", {
                    className:
                      "flex h-9 w-9 items-center justify-center rounded-lg bg-success text-success-foreground",
                    children: /* @__PURE__ */ jsx(Award, { className: "h-4 w-4" }),
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-xs",
                children: [
                  /* @__PURE__ */ jsxs("div", {
                    children: [
                      /* @__PURE__ */ jsxs("div", {
                        className: "font-semibold",
                        children: ["\u20B9", lowest.price.toLocaleString()],
                      }),
                      /* @__PURE__ */ jsx("div", {
                        className: "text-muted-foreground",
                        children: "Quoted",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    children: [
                      /* @__PURE__ */ jsx("div", {
                        className: "font-semibold",
                        children: lowest.delivery,
                      }),
                      /* @__PURE__ */ jsx("div", {
                        className: "text-muted-foreground",
                        children: "Delivery",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    children: [
                      /* @__PURE__ */ jsx("div", {
                        className: "font-semibold",
                        children: lowest.warranty,
                      }),
                      /* @__PURE__ */ jsx("div", {
                        className: "text-muted-foreground",
                        children: "Warranty",
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsx(Button, {
                className: "mt-4 w-full",
                size: "sm",
                onClick: award,
                children: "Award Contract",
              }),
            ],
          }),
          /* @__PURE__ */ jsx(Card, {
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-start justify-between",
              children: [
                /* @__PURE__ */ jsxs("div", {
                  children: [
                    /* @__PURE__ */ jsx("div", {
                      className:
                        "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                      children: "Lowest Price",
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "mt-1 text-base font-semibold",
                      children: ["\u20B9", Math.min(...q.map((x) => x.price)).toLocaleString()],
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "mt-0.5 text-xs text-muted-foreground",
                      children: ["Across ", q.length, " vendor responses"],
                    }),
                  ],
                }),
                /* @__PURE__ */ jsx("div", {
                  className:
                    "flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground",
                  children: /* @__PURE__ */ jsx(Wallet, { className: "h-4 w-4" }),
                }),
              ],
            }),
          }),
          /* @__PURE__ */ jsx(Card, {
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-start justify-between",
              children: [
                /* @__PURE__ */ jsxs("div", {
                  children: [
                    /* @__PURE__ */ jsx("div", {
                      className:
                        "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                      children: "Fastest Delivery",
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "mt-1 text-base font-semibold",
                      children: [Math.min(...q.map((x) => parseInt(x.delivery))), " days"],
                    }),
                    /* @__PURE__ */ jsx("div", {
                      className: "mt-0.5 text-xs text-muted-foreground",
                      children: "Door-to-warehouse",
                    }),
                  ],
                }),
                /* @__PURE__ */ jsx("div", {
                  className:
                    "flex h-9 w-9 items-center justify-center rounded-lg bg-highlight text-highlight-foreground",
                  children: /* @__PURE__ */ jsx(Truck, { className: "h-4 w-4" }),
                }),
              ],
            }),
          }),
        ],
      }),
      message &&
        /* @__PURE__ */ jsx("div", {
          className:
            "rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800",
          children: message,
        }),
      /* @__PURE__ */ jsx(Card, {
        title: "Comparison Matrix",
        padded: false,
        children: /* @__PURE__ */ jsx(ComparisonTable, { quotations: q }),
      }),
    ],
  });
}
export { Comparison };
