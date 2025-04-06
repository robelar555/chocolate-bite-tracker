
import { useChocolate } from '@/contexts/ChocolateContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ChocolateStats = () => {
  const { familyMembers, chocolateBar } = useChocolate();
  
  const totalDailyConsumption = familyMembers.reduce(
    (sum, member) => sum + member.piecesPerDay, 
    0
  );
  
  const daysPerBar = totalDailyConsumption > 0 
    ? Math.floor(chocolateBar.pieces / totalDailyConsumption)
    : 0;
  
  const membersNeedingChocolate = familyMembers.filter(member => {
    if (!member.lastEaten) return true;
    
    const lastEaten = new Date(member.lastEaten);
    const now = new Date();
    
    const lastEatenDate = new Date(lastEaten.getFullYear(), lastEaten.getMonth(), lastEaten.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const diffTime = today.getTime() - lastEatenDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= 1;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Total Daglig Forbruk</CardTitle>
          <CardDescription>Antall biter hele familien spiser per dag</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-chocolate-600">{totalDailyConsumption}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Dager Per Plate</CardTitle>
          <CardDescription>Hvor lenge en sjokoladeplate varer</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-chocolate-600">
            {daysPerBar} {daysPerBar === 1 ? 'dag' : 'dager'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Trenger Sjokolade</CardTitle>
          <CardDescription>Familiemedlemmer som bør spise sjokolade</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-chocolate-600">
            {membersNeedingChocolate.length} / {familyMembers.length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChocolateStats;
