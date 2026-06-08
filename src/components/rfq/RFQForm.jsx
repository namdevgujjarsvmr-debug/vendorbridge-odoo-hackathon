import { Button } from "@/components/common/Button";
const field =
  "h-9 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring";
function RFQForm({ onSubmit }) {
  const readPayload = (form, status) => ({
    title: form.get("title"),
    category: form.get("category"),
    priority: form.get("priority"),
    deadline: form.get("deadline") || null,
    vendors: form.getAll("vendors").length,
    status,
    notes: form.get("notes"),
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSubmit?.(readPayload(form, "Open"));
  };
  const saveDraft = (event) => {
    const formEl = event.currentTarget.form;
    if (!formEl.reportValidity()) return;
    onSubmit?.(readPayload(new FormData(formEl), "Draft"));
  };

  return (
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <div className="col-span-full">
        <label className="mb-1 block text-xs font-medium">RFQ Title</label>
        <input
          name="title"
          required
          className={field}
          placeholder="e.g. CNC Aluminum Brackets - Q1 supply"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Category</label>
        <select name="category" className={field}>
          <option>Raw Materials</option>
          <option>Electronics</option>
          <option>Packaging</option>
          <option>Chemicals</option>
          <option>IT Hardware</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Priority</label>
        <select name="priority" className={field}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Submission Deadline</label>
        <input name="deadline" type="date" className={field} />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Budget Cap (₹)</label>
        <input className={field} placeholder="500000" />
      </div>
      <div className="col-span-full">
        <label className="mb-1 block text-xs font-medium">Invite Vendors</label>
        <div className="flex flex-wrap gap-2 rounded-md border border-border bg-card p-2">
          {["Aarav Industrial", "Zenith Components", "Crestline Steel", "Vertex IT", "BlueOak"].map(
            (v) => (
              <label
                key={v}
                className="flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs"
              >
                <input name="vendors" value={v} type="checkbox" className="h-3 w-3" />
                {v}
              </label>
            ),
          )}
        </div>
      </div>
      <div className="col-span-full">
        <label className="mb-1 block text-xs font-medium">Specification Notes</label>
        <textarea
          name="notes"
          rows={4}
          className="w-full rounded-md border border-border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Material, tolerances, compliance..."
        />
      </div>
      <div className="col-span-full flex items-center justify-end gap-2">
        <Button variant="secondary" type="button" onClick={saveDraft}>
          Save Draft
        </Button>
        <Button type="submit">Publish RFQ</Button>
      </div>
    </form>
  );
}
export { RFQForm };
