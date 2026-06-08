import { jsx } from "react/jsx-runtime";
function Stagger({ children, index, step = 60, base = 40, className = "", style }) {
  return /* @__PURE__ */ jsx("div", {
    className: `animate-fade-up ${className}`,
    style: { animationDelay: `${base + index * step}ms`, ...style },
    children,
  });
}
export { Stagger };
