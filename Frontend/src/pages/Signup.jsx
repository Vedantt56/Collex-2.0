import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";
import { useToast } from "../context/ToastContext";

const YEARS = [1, 2, 3, 4, 5];

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function AuthBackdrop() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50 dark:bg-gray-950">
      <div className="absolute left-1/2 top-16 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-200/80 via-sky-100/60 to-transparent blur-3xl dark:from-indigo-800/35 dark:via-transparent" />
      <div className="absolute bottom-10 right-12 h-56 w-[26rem] rounded-full bg-gradient-to-bl from-indigo-300/50 to-transparent blur-2xl dark:from-indigo-700/35" />
    </div>
  );
}

function FieldIcon({ type }) {
  if (type === "name") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-500 dark:text-white/60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    );
  }

  if (type === "email") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-500 dark:text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
        <rect x="2" y="4" width="20" height="16" rx="2" />
      </svg>
    );
  }

  if (type === "password") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-500 dark:text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-500 dark:text-white/70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
    </svg>
  );
}

function AuthInput({ name, type = "text", icon, placeholder, value, onChange, minLength }) {
  return (
    <div className="flex items-center w-full mt-4 bg-slate-100/90 ring-2 ring-slate-200 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all dark:bg-white/5 dark:ring-white/10">
      <FieldIcon type={icon || type} />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full bg-transparent text-slate-900 placeholder-slate-400 border-none outline-none dark:text-white dark:placeholder-white/60"
        value={value}
        onChange={onChange}
        minLength={minLength}
        required
      />
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    branch: "",
    year: 1,
  });
  const [idFile, setIdFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!idFile) {
      setError("Please upload your college ID card.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const collegeIdImageUrl = await fileToDataUrl(idFile);

      await signupUser({
        ...form,
        year: Number(form.year),
        collegeIdImageUrl,
      });

      showToast("Account created. Login to continue.");
      navigate("/login");
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed.";
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
        className="relative z-10 w-full max-w-3xl text-center bg-white/90 border border-slate-200 rounded-2xl px-6 sm:px-8 shadow-2xl shadow-slate-200/70 backdrop-blur-xl dark:bg-white/[0.06] dark:border-white/10 dark:shadow-black/30"
      >
        <h1 className="text-slate-950 dark:text-white text-3xl mt-10 font-medium">Sign up</h1>
        <p className="text-slate-500 dark:text-gray-400 text-sm mt-2">Please sign in to continue</p>

        {error && (
          <p className="mt-6 rounded-full bg-red-50 px-4 py-3 text-left text-sm text-red-600 ring-1 ring-red-200 dark:bg-red-500/10 dark:text-red-200 dark:ring-red-300/20">
            {error}
          </p>
        )}

        <div className="grid gap-x-4 sm:grid-cols-2">
          <AuthInput
            type="text"
            icon="name"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <AuthInput
            type="email"
            name="email"
            placeholder="Email id"
            value={form.email}
            onChange={handleChange}
          />
          <AuthInput
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            minLength={6}
          />
          <AuthInput
            type="text"
            icon="college"
            name="college"
            placeholder="College"
            value={form.college}
            onChange={handleChange}
          />
          <AuthInput
            type="text"
            icon="college"
            name="branch"
            placeholder="Branch"
            value={form.branch}
            onChange={handleChange}
          />

          <div className="flex items-center w-full mt-4 bg-slate-100/90 ring-2 ring-slate-200 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 pr-4 gap-2 transition-all dark:bg-white/5 dark:ring-white/10">
            <FieldIcon type="college" />
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full bg-transparent text-slate-900 border-none outline-none dark:text-white"
            >
              {YEARS.map((year) => (
                <option key={year} value={year} className="bg-gray-950">
                  Year {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="mt-4 flex min-h-12 w-full cursor-pointer items-center rounded-full bg-slate-100/90 px-6 text-left text-sm text-slate-500 ring-2 ring-slate-200 transition-all hover:ring-indigo-500/60 dark:bg-white/5 dark:text-white/70 dark:ring-white/10">
          <input
            required
            type="file"
            accept="image/*"
            onChange={(event) => setIdFile(event.target.files?.[0] || null)}
            className="sr-only"
          />
          <span className="truncate">
            {idFile ? idFile.name : "Upload college ID card image"}
          </span>
        </label>

        <div className="mt-4 text-left">
          <button type="button" className="text-sm text-indigo-400 hover:underline">
            Forget password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-70"
        >
          {loading ? "Creating..." : "Sign up"}
        </button>

        <p
          onClick={() => navigate("/login")}
          className="text-slate-500 dark:text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
        >
          Already have an account?
          <span className="text-indigo-400 hover:underline ml-1">click here</span>
        </p>
      </form>
    </section>
  );
}
