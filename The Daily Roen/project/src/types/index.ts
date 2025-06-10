export interface User {
  id: string;
  email: string;
  username: string;
  tokenBalance: number;
  totalWinnings: number;
  registrationDate: Date;
}

export interface Question {
  id: string;
  category: 'finance' | 'sports' | 'politics';
  title: string;
  description: string;
  options: string[];
  deadline: Date;
  resultDate: Date;
  isActive: boolean;
  totalPool: number;
  betsPerOption: number[];
}

export interface Bet {
  id: string;
  userId: string;
  questionId: string;
  optionIndex: number;
  amount: number;
  timestamp: Date;
  isWinning?: boolean;
  winnings?: number;
}

export interface CategoryStats {
  totalBets: number;
  totalWinnings: number;
  winRate: number;
}