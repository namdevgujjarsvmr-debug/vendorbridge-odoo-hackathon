create extension if not exists pgcrypto;

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null default 'Procurement Lead',
  company text not null default 'SupplySaathi',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into app_users (name, email, password_hash, role, company)
values (
  'Priya Mehta',
  'admin@supplysaathi.in',
  crypt('SupplySaathi@123', gen_salt('bf', 10)),
  'Procurement Lead',
  'SupplySaathi'
)
on conflict (email) do nothing;

create sequence if not exists vendor_seq start 1049;
create sequence if not exists rfq_seq start 2046;

create table if not exists vendors (
  id text primary key default ('V-' || nextval('vendor_seq')),
  name text not null,
  short_name text generated always as (split_part(name, ' ', 1)) stored,
  category text not null,
  location text not null,
  rating numeric(3, 1) not null default 4.0,
  on_time integer not null default 85,
  status text not null default 'Pending',
  spend numeric(14, 2) not null default 0,
  contact text not null,
  created_at timestamptz not null default now()
);

create table if not exists rfqs (
  id text primary key default ('RFQ-' || nextval('rfq_seq')),
  title text not null,
  category text not null,
  priority text not null default 'Medium',
  deadline date,
  vendors integer not null default 0,
  status text not null default 'Open',
  created_by text not null default 'Procurement Team',
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists quotations (
  id text primary key,
  rfq_id text not null references rfqs(id) on delete cascade,
  vendor text not null,
  price numeric(14, 2) not null,
  currency text not null default 'INR',
  delivery text not null,
  warranty text not null,
  status text not null
);

create table if not exists approvals (
  id text primary key,
  title text not null,
  amount numeric(14, 2) not null default 0,
  requester text not null,
  stage text not null,
  status text not null,
  date date not null,
  remarks text not null default ''
);

create table if not exists purchase_orders (
  id text primary key,
  vendor text not null,
  items integer not null,
  total numeric(14, 2) not null,
  status text not null,
  date date not null,
  eta date not null
);

create table if not exists invoices (
  id text primary key,
  po text not null,
  vendor text not null,
  amount numeric(14, 2) not null,
  due date not null,
  status text not null
);

create table if not exists monthly_spend (
  month text primary key,
  spend numeric(14, 2) not null,
  sort_order integer not null
);

create table if not exists activity (
  id integer primary key,
  who text not null,
  action text not null,
  target text not null,
  time text not null,
  type text not null
);

insert into vendors (id, name, category, location, rating, on_time, status, spend, contact) values
('V-1041', 'Aarav Industrial Supplies', 'Raw Materials', 'Mumbai, IN', 4.8, 96, 'Active', 482000, 'rohit@aaravind.com'),
('V-1042', 'Zenith Components Pvt Ltd', 'Electronics', 'Bengaluru, IN', 4.6, 92, 'Active', 318500, 'sales@zenith.io'),
('V-1043', 'Northwind Logistics', 'Logistics', 'Delhi, IN', 4.2, 88, 'Active', 215000, 'ops@northwind.in'),
('V-1044', 'Helix Packaging Co.', 'Packaging', 'Pune, IN', 4.4, 90, 'Pending', 76200, 'hello@helixpack.co'),
('V-1045', 'BlueOak Chemicals', 'Chemicals', 'Surat, IN', 3.9, 81, 'On Hold', 128400, 'info@blueoak.in'),
('V-1046', 'Crestline Steel Works', 'Metals', 'Jamshedpur, IN', 4.7, 94, 'Active', 562300, 'trade@crestline.com'),
('V-1047', 'Lumen Office Goods', 'Office Supplies', 'Hyderabad, IN', 4.1, 87, 'Active', 41200, 'contact@lumen.co'),
('V-1048', 'Vertex IT Hardware', 'IT Hardware', 'Gurgaon, IN', 4.5, 91, 'Active', 287100, 'b2b@vertex.tech')
on conflict (id) do nothing;

insert into rfqs (id, title, category, priority, deadline, vendors, status, created_by) values
('RFQ-2041', 'CNC Aluminum Brackets - Q1 supply', 'Raw Materials', 'High', '2026-06-18', 4, 'Open', 'Priya M.'),
('RFQ-2042', 'Lithium-ion Cells 18650', 'Electronics', 'Critical', '2026-06-12', 6, 'Open', 'Karan S.'),
('RFQ-2043', 'Corrugated Boxes (5,000 units)', 'Packaging', 'Medium', '2026-06-25', 3, 'Closed', 'Ananya R.'),
('RFQ-2044', 'Office Workstations x 40', 'Office Supplies', 'Low', '2026-07-02', 5, 'Open', 'Devansh P.'),
('RFQ-2045', 'Industrial Solvents - annual', 'Chemicals', 'High', '2026-06-20', 4, 'Draft', 'Meera J.')
on conflict (id) do nothing;

insert into quotations (id, rfq_id, vendor, price, currency, delivery, warranty, status) values
('Q-9001', 'RFQ-2042', 'Zenith Components Pvt Ltd', 184500, 'INR', '12 days', '24 months', 'Submitted'),
('Q-9002', 'RFQ-2042', 'Vertex IT Hardware', 176800, 'INR', '15 days', '18 months', 'Submitted'),
('Q-9003', 'RFQ-2042', 'Aarav Industrial Supplies', 192300, 'INR', '10 days', '24 months', 'Under Review'),
('Q-9004', 'RFQ-2042', 'BlueOak Chemicals', 168200, 'INR', '20 days', '12 months', 'Submitted'),
('Q-9005', 'RFQ-2041', 'Crestline Steel Works', 312000, 'INR', '9 days', '-', 'Submitted')
on conflict (id) do nothing;

insert into approvals (id, title, amount, requester, stage, status, date) values
('AP-501', 'PO #PO-7782 - Crestline Steel Works', 312000, 'Priya M.', 'Finance Review', 'Pending', '2026-06-04'),
('AP-502', 'PO #PO-7783 - Zenith Components', 184500, 'Karan S.', 'Manager Approval', 'Pending', '2026-06-05'),
('AP-503', 'Vendor Onboarding - Helix Packaging', 0, 'Ananya R.', 'Compliance', 'Approved', '2026-06-02'),
('AP-504', 'RFQ-2045 Budget Authorization', 540000, 'Meera J.', 'CFO Sign-off', 'On Hold', '2026-06-03')
on conflict (id) do nothing;

insert into purchase_orders (id, vendor, items, total, status, date, eta) values
('PO-7782', 'Crestline Steel Works', 6, 312000, 'Issued', '2026-06-05', '2026-06-14'),
('PO-7783', 'Zenith Components Pvt Ltd', 12, 184500, 'Acknowledged', '2026-06-04', '2026-06-16'),
('PO-7784', 'Northwind Logistics', 1, 48500, 'In Transit', '2026-06-03', '2026-06-09'),
('PO-7785', 'Vertex IT Hardware', 40, 612000, 'Delivered', '2026-05-28', '2026-06-05')
on conflict (id) do nothing;

insert into invoices (id, po, vendor, amount, due, status) values
('INV-3301', 'PO-7785', 'Vertex IT Hardware', 612000, '2026-06-25', 'Unpaid'),
('INV-3302', 'PO-7784', 'Northwind Logistics', 48500, '2026-06-20', 'Paid'),
('INV-3303', 'PO-7783', 'Zenith Components Pvt Ltd', 184500, '2026-06-28', 'Pending Approval')
on conflict (id) do nothing;

insert into monthly_spend (month, spend, sort_order) values
('Jan', 245000, 1),
('Feb', 312000, 2),
('Mar', 289000, 3),
('Apr', 401000, 4),
('May', 378000, 5),
('Jun', 452000, 6)
on conflict (month) do nothing;

insert into activity (id, who, action, target, time, type) values
(1, 'Priya M.', 'approved PO-7782', 'Crestline Steel Works', '12m ago', 'approval'),
(2, 'Karan S.', 'created RFQ-2042', 'Lithium-ion Cells 18650', '1h ago', 'rfq'),
(3, 'Ananya R.', 'received quotation', 'Zenith Components', '2h ago', 'quote'),
(4, 'Meera J.', 'flagged vendor', 'BlueOak Chemicals', '4h ago', 'alert'),
(5, 'Devansh P.', 'issued invoice INV-3302', 'Northwind Logistics', 'Yesterday', 'invoice')
on conflict (id) do nothing;

create or replace view dashboard_kpis as
select
  (select count(*)::int from vendors) as "totalVendors",
  (select count(*)::int from rfqs where status = 'Open') as "activeRFQs",
  (select count(*)::int from approvals where status = 'Pending') as "pendingApprovals",
  (select count(*)::int from purchase_orders) as "purchaseOrders",
  (select count(*)::int from invoices) as invoices,
  (select spend from monthly_spend order by sort_order desc limit 1) as "monthlySpend",
  87 as "approvalRate";
