
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PackSelector } from '@/components/PackSelector';
import { GameCard } from '@/components/GameCard';
import { GameControls } from '@/components/GameControls';
import { AuthProvider } from '@/contexts/AuthContext';
import { GameProvider, useGame } from '@/contexts/GameContext';

const GameArea = () => {
  const { currentCard } = useGame();
  const [isRevealed, setIsRevealed] = useState(true);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <PackSelector />
      
      <div className="w-full flex flex-col items-center gap-4">
        <GameCard card={currentCard} isRevealed={isRevealed} />
        <GameControls />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <GameProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl">
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  Truth or Dare
                </h1>
                <p className="text-white/70 max-w-md mx-auto">
                  Pick a card pack, choose truth or dare, and let the games begin!
                </p>
              </div>
              
              <GameArea />
            </div>
          </main>
          
          <footer className="py-6 text-center text-white/50">
            <p>Truth or Dare Vibes 🔥 — Get the party started!</p>
          </footer>
        </div>
      </GameProvider>
    </AuthProvider>
  );
};

export default Index;
