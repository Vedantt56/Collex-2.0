import { useEffect, useState } from "react";
import { approveUser, getPendingUsers, rejectUser } from "../../services/admin/adminService";

export default function AdminPending() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const response = await getPendingUsers();
      setUsers(response?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAction = async (id, action) => {
    if (action === "approve") {
      await approveUser(id);
    } else {
      await rejectUser(id);
    }
    loadUsers();
  };

  if (loading) {
    return <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">Loading pending users...</div>;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-black">Pending Verification</h2>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">{users.length} pending</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-3">Name</th>
              <th className="py-3">College</th>
              <th className="py-3">Branch</th>
              <th className="py-3">Year</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b text-gray-700 dark:text-gray-300">
                <td className="py-3">{user.name}</td>
                <td className="py-3">{user.college}</td>
                <td className="py-3">{user.branch}</td>
                <td className="py-3">{user.year}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleAction(user._id, "approve")} className="rounded bg-emerald-600 px-3 py-1.5 text-white">Approve</button>
                    <button onClick={() => handleAction(user._id, "reject")} className="rounded bg-rose-600 px-3 py-1.5 text-white">Reject</button>
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
