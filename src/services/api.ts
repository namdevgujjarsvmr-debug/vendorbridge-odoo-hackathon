// Single data-access boundary for the FastAPI backend.
import { vendors, rfqs, quotations, approvals, purchaseOrders, invoices } from "@/data/dummyData";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

function getToken() {
  if (typeof window === "undefined") return "";
  return (
    window.localStorage.getItem("supplysaathi_token") ||
    window.sessionStorage.getItem("supplysaathi_token") ||
    ""
  );
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.detail ?? data?.message ?? "Backend request failed.");
  }

  return data;
}

export async function login(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function register(payload) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export const api = {
  getKpis: async () => request("/kpis"),
  getVendors: async () => request("/vendors"),
  createVendor: async (payload) =>
    request("/vendors", { method: "POST", body: JSON.stringify(payload) }),
  getRFQs: async () => request("/rfqs"),
  createRFQ: async (payload) => request("/rfqs", { method: "POST", body: JSON.stringify(payload) }),
  getQuotations: async () => request("/quotations"),
  awardQuotation: async (id) => request(`/quotations/${id}/award`, { method: "PATCH" }),
  getApprovals: async () => request("/approvals"),
  updateApproval: async (id, payload) =>
    request(`/approvals/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  getPurchaseOrders: async () => request("/purchase-orders"),
  updatePurchaseOrder: async (id, payload) =>
    request(`/purchase-orders/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  getInvoices: async () => request("/invoices"),
  updateInvoice: async (id, payload) =>
    request(`/invoices/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  getMonthlySpend: async () => request("/analytics/monthly-spend"),
  getVendorPerformance: async () => request("/analytics/vendor-performance"),
  getCategorySpend: async () => request("/analytics/category-spend"),
  getActivity: async () => request("/activity"),
};

export type Vendor = (typeof vendors)[number];
export type RFQ = (typeof rfqs)[number];
export type Quotation = (typeof quotations)[number];
export type Approval = (typeof approvals)[number];
export type PurchaseOrder = (typeof purchaseOrders)[number];
export type Invoice = (typeof invoices)[number];
