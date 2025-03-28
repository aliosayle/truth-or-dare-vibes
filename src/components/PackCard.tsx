
import { Pack } from "@/contexts/GameContext";
import { motion } from "framer-motion";
import { ArrowRight, PackageOpen } from "lucide-react";

interface PackCardProps {
  pack: Pack;
  onSelect: () => void;
}

export const PackCard = ({ pack, onSelect }: PackCardProps) => {
  const cardCount = pack.cards.length;
  const truthCount = pack.cards.filter(card => card.type === 'truth').length;
  const dareCount = pack.cards.filter(card => card.type === 'dare').length;

  return (
    <motion.div 
      className="rounded-xl p-0.5 overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
    >
      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-5 h-full border border-white/10 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <PackageOpen className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-semibold text-white">{pack.name}</h3>
        </div>
        
        <p className="text-white/70 mb-4 line-clamp-2">{pack.description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-3">
            <span className="text-sm px-2.5 py-0.5 rounded-full bg-game-truth/30 text-game-truth">
              {truthCount} Truths
            </span>
            <span className="text-sm px-2.5 py-0.5 rounded-full bg-game-dare/30 text-game-dare">
              {dareCount} Dares
            </span>
          </div>
          
          <motion.div 
            className="bg-primary/20 rounded-full p-1.5"
            whileHover={{ x: 3 }}
          >
            <ArrowRight size={18} className="text-primary" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
