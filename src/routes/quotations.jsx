import { createFileRoute } from "@tanstack/react-router";
import { Quotations } from "@/pages/Quotations";
const Route = createFileRoute("/quotations")({
  head: () => ({ meta: [{ title: "Quotations \u2014 SupplySaathi" }] }),
  component: Quotations,
});
export { Route };
