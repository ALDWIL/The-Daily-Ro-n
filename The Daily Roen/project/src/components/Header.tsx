import React from 'react';
import { User, LogOut, Coins, Trophy } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  onSignOut: () => void;
  onAuthClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onSignOut, onAuthClick }) => {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                The Daily Roën
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <Coins className="w-4 h-4 text-yellow-300" />
                  <span className="font-semibold">{user.tokenBalance.toLocaleString()} R</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{user.username}</span>
                </div>
                <button
                  onClick={onSignOut}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
              >
                Sign Up for 1,000 R
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};