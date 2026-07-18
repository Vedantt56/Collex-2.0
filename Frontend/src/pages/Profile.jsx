import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyListings } from "../services/listingService";

function StatusBadge({ status }) {
  const styles = {
    approved:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
    rejected:
      "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase ${
        styles[status] || styles.pending
      }`}
    >
      {status === "approved"
        ? "Verified Seller"
        : status || "Pending"}
    </span>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
      <p className="text-xs font-bold uppercase text-gray-400">
        {label}
      </p>
      <p className="mt-2 font-bold text-gray-900 dark:text-white">
        {value || "Not available"}
      </p>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn, logout } = useAuth();
  const [totalListings, setTotalListings] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const loadTotal = async () => {
      try {
        const response = await getMyListings();
        setTotalListings(response.data.length);
      } catch {
        setTotalListings(0);
      }
    };

    loadTotal();
  }, [isLoggedIn, navigate]);

  if (!currentUser) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-collex-darker sm:px-6">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase text-collex-teal">
              Profile
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase text-gray-900 dark:text-white">
              {currentUser.name}
            </h1>
          </div>
          <StatusBadge
            status={currentUser.verificationStatus}
          />
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-collex-dark md:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Detail label="Email" value={currentUser.email} />
            <Detail label="College" value={currentUser.college} />
            <Detail label="Branch" value={currentUser.branch} />
            <Detail label="Year" value={currentUser.year} />
            <Detail
              label="Verification Status"
              value={currentUser.verificationStatus}
            />
            <Detail
              label="Total Listings"
              value={totalListings}
            />
            <Detail
              label="Member Since"
              value={
                currentUser.createdAt
                  ? new Date(
                      currentUser.createdAt
                    ).toLocaleDateString()
                  : "Recently"
              }
            />
          </div>

          {currentUser.verificationStatus ===
            "pending" && (
            <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm font-semibold text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
              Your college ID is under review. You can browse items but cannot create listings until approved.
            </div>
          )}

          {currentUser.verificationStatus ===
            "rejected" && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
              Your verification was rejected. Please upload your ID again.
              <button className="mt-3 block rounded-md bg-red-600 px-4 py-2 text-xs font-black uppercase text-white">
                Resubmit ID
              </button>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="mt-8 rounded-lg border border-red-200 px-6 py-3 text-sm font-black uppercase text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
          >
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}
