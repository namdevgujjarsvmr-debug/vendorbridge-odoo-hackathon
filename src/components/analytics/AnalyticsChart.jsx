import { jsx, jsxs } from "react/jsx-runtime";
import { Card } from "@/components/common/Card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
function VendorPerformanceChart({ data }) {
  return /* @__PURE__ */ jsx(Card, {
    title: "Vendor Performance",
    subtitle: "Composite score (0\u2013100)",
    children: /* @__PURE__ */ jsx("div", {
      className: "h-64 w-full",
      children: /* @__PURE__ */ jsx(ResponsiveContainer, {
        width: "100%",
        height: "100%",
        children: /* @__PURE__ */ jsxs(BarChart, {
          data,
          margin: { top: 8, right: 10, left: -20, bottom: 0 },
          children: [
            /* @__PURE__ */ jsx(CartesianGrid, {
              strokeDasharray: "3 3",
              stroke: "var(--color-border)",
              vertical: false,
            }),
            /* @__PURE__ */ jsx(XAxis, {
              dataKey: "vendor",
              tick: { fill: "var(--color-muted-foreground)", fontSize: 11 },
              axisLine: false,
              tickLine: false,
            }),
            /* @__PURE__ */ jsx(YAxis, {
              tick: { fill: "var(--color-muted-foreground)", fontSize: 11 },
              axisLine: false,
              tickLine: false,
              domain: [0, 100],
            }),
            /* @__PURE__ */ jsx(Tooltip, {
              contentStyle: {
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                fontSize: 12,
              },
            }),
            /* @__PURE__ */ jsx(Bar, {
              dataKey: "score",
              fill: "var(--color-chart-2)",
              radius: [6, 6, 0, 0],
            }),
          ],
        }),
      }),
    }),
  });
}
const PIE_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];
function CategorySpendChart({ data }) {
  return /* @__PURE__ */ jsxs(Card, {
    title: "Spend by Category",
    subtitle: "Year-to-date",
    children: [
      /* @__PURE__ */ jsx("div", {
        className: "h-64 w-full",
        children: /* @__PURE__ */ jsx(ResponsiveContainer, {
          width: "100%",
          height: "100%",
          children: /* @__PURE__ */ jsxs(PieChart, {
            children: [
              /* @__PURE__ */ jsx(Tooltip, {
                contentStyle: {
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                },
                formatter: (v) => `\u20B9${v.toLocaleString()}`,
              }),
              /* @__PURE__ */ jsx(Pie, {
                data,
                dataKey: "value",
                nameKey: "name",
                innerRadius: 55,
                outerRadius: 88,
                paddingAngle: 2,
                children: data.map((_, i) =>
                  /* @__PURE__ */ jsx(Cell, { fill: PIE_COLORS[i % PIE_COLORS.length] }, i),
                ),
              }),
            ],
          }),
        }),
      }),
      /* @__PURE__ */ jsx("ul", {
        className: "mt-2 grid grid-cols-2 gap-2 text-xs",
        children: data.map((d, i) =>
          /* @__PURE__ */ jsxs(
            "li",
            {
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx("span", {
                  className: "h-2.5 w-2.5 rounded-sm",
                  style: { background: PIE_COLORS[i % PIE_COLORS.length] },
                }),
                /* @__PURE__ */ jsx("span", {
                  className: "text-muted-foreground",
                  children: d.name,
                }),
              ],
            },
            d.name,
          ),
        ),
      }),
    ],
  });
}
export { CategorySpendChart, VendorPerformanceChart };
