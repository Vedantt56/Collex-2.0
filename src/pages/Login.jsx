import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);

  // If already logged in, redirect home
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setShowError(true);
      return;
    }

    setShowError(false);
    login(email.trim());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-collex-darker flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
          Sign In
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{" "}
          <button
            onClick={() => navigate("/")}
            className="font-bold text-collex-teal hover:text-white transition-colors"
          >
            return to home
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-collex-dark py-8 px-4 shadow sm:px-10 border border-gray-100 dark:border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-1 focus:ring-collex-teal focus:border-collex-teal sm:text-sm"
              />
              {showError && (
                <p className="text-xs text-red-500 mt-2">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-2 block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-1 focus:ring-collex-teal focus:border-collex-teal sm:text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-900 dark:text-gray-300">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-collex-teal border-gray-300 rounded mr-2"
                />
                Remember me
              </label>

              <a
                href="#"
                className="text-sm font-medium text-collex-teal hover:text-white"
              >
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 font-bold uppercase tracking-widest text-white bg-collex-dark dark:bg-black hover:bg-collex-teal transition-colors"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-collex-dark text-gray-500 uppercase tracking-wide text-xs">
                  New to COLLEX?
                </span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => navigate("/")}
                className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 font-bold uppercase tracking-widest text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
