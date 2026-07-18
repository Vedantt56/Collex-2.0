import { useEffect, useState } from "react";
import { getAdminStats } from "../../services/admin/adminService";

export default function AdminAnalytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAdminStats();
        setStats(response?.data || null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          ["Total Users", stats?.totalUsers || 0],
          ["Pending Users", stats?.pendingUsers || 0],
          ["Total Listings", stats?.totalListings || 0],
          ["Active Listings", stats?.activeListings || 0],
          ["Approved Sellers", stats?.approvedUsers || 0],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="mt-2 text-2xl font-black">{value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-3 text-lg font-black">Analytics Overview</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Charts can be plugged in with Recharts or a lightweight chart library later. The admin service is now exposing the metrics needed for them.</p>
      </div>
    </div>
  );
}
