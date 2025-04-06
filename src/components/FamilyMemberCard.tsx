
import { useState } from 'react';
import { useChocolate } from '@/contexts/ChocolateContext';
import { FamilyMember } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import FamilyMemberForm from './FamilyMemberForm';
import { Pencil, Trash2, Coffee } from 'lucide-react';

interface FamilyMemberCardProps {
  member: FamilyMember;
}

const FamilyMemberCard = ({ member }: FamilyMemberCardProps) => {
  const { removeFamilyMember, trackConsumption, shouldEatChocolate } = useChocolate();
  const [isEditing, setIsEditing] = useState(false);
  
  const needsChocolate = shouldEatChocolate(member);
  
  const lastEatenDate = member.lastEaten 
    ? format(new Date(member.lastEaten), 'dd.MM.yyyy')
    : 'Aldri';

  return (
    <Card className={`w-full transition-all ${needsChocolate ? 'border-chocolate-500 shadow-md' : ''}`}>
      <CardHeader className="relative pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{member.name}</CardTitle>
            <CardDescription>
              {member.piecesPerDay} {member.piecesPerDay === 1 ? 'bit' : 'biter'} per dag
            </CardDescription>
          </div>
          {needsChocolate && (
            <Badge className="bg-chocolate-500 hover:bg-chocolate-600">
              Tid for sjokolade!
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Sist spist: {lastEatenDate}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex gap-2">
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <FamilyMemberForm 
                existingMember={member} 
                onComplete={() => setIsEditing(false)} 
              />
            </DialogContent>
          </Dialog>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                <AlertDialogDescription>
                  Dette vil fjerne {member.name} fra familien.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Avbryt</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => removeFamilyMember(member.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Fjern
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        <Button 
          onClick={() => trackConsumption(member.id)}
          className="bg-chocolate-600 hover:bg-chocolate-700"
          disabled={!needsChocolate}
        >
          <Coffee className="mr-2 h-4 w-4" />
          Spist sjokolade
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FamilyMemberCard;
