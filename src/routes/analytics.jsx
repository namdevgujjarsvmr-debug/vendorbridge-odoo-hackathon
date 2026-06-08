import { createFileRoute } from "@tanstack/react-router";
import { Analytics } from "@/pages/Analytics";
const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics \u2014 SupplySaathi" }] }),
  component: Analytics,
});
export { Route };
