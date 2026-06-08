import { createFileRoute } from "@tanstack/react-router";
import { Vendors } from "@/pages/Vendors";
const Route = createFileRoute("/vendors")({
  head: () => ({ meta: [{ title: "Vendors \u2014 SupplySaathi" }] }),
  component: Vendors,
});
export { Route };
