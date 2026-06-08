import { createFileRoute } from "@tanstack/react-router";
import { Approval } from "@/pages/Approval";
const Route = createFileRoute("/approval")({
  head: () => ({ meta: [{ title: "Approval \u2014 SupplySaathi" }] }),
  component: Approval,
});
export { Route };
