import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Sell from "./pages/Sell";
import Listings from "./pages/Listings";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPending from "./pages/admin/AdminPending";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminListings from "./pages/admin/AdminListings";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
console.log("ENV", import.meta.env);
console.log("AUTH", import.meta.env.VITE_AUTH_URL);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/listing" element={<Listings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<Chat />} />
              </Route>

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<ProtectedAdminRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/pending" element={<AdminPending />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/listings" element={<AdminListings />} />
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
