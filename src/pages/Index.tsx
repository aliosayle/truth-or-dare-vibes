
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Dices, Flag, Flame, MessageCircle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/packs');
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
          className="w-full max-w-4xl flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="mb-12 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Flag className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,29,72,0.5)]">
                Truth or Dare 🇱🇧
              </h1>
            </div>
            
            <p className="text-white/70 max-w-md mx-auto text-lg mb-8">
              Yalla, bala ma tkhaaf! The ultimate party game with a Lebanese twist!
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                size="lg" 
                className="rounded-full px-8" 
                onClick={startGame}
              >
                <Dices className="mr-2" />
                Wlek, yalla n2ashe!
              </Button>
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
            <FeatureCard 
              icon={<Flag className="text-primary h-8 w-8" />}
              title="Exciting Packs"
              description="Ma btet7adda? Choose from various themed card packs for authentic fun."
            />
            <FeatureCard 
              icon={<Flame className="text-game-dare h-8 w-8" />}
              title="La2weseh ya jame3a!"
              description="Exciting dares to get the party going and create memorable moments."
            />
            <FeatureCard 
              icon={<MessageIcon />}
              title="El 7a2 y2al!"
              description="Fash el khele2! Discover more about your friends with revealing questions."
            />
          </div>
        </motion.div>
      </main>
      
      <footer className="py-6 text-center text-white/50">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Kel se3a w ela w2ta! 🇱🇧 — Every moment has its time!
        </motion.p>
      </footer>
    </div>
  );
};

// Helper components
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    className="p-5 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    whileHover={{ y: -5 }}
  >
    <div className="mb-3">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/70">{description}</p>
  </motion.div>
);

// Custom truth icon with gradient
const MessageIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="text-game-truth"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default Index;
