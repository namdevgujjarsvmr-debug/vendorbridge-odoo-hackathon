import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { VendorPerformanceChart } from "@/components/analytics/AnalyticsChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Card } from "@/components/common/Card";
import { Users, FileText, CheckCircle2, Package, Receipt, Wallet } from "lucide-react";
import { api } from "@/services/api";
function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([
      api.getKpis(),
      api.getMonthlySpend(),
      api.getVendorPerformance(),
      api.getActivity(),
    ]).then(([kpis2, spend2, perf2, activity2]) =>
      setData({ kpis: kpis2, spend: spend2, perf: perf2, activity: activity2 }),
    );
  }, []);
  if (!data) return null;
  const { kpis, spend, perf, activity } = data;
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("header", {
        children: [
          /* @__PURE__ */ jsx("h1", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Procurement Overview",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "mt-1 text-sm text-muted-foreground",
            children: "A live pulse on vendors, RFQs and spend across your organization.",
          }),
        ],
      }),
      /* @__PURE__ */ jsx("section", {
        className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-6",
        children: [
          /* @__PURE__ */ jsx(
            StatsCard,
            { label: "Total Vendors", value: kpis.totalVendors, delta: 4, icon: Users },
            "v",
          ),
          /* @__PURE__ */ jsx(
            StatsCard,
            {
              label: "Active RFQs",
              value: kpis.activeRFQs,
              delta: 12,
              icon: FileText,
              tone: "highlight",
            },
            "r",
          ),
          /* @__PURE__ */ jsx(
            StatsCard,
            {
              label: "Pending Approvals",
              value: kpis.pendingApprovals,
              delta: -3,
              icon: CheckCircle2,
            },
            "a",
          ),
          /* @__PURE__ */ jsx(
            StatsCard,
            {
              label: "Purchase Orders",
              value: kpis.purchaseOrders,
              delta: 8,
              icon: Package,
              tone: "success",
            },
            "p",
          ),
          /* @__PURE__ */ jsx(
            StatsCard,
            { label: "Invoices", value: kpis.invoices, delta: 2, icon: Receipt },
            "i",
          ),
          /* @__PURE__ */ jsx(
            StatsCard,
            {
              label: "Monthly Spend",
              value: `\u20B9${(kpis.monthlySpend / 1e3).toFixed(0)}k`,
              delta: 6,
              icon: Wallet,
              tone: "highlight",
            },
            "s",
          ),
        ].map((el, i) =>
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "animate-fade-up",
              style: { animationDelay: `${60 + i * 70}ms` },
              children: el,
            },
            i,
          ),
        ),
      }),
      /* @__PURE__ */ jsxs("section", {
        className: "grid gap-4 lg:grid-cols-3",
        children: [
          /* @__PURE__ */ jsx("div", {
            className: "lg:col-span-2",
            children: /* @__PURE__ */ jsx(SpendingChart, { data: spend }),
          }),
          /* @__PURE__ */ jsxs(Card, {
            title: "Approval Rate",
            subtitle: "Last 30 days",
            children: [
              /* @__PURE__ */ jsx("div", {
                className: "flex items-center justify-center py-4",
                children: /* @__PURE__ */ jsxs("div", {
                  className: "relative h-36 w-36",
                  children: [
                    /* @__PURE__ */ jsxs("svg", {
                      viewBox: "0 0 36 36",
                      className: "h-full w-full -rotate-90",
                      children: [
                        /* @__PURE__ */ jsx("circle", {
                          cx: "18",
                          cy: "18",
                          r: "15.9155",
                          fill: "none",
                          stroke: "var(--color-border)",
                          strokeWidth: "3",
                        }),
                        /* @__PURE__ */ jsx("circle", {
                          cx: "18",
                          cy: "18",
                          r: "15.9155",
                          fill: "none",
                          stroke: "var(--color-chart-2)",
                          strokeWidth: "3",
                          strokeDasharray: `${kpis.approvalRate}, 100`,
                          strokeLinecap: "round",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "absolute inset-0 flex flex-col items-center justify-center",
                      children: [
                        /* @__PURE__ */ jsxs("span", {
                          className: "text-3xl font-semibold",
                          children: [kpis.approvalRate, "%"],
                        }),
                        /* @__PURE__ */ jsx("span", {
                          className: "text-[11px] text-muted-foreground",
                          children: "approved",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-3 border-t border-border pt-3 text-center text-xs",
                children: [
                  /* @__PURE__ */ jsxs("div", {
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "142" }),
                      /* @__PURE__ */ jsx("div", {
                        className: "text-muted-foreground",
                        children: "Approved",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "9" }),
                      /* @__PURE__ */ jsx("div", {
                        className: "text-muted-foreground",
                        children: "On Hold",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "font-semibold", children: "12" }),
                      /* @__PURE__ */ jsx("div", {
                        className: "text-muted-foreground",
                        children: "Rejected",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("section", {
        className: "grid gap-4 lg:grid-cols-3",
        children: [
          /* @__PURE__ */ jsx("div", {
            className: "lg:col-span-2",
            children: /* @__PURE__ */ jsx(VendorPerformanceChart, { data: perf }),
          }),
          /* @__PURE__ */ jsx(ActivityFeed, { items: activity }),
        ],
      }),
    ],
  });
}
export { Dashboard };
