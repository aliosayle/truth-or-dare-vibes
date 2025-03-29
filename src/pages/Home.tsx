import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, PackageOpen, Star, Sparkles, Flame, MessageCircleQuestion, Users, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';

const FeatureCard = ({ icon: Icon, title, description, className = "" }) => (
  <motion.div 
    className={`glass-panel p-4 hover:border-primary/40 transition-colors ${className}`}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center gap-2 mb-2">
      <Icon className="h-5 w-5 text-primary" />
      <h3 className="text-white font-medium">{title}</h3>
    </div>
    <p className="text-white/70 text-sm">
      {description}
    </p>
  </motion.div>
);

const Home = () => {
  const { user, logout } = useAuth();
  const { packs } = useGame();
  const [secretKeySequence, setSecretKeySequence] = useState('');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  // Hidden Lana easter egg handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const updatedSequence = secretKeySequence + e.key.toLowerCase();
      setSecretKeySequence(updatedSequence.slice(-4)); // Keep only last 4 keypresses
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [secretKeySequence]);
  
  // Check for 'lana' sequence
  useEffect(() => {
    if (secretKeySequence === 'lana') {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 3000);
    }
  }, [secretKeySequence]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background elements */}
      <div className="bg-stars"></div>
      <div className="gradient-orb" style={{ top: '10%', left: '10%' }}></div>
      <div className="gradient-orb" style={{ bottom: '10%', right: '10%', animationDelay: '-5s' }}></div>
      
      {/* Lebanese cedar pattern overlay - subtle */}
      <div className="fixed inset-0 bg-[url('/cedar-pattern.png')] opacity-5 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {showEasterEgg && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-amber-400 animate-pulse text-lg font-bold tracking-wider z-10">
            Lana says hello from the shadows...
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Truth or Dare with a Lebanese Twist
            </h1>
            
            <p className="text-white/80 text-lg">
              Play the ultimate party game with unique Lebanese-themed questions and challenges.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-2">
              <Link to="/packs">
                <Button size="lg" className="gap-2 group">
                  <span>Start Playing</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link to={packs.length > 0 ? `/game/${packs[0].id}` : "/packs"}>
                <Button size="lg" variant="outline" className="gap-2">
                  <Flame className="h-4 w-4 text-secondary" />
                  <span>Quick Game</span>
                </Button>
              </Link>
            </div>
            
            <div className="flex gap-3 mt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                  +{packs.length}
                </div>
                <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Explore {packs.length} unique packs with Lebanese-inspired challenges
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel rounded-2xl aspect-[4/3] overflow-hidden relative hidden md:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
            <img 
              src="/game-preview.jpg" 
              alt="Game preview" 
              className="object-cover h-full w-full opacity-80 mix-blend-overlay"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center');
                e.currentTarget.parentElement.innerHTML = `
                  <div class="text-center p-8">
                    <Sparkles class="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 class="text-xl font-bold text-white mb-2">Exciting Lebanese Challenges</h3>
                    <p class="text-white/70">Share memorable moments with friends!</p>
                  </div>
                `;
              }} 
            />
          </motion.div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">How to Play</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard 
              icon={PackageOpen} 
              title="1. Choose a Pack" 
              description="Select from our Lebanese-themed packs - each with unique challenges."
            />
            
            <FeatureCard 
              icon={Users} 
              title="2. Gather Your Friends" 
              description="The more friends, the more fun! Take turns in a circle."
            />
            
            <FeatureCard 
              icon={Sparkles} 
              title="3. Draw Cards & Play" 
              description="Choose truth or dare and complete the Lebanese challenges!"
            />
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Game Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureCard 
              icon={MessageCircleQuestion} 
              title="Lebanese Truth Questions" 
              description="Dive into Lebanese culture with thought-provoking truth questions about local traditions, food, and experiences."
            />
            
            <FeatureCard 
              icon={Flame} 
              title="Lebanese Dares" 
              description="Challenge yourself with fun dares inspired by Lebanese culture - from dabke dancing to Arabic phrases!"
            />
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-white/50 text-sm border-t border-white/10">
        <p>"Tmattal ma tit3azab" – Have fun without suffering! 🇱🇧</p>
      </footer>
    </div>
  );
};

export default Home; 