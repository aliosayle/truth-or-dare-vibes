
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";

export const GameControls = () => {
  const { activePack, drawCard } = useGame();
  const isDisabled = !activePack;

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
      <Button
        className="flex-1 btn-truth"
        onClick={() => drawCard('truth')}
        disabled={isDisabled}
      >
        Truth
      </Button>
      
      <Button
        className="flex-1"
        onClick={() => drawCard()}
        disabled={isDisabled}
        variant="outline"
      >
        Random
      </Button>
      
      <Button
        className="flex-1 btn-dare"
        onClick={() => drawCard('dare')}
        disabled={isDisabled}
      >
        Dare
      </Button>
    </div>
  );
};
