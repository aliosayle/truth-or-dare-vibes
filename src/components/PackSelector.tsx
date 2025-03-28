
import { useGame, Pack } from "@/contexts/GameContext";
import { motion } from "framer-motion";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { PackageOpen, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const PackSelector = () => {
  const { packs, activePack, setActivePack } = useGame();
  const isMobile = useIsMobile();

  return (
    <motion.div 
      className="w-full max-w-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1">
          <PackageOpen className={`${isMobile ? "h-4 w-4" : ""} text-primary`} />
          <h2 className={`${isMobile ? "text-base" : "text-lg"} font-medium text-white`}>Current Pack</h2>
        </div>
        
        <Link to="/packs">
          <motion.div
            className="flex items-center gap-1 text-white/70 hover:text-white text-sm"
            whileHover={{ x: -3 }}
          >
            <ArrowLeft size={isMobile ? 14 : 16} />
            <span>Change</span>
          </motion.div>
        </Link>
      </div>
      
      {activePack && (
        <motion.div 
          className="p-2 sm:p-3 rounded-lg bg-black/30 border border-white/10 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <h3 className={`${isMobile ? "text-base" : "text-lg"} font-medium text-white`}>
            {activePack.name}
          </h3>
          <p className="mt-1 text-white/70 text-xs sm:text-sm">
            {activePack.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
