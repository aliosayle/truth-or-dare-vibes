
import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { PackSelector } from '@/components/PackSelector';
import { GameCard } from '@/components/GameCard';
import { GameControls } from '@/components/GameControls';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const Game = () => {
  const { currentCard, setActivePack, activePack } = useGame();
  const { packId } = useParams<{ packId: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If a packId is provided in the URL, select that pack
    if (packId) {
      console.log("Setting active pack:", packId);
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
      
      <Navbar hideLogo={false} />
      
      <main className="flex-1 container mx-auto px-4 py-2 md:py-6 flex flex-col items-center justify-center">
        <motion.div 
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full flex flex-col items-center gap-4 md:gap-6">
            <PackSelector />
            <GameCard card={currentCard} isRevealed={true} />
            <GameControls />
          </div>
        </motion.div>
      </main>
      
      <footer className="py-3 text-center text-white/50">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-xs"
        >
          Yalla, chabna! 🇱🇧 — Truth or Dare with a Lebanese twist
        </motion.p>
      </footer>
    </div>
  );
};

export default Game;
