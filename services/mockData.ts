import { Player, Formation, Manager, Tournament } from '../types';

// Mock Data Stores
const PLAYERS: Player[] = [
  { id: '1', name: 'L. Messi', position: 'SS', overall: 105, cardType: 'Big Time', releaseDate: '2023-12-15', imageUrl: 'https://picsum.photos/300/400?random=1' },
  { id: '2', name: 'K. Mbappe', position: 'CF', overall: 101, cardType: 'Featured', releaseDate: '2023-11-20', imageUrl: 'https://picsum.photos/300/400?random=2' },
  { id: '3', name: 'Neymar Jr', position: 'LWF', overall: 103, cardType: 'Epic', releaseDate: '2024-01-05', imageUrl: 'https://picsum.photos/300/400?random=3' },
  { id: '4', name: 'P. Maldini', position: 'CB', overall: 102, cardType: 'Epic', releaseDate: '2024-02-10', imageUrl: 'https://picsum.photos/300/400?random=4' },
  { id: '5', name: 'A. Davies', position: 'LB', overall: 99, cardType: 'Highlight', releaseDate: '2023-10-30', imageUrl: 'https://picsum.photos/300/400?random=5' },
];

const FORMATIONS: Formation[] = [
  { 
    id: '1', 
    name: '4-2-1-3 Meta', 
    diagram: '4213', 
    playstyle: 'Quick Counter', 
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/e-core-c34c3.firebasestorage.app/o/Gemini_Generated_Image_n33j98n33j98n33j.png?alt=media&token=71d2b048-fba2-4d43-89ef-a7282221471f",
    roles: ['Defensive Fullback', 'Anchor Man', 'Hole Player AMF'], 
    strengths: ['Overloading wings', 'Fast transition', 'Solid defense'], 
    weaknesses: ['Midfield gaps', 'Stamina drain'] 
  },
  { 
    id: '2', 
    name: '4-1-2-3 Sepahan', 
    diagram: '4123', 
    playstyle: 'Possession Game',
    imageUrl: "your_fb_url_here",
    roles: ['Orchestrator', 'Creative Playmaker'], 
    strengths: ['Ball retention', 'Midfield dominance'], 
    weaknesses: ['Vulnerable to counters'] 
  },
  { 
    id: '3', 
    name: '3-2-3-2 QC', 
    diagram: '3232', 
    playstyle: 'Long Ball Counter',
    imageUrl: "your_fb_url_here",
    roles: ['Box-to-Box', 'Target Man'], 
    strengths: ['Central overload', 'Defensive solidity'], 
    weaknesses: ['Wide areas exposed'] 
  },
];


const MANAGERS: Manager[] = [
  { 
    id: '1', 
    name: 'G. Zeitzler (Klopp)', 
    formation: '4-3-3', 
    playstyle: 'Quick Counter', 
    tactics: { offensive: 'High Pressing', defensive: 'Frontline Pressure' }, 
    recommendedPlayers: ['Fast Wingers', 'Aggressive CMFs'] 
  },
  { 
    id: '2', 
    name: 'L. Roman (Guardiola)', 
    formation: '4-1-2-3', 
    playstyle: 'Possession Game', 
    tactics: { offensive: 'Short Pass', defensive: 'Conservative' }, 
    recommendedPlayers: ['Technical Midfielders', 'Ball Playing CB'] 
  },
];

const TOURNAMENTS: Tournament[] = [
  { id: '1', name: 'Weekly Cyber Cup', date: '2023-11-25', prize: '$100 Gift Card', maxPlayers: 32, participants: 18, rules: 'Standard rules, no boosting.' },
  { id: '2', name: 'Pro League Qualifier', date: '2023-12-01', prize: 'Pro Contract', maxPlayers: 128, participants: 90, rules: 'BO3, Authenticated accounts only.' },
];

// Service Functions (Simulating Async API calls)
export const getUpcomingPlayers = async (): Promise<Player[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...PLAYERS]), 500));
};

export const getFormations = async (): Promise<Formation[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...FORMATIONS]), 500));
};

export const getManagers = async (): Promise<Manager[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...MANAGERS]), 500));
};

export const getTournaments = async (): Promise<Tournament[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([...TOURNAMENTS]), 500));
};

export const createTournament = async (data: Omit<Tournament, 'id' | 'participants'>): Promise<Tournament> => {
  const newTournament: Tournament = {
    ...data,
    id: Date.now().toString(),
    participants: 0
  };
  TOURNAMENTS.push(newTournament);
  return new Promise((resolve) => setTimeout(() => resolve(newTournament), 500));
};
