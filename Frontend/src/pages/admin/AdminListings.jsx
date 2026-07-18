import { useEffect, useState } from "react";
import { deleteListing, getListings, markListingSold, removeListing } from "../../services/admin/adminService";

export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadListings = async () => {
    try {
      const response = await getListings();
      setListings(response?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const handleAction = async (id, action) => {
    if (action === "sold") {
      await markListingSold(id);
    } else if (action === "remove") {
      await removeListing(id);
    } else if (action === "delete") {
      await deleteListing(id);
    }
    loadListings();
  };

  if (loading) {
    return <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">Loading listings...</div>;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-black">Listings Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-3">Title</th>
              <th className="py-3">Seller</th>
              <th className="py-3">Price</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id} className="border-b text-gray-700 dark:text-gray-300">
                <td className="py-3">{listing.title}</td>
                <td className="py-3">{listing.sellerName}</td>
                <td className="py-3">₹{listing.price}</td>
                <td className="py-3 capitalize">{listing.status}</td>
                <td className="py-3">
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleAction(listing._id, "sold")} className="rounded bg-amber-600 px-3 py-1.5 text-white">Mark Sold</button>
                    <button onClick={() => handleAction(listing._id, "remove")} className="rounded bg-slate-600 px-3 py-1.5 text-white">Remove</button>
                    <button onClick={() => handleAction(listing._id, "delete")} className="rounded bg-rose-600 px-3 py-1.5 text-white">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
