import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "sonner";
import { packsApi, cardsApi } from '@/lib/api';

// Types
export interface Card {
  id: string;
  type: 'truth' | 'dare';
  content: string;
  packId: string;
  created_at?: string;
  updated_at?: string;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  cards: Card[];
  created_at?: string;
  updated_at?: string;
}

// Context interface
interface GameContextType {
  packs: Pack[];
  activePack: Pack | null;
  currentCard: Card | null;
  setActivePack: (packId: string) => void;
  drawCard: (type?: 'truth' | 'dare') => void;
  addPack: (pack: Omit<Pack, 'id' | 'created_at' | 'updated_at'>) => void;
  addCard: (card: Omit<Card, 'id' | 'created_at' | 'updated_at'>) => void;
  deletePack: (packId: string) => void;
  deleteCard: (cardId: string) => void;
  isLoading: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [activePack, setActivePackState] = useState<Pack | null>(null);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastLoadedPackId, setLastLoadedPackId] = useState<string | null>(null);

  useEffect(() => {
    loadPacks();
  }, []);

  const loadPacks = async () => {
    try {
      const fetchedPacks = await packsApi.getAllPacks();
      console.log('Fetched packs:', fetchedPacks);
      setPacks(fetchedPacks);
    } catch (error) {
      toast.error('Failed to load packs');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const setActivePack = async (packId: string) => {
    if (lastLoadedPackId === packId && activePack?.id === packId) {
      console.log('Pack already active, skipping fetch:', packId);
      return;
    }
    
    try {
      const existingPack = packs.find(p => p.id === packId);
      if (existingPack) {
        console.log('Using cached pack:', existingPack);
        setActivePackState(existingPack);
        setCurrentCard(null);
        setLastLoadedPackId(packId);
        return;
      }
      
      const pack = await packsApi.getPackById(packId);
      console.log('Setting active pack:', pack);
      if (!pack) {
        toast.error('Pack not found');
        return;
      }
      setActivePackState(pack);
      setCurrentCard(null);
      setLastLoadedPackId(packId);
    } catch (error) {
      toast.error('Failed to load pack');
      console.error(error);
    }
  };

  const drawCard = (type?: 'truth' | 'dare') => {
    console.log('Drawing card:', { type, activePack });
    if (!activePack) {
      toast.error("Please select a pack first");
      return;
    }
    
    const availableCards = type 
      ? activePack.cards.filter(card => card.type === type)
      : activePack.cards;
      
    console.log('Available cards:', availableCards);
    
    if (availableCards.length === 0) {
      toast.error(`No ${type || ''} cards available in this pack`);
      return;
    }
    
    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    console.log('Selected card:', randomCard);
    setCurrentCard(randomCard);
  };

  const addPack = async (packData: Omit<Pack, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newPack = await packsApi.createPack(packData);
      setPacks(prev => [...prev, newPack]);
      toast.success(`Pack "${packData.name}" created`);
    } catch (error) {
      toast.error('Failed to create pack');
      console.error(error);
    }
  };

  const addCard = async (cardData: Omit<Card, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newCard = await cardsApi.createCard(cardData);
      
      setPacks(prev => prev.map(pack => 
        pack.id === cardData.packId 
          ? { ...pack, cards: [...pack.cards, newCard] } 
          : pack
      ));
      
      if (activePack?.id === cardData.packId) {
        setActivePackState(prev => prev ? { ...prev, cards: [...prev.cards, newCard] } : null);
      }
      
      toast.success(`New ${cardData.type} card added`);
    } catch (error) {
      toast.error('Failed to create card');
      console.error(error);
    }
  };

  const deletePack = async (packId: string) => {
    try {
      await packsApi.deletePack(packId);
      setPacks(prev => prev.filter(pack => pack.id !== packId));
      if (activePack && activePack.id === packId) {
        setActivePackState(null);
        setCurrentCard(null);
      }
      toast.success("Pack deleted");
    } catch (error) {
      toast.error('Failed to delete pack');
      console.error(error);
    }
  };

  const deleteCard = async (cardId: string) => {
    try {
      await cardsApi.deleteCard(cardId);
      
      setPacks(prev => prev.map(pack => ({
        ...pack,
        cards: pack.cards.filter(card => card.id !== cardId)
      })));
      
      if (activePack) {
        setActivePackState(prev => prev ? {
          ...prev,
          cards: prev.cards.filter(card => card.id !== cardId)
        } : null);
      }
      
      if (currentCard && currentCard.id === cardId) {
        setCurrentCard(null);
      }
      
      toast.success("Card deleted");
    } catch (error) {
      toast.error('Failed to delete card');
      console.error(error);
    }
  };

  return (
    <GameContext.Provider
      value={{
        packs,
        activePack,
        currentCard,
        setActivePack,
        drawCard,
        addPack,
        addCard,
        deletePack,
        deleteCard,
        isLoading
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
