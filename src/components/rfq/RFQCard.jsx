import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, statusTone } from "@/components/common/Badge";
import { CalendarClock, Users } from "lucide-react";
const priorityTone = (p) =>
  p === "Critical" ? "danger" : p === "High" ? "warning" : p === "Medium" ? "info" : "neutral";
function RFQCard({ rfq }) {
  return /* @__PURE__ */ jsxs("div", {
    className: "card-surface p-5 hover:shadow-pop transition-shadow",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-start justify-between gap-3",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "text-[11px] text-muted-foreground",
                children: [rfq.id, " \xB7 ", rfq.category],
              }),
              /* @__PURE__ */ jsx("h3", {
                className: "mt-1 text-sm font-semibold leading-snug",
                children: rfq.title,
              }),
            ],
          }),
          /* @__PURE__ */ jsx(Badge, { tone: statusTone(rfq.status), children: rfq.status }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxs("span", {
            className: "flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsx(CalendarClock, { className: "h-3.5 w-3.5" }),
              "Due ",
              rfq.deadline,
            ],
          }),
          /* @__PURE__ */ jsxs("span", {
            className: "flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsx(Users, { className: "h-3.5 w-3.5" }),
              rfq.vendors,
              " vendors",
            ],
          }),
          /* @__PURE__ */ jsx(Badge, { tone: priorityTone(rfq.priority), children: rfq.priority }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "mt-4 flex items-center justify-between border-t border-border pt-3 text-xs",
        children: [
          /* @__PURE__ */ jsxs("span", {
            className: "text-muted-foreground",
            children: ["By ", rfq.createdBy],
          }),
          /* @__PURE__ */ jsx("button", {
            className: "font-medium text-foreground hover:underline",
            children: "View details \u2192",
          }),
        ],
      }),
    ],
  });
}
export { RFQCard };
