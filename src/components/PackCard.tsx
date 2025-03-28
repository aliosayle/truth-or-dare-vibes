import { motion } from "framer-motion";
import { ArrowRight, PackageOpen } from "lucide-react";
import { Pack } from "@/contexts/GameContext";

// Custom Cedar icon for theme
const CedarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <path d="M12 2L12 22" />
    <path d="M8 6L12 4L16 6" />
    <path d="M5 10L12 6L19 10" />
    <path d="M2 16L12 10L22 16" />
    <path d="M12 22L5 18M12 22L19 18" />
  </svg>
);

interface PackCardProps {
  pack: Pack;
  onSelect: () => void;
}

export const PackCard = ({ pack, onSelect }: PackCardProps) => {
  const cards = pack.cards || [];
  const cardCount = cards.length;
  const truthCount = cards.filter(card => card.type === 'truth').length;
  const dareCount = cards.filter(card => card.type === 'dare').length;

  // Theme colors
  const accentColor = "from-red-600/25 to-red-600/10";
  const borderColor = "border-white/20";
  
  // Easter egg - if pack name or description includes "lana" (case insensitive)
  const hasLanaEasterEgg = 
    pack.name.toLowerCase().includes('lana') || 
    pack.description.toLowerCase().includes('lana');

  return (
    <motion.div 
      className="rounded-xl p-0.5 overflow-hidden cursor-pointer relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-primary/20 z-10"></div>
      
      <div className={`bg-gradient-to-br ${accentColor} rounded-xl p-5 h-full ${borderColor} backdrop-blur-sm hover:shadow-lg hover:shadow-red-600/20 transition-all`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center">
            {/* 1 in 6 chance to show cedar instead of the regular icon - subtle variety */}
            {Math.random() > 0.833 ? (
              <CedarIcon />
            ) : (
              <PackageOpen className="text-white" size={20} />
            )}
          </div>
          <h3 className="text-xl font-semibold text-white">
            {pack.name}
            {/* Subtle easter egg for Lana */}
            {hasLanaEasterEgg && <span className="ml-1 text-xs text-primary/70">♥</span>}
          </h3>
        </div>
        
        <p className="text-white/70 mb-4 line-clamp-2">{pack.description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-3">
            <span className="text-sm px-2.5 py-0.5 rounded-full bg-game-truth/30 text-game-truth">
              {truthCount} {truthCount === 1 ? "Truth" : "Truths"}
            </span>
            <span className="text-sm px-2.5 py-0.5 rounded-full bg-game-dare/30 text-game-dare">
              {dareCount} {dareCount === 1 ? "Dare" : "Dares"}
            </span>
          </div>
          
          <motion.div 
            className="bg-red-600/20 rounded-full p-1.5"
            whileHover={{ x: 3 }}
          >
            <ArrowRight size={18} className="text-red-400" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
