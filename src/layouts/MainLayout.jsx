import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
function MainLayout({ children }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  useEffect(() => {
    const token =
      window.localStorage.getItem("supplysaathi_token") ||
      window.sessionStorage.getItem("supplysaathi_token");
    if (!token) navigate({ to: "/login", replace: true });
  }, [navigate]);
  return /* @__PURE__ */ jsxs("div", {
    className: "flex min-h-screen bg-background text-foreground",
    children: [
      /* @__PURE__ */ jsx(Sidebar, {}),
      /* @__PURE__ */ jsxs("div", {
        className: "flex min-w-0 flex-1 flex-col",
        children: [
          /* @__PURE__ */ jsx(Navbar, {}),
          /* @__PURE__ */ jsx("main", {
            className: "flex-1 overflow-x-hidden px-5 py-6 lg:px-8 lg:py-8",
            children: /* @__PURE__ */ jsx(
              "div",
              { className: "animate-page-in", children },
              pathname,
            ),
          }),
          /* @__PURE__ */ jsx(Footer, {}),
        ],
      }),
    ],
  });
}
export { MainLayout };
