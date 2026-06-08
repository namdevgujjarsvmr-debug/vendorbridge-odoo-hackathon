import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { RFQCard } from "@/components/rfq/RFQCard";
import { RFQForm } from "@/components/rfq/RFQForm";
import { Plus } from "lucide-react";
import { api } from "@/services/api";
function RFQ() {
  const [rfqs, setRfqs] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    api.getRFQs().then(setRfqs);
  }, []);
  const createRFQ = async (payload) => {
    const rfq = await api.createRFQ(payload);
    setRfqs((current) => [rfq, ...current]);
    setShow(false);
    setMessage(payload.status === "Draft" ? "RFQ draft saved." : "RFQ published.");
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-5",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex flex-wrap items-end justify-between gap-3",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsx("h1", {
                className: "text-2xl font-semibold tracking-tight",
                children: "Requests for Quotation",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-sm text-muted-foreground",
                children: "Publish RFQs to your vendor network and track responses.",
              }),
            ],
          }),
          /* @__PURE__ */ jsx(Button, {
            onClick: () => setShow((s) => !s),
            icon: /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }),
            children: show ? "Close form" : "New RFQ",
          }),
        ],
      }),
      message &&
        /* @__PURE__ */ jsx("div", {
          className:
            "rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800",
          children: message,
        }),
      show &&
        /* @__PURE__ */ jsx(Card, {
          title: "Create RFQ",
          subtitle: "Invite vendors and collect structured quotations.",
          children: /* @__PURE__ */ jsx(RFQForm, { onSubmit: createRFQ }),
        }),
      /* @__PURE__ */ jsx("div", {
        className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
        children: rfqs.map((r) => /* @__PURE__ */ jsx(RFQCard, { rfq: r }, r.id)),
      }),
    ],
  });
}
export { RFQ };
