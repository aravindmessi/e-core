export interface Player {
  id: string;
  name: string;
  position: string;
  overall: number;
  cardType: 'Epic' | 'Big Time' | 'Legendary' | 'Featured' | 'Highlight';
  releaseDate: string;
  imageUrl: string;
}

export interface Formation {
  id: string;
  name: string;
  diagram: string; // Simplified for this demo as a string description or ID
  playstyle: string;
  imageUrl:string;
  roles: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface Manager {
  id: string;
  name: string;
  formation: string;
  playstyle: string;
  tactics: {
    offensive: string;
    defensive: string;
  };
  recommendedPlayers: string[];
}

export interface Tournament {
  id: string;
  name: string;
  date: string;
  prize: string;
  maxPlayers: number;
  participants: number; // count
  rules: string;
  bracket?: any;
}
