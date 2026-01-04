import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, Hand, LayoutDashboard } from "lucide-react";

interface HeaderProps {
  onOpenAssistant?: () => void;
}

const Header = ({ onOpenAssistant }: HeaderProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isLearn = location.pathname === "/learn";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Hand className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">BankSign AI</span>
        </Link>

        <nav className="flex items-center gap-3">
          {!isLearn && (
            <Button asChild variant={isHome ? "default" : "outline"} size="sm">
              <Link to="/learn" className="flex items-center gap-2">
                <Hand className="w-4 h-4" />
                Learn How to Sign
              </Link>
            </Button>
          )}
          
          {!isDashboard && (
            <Button asChild variant="outline" size="sm">
              <Link to="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            </Button>
          )}

          {isHome && onOpenAssistant && (
            <Button onClick={onOpenAssistant} variant="secondary" size="sm" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Assistant
            </Button>
          )}

          {!isHome && (
            <Button asChild variant="default" size="sm">
              <Link to="/">
                Home
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
