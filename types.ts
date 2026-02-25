export type Language = 'ca' | 'es';

export type ResourceType =
  | 'water'
  | 'shelter'
  | 'fire'
  | 'food'
  | 'medicine'
  | 'raft'
  | 'signal'
  | 'rescue';

export interface Mission {
  id: number;
  resource: ResourceType;
  emoji: string;
  colorClass: string; // Tailwind gradient classes
  title: Record<Language, string>;
  narrative: Record<Language, string>;    // Story intro
  challenge: Record<Language, string>;    // The equation problem
  equation: string;                       // Display equation
  expectedAnswer: string;
  hints: Record<Language, string[]>;
  feedback: {
    wrong: Record<Language, string>;
    correct: Record<Language, string>;
  };
}

export interface ChatMessage {
  role: 'assistant' | 'user';
  text: string;
  timestamp: number;
  isNarrative?: boolean;
}

export interface GameState {
  currentMission: number;           // index 0-7
  completedMissions: number[];      // mission ids
  resources: ResourceType[];        // collected resources
  daysOnIsland: number;
  rescued: boolean;
  history: ChatMessage[];
  language: Language;
  hintsUsed: number;
  showHelpModal: boolean;
}
