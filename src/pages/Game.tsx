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
  const { currentCard, setActivePack, activePack, packs } = useGame();
  const { packId } = useParams<{ packId: string }>();
  const navigate = useNavigate();
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [showLanaSecret, setShowLanaSecret] = useState(false);
  
  // Secret Lana easter egg - Konami code variation "LANA"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Using key codes to spell LANA: Left-A-N-A
      const key = e.key.toLowerCase();
      let secretUpdated = [...konamiSequence, key];
      if (secretUpdated.length > 4) {
        secretUpdated = secretUpdated.slice(-4);
      }
      setKonamiSequence(secretUpdated);
      
      // Check if last 4 keys spell "lana" (using ArrowLeft for L)
      if (
        secretUpdated.length === 4 &&
        secretUpdated[0] === "arrowleft" &&
        secretUpdated[1] === "a" &&
        secretUpdated[2] === "n" &&
        secretUpdated[3] === "a"
      ) {
        setShowLanaSecret(true);
        setTimeout(() => setShowLanaSecret(false), 5000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiSequence]);

  useEffect(() => {
    if (packId) {
      setActivePack(packId);
    } else if (packs.length > 0) {
      navigate(`/game/${packs[0].id}`);
    }
  }, [packId, packs, setActivePack, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="bg-stars"></div>
      <div className="gradient-orb" style={{ top: '10%', left: '10%' }}></div>
      <div className="gradient-orb" style={{ bottom: '10%', right: '10%', animationDelay: '-5s' }}></div>
      
      {/* Lebanese theme - subtle cedar outline */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-[url('/cedar-silhouette.png')] bg-repeat-x bg-bottom opacity-10 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center relative">
        {showLanaSecret && (
          <div className="absolute inset-0 pointer-events-none bg-amber-500/5 z-10 flex items-center justify-center">
            <div className="text-3xl font-bold text-amber-500/30 tracking-[0.5em] rotate-12 blur-sm animate-pulse">
              LANA
            </div>
          </div>
        )}
        
        {activePack && (
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white">{activePack.name}</h2>
            <p className="text-white/60">{activePack.description}</p>
          </div>
        )}
        
        <div className="flex-1 w-full flex flex-col items-center justify-center">
          <GameCard card={currentCard} />
          <GameControls />
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
