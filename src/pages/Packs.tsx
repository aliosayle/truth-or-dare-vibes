
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { PackCard } from '@/components/PackCard';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Packs = () => {
  const { packs } = useGame();
  const navigate = useNavigate();
  
  const selectPack = (packId: string) => {
    navigate(`/play/${packId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="bg-stars"></div>
      <div className="gradient-orb" style={{ top: '10%', left: '10%' }}></div>
      <div className="gradient-orb" style={{ bottom: '10%', right: '10%', animationDelay: '-5s' }}></div>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
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
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3 drop-shadow-[0_0_15px_rgba(155,135,245,0.5)]">
              Select a Pack
            </h1>
            <p className="text-white/70 max-w-md mx-auto text-lg">
              Choose a card pack to start playing!
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packs.map((pack) => (
              <PackCard 
                key={pack.id} 
                pack={pack} 
                onSelect={() => selectPack(pack.id)} 
              />
            ))}
          </div>
        </motion.div>
      </main>
      
      <footer className="py-6 text-center text-white/50">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Truth or Dare Vibes 🔥 — Get the party started!
        </motion.p>
      </footer>
    </div>
  );
};

export default Packs;
