import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useToast } from "../context/ToastContext";

function AuthBackdrop() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50 dark:bg-gray-950">
      <div className="absolute left-1/2 top-16 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-200/80 via-sky-100/60 to-transparent blur-3xl dark:from-indigo-800/35 dark:via-transparent" />
      <div className="absolute bottom-10 right-12 h-56 w-[26rem] rounded-full bg-gradient-to-bl from-indigo-300/50 to-transparent blur-2xl dark:from-indigo-700/35" />
    </div>
  );
}

function FieldIcon({ type }) {
  if (type === "email") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-500 dark:text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
        <rect x="2" y="4" width="20" height="16" rx="2" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-500 dark:text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function AuthInput({ name, type, placeholder, value, onChange }) {
  return (
    <div className="flex items-center w-full mt-4 bg-slate-100/90 ring-2 ring-slate-200 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all dark:bg-white/5 dark:ring-white/10">
      <FieldIcon type={type} />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full bg-transparent text-slate-900 placeholder-slate-400 border-none outline-none dark:text-white dark:placeholder-white/60"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default function Login() {
  const { isLoggedIn, login, currentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      if (currentUser?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [isLoggedIn, currentUser, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(formData.email, formData.password);
      login(data);

      if (data?.user?.role === "admin") {
        showToast("Admin signed in successfully.");
        navigate("/admin/dashboard", { replace: true });
        return;
      }

      showToast("Logged in successfully.");
      navigate("/", { replace: true });
    } catch (error) {
      const message = error.response?.data?.message || "Login failed.";
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-[calc(100vh-6rem)] items-center justify-center overflow-hidden px-4 py-12">
      <AuthBackdrop />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full sm:w-[21.875rem] text-center bg-white/90 border border-slate-200 rounded-2xl px-8 shadow-2xl shadow-slate-200/70 backdrop-blur-xl dark:bg-white/[0.06] dark:border-white/10 dark:shadow-black/30"
      >
        <h1 className="text-slate-950 dark:text-white text-3xl mt-10 font-medium">Login</h1>
        <p className="text-slate-500 dark:text-gray-400 text-sm mt-2">Please sign in to continue</p>

        <AuthInput
          type="email"
          name="email"
          placeholder="Email id"
          value={formData.email}
          onChange={handleChange}
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="mt-4 text-left text-sm text-red-600 dark:text-red-300">{error}</p>}

        <div className="mt-4 flex items-center justify-between gap-3 text-left">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-indigo-400 hover:underline"
          >
            Forget password?
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/login")}
            className="text-sm text-slate-500 hover:text-indigo-600 dark:text-white/70 dark:hover:text-indigo-300"
          >
            Admin
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p
          onClick={() => navigate("/signup")}
          className="text-slate-500 dark:text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
        >
          Don't have an account?
          <span className="text-indigo-400 hover:underline ml-1">click here</span>
        </p>
      </form>
    </section>
  );
}
