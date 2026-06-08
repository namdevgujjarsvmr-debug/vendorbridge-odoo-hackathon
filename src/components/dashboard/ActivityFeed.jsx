import { jsx, jsxs } from "react/jsx-runtime";
import { Card } from "@/components/common/Card";
import { CheckCircle2, FileText, MessageSquare, AlertTriangle, Receipt } from "lucide-react";
const icons = {
  approval: CheckCircle2,
  rfq: FileText,
  quote: MessageSquare,
  alert: AlertTriangle,
  invoice: Receipt,
};
const tone = {
  approval: "bg-success text-success-foreground",
  rfq: "bg-primary text-primary-foreground",
  quote: "bg-highlight text-highlight-foreground",
  alert: "bg-destructive/10 text-destructive",
  invoice: "bg-muted text-muted-foreground",
};
function ActivityFeed({ items }) {
  return /* @__PURE__ */ jsx(Card, {
    title: "Recent Activity",
    subtitle: "Across procurement workflows",
    children: /* @__PURE__ */ jsx("ul", {
      className: "space-y-4",
      children: items.map((it, i) => {
        const Icon = icons[it.type] ?? FileText;
        return /* @__PURE__ */ jsxs(
          "li",
          {
            className: "flex items-start gap-3 animate-fade-up",
            style: { animationDelay: `${80 + i * 70}ms` },
            children: [
              /* @__PURE__ */ jsx("div", {
                className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-transform duration-200 hover:scale-110 ${tone[it.type] ?? "bg-muted text-muted-foreground"}`,
                children: /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5" }),
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "min-w-0 flex-1",
                children: [
                  /* @__PURE__ */ jsxs("p", {
                    className: "text-sm",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "font-medium", children: it.who }),
                      " ",
                      /* @__PURE__ */ jsxs("span", {
                        className: "text-muted-foreground",
                        children: [it.action, " \xB7"],
                      }),
                      " ",
                      /* @__PURE__ */ jsx("span", {
                        className: "font-medium",
                        children: it.target,
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsx("p", {
                    className: "mt-0.5 text-[11px] text-muted-foreground",
                    children: it.time,
                  }),
                ],
              }),
            ],
          },
          it.id,
        );
      }),
    }),
  });
}
export { ActivityFeed };
