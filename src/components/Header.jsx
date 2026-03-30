import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Fingerspell", path: "/fingerspell" },
  { label: "Banking", path: "/banking" },
  { label: "Learn", path: "/learn" },
  { label: "Help", path: "/help" },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 rounded-lg bg-amber-400 flex items-center justify-center">
            <span className="text-white font-extrabold text-lg">B</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-slate-900">BankSignAI</span>
            <span className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">ASL Banking Assistant</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-amber-50 text-amber-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => navigate("/auth")}
            className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold bg-amber-400 text-white hover:bg-amber-500 transition-colors shadow-sm"
          >
            Sign In
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`block w-5 h-0.5 bg-slate-700 transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-slate-700 transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-slate-700 transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pb-4 pt-2 space-y-1">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.path;
            return (
              <button
                key={link.path}
                onClick={() => { navigate(link.path); setMobileOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-amber-50 text-amber-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => { navigate("/auth"); setMobileOpen(false); }}
            className="w-full mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-amber-400 text-white hover:bg-amber-500 transition-colors"
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
