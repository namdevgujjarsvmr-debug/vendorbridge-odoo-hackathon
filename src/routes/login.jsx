import { createFileRoute } from "@tanstack/react-router";
import { Login } from "@/pages/Login";

const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login - SupplySaathi" }] }),
  component: Login,
});

export { Route };
