import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import VerificationBanner from "./VerificationBanner";

export default function Layout() {
  return (
    <div className="bg-white dark:bg-collex-dark transition-colors duration-300 min-h-screen flex flex-col">
      <Navbar />
      <div className="h-24 shrink-0" aria-hidden="true" />
      <VerificationBanner />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
