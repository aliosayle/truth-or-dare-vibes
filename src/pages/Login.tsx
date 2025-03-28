import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, UserPlus } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      console.log('Attempting login with:', { email });
      await login(email, password);
      console.log('Login successful, navigating to home');
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.response && err.response.data) {
        const responseData = err.response.data;
        const status = err.response.status;
        console.error('API error response:', { status, data: responseData });
        setError(responseData?.message || `Error ${status}: Failed to login`);
      } else {
        setError(err.message || 'Failed to login');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Test direct API call
  const testDirectLogin = async () => {
    try {
      console.log('Testing direct API call to login');
      const API_URL = 'http://161.97.177.233:3005/api';
      const response = await axios.post(`${API_URL}/auth/login`, { 
        email, 
        password 
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Direct login API response:', response.data);
      alert('Direct API call successful! Check console for details.');
    } catch (err: any) {
      console.error('Direct API call error:', err);
      if (err.response && err.response.data) {
        alert(`Direct API error: ${err.response.status} - ${err.response.data?.message || err.message}`);
      } else {
        alert(`Unknown error: ${err.message}`);
      }
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
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-white/70">
                Sign in to continue playing Truth or Dare
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
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
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
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
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Signing In...' : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:text-primary/90">
                  Sign up
                </Link>
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <button 
                onClick={testDirectLogin}
                className="text-xs text-white/50 hover:text-white/70"
              >
                Test direct API call
              </button>
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
          Have fun and play responsibly! 🎮
        </motion.p>
      </footer>
    </div>
  );
};

export default Login; 