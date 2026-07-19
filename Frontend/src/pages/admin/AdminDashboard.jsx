import { useEffect, useState } from "react";
import {
  approveUser,
  getAdminStats,
  getPendingUsers,
  rejectUser,
} from "../../services/admin/adminService";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState("");

  const load = async () => {
    try {
      const [statsResponse, pendingResponse] = await Promise.all([getAdminStats(), getPendingUsers()]);
      setStats(statsResponse?.data || null);
      setPending(pendingResponse?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAction = async (id, action) => {
    try {
      setActionLoading(`${action}-${id}`);
      if (action === "approve") {
        await approveUser(id);
      } else {
        await rejectUser(id);
      }

      setSelectedUser(null);
      await load();
    } finally {
      setActionLoading("");
    }
  };

  if (loading) {
    return <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Users", value: stats?.totalUsers || 0 },
          { label: "Pending Approvals", value: stats?.pendingUsers || 0 },
          { label: "Approved Users", value: stats?.approvedUsers || 0 },
          { label: "Total Listings", value: stats?.totalListings || 0 },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
            <p className="mt-2 text-3xl font-black">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black">Pending Approvals</h2>
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">{pending.length} pending</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-500">
                <th className="py-3">Name</th>
                <th className="py-3">College</th>
                <th className="py-3">Branch</th>
                <th className="py-3">Year</th>
                <th className="py-3">ID Card</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((user) => (
                <tr key={user._id} className="border-b text-gray-700 dark:text-gray-300">
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.college}</td>
                  <td className="py-3">{user.branch}</td>
                  <td className="py-3">{user.year}</td>
                  <td className="py-3">
                    {user.collegeIdImageUrl ? (
                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        className="h-14 w-20 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <img
                          src={user.collegeIdImageUrl}
                          alt={`${user.name} college ID`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        className="rounded border border-gray-300 px-3 py-1.5 font-semibold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                      >
                        Review
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(user._id, "approve")}
                        disabled={actionLoading === `approve-${user._id}`}
                        className="rounded bg-emerald-600 px-3 py-1.5 font-semibold text-white disabled:opacity-70"
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black">Review College ID</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedUser.name} - {selectedUser.college}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="rounded border border-gray-300 px-3 py-1.5 text-sm font-semibold hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Close
              </button>
            </div>

            {selectedUser.collegeIdImageUrl ? (
              <img
                src={selectedUser.collegeIdImageUrl}
                alt={`${selectedUser.name} college ID`}
                className="max-h-[60vh] w-full rounded-lg border border-gray-200 object-contain dark:border-gray-700"
              />
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-gray-700">
                No ID card image uploaded.
              </div>
            )}

            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <p><span className="font-bold">Email:</span> {selectedUser.email}</p>
              <p><span className="font-bold">Branch:</span> {selectedUser.branch}</p>
              <p><span className="font-bold">Year:</span> {selectedUser.year}</p>
              <p><span className="font-bold">Status:</span> {selectedUser.verificationStatus}</p>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => handleAction(selectedUser._id, "reject")}
                disabled={actionLoading === `reject-${selectedUser._id}`}
                className="rounded bg-rose-600 px-4 py-2 font-semibold text-white disabled:opacity-70"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => handleAction(selectedUser._id, "approve")}
                disabled={actionLoading === `approve-${selectedUser._id}`}
                className="rounded bg-emerald-600 px-4 py-2 font-semibold text-white disabled:opacity-70"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
