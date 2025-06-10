import React from 'react';
import { TrendingUp, Trophy, Globe, Clock, Coins } from 'lucide-react';
import { Question } from '../types';

interface CategoryCardProps {
  question: Question;
  onViewDetails: (question: Question) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ question, onViewDetails }) => {
  const getCategoryIcon = () => {
    switch (question.category) {
      case 'finance':
        return <TrendingUp className="w-6 h-6" />;
      case 'sports':
        return <Trophy className="w-6 h-6" />;
      case 'politics':
        return <Globe className="w-6 h-6" />;
    }
  };

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

  const getCategoryName = () => {
    switch (question.category) {
      case 'finance':
        return 'Finance';
      case 'sports':
        return 'Sports';
      case 'politics':
        return 'Politics & World';
    }
  };

  const timeRemaining = Math.ceil((question.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className={`bg-gradient-to-r ${getCategoryGradient()} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getCategoryIcon()}
            <h3 className="text-xl font-bold">{getCategoryName()}</h3>
          </div>
          <div className="flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{timeRemaining}d left</span>
          </div>
        </div>
        <h4 className="text-lg font-semibold mb-2">{question.title}</h4>
        <p className="text-white/90 text-sm">{question.description}</p>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">
              Total Pool: {question.totalPool.toLocaleString()} R
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {question.options.length} options
          </span>
        </div>

        <div className="space-y-2 mb-6">
          {question.options.slice(0, 2).map((option, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{option}</span>
              <span className="text-gray-500">
                {((question.betsPerOption[index] / question.totalPool) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
          {question.options.length > 2 && (
            <div className="text-xs text-gray-500">
              +{question.options.length - 2} more options
            </div>
          )}
        </div>

        <button
          onClick={() => onViewDetails(question)}
          className={`w-full bg-gradient-to-r ${getCategoryGradient()} hover:shadow-lg text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105`}
        >
          View & Bet
        </button>
      </div>
    </div>
  );
};