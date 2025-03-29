
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, User, Users } from "lucide-react";

export const LoginButtons = () => {
  const { role, login, logout, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-white/70">Logged in as {role}</span>
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
      <Button 
        variant="outline" 
        className="border-white/20 bg-white/10 hover:bg-white/20" 
        onClick={() => login("user")}
      >
        <User className="mr-2 h-4 w-4" /> 
        Login as User
      </Button>
      <Button 
        variant="outline" 
        className="border-white/20 bg-white/10 hover:bg-white/20" 
        onClick={() => login("admin")}
      >
        <Users className="mr-2 h-4 w-4" /> 
        Login as Admin
      </Button>
    </div>
  );
};
