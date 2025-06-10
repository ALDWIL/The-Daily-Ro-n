import React from 'react';
import { Coins, TrendingUp, Trophy, Calendar } from 'lucide-react';
import { User, Bet } from '../types';

interface UserDashboardProps {
  user: User;
  bets: Bet[];
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, bets }) => {
  const activeBets = bets.filter(bet => bet.winnings === undefined);
  const completedBets = bets.filter(bet => bet.winnings !== undefined);
  const totalWagered = bets.reduce((sum, bet) => sum + bet.amount, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Dashboard</h2>
        <p className="text-gray-600">Track your predictions and winnings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Token Balance</p>
              <p className="text-2xl font-bold">{user.tokenBalance.toLocaleString()}</p>
            </div>
            <Coins className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Winnings</p>
              <p className="text-2xl font-bold">{user.totalWinnings.toLocaleString()}</p>
            </div>
            <Trophy className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Wagered</p>
              <p className="text-2xl font-bold">{totalWagered.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Active Bets</p>
              <p className="text-2xl font-bold">{activeBets.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-indigo-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Active Bets</h3>
          {activeBets.length > 0 ? (
            <div className="space-y-4">
              {activeBets.map((bet) => (
                <div key={bet.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-900">Question #{bet.questionId}</p>
                    <span className="text-lg font-bold text-purple-600">{bet.amount} R</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Placed on {bet.timestamp.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No active bets</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Results</h3>
          {completedBets.length > 0 ? (
            <div className="space-y-4">
              {completedBets.slice(0, 5).map((bet) => (
                <div key={bet.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-900">Question #{bet.questionId}</p>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Bet: {bet.amount} R</p>
                      <p className={`font-bold ${bet.winnings! > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {bet.winnings! > 0 ? `+${bet.winnings} R` : 'Lost'}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Result on {bet.timestamp.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No completed bets yet</p>
          )}
        </div>
      </div>
    </div>
  );
};