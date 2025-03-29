import { LoginButtons } from "./LoginButtons";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PartyPopper, Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const { isAuthenticated, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  // Reset the click counter after 2 seconds of inactivity
  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => {
        setClickCount(0);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [clickCount]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Easter egg trigger for Lana - clicking the logo several times
  const handleLogoClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 3000);
        return 0;
      }
      return newCount;
    });
  };

  return (
    <header className="w-full p-3">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 z-20" onClick={handleLogoClick}>
          {/* Randomly choose between PartyPopper and Cedar Tree for variety */}
          {Math.random() > 0.5 ? (
            <PartyPopper className="h-6 w-6 text-primary" />
          ) : (
            <CedarTreeIcon />
          )}
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TruthOrDare
            {/* Lebanese text - "Sar7a aw Jara2a" */}
            <span className="block text-xs font-normal tracking-wide opacity-70">صارحة أو جرأة</span>
          </h1>
          
          {/* Lana's easter egg */}
          <AnimatePresence>
            {showEasterEgg && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute top-14 left-8"
              >
                <div className="bg-gradient-to-r from-primary/20 to-primary/5 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-3 w-3 text-primary" />
                    <span className="text-xs text-white">Made with 💖 for Lana</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

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
