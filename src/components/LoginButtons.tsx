import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, User, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const LoginButtons = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-white/70">
          Hello, {user?.username}
        </span>
        <Button 
          variant="outline" 
          className="border-white/20 bg-white/10 hover:bg-white/20" 
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" /> 
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button 
          variant="outline" 
          className="border-white/20 bg-white/10 hover:bg-white/20"
        >
          <LogIn className="mr-2 h-4 w-4" /> 
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button 
          variant="outline" 
          className="border-white/20 bg-white/10 hover:bg-white/20"
        >
          <User className="mr-2 h-4 w-4" /> 
          Register
        </Button>
      </Link>
    </div>
  );
};
