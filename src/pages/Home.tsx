import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, PackageOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const { user, logout } = useAuth();
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
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center relative">
        {showEasterEgg && (
          <div className="absolute top-8 text-amber-400 animate-pulse text-lg font-bold tracking-wider">
            Lana says hello from the shadows...
          </div>
        )}
        
        <div className="glass-panel p-8 max-w-md w-full text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Welcome to Truth or Dare
          </h1>
          
          <p className="text-white/80 mb-6">
            Choose from our exciting packs and start playing with friends!
          </p>
          
          <Link to="/packs">
            <Button className="w-full">
              Browse Packs
            </Button>
          </Link>
        </div>
      </main>
      
      <footer className="py-4 text-center text-white/50 text-sm">
        <p>"Tmattal ma tit3azab" – Have fun without suffering! 🇱🇧</p>
      </footer>
    </div>
  );
};

export default Home; 