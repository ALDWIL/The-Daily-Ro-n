import { Question } from '../types';

export const sampleQuestions: Question[] = [
  {
    id: 'fin-001',
    category: 'finance',
    title: 'Bitcoin Price Movement',
    description: 'Where will Bitcoin close next Friday compared to today\'s price?',
    options: ['Up 5%+', 'Up 0-5%', 'Down 0-5%', 'Down 5%+'],
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    resultDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: true,
    totalPool: 15400,
    betsPerOption: [4200, 6100, 3800, 1300]
  },
  {
    id: 'spo-001',
    category: 'sports',
    title: 'Premier League Surprise',
    description: 'Which team will score the most unexpected victory this weekend?',
    options: ['Sheffield United', 'Luton Town', 'Burnley', 'None - No upsets'],
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    resultDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    isActive: true,
    totalPool: 8900,
    betsPerOption: [2100, 1800, 2200, 2800]
  },
  {
    id: 'pol-001',
    category: 'politics',
    title: 'Global Economic Summit',
    description: 'What will be the primary focus of next week\'s G7 economic discussions?',
    options: ['AI Regulation', 'Climate Finance', 'Trade Disputes', 'Cryptocurrency Policy'],
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    resultDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    isActive: true,
    totalPool: 12300,
    betsPerOption: [3400, 4100, 2900, 1900]
  }
];

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'finance':
      return 'from-green-400 to-emerald-600';
    case 'sports':
      return 'from-orange-400 to-red-600';
    case 'politics':
      return 'from-blue-400 to-purple-600';
    default:
      return 'from-gray-400 to-gray-600';
  }
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'finance':
      return 'TrendingUp';
    case 'sports':
      return 'Trophy';
    case 'politics':
      return 'Globe';
    default:
      return 'HelpCircle';
  }
};