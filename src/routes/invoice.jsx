import { createFileRoute } from "@tanstack/react-router";
import { Invoice } from "@/pages/Invoice";
const Route = createFileRoute("/invoice")({
  head: () => ({ meta: [{ title: "Invoices \u2014 SupplySaathi" }] }),
  component: Invoice,
});
export { Route };
