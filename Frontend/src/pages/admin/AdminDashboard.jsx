import { useEffect, useState } from "react";
import { getAdminStats, getPendingUsers } from "../../services/admin/adminService";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsResponse, pendingResponse] = await Promise.all([getAdminStats(), getPendingUsers()]);
        setStats(statsResponse?.data || null);
        setPending(pendingResponse?.data || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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
              </tr>
            </thead>
            <tbody>
              {pending.map((user) => (
                <tr key={user._id} className="border-b text-gray-700 dark:text-gray-300">
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.college}</td>
                  <td className="py-3">{user.branch}</td>
                  <td className="py-3">{user.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
