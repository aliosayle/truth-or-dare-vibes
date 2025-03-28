
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGame } from "@/contexts/GameContext";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
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
    <form onSubmit={handleSubmit} className="space-y-4 glass-panel p-6">
      <h2 className="text-xl font-bold">Create New Card</h2>
      
      <div className="space-y-2">
        <label htmlFor="cardPack" className="text-sm text-white/70">
          Select Pack
        </label>
        <Select onValueChange={setPackId} value={packId}>
          <SelectTrigger 
            id="cardPack"
            className="bg-black/30 border-white/20"
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
            className="bg-black/30 border-white/20"
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
          placeholder="What's your question or challenge?"
          className="bg-black/30 border-white/20"
          required
          rows={3}
        />
      </div>
      
      <Button 
        type="submit" 
        className={type === "truth" ? "w-full btn-truth" : "w-full btn-dare"}
        disabled={!packId}
      >
        <Plus className="mr-2 h-4 w-4" /> Add {type} Card
      </Button>
    </form>
  );
};
