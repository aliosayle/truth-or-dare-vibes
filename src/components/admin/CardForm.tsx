import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGame } from "@/contexts/GameContext";
import { Plus, Sparkles } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export const CardForm = () => {
  const { packs, addCard } = useGame();
  const [content, setContent] = useState("");
  const [type, setType] = useState<"truth" | "dare">("truth");
  const [packId, setPackId] = useState("");
  const [lanaMode, setLanaMode] = useState(false);
  
  // Check if content contains 'lana' to activate easter egg
  useEffect(() => {
    if (content.toLowerCase().includes('lana')) {
      setLanaMode(true);
    } else {
      setLanaMode(false);
    }
  }, [content]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (content.trim() && packId) {
      addCard({
        content,
        type,
        packId,
      });
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 glass-panel p-6 ${lanaMode ? 'lana-secret-active' : ''}`}>
      <h2 className="text-xl font-bold flex items-center">
        Create New Lebanese Card
        {lanaMode && <Sparkles size={16} className="ml-2 text-amber-400 animate-pulse" />}
      </h2>
      
      <div className="space-y-2">
        <label htmlFor="cardPack" className="text-sm text-white/70">
          Select Pack
        </label>
        <Select onValueChange={setPackId} value={packId}>
          <SelectTrigger 
            id="cardPack"
            className={`bg-black/30 border-white/20 ${lanaMode ? 'border-amber-500/30' : ''}`}
          >
            <SelectValue placeholder="Select a pack" />
          </SelectTrigger>
          <SelectContent className="bg-background border-white/20">
            {packs.map((pack) => (
              <SelectItem key={pack.id} value={pack.id}>
                {pack.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="cardType" className="text-sm text-white/70">
          Card Type
        </label>
        <Select onValueChange={(val) => setType(val as "truth" | "dare")} value={type}>
          <SelectTrigger 
            id="cardType" 
            className={`bg-black/30 border-white/20 ${lanaMode ? 'border-amber-500/30' : ''}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background border-white/20">
            <SelectItem value="truth">Truth</SelectItem>
            <SelectItem value="dare">Dare</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="cardContent" className="text-sm text-white/70">
          Card Content
        </label>
        <Textarea
          id="cardContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={type === "truth" ? "e.g. What's your favorite Lebanese dish?" : "e.g. Sing a verse from a famous Lebanese song"}
          className={`bg-black/30 border-white/20 ${lanaMode ? 'border-amber-500/30' : ''}`}
          required
          rows={3}
        />
        {lanaMode && (
          <p className="text-xs italic text-amber-500/70 mt-1">
            Creating a special card for Lana...
          </p>
        )}
      </div>
      
      <Button 
        type="submit" 
        className={`w-full ${lanaMode ? 'bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400' : 
          type === "truth" ? "btn-truth" : "btn-dare"}`}
        disabled={!packId}
      >
        <Plus className="mr-2 h-4 w-4" /> Add {lanaMode ? "Lana's" : ""} {type} Card
      </Button>
    </form>
  );
};
