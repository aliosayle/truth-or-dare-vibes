
import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const AdminCardList = () => {
  const { packs, deleteCard } = useGame();
  const [selectedPackId, setSelectedPackId] = useState<string>('');
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);

  const confirmDelete = (cardId: string) => {
    setCardToDelete(cardId);
  };

  const handleDelete = () => {
    if (cardToDelete) {
      deleteCard(cardToDelete);
      setCardToDelete(null);
    }
  };

  const selectedPack = packs.find((pack) => pack.id === selectedPackId);
  
  return (
    <div className="space-y-4">
      <div className="glass-panel p-6 space-y-4">
        <h2 className="text-xl font-bold">Manage Cards</h2>
        
        <div className="mb-4">
          <Select onValueChange={setSelectedPackId} value={selectedPackId}>
            <SelectTrigger className="bg-black/30 border-white/20">
              <SelectValue placeholder="Select a pack" />
            </SelectTrigger>
            <SelectContent className="bg-background border-white/20">
              {packs.map((pack) => (
                <SelectItem key={pack.id} value={pack.id}>
                  {pack.name} ({pack.cards.length} cards)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedPack ? (
          selectedPack.cards.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {selectedPack.cards.map((card) => (
                <Card key={card.id} className="bg-black/30 border-white/10 text-white">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={`${
                        card.type === 'truth' ? 'bg-blue-900/30 border-blue-500/50 text-blue-300' : 'bg-red-900/30 border-red-500/50 text-red-300'
                      }`}
                    >
                      {card.type}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="py-0">
                    <p className="text-sm text-white/90">{card.content}</p>
                  </CardContent>
                  
                  <CardFooter className="pt-3">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => confirmDelete(card.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-background border-white/20">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Card</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this card? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-background border-white/20 hover:bg-white/10">Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDelete()}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-white/70 text-center py-4">No cards in this pack yet. Add some!</p>
          )
        ) : (
          <p className="text-white/70 text-center py-4">Select a pack to manage its cards</p>
        )}
      </div>
    </div>
  );
};
