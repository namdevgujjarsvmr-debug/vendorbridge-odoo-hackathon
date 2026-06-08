import { Button } from "@/components/common/Button";
const field =
  "h-9 w-full rounded-md border border-border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring";
function VendorForm({ onSubmit, onCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    onSubmit?.({
      name: form.get("name"),
      category: form.get("category"),
      location: form.get("location"),
      contact: form.get("contact"),
      status: "Pending",
    });
  };

  return (
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <div className="col-span-full">
        <label className="mb-1 block text-xs font-medium">Vendor Name</label>
        <input
          name="name"
          required
          className={field}
          placeholder="e.g. Aarav Industrial Supplies"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Category</label>
        <select name="category" className={field}>
          <option>Raw Materials</option>
          <option>Electronics</option>
          <option>Packaging</option>
          <option>Logistics</option>
          <option>Chemicals</option>
          <option>IT Hardware</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Location</label>
        <input name="location" required className={field} placeholder="City, Country" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Contact Email</label>
        <input
          name="contact"
          type="email"
          required
          className={field}
          placeholder="contact@vendor.com"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">GSTIN / Tax ID</label>
        <input className={field} placeholder="22AAAAA0000A1Z5" />
      </div>
      <div className="col-span-full flex items-center justify-end gap-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Vendor</Button>
      </div>
    </form>
  );
}
export { VendorForm };
