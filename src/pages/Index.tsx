import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Dices, Flag, Flame, MessageCircle, Sparkles, Heart, Star } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [showLanaEasterEgg, setShowLanaEasterEgg] = useState(false);

  // Secret Lana easter egg detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...konamiSequence, e.key.toLowerCase()];
      if (newSequence.length > 4) {
        setKonamiSequence(newSequence.slice(-4));
      } else {
        setKonamiSequence(newSequence);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiSequence]);

  // Check for 'lana' sequence
  useEffect(() => {
    if (konamiSequence.length === 4) {
      if (konamiSequence.join('') === 'lana') {
        setShowLanaEasterEgg(true);
        setTimeout(() => setShowLanaEasterEgg(false), 5000);
      }
    }
  }, [konamiSequence]);

  const startGame = () => {
    navigate('/packs');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="bg-stars"></div>
      <div className="gradient-orb opacity-80" style={{ top: '10%', left: '10%' }}></div>
      <div className="gradient-orb opacity-80" style={{ bottom: '10%', right: '10%', animationDelay: '-5s' }}></div>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <AnimatePresence>
          {showLanaEasterEgg && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 inset-x-0 flex justify-center pointer-events-none"
            >
              <div className="bg-gradient-to-r from-amber-500/20 to-amber-300/20 backdrop-blur-sm px-8 py-3 rounded-full border border-amber-500/30 text-amber-300 flex items-center gap-2">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span className="font-medium">This app was made with love for Lana</span>
                <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="w-full max-w-4xl flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="mb-16 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative mb-6">
              <motion.div 
                className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-xl bg-primary/30"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-sm"></div>
                  <Flag className="h-10 w-10 text-white relative z-10" />
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(155,135,245,0.5)]">
                  Truth or Dare
                </h1>
                
                <span className="text-4xl md:text-6xl">✨</span>
              </div>
              
              <p className="text-white/70 max-w-md mx-auto text-xl mb-10 leading-relaxed">
                Yalla, bala ma tkhaaf! The ultimate party game with a modern twist!
              </p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 bg-gradient-to-r from-primary to-secondary text-lg font-medium shadow-lg shadow-primary/30 group transition-all"
                onClick={startGame}
              >
                <Dices className="mr-3 h-6 w-6 group-hover:rotate-90 transition-transform" />
                Wlek, yalla n2ashe!
              </Button>
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
            <FeatureCard 
              icon={<Flag className="text-primary h-8 w-8" />}
              title="Exciting Packs"
              description="Ma btet7adda? Choose from various themed card packs for authentic fun."
              delay={0.5}
            />
            <FeatureCard 
              icon={<Flame className="text-amber-500 h-8 w-8" />}
              title="La2weseh ya jame3a!"
              description="Exciting dares to get the party going and create memorable moments."
              delay={0.7}
            />
            <FeatureCard 
              icon={<MessageCircle className="text-blue-500 h-8 w-8" />}
              title="El 7a2 y2al!"
              description="Fash el khele2! Discover more about your friends with revealing questions."
              delay={0.9}
              hasEasterEgg={true}
            />
          </div>
        </motion.div>
      </main>
      
      <footer className="py-6 text-center text-white/50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-sm">Kel se3a w ela w2ta! ✨ — Every moment has its time!</p>
          <div className="text-xs text-white/30 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-primary/70" /> for you
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

// Helper components
const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay = 0.5,
  hasEasterEgg = false
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  delay?: number,
  hasEasterEgg?: boolean
}) => {
  const [showEgg, setShowEgg] = useState(false);
  
  const handleClick = () => {
    if (hasEasterEgg) {
      setShowEgg(true);
      setTimeout(() => setShowEgg(false), 3000);
    }
  };
  
  return (
    <motion.div 
      className="p-5 rounded-xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 shadow-lg relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      onClick={handleClick}
    >
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-white/5 to-white/0 rounded-full"></div>
      <div className="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-tr from-primary/5 to-white/0 rounded-full transform translate-x-16 translate-y-16"></div>
      
      <AnimatePresence>
        {showEgg && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-amber-500/10 backdrop-blur-sm z-10"
          >
            <div className="flex flex-col items-center">
              <Sparkles className="text-amber-400 h-8 w-8 mb-2 animate-pulse" />
              <p className="text-amber-300 font-medium">Lana's favorite</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mb-4 p-2 bg-white/10 rounded-full w-fit">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
      
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {hasEasterEgg && (
          <Star className="h-4 w-4 text-amber-500/50" />
        )}
      </div>
    </motion.div>
  );
};

export default Index;
