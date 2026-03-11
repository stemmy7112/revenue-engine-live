import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-base sm:text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="max-w-[120px] truncate">AutoIncome</span>
        </Link>

        <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/auth"
            className="hidden sm:inline text-sm font-medium text-secondary-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/auth"
            className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
