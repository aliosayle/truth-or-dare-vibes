
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { motion } from "framer-motion";
import { Dices, MessageCircleQuestion, Flame } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const GameControls = () => {
  const { activePack, drawCard } = useGame();
  const isMobile = useIsMobile();
  
  // For mobile, we'll use a more compact layout
  const containerClass = isMobile
    ? "grid grid-cols-3 gap-2 w-full max-w-md"
    : "flex flex-row gap-4 w-full max-w-md";

  return (
    <motion.div 
      className={containerClass}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
        <Button
          className="flex-1 btn-truth w-full shadow-lg shadow-game-truth/20 font-medium"
          onClick={() => drawCard('truth')}
          disabled={!activePack}
          size={isMobile ? "sm" : "lg"}
        >
          {isMobile ? (
            <MessageCircleQuestion className={isMobile ? "h-5 w-5" : "mr-2"} />
          ) : (
            <>
              <MessageCircleQuestion className="mr-2" />
              El 7a2
            </>
          )}
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
        <Button
          className="flex-1 w-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg font-medium"
          onClick={() => drawCard()}
          disabled={!activePack}
          size={isMobile ? "sm" : "lg"}
        >
          {isMobile ? (
            <Dices className={isMobile ? "h-5 w-5" : "mr-2"} />
          ) : (
            <>
              <Dices className="mr-2" />
              Yalla
            </>
          )}
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
        <Button
          className="flex-1 btn-dare w-full shadow-lg shadow-game-dare/20 font-medium"
          onClick={() => drawCard('dare')}
          disabled={!activePack}
          size={isMobile ? "sm" : "lg"}
        >
          {isMobile ? (
            <Flame className={isMobile ? "h-5 w-5" : "mr-2"} />
          ) : (
            <>
              <Flame className="mr-2" />
              Jarreb
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};
