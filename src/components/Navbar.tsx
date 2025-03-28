
import { LoginButtons } from "./LoginButtons";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PartyPopper } from "lucide-react";

export const Navbar = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <header className="w-full p-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <PartyPopper className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TruthOrDare
          </h1>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-white hover:text-primary">
            Home
          </Link>
          
          {isAuthenticated && (
            <Link to="/play" className="text-white hover:text-primary">
              Play
            </Link>
          )}
          
          {isAdmin && (
            <Link to="/admin" className="text-white hover:text-primary">
              Admin
            </Link>
          )}
          
          <LoginButtons />
        </nav>
      </div>
    </header>
  );
};
