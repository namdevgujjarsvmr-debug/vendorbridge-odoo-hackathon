import { jsx, jsxs } from "react/jsx-runtime";
import { Card } from "@/components/common/Card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
function SpendingChart({ data }) {
  return /* @__PURE__ */ jsx(Card, {
    title: "Monthly Spending",
    subtitle: "Last 6 months \xB7 INR",
    children: /* @__PURE__ */ jsx("div", {
      className: "h-64 w-full",
      children: /* @__PURE__ */ jsx(ResponsiveContainer, {
        width: "100%",
        height: "100%",
        children: /* @__PURE__ */ jsxs(AreaChart, {
          data,
          margin: { top: 10, right: 10, left: -20, bottom: 0 },
          children: [
            /* @__PURE__ */ jsx("defs", {
              children: /* @__PURE__ */ jsxs("linearGradient", {
                id: "spend",
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [
                  /* @__PURE__ */ jsx("stop", {
                    offset: "5%",
                    stopColor: "var(--color-chart-1)",
                    stopOpacity: 0.35,
                  }),
                  /* @__PURE__ */ jsx("stop", {
                    offset: "95%",
                    stopColor: "var(--color-chart-1)",
                    stopOpacity: 0,
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ jsx(CartesianGrid, {
              strokeDasharray: "3 3",
              stroke: "var(--color-border)",
              vertical: false,
            }),
            /* @__PURE__ */ jsx(XAxis, {
              dataKey: "month",
              tick: { fill: "var(--color-muted-foreground)", fontSize: 11 },
              axisLine: false,
              tickLine: false,
            }),
            /* @__PURE__ */ jsx(YAxis, {
              tick: { fill: "var(--color-muted-foreground)", fontSize: 11 },
              axisLine: false,
              tickLine: false,
              tickFormatter: (v) => `${(v / 1e3).toFixed(0)}k`,
            }),
            /* @__PURE__ */ jsx(Tooltip, {
              contentStyle: {
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                fontSize: 12,
              },
              formatter: (v) => [`\u20B9${v.toLocaleString()}`, "Spend"],
            }),
            /* @__PURE__ */ jsx(Area, {
              type: "monotone",
              dataKey: "spend",
              stroke: "var(--color-chart-1)",
              strokeWidth: 2,
              fill: "url(#spend)",
            }),
          ],
        }),
      }),
    }),
  });
}
export { SpendingChart };
