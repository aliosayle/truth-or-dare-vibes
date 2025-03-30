import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PackCard } from '@/components/PackCard';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Flag, Search, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Packs = () => {
  const { packs } = useGame();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  const selectPack = (packId: string) => {
    navigate(`/play/${packId}`);
  };

  const filteredPacks = packs.filter(pack => 
    pack.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    pack.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Easter egg - if someone types "lana" in the search
  React.useEffect(() => {
    if (searchQuery.toLowerCase().includes('lana')) {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="bg-stars"></div>
      <div className="gradient-orb" style={{ top: '10%', left: '10%' }}></div>
      <div className="gradient-orb" style={{ bottom: '10%', right: '10%', animationDelay: '-5s' }}></div>
      
      {/* Modern theme accent */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-purple-600"></div>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <motion.div 
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="mb-8 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Flag className="h-6 w-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent mb-3 drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]">
                Choose a Pack
              </h1>
            </div>
            <p className="text-white/70 max-w-md mx-auto text-lg">
              Wlak, sa7 el doura 3leik! Pick a pack to start playing!
            </p>
            
            {/* Search box with Lebanese styling */}
            <div className="max-w-md mx-auto mt-4 relative">
              <Input
                type="text"
                placeholder="Search packs..."
                className="bg-black/30 border-white/10 focus:border-primary/50 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-white/50" />
              
              {/* Lana's easter egg */}
              {showEasterEgg && (
                <motion.div 
                  className="absolute -right-12 top-0 text-primary"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  exit={{ scale: 0, rotate: 0 }}
                >
                  <Heart className="h-8 w-8" />
                </motion.div>
              )}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPacks.length > 0 ? (
              filteredPacks.map((pack) => (
                <PackCard 
                  key={pack.id} 
                  pack={pack} 
                  onSelect={() => selectPack(pack.id)} 
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-white/70 mb-2">Lakan ma fi shi! No packs found.</p>
                <p className="text-primary text-sm">Try a different search or clear the filter.</p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
      
      <footer className="py-6 text-center text-white/50">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Tmat3na w kifayna! 🇱🇧 — We'll have fun, that's for sure!
        </motion.p>
      </footer>
    </div>
  );
};

export default Packs;
