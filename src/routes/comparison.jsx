import { createFileRoute } from "@tanstack/react-router";
import { Comparison } from "@/pages/Comparison";
const Route = createFileRoute("/comparison")({
  head: () => ({ meta: [{ title: "Comparison \u2014 SupplySaathi" }] }),
  component: Comparison,
});
export { Route };
