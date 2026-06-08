import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Bell, LogOut, Search, ChevronRight } from "lucide-react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
const labels = {
  "": "Dashboard",
  dashboard: "Dashboard",
  vendors: "Vendor Management",
  rfq: "RFQ",
  quotations: "Quotations",
  comparison: "Vendor Comparison",
  approval: "Approval Workflow",
  "purchase-orders": "Purchase Orders",
  invoice: "Invoice",
  analytics: "Analytics",
};
function Navbar() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [query, setQuery] = useState("");
  const [noticeOpen, setNoticeOpen] = useState(false);
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.length === 0 ? ["Dashboard"] : segments.map((s) => labels[s] ?? s);
  const submitSearch = (event) => {
    event.preventDefault();
    const target = query.trim().toLowerCase();
    if (!target) return;
    if (target.includes("vendor")) navigate({ to: "/vendors" });
    else if (target.includes("rfq")) navigate({ to: "/rfq" });
    else if (target.includes("quote")) navigate({ to: "/quotations" });
    else if (target.includes("po") || target.includes("purchase"))
      navigate({ to: "/purchase-orders" });
    else if (target.includes("invoice")) navigate({ to: "/invoice" });
    else if (target.includes("approval")) navigate({ to: "/approval" });
    else navigate({ to: "/dashboard" });
  };
  const logout = () => {
    window.localStorage.removeItem("supplysaathi_token");
    window.localStorage.removeItem("supplysaathi_user");
    window.sessionStorage.removeItem("supplysaathi_token");
    window.sessionStorage.removeItem("supplysaathi_user");
    navigate({ to: "/login", replace: true });
  };
  return /* @__PURE__ */ jsx("header", {
    className: "sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex h-14 items-center gap-4 px-5",
      children: [
        /* @__PURE__ */ jsxs("nav", {
          className: "flex items-center gap-1.5 text-xs text-muted-foreground",
          children: [
            /* @__PURE__ */ jsx(Link, {
              to: "/dashboard",
              className: "hover:text-foreground",
              children: "Procurement",
            }),
            crumbs.map((c, i) =>
              /* @__PURE__ */ jsxs(
                "span",
                {
                  className: "flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5" }),
                    /* @__PURE__ */ jsx("span", {
                      className: i === crumbs.length - 1 ? "text-foreground font-medium" : "",
                      children: c,
                    }),
                  ],
                },
                i,
              ),
            ),
          ],
        }),
        /* @__PURE__ */ jsxs("div", {
          className: "ml-auto flex items-center gap-3",
          children: [
            /* @__PURE__ */ jsxs("form", {
              onSubmit: submitSearch,
              className:
                "hidden md:flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 w-72 transition-all duration-200 focus-within:w-80 focus-within:border-ring focus-within:shadow-soft",
              children: [
                /* @__PURE__ */ jsx(Search, {
                  className:
                    "h-3.5 w-3.5 text-muted-foreground transition-colors group-focus-within:text-foreground",
                }),
                /* @__PURE__ */ jsx("input", {
                  value: query,
                  onChange: (event) => setQuery(event.target.value),
                  placeholder: "Search vendors, RFQs, POs\u2026",
                  className:
                    "flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground",
                }),
                /* @__PURE__ */ jsx("kbd", {
                  className:
                    "rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground",
                  children: "\u2318K",
                }),
              ],
            }),
            /* @__PURE__ */ jsxs("button", {
              type: "button",
              onClick: () => setNoticeOpen((current) => !current),
              className:
                "press relative rounded-md border border-border bg-card p-2 transition-all duration-200 hover:bg-muted hover:-translate-y-[1px] hover:shadow-soft",
              children: [
                /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4 text-muted-foreground" }),
                /* @__PURE__ */ jsxs("span", {
                  className: "absolute -top-0.5 -right-0.5 flex h-2 w-2",
                  children: [
                    /* @__PURE__ */ jsx("span", {
                      className:
                        "absolute inline-flex h-full w-full rounded-full bg-highlight-foreground opacity-75 animate-soft-pulse",
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className:
                        "relative inline-flex h-2 w-2 rounded-full bg-highlight-foreground",
                    }),
                  ],
                }),
              ],
            }),
            noticeOpen &&
              /* @__PURE__ */ jsx("div", {
                className:
                  "absolute right-24 top-12 z-50 w-72 rounded-md border border-border bg-card p-3 text-xs shadow-pop",
                children: "3 pending approvals, 2 open RFQs, and 1 invoice due this week.",
              }),
            /* @__PURE__ */ jsxs("div", {
              className:
                "flex items-center gap-2.5 rounded-md border border-border bg-card px-2 py-1 transition-colors hover:bg-muted/40",
              children: [
                /* @__PURE__ */ jsx("div", {
                  className:
                    "flex h-7 w-7 items-center justify-center rounded-full bg-highlight text-[11px] font-semibold text-highlight-foreground",
                  children: "PM",
                }),
                /* @__PURE__ */ jsxs("div", {
                  className: "hidden sm:block leading-tight",
                  children: [
                    /* @__PURE__ */ jsx("div", {
                      className: "text-xs font-medium",
                      children: "Priya M.",
                    }),
                    /* @__PURE__ */ jsx("div", {
                      className: "text-[10px] text-muted-foreground",
                      children: "Procurement Lead",
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: logout,
              className:
                "press rounded-md border border-border bg-card p-2 transition-all duration-200 hover:bg-muted",
              title: "Logout",
              children: /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4 text-muted-foreground" }),
            }),
          ],
        }),
      ],
    }),
  });
}
export { Navbar };
