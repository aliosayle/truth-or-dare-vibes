
import { useGame, Pack } from "@/contexts/GameContext";
import { motion } from "framer-motion";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { PackageOpen } from "lucide-react";

export const PackSelector = () => {
  const { packs, activePack, setActivePack } = useGame();

  return (
    <motion.div 
      className="w-full max-w-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <PackageOpen className="text-primary" />
        <h2 className="text-lg font-medium text-white">Select a Card Pack</h2>
      </div>
      
      <Select onValueChange={setActivePack} value={activePack?.id}>
        <SelectTrigger className="bg-black/30 border-white/20 text-white backdrop-blur-md">
          <SelectValue placeholder="Select a pack" />
        </SelectTrigger>
        <SelectContent className="bg-background/90 backdrop-blur-md border-white/20">
          {packs.map((pack: Pack) => (
            <SelectItem key={pack.id} value={pack.id}>
              {pack.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {activePack && (
        <motion.p 
          className="mt-2 text-white/70 text-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {activePack.description}
        </motion.p>
      )}
    </motion.div>
  );
};
