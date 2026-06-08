from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .config import FRONTEND_ORIGIN
from .database import execute_one, fetch_all, fetch_one, init_db
from .schemas import ApprovalStatusIn, LoginIn, RegisterIn, RFQIn, StatusIn, VendorIn
from .security import create_token, current_user

app = FastAPI(title="SupplySaathi API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    init_db()


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/api/auth/login")
def login(payload: LoginIn):
    user = fetch_one(
        """
        select id, name, email, role, company
        from app_users
        where email = %s and password_hash = crypt(%s, password_hash)
        limit 1
        """,
        (payload.email.lower(), payload.password),
    )
    if not user:
        return {"ok": False, "message": "Invalid email or password."}
    return {"ok": True, "token": create_token(user, payload.rememberMe), "user": user}


@app.post("/api/auth/register")
def register(payload: RegisterIn):
    user = execute_one(
        """
        insert into app_users (name, email, password_hash, role, company)
        values (%s, %s, crypt(%s, gen_salt('bf', 10)), %s, %s)
        on conflict (email) do nothing
        returning id, name, email, role, company
        """,
        (payload.name, payload.email.lower(), payload.password, payload.role, payload.company),
    )
    if not user:
        return {"ok": False, "message": "An account already exists for this email."}
    return {"ok": True, "token": create_token(user, True), "user": user}


@app.get("/api/auth/me")
def me(user=Depends(current_user)):
    return user


@app.get("/api/kpis")
def kpis(user=Depends(current_user)):
    return fetch_one("select * from dashboard_kpis")


@app.get("/api/vendors")
def vendors(user=Depends(current_user)):
    return fetch_all("select id, name, category, location, rating, on_time as \"onTime\", status, spend, contact from vendors order by id")


@app.post("/api/vendors")
def create_vendor(payload: VendorIn, user=Depends(current_user)):
    vendor = execute_one(
        """
        insert into vendors (name, category, location, rating, on_time, status, spend, contact)
        values (%s, %s, %s, %s, %s, %s, %s, %s)
        returning id, name, category, location, rating, on_time as "onTime", status, spend, contact
        """,
        (payload.name, payload.category, payload.location, payload.rating, payload.onTime, payload.status, payload.spend, payload.contact),
    )
    return vendor


@app.get("/api/rfqs")
def rfqs(user=Depends(current_user)):
    return fetch_all("select id, title, category, priority, deadline, vendors, status, created_by as \"createdBy\" from rfqs order by id")


@app.post("/api/rfqs")
def create_rfq(payload: RFQIn, user=Depends(current_user)):
    rfq = execute_one(
        """
        insert into rfqs (title, category, priority, deadline, vendors, status, created_by, notes)
        values (%s, %s, %s, %s, %s, %s, %s, %s)
        returning id, title, category, priority, deadline, vendors, status, created_by as "createdBy"
        """,
        (payload.title, payload.category, payload.priority, payload.deadline, payload.vendors, payload.status, payload.createdBy, payload.notes),
    )
    return rfq


@app.get("/api/quotations")
def quotations(user=Depends(current_user)):
    return fetch_all('select id, rfq_id as "rfqId", vendor, price, currency, delivery, warranty, status from quotations order by id')


@app.patch("/api/quotations/{quotation_id}/award")
def award_quotation(quotation_id: str, user=Depends(current_user)):
    selected = fetch_one("select rfq_id from quotations where id = %s", (quotation_id,))
    if not selected:
        raise HTTPException(status_code=404, detail="Quotation not found")
    execute_one(
        "update quotations set status = case when id = %s then 'Awarded' else 'Rejected' end where rfq_id = %s returning id",
        (quotation_id, selected["rfq_id"]),
    )
    execute_one(
        "update rfqs set status = 'Closed' where id = %s returning id",
        (selected["rfq_id"],),
    )
    return fetch_one(
        'select id, rfq_id as "rfqId", vendor, price, currency, delivery, warranty, status from quotations where id = %s',
        (quotation_id,),
    )


@app.get("/api/approvals")
def approvals(user=Depends(current_user)):
    return fetch_all("select id, title, amount, requester, stage, status, date from approvals order by id")


@app.patch("/api/approvals/{approval_id}")
def update_approval(approval_id: str, payload: ApprovalStatusIn, user=Depends(current_user)):
    if payload.status not in {"Pending", "Approved", "Rejected", "On Hold"}:
        raise HTTPException(status_code=422, detail="Unsupported status")
    approval = execute_one(
        "update approvals set status = %s, remarks = %s where id = %s returning id, title, amount, requester, stage, status, date",
        (payload.status, payload.remarks, approval_id),
    )
    if not approval:
        raise HTTPException(status_code=404, detail="Approval not found")
    return approval


@app.get("/api/purchase-orders")
def purchase_orders(user=Depends(current_user)):
    return fetch_all("select id, vendor, items, total, status, date, eta from purchase_orders order by id")


@app.patch("/api/purchase-orders/{po_id}")
def update_purchase_order(po_id: str, payload: StatusIn, user=Depends(current_user)):
    if payload.status not in {"Issued", "Acknowledged", "In Transit", "Delivered", "Sent"}:
        raise HTTPException(status_code=422, detail="Unsupported status")
    po = execute_one(
        "update purchase_orders set status = %s where id = %s returning id, vendor, items, total, status, date, eta",
        (payload.status, po_id),
    )
    if not po:
        raise HTTPException(status_code=404, detail="Purchase order not found")
    return po


@app.get("/api/invoices")
def invoices(user=Depends(current_user)):
    return fetch_all("select id, po, vendor, amount, due, status from invoices order by id")


@app.patch("/api/invoices/{invoice_id}")
def update_invoice(invoice_id: str, payload: StatusIn, user=Depends(current_user)):
    if payload.status not in {"Unpaid", "Paid", "Pending Approval"}:
        raise HTTPException(status_code=422, detail="Unsupported status")
    invoice = execute_one(
        "update invoices set status = %s where id = %s returning id, po, vendor, amount, due, status",
        (payload.status, invoice_id),
    )
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice


@app.get("/api/analytics/monthly-spend")
def monthly_spend(user=Depends(current_user)):
    return fetch_all("select month, spend from monthly_spend order by sort_order")


@app.get("/api/analytics/vendor-performance")
def vendor_performance(user=Depends(current_user)):
    return fetch_all("select short_name as vendor, on_time as score from vendors order by on_time desc")


@app.get("/api/analytics/category-spend")
def category_spend(user=Depends(current_user)):
    return fetch_all("select category as name, sum(spend) as value from vendors group by category order by value desc")


@app.get("/api/activity")
def activity(user=Depends(current_user)):
    return fetch_all("select id, who, action, target, time, type from activity order by id")
