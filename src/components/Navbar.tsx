
import { LoginButtons } from "./LoginButtons";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PartyPopper, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = ({ hideLogo = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full p-3">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 z-20">
          <PartyPopper className="h-6 w-6 text-primary" />
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TruthOrDare
          </h1>
        </Link>
        
        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              className="z-20"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
            
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div 
                  className="fixed inset-0 bg-background/95 backdrop-blur-md z-10 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <nav className="flex flex-col items-center gap-6">
                    <Link 
                      to="/" 
                      className="text-xl font-medium text-white hover:text-primary"
                      onClick={closeMobileMenu}
                    >
                      Home
                    </Link>
                    
                    <Link 
                      to="/packs" 
                      className="text-xl font-medium text-white hover:text-primary"
                      onClick={closeMobileMenu}
                    >
                      Packs
                    </Link>
                    
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="text-xl font-medium text-white hover:text-primary"
                        onClick={closeMobileMenu}
                      >
                        Admin
                      </Link>
                    )}
                    
                    <div className="mt-4">
                      <LoginButtons />
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-white hover:text-primary">
              Home
            </Link>
            
            <Link to="/packs" className="text-white hover:text-primary">
              Packs
            </Link>
            
            {isAdmin && (
              <Link to="/admin" className="text-white hover:text-primary">
                Admin
              </Link>
            )}
            
            <LoginButtons />
          </nav>
        )}
      </div>
    </header>
  );
};
