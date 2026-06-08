import { jsx, jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
function Card({ title, subtitle, action, padded = true, className, children, ...rest }) {
  return /* @__PURE__ */ jsxs("div", {
    className: cn("card-surface card-interactive", className),
    ...rest,
    children: [
      (title || action) &&
        /* @__PURE__ */ jsxs("div", {
          className: "flex items-start justify-between gap-4 border-b border-border px-5 py-4",
          children: [
            /* @__PURE__ */ jsxs("div", {
              children: [
                title &&
                  /* @__PURE__ */ jsx("h3", {
                    className: "text-sm font-semibold text-foreground",
                    children: title,
                  }),
                subtitle &&
                  /* @__PURE__ */ jsx("p", {
                    className: "mt-0.5 text-xs text-muted-foreground",
                    children: subtitle,
                  }),
              ],
            }),
            action,
          ],
        }),
      /* @__PURE__ */ jsx("div", { className: padded ? "p-5" : "", children }),
    ],
  });
}
export { Card };
