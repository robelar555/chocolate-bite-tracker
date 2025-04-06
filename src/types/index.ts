
export interface FamilyMember {
  id: string;
  name: string;
  piecesPerDay: number;
  lastEaten?: string; // ISO date string
}

export interface ChocolateBar {
  id: string;
  pieces: number;
}
