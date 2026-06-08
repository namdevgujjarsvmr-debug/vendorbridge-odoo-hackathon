import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { AnimatedNumber } from "@/components/common/AnimatedNumber";
const tones = {
  default: "bg-primary text-primary-foreground",
  success: "bg-success text-success-foreground",
  highlight: "bg-highlight text-highlight-foreground",
};
function renderValue(value) {
  if (typeof value === "number") return /* @__PURE__ */ jsx(AnimatedNumber, { value });
  const match = String(value).match(/^([^\d-]*)(-?[\d,.]+)(.*)$/);
  if (match) {
    const prefix = match[1];
    const num = Number(match[2].replace(/,/g, ""));
    const suffix = match[3];
    if (!Number.isNaN(num))
      return /* @__PURE__ */ jsx(AnimatedNumber, { value: num, prefix, suffix });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: value });
}
function StatsCard({ label, value, delta, icon: Icon, tone = "default" }) {
  const positive = (delta ?? 0) >= 0;
  return /* @__PURE__ */ jsxs("div", {
    className: "card-surface card-interactive group p-5",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-start justify-between",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsx("p", {
                className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
                children: label,
              }),
              /* @__PURE__ */ jsx("p", {
                className: "mt-2 text-2xl font-semibold tracking-tight tabular-nums",
                children: renderValue(value),
              }),
            ],
          }),
          /* @__PURE__ */ jsx("div", {
            className: cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
              tones[tone],
            ),
            children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
          }),
        ],
      }),
      typeof delta === "number" &&
        /* @__PURE__ */ jsxs("div", {
          className: "mt-3 flex items-center gap-1 text-xs",
          children: [
            positive
              ? /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3.5 w-3.5 text-emerald-600" })
              : /* @__PURE__ */ jsx(ArrowDownRight, { className: "h-3.5 w-3.5 text-rose-600" }),
            /* @__PURE__ */ jsxs("span", {
              className: positive ? "text-emerald-600 font-medium" : "text-rose-600 font-medium",
              children: [Math.abs(delta), "%"],
            }),
            /* @__PURE__ */ jsx("span", {
              className: "text-muted-foreground",
              children: "vs last month",
            }),
          ],
        }),
    ],
  });
}
export { StatsCard };
