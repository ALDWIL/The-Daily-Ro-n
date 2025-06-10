import React, { useState } from 'react';
import { X, Coins, TrendingUp, Calendar, Users } from 'lucide-react';
import { Question, User } from '../types';

interface BettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  user: User;
  onPlaceBet: (questionId: string, optionIndex: number, amount: number) => void;
  userBets: any[];
}

export const BettingModal: React.FC<BettingModalProps> = ({
  isOpen,
  onClose,
  question,
  user,
  onPlaceBet,
  userBets
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(100);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const getCategoryGradient = () => {
    switch (question.category) {
      case 'finance':
        return 'from-green-400 to-emerald-600';
      case 'sports':
        return 'from-orange-400 to-red-600';
      case 'politics':
        return 'from-blue-400 to-purple-600';
    }
  };

  const handlePlaceBet = async () => {
    if (selectedOption === null || betAmount > user.tokenBalance) return;
    
    setIsLoading(true);
    try {
      await onPlaceBet(question.id, selectedOption, betAmount);
      onClose();
    } catch (error) {
      console.error('Betting error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalUserBets = userBets.reduce((sum, bet) => sum + bet.amount, 0);
  const timeRemaining = Math.ceil((question.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className={`bg-gradient-to-r ${getCategoryGradient()} p-6 text-white`}>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{question.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white/90 mb-4">{question.description}</p>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{timeRemaining} days left</span>
            </div>
            <div className="flex items-center space-x-2">
              <Coins className="w-4 h-4" />
              <span>{question.totalPool.toLocaleString()} R pool</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{question.options.length} options</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {totalUserBets > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 font-medium">
                You've already bet {totalUserBets} R on this question
              </p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Choose your prediction:</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const percentage = ((question.betsPerOption[index] / question.totalPool) * 100).toFixed(1);
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(index)}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      selectedOption === index
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{option}</span>
                      <span className="text-sm text-gray-500">{percentage}% of pool</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${getCategoryGradient()} h-2 rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedOption !== null && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Place your bet:</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">Bet Amount:</span>
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-yellow-500" />
                    <span>Balance: {user.tokenBalance.toLocaleString()} R</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mb-4">
                  {[100, 200, 500, 1000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setBetAmount(amount)}
                      disabled={amount > user.tokenBalance}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        betAmount === amount
                          ? 'bg-purple-600 text-white'
                          : 'bg-white border border-gray-300 hover:border-purple-300 disabled:opacity-50'
                      }`}
                    >
                      {amount} R
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="100"
                  max={Math.min(user.tokenBalance, 2000)}
                  step="100"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  className="w-full mb-4"
                />

                <div className="text-center">
                  <span className="text-2xl font-bold text-purple-600">{betAmount} R</span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handlePlaceBet}
            disabled={selectedOption === null || betAmount > user.tokenBalance || isLoading}
            className={`w-full bg-gradient-to-r ${getCategoryGradient()} hover:shadow-lg text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {isLoading ? 'Placing Bet...' : `Place Bet: ${betAmount} R`}
          </button>
        </div>
      </div>
    </div>
  );
};