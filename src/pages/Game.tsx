
import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { PackSelector } from '@/components/PackSelector';
import { GameCard } from '@/components/GameCard';
import { GameControls } from '@/components/GameControls';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const Game = () => {
  const { currentCard, setActivePack } = useGame();
  const { packId } = useParams<{ packId: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If a packId is provided in the URL, select that pack
    if (packId) {
      setActivePack(packId);
    } else {
      // If no packId, redirect to packs selection page
      navigate('/packs');
    }
  }, [packId, setActivePack, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="bg-stars"></div>
      <div className="gradient-orb" style={{ top: '10%', left: '10%' }}></div>
      <div className="gradient-orb" style={{ bottom: '10%', right: '10%', animationDelay: '-5s' }}></div>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-4 md:py-8 flex flex-col items-center justify-center">
        <motion.div 
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="mb-6 md:mb-12 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 md:mb-3 drop-shadow-[0_0_15px_rgba(155,135,245,0.5)]">
              Truth or Dare
            </h1>
            <p className="text-white/70 max-w-md mx-auto text-base md:text-lg">
              Choose truth or dare and let the games begin!
            </p>
          </motion.div>
          
          <div className="w-full flex flex-col items-center gap-6 md:gap-8">
            <PackSelector />
            <GameCard card={currentCard} isRevealed={true} />
            <GameControls />
          </div>
        </motion.div>
      </main>
      
      <footer className="py-4 md:py-6 text-center text-white/50">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-xs md:text-sm"
        >
          Truth or Dare Vibes 🔥 — Get the party started!
        </motion.p>
      </footer>
    </div>
  );
};

export default Game;
