
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "@/components/ui/sonner";

// Types
export interface Card {
  id: string;
  type: 'truth' | 'dare';
  content: string;
  packId: string;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  cards: Card[];
}

// Initial data
const initialPacks: Pack[] = [
  {
    id: 'p1',
    name: 'Casual Fun',
    description: 'Light-hearted questions and dares for everyone',
    cards: [
      { id: 't1', type: 'truth', content: 'What's the most embarrassing song you have on your playlist?', packId: 'p1' },
      { id: 't2', type: 'truth', content: 'What was your most awkward first date experience?', packId: 'p1' },
      { id: 't3', type: 'truth', content: 'What's the weirdest food combination you actually enjoy?', packId: 'p1' },
      { id: 'd1', type: 'dare', content: 'Text your crush or the last person you dated and tell them you miss their face', packId: 'p1' },
      { id: 'd2', type: 'dare', content: 'Do your best impression of another player', packId: 'p1' },
      { id: 'd3', type: 'dare', content: 'Post a selfie with a funny caption on your social media', packId: 'p1' }
    ]
  },
  {
    id: 'p2',
    name: 'Party Mode',
    description: 'Spicier questions and challenges for a wild night',
    cards: [
      { id: 't4', type: 'truth', content: 'When was the last time you lied to get out of plans?', packId: 'p2' },
      { id: 't5', type: 'truth', content: 'What's the most rebellious thing you did as a teenager?', packId: 'p2' },
      { id: 't6', type: 'truth', content: 'What's a secret you've never told anyone in this room?', packId: 'p2' },
      { id: 'd4', type: 'dare', content: 'Let the group browse your camera roll for 30 seconds', packId: 'p2' },
      { id: 'd5', type: 'dare', content: 'Call someone and sing them happy birthday, even if it's not their birthday', packId: 'p2' },
      { id: 'd6', type: 'dare', content: 'Speak in an accent of the group's choosing until your next turn', packId: 'p2' }
    ]
  }
];

// Context interface
interface GameContextType {
  packs: Pack[];
  activePack: Pack | null;
  currentCard: Card | null;
  setActivePack: (packId: string) => void;
  drawCard: (type?: 'truth' | 'dare') => void;
  addPack: (pack: Omit<Pack, 'id' | 'cards'>) => void;
  addCard: (card: Omit<Card, 'id'>) => void;
  deletePack: (packId: string) => void;
  deleteCard: (cardId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [packs, setPacks] = useState<Pack[]>(initialPacks);
  const [activePack, setActivePackState] = useState<Pack | null>(null);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const setActivePack = (packId: string) => {
    const pack = packs.find(p => p.id === packId) || null;
    setActivePackState(pack);
    setCurrentCard(null);
    if (pack) {
      toast.info(`Selected pack: ${pack.name}`);
    }
  };

  const drawCard = (type?: 'truth' | 'dare') => {
    if (!activePack) {
      toast.error("Please select a pack first");
      return;
    }
    
    const cards = type 
      ? activePack.cards.filter(card => card.type === type)
      : activePack.cards;
      
    if (cards.length === 0) {
      toast.error(`No ${type || ''} cards available in this pack`);
      return;
    }
    
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    setCurrentCard(randomCard);
  };

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addPack = (packData: Omit<Pack, 'id' | 'cards'>) => {
    const newPack: Pack = {
      ...packData,
      id: generateId(),
      cards: []
    };
    setPacks(prev => [...prev, newPack]);
    toast.success(`Pack "${packData.name}" created`);
  };

  const addCard = (cardData: Omit<Card, 'id'>) => {
    const newCard: Card = {
      ...cardData,
      id: generateId(),
    };
    
    setPacks(prev => prev.map(pack => 
      pack.id === cardData.packId 
        ? { ...pack, cards: [...pack.cards, newCard] } 
        : pack
    ));
    
    toast.success(`New ${cardData.type} card added`);
  };

  const deletePack = (packId: string) => {
    setPacks(prev => prev.filter(pack => pack.id !== packId));
    if (activePack && activePack.id === packId) {
      setActivePackState(null);
      setCurrentCard(null);
    }
    toast.info("Pack deleted");
  };

  const deleteCard = (cardId: string) => {
    setPacks(prev => prev.map(pack => ({
      ...pack,
      cards: pack.cards.filter(card => card.id !== cardId)
    })));
    
    if (currentCard && currentCard.id === cardId) {
      setCurrentCard(null);
    }
    
    toast.info("Card deleted");
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
        deleteCard
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
