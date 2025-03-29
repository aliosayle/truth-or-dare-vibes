import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { motion } from "framer-motion";
import { Dices, MessageCircleQuestion, Flame } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const GameControls = () => {
  const { activePack, drawCard } = useGame();
  const isMobile = useIsMobile();
  
  // Accessible button text for screen readers only
  const SrOnly = ({ children }) => (
    <span className="sr-only">{children}</span>
  );
  
  return (
    <motion.div 
      className={`w-full max-w-md ${isMobile ? 'bg-black/40 backdrop-blur-sm p-3 rounded-full shadow-xl' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={`grid grid-cols-3 gap-${isMobile ? '2' : '3'} w-full`}>
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="flex-1"
        >
          <Button
            className="w-full h-12 rounded-full bg-game-truth text-white shadow-lg shadow-game-truth/20 font-medium hover:bg-game-truth/80"
            onClick={() => drawCard('truth')}
            disabled={!activePack}
          >
            {isMobile ? (
              <>
                <MessageCircleQuestion className="h-5 w-5" />
                <SrOnly>Truth</SrOnly>
              </>
            ) : (
              <>
                <MessageCircleQuestion className="mr-2 h-5 w-5" />
                Truth
              </>
            )}
          </Button>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="flex-1"
        >
          <Button
            className="w-full h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg font-medium"
            onClick={() => drawCard()}
            disabled={!activePack}
          >
            {isMobile ? (
              <>
                <Dices className="h-5 w-5" />
                <SrOnly>Random</SrOnly>
              </>
            ) : (
              <>
                <Dices className="mr-2 h-5 w-5" />
                Random
              </>
            )}
          </Button>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className="flex-1"
        >
          <Button
            className="w-full h-12 rounded-full bg-game-dare text-white shadow-lg shadow-game-dare/20 font-medium hover:bg-game-dare/80"
            onClick={() => drawCard('dare')}
            disabled={!activePack}
          >
            {isMobile ? (
              <>
                <Flame className="h-5 w-5" />
                <SrOnly>Dare</SrOnly>
              </>
            ) : (
              <>
                <Flame className="mr-2 h-5 w-5" />
                Dare
              </>
            )}
          </Button>
        </motion.div>
      </div>
      
      {isMobile && activePack && (
        <div className="flex justify-center mt-2">
          <span className="text-xs text-white/50 tracking-wide uppercase">
            {activePack.cards?.filter(c => c.type === 'truth').length || 0} Truths • {activePack.cards?.filter(c => c.type === 'dare').length || 0} Dares
          </span>
        </div>
      )}
    </motion.div>
  );
};
