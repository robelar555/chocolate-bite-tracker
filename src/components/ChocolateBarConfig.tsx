
import { useState } from 'react';
import { useChocolate } from '@/contexts/ChocolateContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const ChocolateBarConfig = () => {
  const { chocolateBar, setChocolateBarPieces } = useChocolate();
  const [pieces, setPieces] = useState(chocolateBar.pieces.toString());
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setError('');
    const piecesNum = parseInt(pieces, 10);
    
    if (isNaN(piecesNum) || piecesNum < 1) {
      setError('Antall biter må være minst 1');
      return;
    }

    setChocolateBarPieces(piecesNum);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sjokoladeplate Konfigurasjon</CardTitle>
        <CardDescription>
          Sett antall biter i sjokoladeplaten
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="pieces">Antall biter i platen</Label>
            <Input 
              id="pieces" 
              type="number"
              min="1"
              value={pieces} 
              onChange={(e) => setPieces(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="bg-chocolate-600 hover:bg-chocolate-700">
            Oppdater
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ChocolateBarConfig;
