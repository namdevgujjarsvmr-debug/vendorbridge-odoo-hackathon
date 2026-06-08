import { jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
const variants = {
  primary: "bg-primary text-primary-foreground hover:brightness-95 border border-transparent",
  secondary: "bg-card text-foreground border border-border hover:bg-muted",
  ghost: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
  danger: "bg-destructive text-destructive-foreground hover:brightness-95",
  success: "bg-success text-success-foreground hover:brightness-95",
};
const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-sm",
};
function Button({ variant = "primary", size = "md", icon, className, children, ...rest }) {
  return /* @__PURE__ */ jsxs("button", {
    className: cn(
      "press inline-flex items-center justify-center gap-2 rounded-md font-medium",
      "transition-[transform,box-shadow,background-color,color,border-color] duration-200",
      "hover:-translate-y-[1px] hover:shadow-soft",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0 disabled:hover:shadow-none",
      variants[variant],
      sizes[size],
      className,
    ),
    ...rest,
    children: [icon, children],
  });
}
export { Button };
