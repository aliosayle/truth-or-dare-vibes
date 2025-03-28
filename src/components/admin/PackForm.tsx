
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGame } from "@/contexts/GameContext";
import { Plus, Flag } from "lucide-react";
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
    <form onSubmit={handleSubmit} className="space-y-4 glass-panel p-6 border-l-4 border-primary">
      <div className="flex items-center gap-2">
        <Flag className="text-primary" size={20} />
        <h2 className="text-xl font-bold">Ballech new pack ya bro</h2>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="packName" className="text-sm text-white/70">
          Pack Name
        </label>
        <Input
          id="packName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Fun with friends"
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
          placeholder="Ekteb yalla, la tinse el harf!"
          className="bg-black/30 border-white/20"
        />
      </div>
      
      <Button type="submit" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Yalla Create
      </Button>
    </form>
  );
};
