
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import { motion } from "framer-motion";
import { Dices, MessageCircleQuestion, Flame } from "lucide-react";

export const GameControls = () => {
  const { activePack, drawCard } = useGame();
  const isDisabled = !activePack;

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
        <Button
          className="flex-1 btn-truth w-full shadow-lg shadow-game-truth/20 font-medium"
          onClick={() => drawCard('truth')}
          disabled={isDisabled}
          size="lg"
        >
          <MessageCircleQuestion className="mr-2" />
          Truth
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
        <Button
          className="flex-1 w-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg font-medium"
          onClick={() => drawCard()}
          disabled={isDisabled}
          size="lg"
        >
          <Dices className="mr-2" />
          Random
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
        <Button
          className="flex-1 btn-dare w-full shadow-lg shadow-game-dare/20 font-medium"
          onClick={() => drawCard('dare')}
          disabled={isDisabled}
          size="lg"
        >
          <Flame className="mr-2" />
          Dare
        </Button>
      </motion.div>
    </motion.div>
  );
};
