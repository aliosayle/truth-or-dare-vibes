
import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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

export const AdminPackList = () => {
  const { packs, deletePack } = useGame();
  const [packToDelete, setPackToDelete] = useState<string | null>(null);

  const confirmDelete = (packId: string) => {
    setPackToDelete(packId);
  };

  const handleDelete = () => {
    if (packToDelete) {
      deletePack(packToDelete);
      setPackToDelete(null);
    }
  };

  if (packs.length === 0) {
    return (
      <div className="glass-panel p-6 text-center">
        <p className="text-white/70">No packs available. Create your first pack!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="glass-panel p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Manage Packs</h2>
        
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {packs.map((pack) => (
            <Card key={pack.id} className="bg-black/30 border-white/10 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{pack.name}</CardTitle>
                <CardDescription className="text-white/60">
                  {pack.cards.length} cards
                </CardDescription>
              </CardHeader>
              
              {pack.description && (
                <CardContent className="py-2">
                  <p className="text-sm text-white/70">{pack.description}</p>
                </CardContent>
              )}
              
              <CardFooter>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => confirmDelete(pack.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-background border-white/20">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Pack</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{pack.name}"? This action cannot be undone.
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
      </div>
    </div>
  );
};
