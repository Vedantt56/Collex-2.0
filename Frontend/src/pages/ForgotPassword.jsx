import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authService";
import { useToast } from "../context/ToastContext";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await resetPassword(form.email, form.password);
      showToast(response.message || "Password reset successfully.");
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message || "Unable to reset password.";
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-[calc(100vh-6rem)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 dark:bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 px-8 py-10 text-center shadow-2xl shadow-slate-200/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-black/30"
      >
        <h1 className="text-3xl font-medium text-slate-950 dark:text-white">
          Reset Password
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
          Enter your email and choose a new password.
        </p>

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-left text-sm text-red-600 ring-1 ring-red-200 dark:bg-red-500/10 dark:text-red-200 dark:ring-red-300/20">
            {error}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email id"
          value={form.email}
          onChange={handleChange}
          required
          className="mt-5 h-12 w-full rounded-full bg-slate-100/90 px-6 text-slate-900 outline-none ring-2 ring-slate-200 transition focus:ring-indigo-500/60 dark:bg-white/5 dark:text-white dark:ring-white/10"
        />

        <input
          type="password"
          name="password"
          placeholder="New password"
          value={form.password}
          onChange={handleChange}
          minLength={6}
          required
          className="mt-4 h-12 w-full rounded-full bg-slate-100/90 px-6 text-slate-900 outline-none ring-2 ring-slate-200 transition focus:ring-indigo-500/60 dark:bg-white/5 dark:text-white dark:ring-white/10"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={form.confirmPassword}
          onChange={handleChange}
          minLength={6}
          required
          className="mt-4 h-12 w-full rounded-full bg-slate-100/90 px-6 text-slate-900 outline-none ring-2 ring-slate-200 transition focus:ring-indigo-500/60 dark:bg-white/5 dark:text-white dark:ring-white/10"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-5 h-11 w-full rounded-full bg-indigo-600 text-white transition hover:bg-indigo-500 disabled:opacity-70"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-4 text-sm text-indigo-500 hover:underline"
        >
          Back to login
        </button>
      </form>
    </section>
  );
}
