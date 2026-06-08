import { jsx, jsxs } from "react/jsx-runtime";
function Loader({ label = "Loading" }) {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex items-center justify-center gap-3 py-12 text-sm text-muted-foreground",
    children: [
      /* @__PURE__ */ jsx("span", {
        className:
          "inline-block h-4 w-4 animate-spin rounded-full border-2 border-border border-t-foreground",
      }),
      label,
      "\u2026",
    ],
  });
}
export { Loader };
