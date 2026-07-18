import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function NavButton({ label, to, isActive, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
        isActive
          ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
          : "text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white"
      }`}
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
      className={`block w-full text-left px-4 py-3 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
        isActive
          ? "bg-collex-teal/10 text-collex-teal border border-collex-teal/20"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-white/5"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const {
    userEmail,
    userName,
    verificationStatus,
    isLoggedIn,
    logout,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show the navbar near the top of the page, or while the mobile menu is open
      if (currentScrollY < 80 || isOpen) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY.current) {
        // scrolling down
        setShowNav(false);
        setProfileOpen(false);
      } else {
        // scrolling up
        setShowNav(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const displayName =
    userName || userEmail || "User";
  const initials = displayName
    ? displayName[0].toUpperCase()
    : "";

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    setProfileOpen(false);
    navigate("/login");
  };

  const links = [
    { label: "Home", to: "/" },
    { label: "Explore", to: "/explore" },
    { label: "Sell", to: "/sell" },
    ...(isLoggedIn
      ? [{ label: "My Listings", to: "/listing" }]
      : []),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 pt-4
                  transition-transform duration-300 ease-in-out will-change-transform ${
                    showNav ? "translate-y-0" : "-translate-y-[150%]"
                  }`}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between gap-4
                    bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
                    border border-gray-100 dark:border-slate-700
                    rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.06)]
                    pl-4 pr-2 py-2"
      >
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <div className="bg-collex-dark dark:bg-white p-2 rounded-full text-sm leading-none">
            🛍️
          </div>
          <span className="font-extrabold text-lg tracking-tighter text-gray-900 dark:text-white uppercase hidden sm:inline">
            COLLE<span className="text-collex-teal">X</span>
          </span>
        </Link>

        {/* DESKTOP CENTER PILL LINKS */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100/80 dark:bg-slate-800 rounded-full p-1">
          {links.map((link) => (
            <NavButton
              key={link.to}
              label={link.label}
              to={link.to}
              isActive={isActive(link.to)}
            />
          ))}
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((open) => !open)}
                className="flex items-center gap-1 pl-4 pr-1.5 py-1.5 rounded-full
                           bg-collex-dark dark:bg-white
                           text-white dark:text-collex-dark
                           font-semibold text-sm transition-all duration-300
                           hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
              >
                <span className="max-w-[120px] truncate">{displayName}</span>
                <span
                  className="w-7 h-7 rounded-full bg-white/20 dark:bg-collex-dark/10
                             flex items-center justify-center text-xs font-bold"
                >
                  {initials}
                </span>
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 mt-3 w-64 rounded-3xl border border-gray-100 dark:border-white/10
                             bg-white dark:bg-collex-dark p-3
                             shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
                >
                  <div className="border-b border-gray-100 dark:border-gray-800 pb-3 px-1">
                    <p className="truncate text-sm font-black text-gray-900 dark:text-white">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {userEmail}
                    </p>
                    {verificationStatus === "approved" && (
                      <span className="mt-2 inline-flex rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 text-xs font-bold uppercase text-emerald-700 dark:text-emerald-200">
                        Verified Seller
                      </span>
                    )}
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="mt-2 block rounded-2xl px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5 transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/listing"
                    onClick={() => setProfileOpen(false)}
                    className="block rounded-2xl px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5 transition-colors duration-200"
                  >
                    My Listings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-2xl px-3 py-2 text-left text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 pl-5 pr-1.5 py-1.5 rounded-full
                         bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500
                         text-white
                         font-semibold text-sm
                         transition-all duration-300
                         hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] hover:brightness-110"
            >
              Log In
              <span
                className="w-7 h-7 rounded-full bg-white text-gray-900
                           flex items-center justify-center text-sm"
              >
                →
              </span>
            </Link>
          )}
        </div>

        {/* MOBILE */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-lg transition-all duration-300"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`max-w-7xl mx-auto md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="bg-white/95 dark:bg-collex-dark/95 backdrop-blur-xl
                     border border-gray-100 dark:border-white/10
                     rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]
                     px-4 pt-4 pb-6 space-y-2"
        >
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
            <>
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 mt-2">
                <span className="w-9 h-9 rounded-full bg-collex-dark dark:bg-white text-white dark:text-collex-dark flex items-center justify-center font-bold shrink-0">
                  {initials}
                </span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white leading-tight">
                    {displayName}
                  </p>
                  {verificationStatus === "approved" && (
                    <p className="mt-0.5 text-xs font-bold uppercase text-emerald-500">
                      Verified Seller
                    </p>
                  )}
                </div>
              </div>
              <MobileButton
                label="Profile"
                to="/profile"
                isActive={isActive("/profile")}
                onClick={() => setIsOpen(false)}
              />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-2xl
                           text-sm font-bold uppercase tracking-wider
                           text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40
                           transition-colors duration-200"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 mt-2 rounded-full
                    text-sm font-bold tracking-wider text-white
                    bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500
                    transition-all duration-300"
            >
              Log In
              <span className="w-6 h-6 rounded-full bg-white text-gray-900 flex items-center justify-center text-xs">
                →
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
