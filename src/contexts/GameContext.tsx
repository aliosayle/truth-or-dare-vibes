
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";

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
    name: 'Lebanese Culture',
    description: 'Truth or dare questions about Lebanese traditions, food, and customs',
    cards: [
      { id: 't1', type: 'truth', content: "What's your favorite Lebanese dish and why?", packId: 'p1' },
      { id: 't2', type: 'truth', content: "Which Lebanese song brings back your fondest memories?", packId: 'p1' },
      { id: 't3', type: 'truth', content: "What's your favorite Lebanese saying or proverb?", packId: 'p1' },
      { id: 't4', type: 'truth', content: "Which Lebanese city or region would you most like to visit?", packId: 'p1' },
      { id: 'd1', type: 'dare', content: "Dance dabke for 30 seconds", packId: 'p1' },
      { id: 'd2', type: 'dare', content: "Sing a popular Lebanese song", packId: 'p1' },
      { id: 'd3', type: 'dare', content: "Try to recite a Lebanese poem from memory", packId: 'p1' },
      { id: 'd4', type: 'dare', content: "Call someone and greet them with 'Kifak/Kifik' and have a short conversation in Lebanese", packId: 'p1' }
    ]
  },
  {
    id: 'p2',
    name: 'Beirut Nights',
    description: 'Fun challenges inspired by Lebanese nightlife and entertainment',
    cards: [
      { id: 't5', type: 'truth', content: "What's the most memorable night you've had in Beirut?", packId: 'p2' },
      { id: 't6', type: 'truth', content: "Have you ever tried to impress someone with your Arabic?", packId: 'p2' },
      { id: 't7', type: 'truth', content: "What's your favorite Lebanese restaurant or café?", packId: 'p2' },
      { id: 't8', type: 'truth', content: "What's the most embarrassing thing you've done at a Lebanese wedding?", packId: 'p2' },
      { id: 'd5', type: 'dare', content: "Take a selfie in a pose like you're at a beach club in Jounieh", packId: 'p2' },
      { id: 'd6', type: 'dare', content: "Try to bargain for an imaginary item in Lebanese style", packId: 'p2' },
      { id: 'd7', type: 'dare', content: "Do your best impression of a Lebanese parent", packId: 'p2' },
      { id: 'd8', type: 'dare', content: "Text the last Lebanese person in your contacts and tell them you miss their country", packId: 'p2' }
    ]
  },
  {
    id: 'p3',
    name: 'Cedar Adventures',
    description: 'Questions and challenges about Lebanese landmarks and nature',
    cards: [
      { id: 't9', type: 'truth', content: "Would you rather spend a day at Jeita Grotto or hiking in the Cedars?", packId: 'p3' },
      { id: 't10', type: 'truth', content: "What's your favorite Lebanese natural landmark?", packId: 'p3' },
      { id: 't11', type: 'truth', content: "Have you ever been skiing in Lebanon? Share your experience.", packId: 'p3' },
      { id: 't12', type: 'truth', content: "What's the most beautiful place you've visited in Lebanon?", packId: 'p3' },
      { id: 'd9', type: 'dare', content: "Describe Baalbek ruins as if you're a tour guide", packId: 'p3' },
      { id: 'd10', type: 'dare', content: "Draw a quick sketch of the Lebanese flag", packId: 'p3' },
      { id: 'd11', type: 'dare', content: "Create a short advertisement promoting tourism in Lebanon", packId: 'p3' },
      { id: 'd12', type: 'dare', content: "Name 5 Lebanese cities in under 10 seconds", packId: 'p3' }
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
