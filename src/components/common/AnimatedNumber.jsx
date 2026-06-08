import { jsxs } from "react/jsx-runtime";
import { useCountUp } from "@/hooks/useCountUp";
function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0, format, duration }) {
  const v = useCountUp(value, duration);
  const formatted = format
    ? format(v)
    : v.toLocaleString(void 0, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
  return /* @__PURE__ */ jsxs("span", {
    className: "tabular-nums",
    children: [prefix, formatted, suffix],
  });
}
export { AnimatedNumber };
