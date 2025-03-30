import { Card } from "@/contexts/GameContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/contexts/GameContext";
import { Sparkles } from 'lucide-react';

// Easter egg detection
const hasLanaEasterEgg = (content: string): boolean => {
  const words = content.toLowerCase().split(' ');
  
  // Check if first letters of consecutive words spell LANA
  for (let i = 0; i < words.length - 3; i++) {
    if (
      words[i].charAt(0) === 'l' &&
      words[i+1].charAt(0) === 'a' &&
      words[i+2].charAt(0) === 'n' &&
      words[i+3].charAt(0) === 'a'
    ) {
      return true;
    }
  }
  
  return false;
};

interface GameCardProps {
  card?: Card | null;
  isRevealed?: boolean;
}

export const GameCard = ({ card: propCard, isRevealed = true }: GameCardProps) => {
  const { currentCard } = useGame();
  const card = propCard !== undefined ? propCard : currentCard;

  if (!card) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md aspect-[3/4] rounded-2xl glass-panel flex items-center justify-center p-8 text-center"
      >
        <p className="text-white/70 text-lg">
          Ma btet7adda? Choose a pack and draw a card to start!
        </p>
      </motion.div>
    );
  }

  const isCardTruth = card.type === 'truth';
  const cardTypeLabel = isCardTruth ? "El 7a2i2a" : "El Jara2a";

  const isLanaCard = hasLanaEasterEgg(card.content);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={card.id}
        className={cn(
          "w-full max-w-md aspect-[3/4] rounded-2xl p-8 flex flex-col relative overflow-hidden",
          isCardTruth ? "card-truth" : "card-dare",
          isLanaCard ? "lana-easter-egg" : ""
        )}
        initial={{ opacity: 0, rotateY: 90, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          rotateY: isRevealed ? 0 : 180,
          scale: 1,
          transition: { duration: 0.6, ease: "easeOut" }
        }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        {/* Background pattern - updated with Lebanese-inspired patterns */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ 
            backgroundPosition: "100% 100%",
            transition: { duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }
          }}
          style={{
            backgroundImage: isCardTruth 
              ? "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Cpath d='M30 10L40 20L20 20z'/%3E%3Ccircle cx='10' cy='30' r='4'/%3E%3Ccircle cx='50' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E\")"
              : "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ec4899' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M0 30L15 15L30 30L15 45z'/%3E%3Cpath d='M30 30L45 15L60 30L45 45z'/%3E%3C/g%3E%3C/svg%3E\")"
          }}
        />

        {/* Modern corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 transform rotate-45 translate-x-3 translate-y--3 w-20 h-3 bg-gradient-to-r from-primary/40 to-secondary/40 blur-[1px]"></div>
        </div>

        {/* Glowing corner effect */}
        <motion.div 
          className={cn(
            "absolute -top-10 -right-10 w-20 h-20 rounded-full blur-xl opacity-70",
            isCardTruth ? "bg-game-truth" : "bg-game-dare"
          )} 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Content */}
        <div className="flex-1 flex items-center justify-center z-10">
          <motion.p 
            className="text-2xl font-bold text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {card.content}
          </motion.p>
        </div>
        
        <div className="mt-auto z-10">
          <motion.div 
            className={cn(
              "uppercase tracking-widest text-sm font-bold flex items-center",
              isCardTruth ? "text-game-truth" : "text-game-dare"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {cardTypeLabel}
            {isLanaCard && <Sparkles size={16} className="ml-2 animate-pulse text-amber-300" />}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
