import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { VendorPerformanceChart, CategorySpendChart } from "@/components/analytics/AnalyticsChart";
import { Activity, Target, TrendingUp, Users } from "lucide-react";
import { api } from "@/services/api";
function Analytics() {
  const [data, setData] = useState(null);
  useEffect(() => {
    Promise.all([api.getMonthlySpend(), api.getVendorPerformance(), api.getCategorySpend()]).then(
      ([spend, perf, cat]) => setData({ spend, perf, cat }),
    );
  }, []);
  if (!data) return null;
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-5",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h1", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Procurement Analytics",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "mt-1 text-sm text-muted-foreground",
            children: "Performance, spend and savings across the supplier base.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("section", {
        className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
        children: [
          /* @__PURE__ */ jsx(StatsCard, {
            label: "Avg. Vendor Score",
            value: "91.2",
            delta: 2,
            icon: Target,
            tone: "success",
          }),
          /* @__PURE__ */ jsx(StatsCard, {
            label: "Cycle Time",
            value: "6.4 d",
            delta: -8,
            icon: Activity,
          }),
          /* @__PURE__ */ jsx(StatsCard, {
            label: "Cost Savings (YTD)",
            value: "\u20B92.3M",
            delta: 14,
            icon: TrendingUp,
            tone: "highlight",
          }),
          /* @__PURE__ */ jsx(StatsCard, {
            label: "Onboarded Vendors",
            value: data.perf.length + 20,
            delta: 5,
            icon: Users,
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("section", {
        className: "grid gap-4 lg:grid-cols-3",
        children: [
          /* @__PURE__ */ jsx("div", {
            className: "lg:col-span-2",
            children: /* @__PURE__ */ jsx(SpendingChart, { data: data.spend }),
          }),
          /* @__PURE__ */ jsx(CategorySpendChart, { data: data.cat }),
        ],
      }),
      /* @__PURE__ */ jsx(VendorPerformanceChart, { data: data.perf }),
    ],
  });
}
export { Analytics };
