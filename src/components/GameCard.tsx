import { Card } from "@/contexts/GameContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/contexts/GameContext";

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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={card.id}
        className={cn(
          "w-full max-w-md aspect-[3/4] rounded-2xl p-8 flex flex-col relative overflow-hidden",
          isCardTruth ? "card-truth" : "card-dare"
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

        {/* Lebanese flag inspired accent in corner */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 h-12 w-16 bg-gradient-to-br from-primary/30 to-primary/10"></div>
          <div className="absolute top-2 right-2 h-8 w-8">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-full w-full text-white/40">
              <path fill="currentColor" d="M442.8 182.4c0-88-76.6-159.4-170.8-159.4S101.2 94.4 101.2 182.4c0 15.6 5.4 24.4 5.4 24.4l20 17.7c-5.9-33.7 2.4-101.7 45.1-101.7 9 0 10 10.2 10.5 22.1.5 26-4.6 52.6 26.5 70.8 6.5 5.1 17.2 5.2 17.2 5.2l-12.5-66.3c9.4 4.7 68.1 6.1 68.1 6.1l-12.5 66.3s4.3-.7 9-2.4c22.9-8.7 38.9-24.7 46.9-59.7 3.3-14.2 8.9-42 40.8-42 40.9 0 47.1 67.5 41.1 101.3l20-17.7c.1 0 5.5-8.8 5.5-24.4z"/>
            </svg>
          </div>
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
            {/* Easter egg - exactly 5% chance the card will secretly feature Lana's initial */}
            {Math.random() < 0.05 && (
              <span className="ml-2 opacity-20 text-xs">♥ L</span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
