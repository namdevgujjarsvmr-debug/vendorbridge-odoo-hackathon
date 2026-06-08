import { createFileRoute } from "@tanstack/react-router";
import { RFQ } from "@/pages/RFQ";
const Route = createFileRoute("/rfq")({
  head: () => ({ meta: [{ title: "RFQ \u2014 SupplySaathi" }] }),
  component: RFQ,
});
export { Route };
