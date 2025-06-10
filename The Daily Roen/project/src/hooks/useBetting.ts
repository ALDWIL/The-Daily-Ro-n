import { useState, useEffect } from 'react';
import { Bet, Question } from '../types';

export const useBetting = (userId: string | null) => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const userBets = localStorage.getItem(`bets_${userId}`);
      if (userBets) {
        setBets(JSON.parse(userBets));
      }
    }
    setIsLoading(false);
  }, [userId]);

  const placeBet = (question: Question, optionIndex: number, amount: number) => {
    if (!userId) return null;

    const newBet: Bet = {
      id: Date.now().toString(),
      userId,
      questionId: question.id,
      optionIndex,
      amount,
      timestamp: new Date()
    };

    const updatedBets = [...bets, newBet];
    setBets(updatedBets);
    localStorage.setItem(`bets_${userId}`, JSON.stringify(updatedBets));
    
    return newBet;
  };

  const calculateWinnings = (bet: Bet, question: Question, winningOptionIndex: number) => {
    if (bet.optionIndex !== winningOptionIndex) return 0;
    
    const totalPool = question.totalPool;
    const winningPool = question.betsPerOption[winningOptionIndex];
    const winRate = totalPool / winningPool;
    
    return Math.floor(bet.amount * winRate);
  };

  const getUserBetsForQuestion = (questionId: string) => {
    return bets.filter(bet => bet.questionId === questionId);
  };

  return {
    bets,
    isLoading,
    placeBet,
    calculateWinnings,
    getUserBetsForQuestion
  };
};