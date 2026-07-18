import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
  const authData = localStorage.getItem("collex_user");

  if (!authData) {
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const parsed = JSON.parse(authData);
    const role = parsed?.user?.role;
    if (role !== "admin") {
      return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
  } catch {
    return <Navigate to="/admin/login" replace />;
  }
}
