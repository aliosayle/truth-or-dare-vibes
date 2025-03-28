
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGame } from "@/contexts/GameContext";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";

export const PackForm = () => {
  const { addPack } = useGame();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addPack({
        name,
        description,
      });
      setName("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 glass-panel p-6">
      <h2 className="text-xl font-bold">Create New Lebanese Pack</h2>
      
      <div className="space-y-2">
        <label htmlFor="packName" className="text-sm text-white/70">
          Pack Name
        </label>
        <Input
          id="packName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Lebanese Traditions"
          className="bg-black/30 border-white/20"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="packDescription" className="text-sm text-white/70">
          Description
        </label>
        <Textarea
          id="packDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Questions and dares about Lebanese culture and traditions"
          className="bg-black/30 border-white/20"
        />
      </div>
      
      <Button type="submit" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Create Pack
      </Button>
    </form>
  );
};
