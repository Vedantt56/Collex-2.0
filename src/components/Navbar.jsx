import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function NavButton({ label, to, isActive, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-sm font-bold uppercase tracking-wider ${
        isActive ? "text-collex-teal" : "text-gray-600 dark:text-gray-300"
      } hover:text-collex-teal`}
    >
      {label}
    </Link>
  );
}

function MobileButton({ label, to, isActive, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block w-full text-left px-4 py-3 rounded-md text-sm font-bold uppercase tracking-wider ${
        isActive
          ? "bg-gray-100 dark:bg-gray-800 text-collex-teal"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { userEmail, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const initials = userEmail ? userEmail[0].toUpperCase() : "";

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const links = [
    { label: "Home", to: "/" },
    { label: "Explore", to: "/explore" },
    { label: "Sell", to: "/sell" },
    { label: "My Listings", to: "/listing" },
  ];

  return (
    <nav
      className="bg-white/90 dark:bg-collex-dark/90 backdrop-blur-md
                  fixed top-0 left-0 w-full z-50
                  border-b border-gray-100 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <div className="bg-collex-dark dark:bg-white p-1.5 rounded-lg">
              🛍️
            </div>
            <span
              className="font-extrabold text-xl tracking-tighter
                           text-gray-900 dark:text-white uppercase"
            >
              COLLE<span className="text-collex-teal">X</span>
            </span>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <NavButton
                key={link.to}
                label={link.label}
                to={link.to}
                isActive={isActive(link.to)}
              />
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div
                  className="w-9 h-9 rounded-full bg-collex-teal
                                  text-white flex items-center justify-center font-bold"
                >
                  {initials}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold uppercase tracking-wider
                               text-red-500 hover:text-red-600"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-collex-dark dark:bg-white
                             text-white dark:text-collex-dark
                             px-6 py-2 rounded-sm text-sm
                             font-bold uppercase tracking-wider"
              >
                Log In
              </Link>
            )}
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-xl"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`${
          isOpen ? "" : "hidden"
        } md:hidden bg-white dark:bg-collex-dark
                    border-t border-gray-100 dark:border-gray-800`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {links.map((link) => (
            <MobileButton
              key={link.to}
              label={link.label}
              to={link.to}
              isActive={isActive(link.to)}
              onClick={() => setIsOpen(false)}
            />
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 rounded-md
                           text-sm font-bold uppercase tracking-wider
                           text-red-500"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left px-4 py-3 rounded-md
                    text-sm font-bold uppercase tracking-wider
                    text-collex-teal"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
