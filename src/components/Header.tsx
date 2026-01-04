import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hand, LayoutDashboard, User, BookOpen } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isLearn = location.pathname === "/learn";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-xl border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all duration-300 group-hover:scale-105">
            <Hand className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground leading-tight">BankSign AI</span>
            <span className="text-xs text-muted-foreground leading-tight">Sign Language Translator</span>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {!isHome && (
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link to="/">
                Home
              </Link>
            </Button>
          )}

          {!isLearn && (
            <Button asChild variant={isHome ? "default" : "ghost"} size="sm" className="gap-2">
              <Link to="/learn">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Learn Signs</span>
              </Link>
            </Button>
          )}
          
          {!isDashboard && (
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link to="/dashboard">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </Button>
          )}

          <div className="w-px h-6 bg-border mx-1" />

          <Button asChild variant="secondary" size="sm" className="gap-2 font-medium">
            <Link to="/auth">
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
