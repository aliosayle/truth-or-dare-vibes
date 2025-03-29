import { LoginButtons } from "./LoginButtons";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { PartyPopper, Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// Custom Cedar Tree Icon Component
const CedarTreeIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="text-primary"
  >
    <path d="M12 2v20" />
    <path d="M9 6l3-3 3 3" />
    <path d="M6 11l6-6 6 6" />
    <path d="M3 17l9-9 9 9" />
    <path d="M4 22h16" />
  </svg>
);

export const Navbar = ({ hideLogo = false }) => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showLanaSecret, setShowLanaSecret] = useState(false);
  
  // Reset the click counter after 2 seconds of inactivity
  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => {
        setClickCount(0);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [clickCount]);
  
  // Reset Lana easter egg when page changes
  useEffect(() => {
    setClickCount(0);
    setShowEasterEgg(false);
    setShowLanaSecret(false);
  }, [location.pathname]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Logo click handler (moved to fix reference issue)
  const handleLogoClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      // Easter eggs based on click count
      if (newCount === 5) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 3000);
        return 0;
      }
      // Lana easter egg on 4 clicks
      if (newCount === 4) {
        setShowLanaSecret(true);
        setTimeout(() => setShowLanaSecret(false), 3000);
      }
      return newCount;
    });
  };

  return (
    <header className={cn(hideLogo ? "py-3" : "py-4", "relative")}>
      <div className="container flex justify-between items-center">
        {!hideLogo && (
          <Link 
            to="/" 
            className="logo-link"
            onClick={handleLogoClick}
          >
            <span className="text-primary font-bold">T</span>ruth 
            <span className="text-white">or</span> 
            <span className="text-secondary font-bold">D</span>are
            {showEasterEgg && (
              <span className="ml-2 inline-block animate-bounce">
                <Heart fill="#e11d48" color="#e11d48" size={16} />
              </span>
            )}
            {showLanaSecret && (
              <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 text-xs font-semibold text-amber-500 tracking-wider animate-pulse">
                Lana is watching...
              </span>
            )}
          </Link>
        )}

        {isMobile ? (
          <>
            <button
              className="text-white z-20"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="fixed inset-0 bg-black/95 backdrop-blur-md z-10 pt-16"
                >
                  <div className="flex flex-col items-center gap-4 p-8">
                    <Link to="/" className="text-white text-xl hover:text-primary" onClick={closeMobileMenu}>
                      Home
                    </Link>
                    
                    <Link to="/packs" className="text-white text-xl hover:text-primary" onClick={closeMobileMenu}>
                      Packs
                    </Link>
                    
                    {isAdmin && (
                      <Link to="/admin" className="text-white text-xl hover:text-primary" onClick={closeMobileMenu}>
                        Admin
                      </Link>
                    )}
                    
                    <div className="mt-4">
                      <LoginButtons />
                    </div>
                  </div>
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
