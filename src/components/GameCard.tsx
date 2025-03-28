
import { Card } from "@/contexts/GameContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GameCardProps {
  card: Card | null;
  isRevealed?: boolean;
}

export const GameCard = ({ card, isRevealed = true }: GameCardProps) => {
  if (!card) {
    return (
      <div className="w-full max-w-md aspect-[3/4] rounded-2xl glass-panel flex items-center justify-center p-8 text-center">
        <p className="text-white/70 text-lg">
          Select a pack and draw a card to start playing!
        </p>
      </div>
    );
  }

  const isCardTruth = card.type === 'truth';

  return (
    <motion.div
      className={cn(
        "w-full max-w-md aspect-[3/4] rounded-2xl p-8 flex flex-col",
        isCardTruth ? "card-truth" : "card-dare"
      )}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isRevealed ? 0 : 180 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 flex items-center justify-center">
        <p className="text-2xl font-bold text-center">{card.content}</p>
      </div>
      
      <div className="mt-auto">
        <div 
          className={cn(
            "uppercase tracking-widest text-sm font-bold",
            isCardTruth ? "text-game-truth" : "text-game-dare"
          )}
        >
          {card.type}
        </div>
      </div>
    </motion.div>
  );
};
