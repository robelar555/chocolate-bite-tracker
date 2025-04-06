
import { useState } from 'react';
import { useChocolate } from '@/contexts/ChocolateContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FamilyMember } from '@/types';

interface FamilyMemberFormProps {
  existingMember?: FamilyMember;
  onComplete?: () => void;
}

const FamilyMemberForm = ({ existingMember, onComplete }: FamilyMemberFormProps) => {
  const [name, setName] = useState(existingMember?.name || '');
  const [piecesPerDay, setPiecesPerDay] = useState(existingMember?.piecesPerDay.toString() || '1');
  const [error, setError] = useState('');
  
  const { addFamilyMember, updateFamilyMember } = useChocolate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setError('');
    const piecesNum = parseInt(piecesPerDay, 10);
    
    if (!name.trim()) {
      setError('Vennligst skriv inn et navn');
      return;
    }
    
    if (isNaN(piecesNum) || piecesNum < 1) {
      setError('Antall biter må være minst 1');
      return;
    }

    if (existingMember) {
      updateFamilyMember({
        ...existingMember,
        name: name.trim(),
        piecesPerDay: piecesNum
      });
    } else {
      addFamilyMember(name.trim(), piecesNum);
      // Reset form
      setName('');
      setPiecesPerDay('1');
    }
    
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{existingMember ? 'Rediger Familiemedlem' : 'Legg til nytt familiemedlem'}</CardTitle>
        <CardDescription>
          {existingMember 
            ? 'Endre informasjonen for dette familiemedlemmet' 
            : 'Legg til et nytt medlem i familien'
          }
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Navn</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Skriv inn navn"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="piecesPerDay">Antall biter per dag</Label>
            <Input 
              id="piecesPerDay" 
              type="number"
              min="1"
              value={piecesPerDay} 
              onChange={(e) => setPiecesPerDay(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
        <CardFooter className="flex justify-between">
          {onComplete && (
            <Button variant="outline" type="button" onClick={onComplete}>
              Avbryt
            </Button>
          )}
          <Button type="submit" className="bg-chocolate-600 hover:bg-chocolate-700">
            {existingMember ? 'Oppdater' : 'Legg til'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FamilyMemberForm;
