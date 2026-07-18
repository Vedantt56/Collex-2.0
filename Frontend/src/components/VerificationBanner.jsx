import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function VerificationBanner() {
  const { isLoggedIn, verificationStatus } = useAuth();
  const location = useLocation();

  if (
    !isLoggedIn ||
    ["/login", "/signup"].includes(location.pathname)
  ) {
    return null;
  }

  if (verificationStatus === "approved") {
    return (
      <div className="border-b border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-200">
            Verified Seller
          </p>
          <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-black uppercase text-white">
            Approved
          </span>
        </div>
      </div>
    );
  }

  if (verificationStatus === "rejected") {
    return (
      <div className="border-b border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold text-red-700 dark:text-red-200">
            Your verification was rejected. Please upload your ID again.
          </p>
          <Link
            to="/profile"
            className="w-fit rounded-md bg-red-600 px-4 py-2 text-xs font-black uppercase text-white"
          >
            Resubmit ID
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-yellow-200 bg-yellow-50 px-4 py-3 dark:border-yellow-900 dark:bg-yellow-950">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
          Your college ID is under review. You can browse items but cannot create listings until approved.
        </p>
      </div>
    </div>
  );
}
