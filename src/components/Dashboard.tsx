
import { useState } from 'react';
import { useChocolate } from '@/contexts/ChocolateContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FamilyMemberForm from './FamilyMemberForm';
import FamilyMemberCard from './FamilyMemberCard';
import ChocolateBarConfig from './ChocolateBarConfig';
import ChocolateStats from './ChocolateStats';
import { ChocolateIcon } from '@/utils/chocolate-icon';
import { PlusCircle, Settings, Users, User } from 'lucide-react';

const ChocolateDashboard = () => {
  const { familyMembers } = useChocolate();
  const [isAddingMember, setIsAddingMember] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex flex-col lg:flex-row justify-between items-center mb-8">
        <div className="flex items-center mb-4 lg:mb-0">
          <ChocolateIcon className="h-10 w-10 text-chocolate-600 mr-3" />
          <h1 className="text-3xl font-bold text-chocolate-800">Sjokolade Tracker</h1>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
            <DialogTrigger asChild>
              <Button className="bg-chocolate-600 hover:bg-chocolate-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Legg til familiemedlem
              </Button>
            </DialogTrigger>
            <DialogContent>
              <FamilyMemberForm onComplete={() => setIsAddingMember(false)} />
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="border-chocolate-600 text-chocolate-800">
            <Users className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Familiemedlemmer: </span>
            <span className="font-bold">{familyMembers.length}</span>
          </Button>
        </div>
      </header>

      <Tabs defaultValue="family" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="family">Familie</TabsTrigger>
          <TabsTrigger value="settings">Innstillinger</TabsTrigger>
        </TabsList>
        <TabsContent value="family" className="space-y-6">
          <ChocolateStats />
          
          {familyMembers.length === 0 ? (
            <div className="py-8 text-center">
              <User className="h-16 w-16 mx-auto text-chocolate-400 mb-2" />
              <h3 className="text-xl font-medium mb-2">Ingen familiemedlemmer ennå</h3>
              <p className="text-muted-foreground mb-4">
                Start med å legge til et familiemedlem for å begynne å spore sjokoladeforbruket.
              </p>
              <Button 
                onClick={() => setIsAddingMember(true)}
                className="bg-chocolate-600 hover:bg-chocolate-700"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Legg til familiemedlem
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-between items-center">
                <h2 className="text-2xl font-semibold text-chocolate-800">
                  Familiemedlemmer ({familyMembers.length})
                </h2>
                {familyMembers.length > 0 && (
                  <Button 
                    onClick={() => setIsAddingMember(true)}
                    variant="outline"
                    className="mb-4 border-chocolate-600 text-chocolate-800"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Legg til flere
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {familyMembers.map((member) => (
                  <FamilyMemberCard key={member.id} member={member} />
                ))}
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="max-w-xl mx-auto">
            <ChocolateBarConfig />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChocolateDashboard;
