import { jsx, jsxs } from "react/jsx-runtime";
import { Card } from "@/components/common/Card";
import { Badge, statusTone } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { CheckCircle2, XCircle, PauseCircle } from "lucide-react";
function ApprovalPanel({ items, onStatusChange }) {
  return /* @__PURE__ */ jsx("div", {
    className: "space-y-4",
    children: items.map((a) =>
      /* @__PURE__ */ jsxs(
        Card,
        {
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col gap-4 md:flex-row md:items-start md:justify-between",
              children: [
                /* @__PURE__ */ jsxs("div", {
                  className: "flex-1",
                  children: [
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx("span", {
                          className: "text-[11px] text-muted-foreground",
                          children: a.id,
                        }),
                        /* @__PURE__ */ jsx(Badge, {
                          tone: statusTone(a.status),
                          children: a.status,
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsx("h4", {
                      className: "mt-1 text-sm font-semibold",
                      children: a.title,
                    }),
                    /* @__PURE__ */ jsx("ol", {
                      className: "mt-4 flex items-center gap-1.5",
                      children: ["Requester", "Manager", "Finance", "CFO"].map((step, i) => {
                        const active =
                          i <=
                          [
                            "Requester",
                            "Manager Approval",
                            "Finance Review",
                            "CFO Sign-off",
                          ].indexOf(a.stage);
                        return /* @__PURE__ */ jsxs(
                          "li",
                          {
                            className: "flex items-center gap-1.5",
                            children: [
                              /* @__PURE__ */ jsx("span", {
                                className: `h-2 w-2 rounded-full ${active ? "bg-foreground" : "bg-border"}`,
                              }),
                              /* @__PURE__ */ jsx("span", {
                                className: `text-[11px] ${active ? "text-foreground font-medium" : "text-muted-foreground"}`,
                                children: step,
                              }),
                              i < 3 &&
                                /* @__PURE__ */ jsx("span", { className: "h-px w-6 bg-border" }),
                            ],
                          },
                          step,
                        );
                      }),
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxs("span", {
                          children: [
                            "By ",
                            /* @__PURE__ */ jsx("span", {
                              className: "text-foreground",
                              children: a.requester,
                            }),
                          ],
                        }),
                        /* @__PURE__ */ jsxs("span", {
                          children: [
                            "Stage: ",
                            /* @__PURE__ */ jsx("span", {
                              className: "text-foreground",
                              children: a.stage,
                            }),
                          ],
                        }),
                        a.amount > 0 &&
                          /* @__PURE__ */ jsxs("span", {
                            children: [
                              "Amount: ",
                              /* @__PURE__ */ jsxs("span", {
                                className: "text-foreground",
                                children: ["\u20B9", a.amount.toLocaleString()],
                              }),
                            ],
                          }),
                        /* @__PURE__ */ jsx("span", { children: a.date }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("div", {
                  className: "flex flex-wrap gap-2 md:flex-col md:w-44",
                  children: [
                    /* @__PURE__ */ jsx(Button, {
                      variant: "success",
                      size: "sm",
                      icon: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-3.5 w-3.5" }),
                      onClick: () => onStatusChange?.(a.id, "Approved"),
                      children: "Approve",
                    }),
                    /* @__PURE__ */ jsx(Button, {
                      variant: "danger",
                      size: "sm",
                      icon: /* @__PURE__ */ jsx(XCircle, { className: "h-3.5 w-3.5" }),
                      onClick: () => onStatusChange?.(a.id, "Rejected"),
                      children: "Reject",
                    }),
                    /* @__PURE__ */ jsx(Button, {
                      variant: "secondary",
                      size: "sm",
                      icon: /* @__PURE__ */ jsx(PauseCircle, { className: "h-3.5 w-3.5" }),
                      onClick: () => onStatusChange?.(a.id, "On Hold"),
                      children: "Hold",
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "mt-4",
              children: [
                /* @__PURE__ */ jsx("label", {
                  className:
                    "mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
                  children: "Manager Remarks",
                }),
                /* @__PURE__ */ jsx("textarea", {
                  rows: 2,
                  placeholder: "Add a note for the requester\u2026",
                  className:
                    "w-full rounded-md border border-border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring",
                }),
              ],
            }),
          ],
        },
        a.id,
      ),
    ),
  });
}
export { ApprovalPanel };
