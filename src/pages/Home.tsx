import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { ChevronRight, Sparkles, Package, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/90">
      {/* Background elements */}
      <div className="bg-stars"></div>
      <div className="gradient-orb" style={{ top: '10%', left: '10%' }}></div>
      <div className="gradient-orb" style={{ bottom: '10%', right: '10%', animationDelay: '-5s' }}></div>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg border border-white/10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-2">
                <Sparkles className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username}!</h1>
              <p className="text-xl mb-6 text-white/80">Ready to play Truth or Dare?</p>
              <p className="text-md mb-8 text-white/70">Get ready for a fun and exciting game with friends, featuring unique and entertaining challenges.</p>
              <Link 
                to="/packs" 
                className="bg-primary hover:bg-primary/80 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-all"
              >
                Start Playing Now <ChevronRight size={18} />
              </Link>
            </div>
          </div>
          
          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link to="/packs" className="group">
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all"
              >
                <Package className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-bold text-lg mb-2">Browse Packs</h3>
                <p className="text-white/70 text-sm">Explore themed packs with unique truth or dare cards.</p>
                <div className="mt-4 text-primary group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            </Link>
            
            {user?.type === 'admin' && (
              <Link to="/admin" className="group">
                <motion.div 
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all"
                >
                  <Star className="h-8 w-8 text-yellow-500 mb-3" />
                  <h3 className="font-bold text-lg mb-2">Admin Panel</h3>
                  <p className="text-white/70 text-sm">Manage packs and cards as an administrator.</p>
                  <div className="mt-4 text-primary group-hover:translate-x-1 transition-transform">
                    <ChevronRight size={16} />
                  </div>
                </motion.div>
              </Link>
            )}
            
            <div className="group">
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all"
              >
                <Users className="h-8 w-8 text-blue-400 mb-3" />
                <h3 className="font-bold text-lg mb-2">How to Play</h3>
                <p className="text-white/70 text-sm">Select a pack, gather friends, and take turns with truth or dare!</p>
                <div className="mt-4 text-primary group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Game Description */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 relative overflow-hidden mb-8">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary/50"></div>
            <div className="pl-4">
              <h3 className="font-bold text-xl mb-3">Game Rules</h3>
              <p className="text-white/70">Take turns answering truth questions or performing dares with friends. From dancing challenges to personal questions, experience a game with plenty of fun and laughs!</p>
            </div>
          </div>
        </motion.div>
      </main>
      
      <footer className="py-3 text-center text-white/50">
        <p className="text-xs">
          Truth or Dare — A fun game with friends
        </p>
      </footer>
    </div>
  );
};

export default Home; 