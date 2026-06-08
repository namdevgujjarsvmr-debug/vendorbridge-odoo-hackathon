import { jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
const tones = {
  neutral: "bg-muted text-muted-foreground border-border",
  success: "bg-success text-success-foreground border-transparent",
  warning: "bg-warning text-warning-foreground border-transparent",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-primary text-primary-foreground border-transparent",
  highlight: "bg-highlight text-highlight-foreground border-transparent",
};
function Badge({ children, tone = "neutral", className }) {
  return /* @__PURE__ */ jsx("span", {
    className: cn(
      "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide",
      tones[tone],
      className,
    ),
    children,
  });
}
function statusTone(status) {
  const s = status.toLowerCase();
  if (["active", "approved", "paid", "delivered", "acknowledged"].some((k) => s.includes(k)))
    return "success";
  if (["pending", "draft", "review", "submitted"].some((k) => s.includes(k))) return "info";
  if (["hold", "warning"].some((k) => s.includes(k))) return "warning";
  if (["rejected", "unpaid", "critical"].some((k) => s.includes(k))) return "danger";
  if (["closed", "issued", "transit"].some((k) => s.includes(k))) return "highlight";
  return "neutral";
}
export { Badge, statusTone };
