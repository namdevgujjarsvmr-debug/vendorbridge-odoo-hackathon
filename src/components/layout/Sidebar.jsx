import { jsx, jsxs } from "react/jsx-runtime";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  FileText,
  Wallet,
  Scale,
  CheckCircle2,
  Package,
  Receipt,
  BarChart3,
  Boxes,
} from "lucide-react";
import { cn } from "@/lib/utils";
const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/vendors", label: "Vendor Management", icon: Users },
  { to: "/rfq", label: "RFQ", icon: FileText },
  { to: "/quotations", label: "Quotations", icon: Wallet },
  { to: "/comparison", label: "Vendor Comparison", icon: Scale },
  { to: "/approval", label: "Approval Workflow", icon: CheckCircle2 },
  { to: "/purchase-orders", label: "Purchase Orders", icon: Package },
  { to: "/invoice", label: "Invoice", icon: Receipt },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];
function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxs("aside", {
    className:
      "hidden lg:flex h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border",
        children: [
          /* @__PURE__ */ jsx("div", {
            className:
              "flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground",
            children: /* @__PURE__ */ jsx(Boxes, { className: "h-5 w-5" }),
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "leading-tight",
            children: [
              /* @__PURE__ */ jsx("div", {
                className: "text-sm font-semibold tracking-tight",
                children: "SupplySaathi",
              }),
              /* @__PURE__ */ jsx("div", {
                className: "text-[10px] text-muted-foreground",
                children: "Connecting Businesses with Trusted Suppliers",
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("nav", {
        className: "flex-1 overflow-y-auto px-3 py-4 space-y-0.5",
        children: [
          /* @__PURE__ */ jsx("div", {
            className:
              "px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70",
            children: "Workspace",
          }),
          nav.map(({ to, label, icon: Icon, exact }) => {
            const active = exact
              ? pathname === to
              : pathname === to || pathname.startsWith(to + "/");
            return /* @__PURE__ */ jsxs(
              Link,
              {
                to,
                className: cn("nav-link", active && "nav-link-active"),
                children: [
                  /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 shrink-0" }),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: label }),
                ],
              },
              to,
            );
          }),
        ],
      }),
      /* @__PURE__ */ jsx("div", {
        className: "border-t border-sidebar-border p-4",
        children: /* @__PURE__ */ jsxs("div", {
          className: "rounded-lg bg-muted/60 p-3",
          children: [
            /* @__PURE__ */ jsx("div", {
              className: "text-xs font-semibold",
              children: "Procurement Tier",
            }),
            /* @__PURE__ */ jsx("div", {
              className: "mt-0.5 text-[11px] text-muted-foreground",
              children: "Enterprise \xB7 v2.4",
            }),
          ],
        }),
      }),
    ],
  });
}
export { Sidebar };
