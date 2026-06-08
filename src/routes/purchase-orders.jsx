import { createFileRoute } from "@tanstack/react-router";
import { PurchaseOrders } from "@/pages/PurchaseOrders";
const Route = createFileRoute("/purchase-orders")({
  head: () => ({ meta: [{ title: "Purchase Orders \u2014 SupplySaathi" }] }),
  component: PurchaseOrders,
});
export { Route };
