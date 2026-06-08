import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { VendorTable } from "@/components/vendor/VendorTable";
import { VendorForm } from "@/components/vendor/VendorForm";
import { Plus, Search, SlidersHorizontal, Download } from "lucide-react";
import { api } from "@/services/api";
import { downloadText, toCsv } from "@/lib/export";
function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    api.getVendors().then(setVendors);
  }, []);
  const createVendor = async (payload) => {
    const vendor = await api.createVendor(payload);
    setVendors((current) => [vendor, ...current]);
    setOpen(false);
    setMessage("Vendor saved successfully.");
  };
  const filtered = vendors.filter(
    (v) =>
      (status === "All" || v.status === status) &&
      (q === "" ||
        v.name.toLowerCase().includes(q.toLowerCase()) ||
        v.category.toLowerCase().includes(q.toLowerCase())),
  );
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
                children: "Vendor Management",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-sm text-muted-foreground",
                children: "Manage vendor master data, performance and compliance.",
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex gap-2",
            children: [
              /* @__PURE__ */ jsx(Button, {
                variant: "secondary",
                onClick: () =>
                  downloadText("vendors.csv", toCsv(filtered), "text/csv;charset=utf-8"),
                icon: /* @__PURE__ */ jsx(Download, { className: "h-3.5 w-3.5" }),
                children: "Export",
              }),
              /* @__PURE__ */ jsx(Button, {
                onClick: () => setOpen(true),
                icon: /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }),
                children: "New Vendor",
              }),
            ],
          }),
        ],
      }),
      message &&
        /* @__PURE__ */ jsx("div", {
          className:
            "rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800",
          children: message,
        }),
      /* @__PURE__ */ jsxs(Card, {
        padded: false,
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "flex flex-wrap items-center gap-3 border-b border-border px-5 py-3",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className:
                  "flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 flex-1 min-w-[220px]",
                children: [
                  /* @__PURE__ */ jsx(Search, { className: "h-3.5 w-3.5 text-muted-foreground" }),
                  /* @__PURE__ */ jsx("input", {
                    value: q,
                    onChange: (e) => setQ(e.target.value),
                    placeholder: "Search by vendor or category\u2026",
                    className: "flex-1 bg-transparent text-xs outline-none",
                  }),
                ],
              }),
              /* @__PURE__ */ jsx("div", {
                className: "flex items-center gap-1",
                children: ["All", "Active", "Pending", "On Hold"].map((s) =>
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setStatus(s),
                      className: `rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${status === s ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}`,
                      children: s,
                    },
                    s,
                  ),
                ),
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: "secondary",
                size: "sm",
                onClick: () => {
                  setQ("");
                  setStatus("All");
                },
                icon: /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-3.5 w-3.5" }),
                children: "Reset",
              }),
            ],
          }),
          /* @__PURE__ */ jsx(VendorTable, { vendors: filtered }),
        ],
      }),
      /* @__PURE__ */ jsx(Modal, {
        open,
        onClose: () => setOpen(false),
        title: "Add New Vendor",
        children: /* @__PURE__ */ jsx(VendorForm, {
          onSubmit: createVendor,
          onCancel: () => setOpen(false),
        }),
      }),
    ],
  });
}
export { Vendors };
