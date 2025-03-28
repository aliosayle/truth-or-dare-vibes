
import { useGame, Pack } from "@/contexts/GameContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const PackSelector = () => {
  const { packs, activePack, setActivePack } = useGame();

  return (
    <div className="w-full max-w-md">
      <Select onValueChange={setActivePack} value={activePack?.id}>
        <SelectTrigger className="bg-black/30 border-white/20 text-white">
          <SelectValue placeholder="Select a pack" />
        </SelectTrigger>
        <SelectContent className="bg-background border-white/20">
          {packs.map((pack: Pack) => (
            <SelectItem key={pack.id} value={pack.id}>
              {pack.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {activePack && (
        <p className="mt-2 text-white/70 text-sm">{activePack.description}</p>
      )}
    </div>
  );
};
