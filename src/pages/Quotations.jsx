import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card } from "@/components/common/Card";
import { QuotationTable } from "@/components/quotation/QuotationTable";
import { api } from "@/services/api";
function Quotations() {
  const [q, setQ] = useState([]);
  useEffect(() => {
    api.getQuotations().then(setQ);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-5",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h1", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Vendor Quotations",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "mt-1 text-sm text-muted-foreground",
            children: "All quotations submitted against open RFQs.",
          }),
        ],
      }),
      /* @__PURE__ */ jsx(Card, {
        padded: false,
        children: /* @__PURE__ */ jsx(QuotationTable, { quotations: q }),
      }),
    ],
  });
}
export { Quotations };
