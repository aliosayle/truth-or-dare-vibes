import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PackSelector } from '@/components/PackSelector';
import { GameCard } from '@/components/GameCard';
import { GameControls } from '@/components/GameControls';
import { useGame } from '@/contexts/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Game = () => {
  const { currentCard, setActivePack, activePack } = useGame();
  const { packId } = useParams<{ packId: string }>();
  const navigate = useNavigate();
  const [showLanaEasterEgg, setShowLanaEasterEgg] = useState(false);
  const [eggCount, setEggCount] = useState(0);
  
  // Easter egg trigger - clicking 5 times on a special spot
  const triggerEasterEgg = () => {
    setEggCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowLanaEasterEgg(true);
        setTimeout(() => setShowLanaEasterEgg(false), 3000);
        return 0;
      }
      return newCount;
    });
  };
  
  useEffect(() => {
    // If a packId is provided in the URL and it's different from the current active pack
    if (packId && (!activePack || activePack.id !== packId)) {
      setActivePack(packId);
    } else if (!packId) {
      // If no packId, redirect to packs selection page
      navigate('/packs');
    }
  }, [packId, activePack, setActivePack, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="bg-stars"></div>
      <div className="gradient-orb" style={{ top: '10%', left: '10%' }}></div>
      <div className="gradient-orb" style={{ bottom: '10%', right: '10%', animationDelay: '-5s' }}></div>
      
      {/* Lebanese theme - subtle cedar outline */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-[url('/cedar-silhouette.png')] bg-repeat-x bg-bottom opacity-10 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl flex flex-col items-center">
          <PackSelector />
          
          <div 
            className="mt-8 flex justify-center w-full"
            onClick={triggerEasterEgg}  
          >
            <AnimatePresence>
              {showLanaEasterEgg && (
                <motion.div 
                  className="absolute top-[25%] right-0 left-0 text-center z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/30 px-4 py-2 rounded-full">
                    <Sparkles className="text-yellow-300 h-4 w-4" />
                    <span className="text-white text-sm">Yalla Lana, you've got this! 💖</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="w-full flex justify-center">
              <GameCard />
            </div>
          </div>
          
          <div className="mt-8 w-full flex flex-col items-center">
            <GameControls />
            
            {/* Lebanese phrase that changes with card type */}
            {currentCard && (
              <motion.div 
                className="mt-4 text-center text-white/60 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {currentCard.type === 'truth' ? 
                  '"El 7a2i2a btekshaf metel el ze3t, ma fi shi bi dal mkhaba." (Truth reveals like oil, nothing stays hidden.)' :
                  '"Jawwa jawwak w tekram 3enak!" (Go with the flow and honor your promise!)'}
              </motion.div>
            )}
          </div>
        </div>
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
