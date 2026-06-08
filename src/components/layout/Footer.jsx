import { jsx, jsxs } from "react/jsx-runtime";
function Footer() {
  return /* @__PURE__ */ jsxs("footer", {
    className:
      "border-t border-border bg-background px-5 py-3 text-[11px] text-muted-foreground flex items-center justify-between",
    children: [
      /* @__PURE__ */ jsxs("span", {
        children: [
          "\xA9 ",
          /* @__PURE__ */ new Date().getFullYear(),
          " SupplySaathi \xB7 Enterprise Procurement Suite",
        ],
      }),
      /* @__PURE__ */ jsx("span", {
        className: "hidden sm:inline",
        children: "Build 2.4.18 \xB7 All systems operational",
      }),
    ],
  });
}
export { Footer };
