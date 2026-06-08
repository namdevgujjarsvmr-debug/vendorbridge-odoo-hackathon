import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Boxes, Check, Eye, EyeOff, Fingerprint, LockKeyhole, Mail, UserPlus } from "lucide-react";

import { Button } from "@/components/common/Button";
import { login, register } from "@/services/api";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values, mode) {
  if (mode === "register" && !values.name.trim()) return "Please enter your name.";
  if (!values.email.trim() || !values.password) return "Please enter your email and password.";
  if (!emailPattern.test(values.email)) return "Enter a valid business email address.";
  if (values.password.length < 8) return "Password must be at least 8 characters.";
  return "";
}

export function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [values, setValues] = useState({
    name: "",
    email: "admin@supplysaathi.in",
    password: "SupplySaathi@123",
    rememberMe: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const token =
      window.localStorage.getItem("supplysaathi_token") ||
      window.sessionStorage.getItem("supplysaathi_token");
    const forceLogin = new URLSearchParams(window.location.search).get("fresh") === "1";
    if (forceLogin) {
      window.localStorage.removeItem("supplysaathi_token");
      window.localStorage.removeItem("supplysaathi_user");
      window.sessionStorage.removeItem("supplysaathi_token");
      window.sessionStorage.removeItem("supplysaathi_user");
      return;
    }
    if (token) navigate({ to: "/dashboard", replace: true });
  }, [navigate]);

  const title = useMemo(() => (mode === "login" ? "Sign in" : "Create account"), [mode]);

  const showToast = (type, message) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 3600);
  };

  const updateValue = (event) => {
    const { name, value, checked, type } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const saveSession = (result) => {
    const storage = values.rememberMe ? window.localStorage : window.sessionStorage;
    storage.setItem("supplysaathi_token", result.token);
    storage.setItem("supplysaathi_user", JSON.stringify(result.user));
    window.localStorage.setItem("supplysaathi_remember_me", String(values.rememberMe));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate(values, mode);
    if (validationError) {
      showToast("error", validationError);
      return;
    }

    setLoading(true);
    try {
      const action = mode === "login" ? login : register;
      const result = await action(values);
      if (!result.ok) {
        showToast("error", result.message ?? "Authentication failed.");
        return;
      }
      saveSession(result);
      showToast("success", "Welcome to SupplySaathi.");
      window.setTimeout(() => navigate({ to: "/dashboard", replace: true }), 450);
    } catch (error) {
      console.error(error);
      showToast("error", "Backend is not reachable. Start FastAPI on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-10 text-foreground">
      {toast && (
        <div
          className={`fixed right-5 top-5 z-50 rounded-md border px-4 py-3 text-sm shadow-pop ${
            toast.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {toast.message}
        </div>
      )}

      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-border bg-card shadow-card lg:grid-cols-[1fr_420px]">
        <div className="hidden border-r border-border bg-muted/40 p-10 lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Boxes className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base font-semibold">SupplySaathi</div>
              <div className="text-xs text-muted-foreground">AI Procurement ERP</div>
            </div>
          </div>

          <div className="mt-16 max-w-md">
            <h1 className="text-3xl font-semibold tracking-tight">Procurement workspace login</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Access vendors, RFQs, approvals, purchase orders, invoices, and analytics from one
              connected PostgreSQL-backed dashboard.
            </p>
          </div>

          <div className="mt-12 grid gap-3 text-sm">
            {["JWT secured sessions", "FastAPI backend", "PostgreSQL live data"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-md bg-card px-3 py-2">
                <Check className="h-4 w-4 text-emerald-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-7">
            <div className="mb-4 flex w-fit rounded-md border border-border bg-muted p-1">
              {["login", "register"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setMode(item);
                    setToast(null);
                  }}
                  className={`rounded px-3 py-1.5 text-xs font-medium capitalize ${
                    mode === item ? "bg-card text-foreground shadow-soft" : "text-muted-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Use `admin@supplysaathi.in` and `SupplySaathi@123` for the seeded admin account.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "register" && (
              <label className="block">
                <span className="mb-1 block text-xs font-medium">Name</span>
                <input
                  name="name"
                  value={values.name}
                  onChange={updateValue}
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your name"
                />
              </label>
            )}

            <label className="block">
              <span className="mb-1 block text-xs font-medium">Email</span>
              <div className="flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={updateValue}
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium">Password</span>
              <div className="flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
                <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={updateValue}
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                name="rememberMe"
                type="checkbox"
                checked={values.rememberMe}
                onChange={updateValue}
                className="h-4 w-4 rounded border-border accent-foreground"
              />
              Remember me
            </label>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              icon={
                mode === "login" ? (
                  <Fingerprint className="h-4 w-4" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )
              }
            >
              {loading ? "Please wait" : title}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
