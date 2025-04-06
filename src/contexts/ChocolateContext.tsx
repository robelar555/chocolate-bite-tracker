
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FamilyMember, ChocolateBar } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';

interface ChocolateContextType {
  familyMembers: FamilyMember[];
  chocolateBar: ChocolateBar;
  addFamilyMember: (name: string, piecesPerDay: number) => void;
  updateFamilyMember: (member: FamilyMember) => void;
  removeFamilyMember: (id: string) => void;
  setChocolateBarPieces: (pieces: number) => void;
  trackConsumption: (memberId: string) => void;
  shouldEatChocolate: (member: FamilyMember) => boolean;
}

const ChocolateContext = createContext<ChocolateContextType | undefined>(undefined);

export const useChocolate = () => {
  const context = useContext(ChocolateContext);
  if (!context) {
    throw new Error('useChocolate must be used within a ChocolateProvider');
  }
  return context;
};

interface ChocolateProviderProps {
  children: ReactNode;
}

export const ChocolateProvider = ({ children }: ChocolateProviderProps) => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [chocolateBar, setChocolateBar] = useState<ChocolateBar>({
    id: uuidv4(),
    pieces: 24,
  });
  
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMembers = localStorage.getItem('familyMembers');
    const savedChocolateBar = localStorage.getItem('chocolateBar');

    if (savedMembers) {
      setFamilyMembers(JSON.parse(savedMembers));
    }

    if (savedChocolateBar) {
      setChocolateBar(JSON.parse(savedChocolateBar));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('familyMembers', JSON.stringify(familyMembers));
  }, [familyMembers]);

  useEffect(() => {
    localStorage.setItem('chocolateBar', JSON.stringify(chocolateBar));
  }, [chocolateBar]);

  const addFamilyMember = (name: string, piecesPerDay: number) => {
    const newMember: FamilyMember = {
      id: uuidv4(),
      name,
      piecesPerDay,
    };
    setFamilyMembers([...familyMembers, newMember]);
    toast({
      title: "Familie medlem lagt til",
      description: `${name} er nå lagt til i familien.`,
    });
  };

  const updateFamilyMember = (updatedMember: FamilyMember) => {
    setFamilyMembers(
      familyMembers.map((member) => 
        member.id === updatedMember.id ? updatedMember : member
      )
    );
    toast({
      title: "Oppdatert",
      description: `${updatedMember.name} er oppdatert.`,
    });
  };

  const removeFamilyMember = (id: string) => {
    const memberToRemove = familyMembers.find(member => member.id === id);
    setFamilyMembers(familyMembers.filter((member) => member.id !== id));
    if (memberToRemove) {
      toast({
        title: "Fjernet",
        description: `${memberToRemove.name} er nå fjernet fra familien.`,
      });
    }
  };

  const setChocolateBarPieces = (pieces: number) => {
    setChocolateBar({ ...chocolateBar, pieces });
    toast({
      title: "Sjokoladeplate oppdatert",
      description: `Sjokoladeplaten har nå ${pieces} biter.`,
    });
  };

  const trackConsumption = (memberId: string) => {
    setFamilyMembers(
      familyMembers.map((member) =>
        member.id === memberId
          ? { ...member, lastEaten: new Date().toISOString() }
          : member
      )
    );
    
    const member = familyMembers.find(m => m.id === memberId);
    if (member) {
      toast({
        title: "Sjokolade spist",
        description: `${member.name} har nå spist sjokolade.`,
      });
    }
  };

  const shouldEatChocolate = (member: FamilyMember): boolean => {
    if (!member.lastEaten) return true;

    const lastEaten = new Date(member.lastEaten);
    const now = new Date();
    
    // Reset hours, minutes, seconds and milliseconds to compare dates only
    const lastEatenDate = new Date(lastEaten.getFullYear(), lastEaten.getMonth(), lastEaten.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Calculate the difference in days
    const diffTime = today.getTime() - lastEatenDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= 1;
  };

  const value = {
    familyMembers,
    chocolateBar,
    addFamilyMember,
    updateFamilyMember,
    removeFamilyMember,
    setChocolateBarPieces,
    trackConsumption,
    shouldEatChocolate,
  };

  return (
    <ChocolateContext.Provider value={value}>
      {children}
    </ChocolateContext.Provider>
  );
};
