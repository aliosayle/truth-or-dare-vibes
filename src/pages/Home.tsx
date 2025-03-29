import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, PackageOpen, Star } from 'lucide-react';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="bg-stars"></div>
      <div className="gradient-orb" style={{ top: '10%', left: '10%' }}></div>
      <div className="gradient-orb" style={{ bottom: '10%', right: '10%', animationDelay: '-5s' }}></div>
      
      {/* Lebanese cedar pattern overlay - subtle */}
      <div className="fixed inset-0 bg-[url('/cedar-pattern.png')] opacity-5 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="glass-panel p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  <span className="text-primary">Ahla w Sahla</span> {user?.username}!
                </h1>
                <p className="text-white/70">
                  <span className="text-xs" title="Lana's special game">ل.ع - L.A</span> • {user?.type} user
                </p>
              </div>
              <button 
                onClick={logout}
                className="btn-secondary text-sm"
              >
                Logout
              </button>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-white mb-3">
                Yalla, let's play some Truth or Dare! <span className="text-xs opacity-50">حبيبي</span>
              </h2>
              <p className="text-white/70 mb-4">
                Ka2annak bi Beirut, browse our Lebanese-themed packs and start playing!
              </p>
              
              <Link to="/packs" className="btn-primary flex items-center gap-2 w-fit">
                <PackageOpen size={18} />
                <span>Browse Packs</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="glass-panel p-4 hover:border-primary/40 transition-colors">
              <h3 className="text-white font-medium flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                Game Rules
              </h3>
              <p className="text-white/70 text-sm mt-2">
                Khallik jari2! Take turns answering truth questions or performing dares with friends.
              </p>
            </div>
            
            <div className="glass-panel p-4 hover:border-primary/40 transition-colors">
              <h3 className="text-white font-medium flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                Lebanese Vibes
              </h3>
              <p className="text-white/70 text-sm mt-2">
                Ma fi metla! Enjoy our uniquely Lebanese take on the classic game.
              </p>
            </div>
            
            <div className="glass-panel p-4 hover:border-primary/40 transition-colors">
              <h3 className="text-white font-medium flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                Special Surprise
              </h3>
              <p className="text-white/70 text-sm mt-2">
                For <span className="font-semibold text-primary/80">L</span>ovely <span className="font-semibold text-primary/80">A</span>mazing <span className="font-semibold text-primary/80">N</span>oble <span className="font-semibold text-primary/80">A</span>dventurers only.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-white/50 text-sm">
        <p>"Tmattal ma tit3azab" – Have fun without suffering! 🇱🇧</p>
      </footer>
    </div>
  );
};

export default Home; 