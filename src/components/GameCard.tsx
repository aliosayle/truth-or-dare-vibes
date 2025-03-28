
import { Card } from "@/contexts/GameContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface GameCardProps {
  card: Card | null;
  isRevealed?: boolean;
}

export const GameCard = ({ card, isRevealed = true }: GameCardProps) => {
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
  const cardTypeLabel = isCardTruth ? "El 7a2" : "Tarre2a";

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
        {/* Background pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ 
            backgroundPosition: "100% 100%",
            transition: { duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }
          }}
          style={{
            backgroundImage: isCardTruth 
              ? "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='5'/%3E%3C/g%3E%3C/svg%3E\")"
              : "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ec4899' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M0 20L20 0L40 20L20 40z'/%3E%3C/g%3E%3C/svg%3E\")"
          }}
        />

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
              "uppercase tracking-widest text-sm font-bold",
              isCardTruth ? "text-game-truth" : "text-game-dare"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {cardTypeLabel}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
