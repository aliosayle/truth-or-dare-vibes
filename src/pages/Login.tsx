import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Mail, Lock, UserPlus, Heart, Star, Sparkles } from 'lucide-react';
import { authApi } from '@/lib/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLanaButton, setShowLanaButton] = useState(false);
  const [lanaButtonClicked, setLanaButtonClicked] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Secret keystroke detection
  useEffect(() => {
    let konamiSequence: string[] = [];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      konamiSequence = [...konamiSequence, e.key.toLowerCase()];
      
      // Keep only the last 4 keys
      if (konamiSequence.length > 4) {
        konamiSequence = konamiSequence.slice(-4);
      }
      
      // Check if the sequence spells 'lana'
      if (konamiSequence.join('') === 'lana') {
        setShowLanaButton(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  const handleLanaLogin = async () => {
    try {
      setLanaButtonClicked(true);
      await login('lana@lebanese-vibes.com', 'LanaLebanese123');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err: any) {
      setError('Something went wrong with the special login. Please try again.');
      setLanaButtonClicked(false);
    }
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
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative backdrop-blur-md bg-gradient-to-b from-white/10 to-white/5 rounded-2xl border border-white/20 p-8 shadow-xl">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
            
            <div className="text-center mb-8 relative">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-pink-500 to-white bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-white/70">
                Sign in to continue playing Truth or Dare
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-xl transition-all shadow-lg shadow-primary/20 font-medium"
              >
                <LogIn className="h-5 w-5" />
                Sign In
              </motion.button>
            </form>

            <AnimatePresence>
              {showLanaButton && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 20, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <motion.button
                    onClick={handleLanaLogin}
                    disabled={lanaButtonClicked}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white py-3 px-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 font-medium group ${lanaButtonClicked ? 'opacity-70' : ''}`}
                  >
                    {lanaButtonClicked ? (
                      <>
                        <Sparkles className="h-5 w-5 animate-spin" />
                        <span className="animate-pulse">Welcome, Lana!</span>
                      </>
                    ) : (
                      <>
                        <Star className="h-5 w-5 transition-transform group-hover:rotate-90" />
                        Special Access
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:text-primary/90 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
      
      <footer className="py-6 text-center text-white/50">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Enjoy the authentic party experience with your friends! ✨
        </motion.p>
      </footer>
    </div>
  );
};

export default Login; 