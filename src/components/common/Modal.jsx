import { jsx, jsxs } from "react/jsx-runtime";
import { X } from "lucide-react";
function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return /* @__PURE__ */ jsx("div", {
    className:
      "fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 px-4 backdrop-blur-sm",
    children: /* @__PURE__ */ jsxs("div", {
      className:
        "w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-pop",
      children: [
        /* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between border-b border-border px-5 py-4",
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold", children: title }),
            /* @__PURE__ */ jsx("button", {
              onClick: onClose,
              className: "rounded-md p-1 text-muted-foreground hover:bg-muted",
              children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
            }),
          ],
        }),
        /* @__PURE__ */ jsx("div", { className: "px-5 py-4", children }),
        footer &&
          /* @__PURE__ */ jsx("div", {
            className: "border-t border-border bg-muted/40 px-5 py-3",
            children: footer,
          }),
      ],
    }),
  });
}
export { Modal };
