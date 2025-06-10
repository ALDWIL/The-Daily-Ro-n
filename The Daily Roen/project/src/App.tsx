import React, { useState } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { CategoryCard } from './components/CategoryCard';
import { BettingModal } from './components/BettingModal';
import { UserDashboard } from './components/UserDashboard';
import { useAuth } from './hooks/useAuth';
import { useBetting } from './hooks/useBetting';
import { sampleQuestions } from './data/questions';
import { Question } from './types';
import { BarChart3, Users, Zap } from 'lucide-react';

function App() {
  const { user, signUp, signIn, signOut, updateTokenBalance } = useAuth();
  const { bets, placeBet, getUserBetsForQuestion } = useBetting(user?.id || null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const handlePlaceBet = (questionId: string, optionIndex: number, amount: number) => {
    if (!user) return;
    
    const question = sampleQuestions.find(q => q.id === questionId);
    if (!question) return;

    if (user.tokenBalance >= amount) {
      placeBet(question, optionIndex, amount);
      updateTokenBalance(user.tokenBalance - amount);
      setSelectedQuestion(null);
    }
  };

  const handleSignUp = async (email: string, username: string) => {
    await signUp(email, username);
    setShowAuthModal(false);
  };

  const handleSignIn = async (email: string) => {
    await signIn(email);
    setShowAuthModal(false);
  };

  if (showDashboard && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header 
          user={user} 
          onSignOut={signOut} 
          onAuthClick={() => setShowAuthModal(true)} 
        />
        <div className="pt-8">
          <div className="max-w-7xl mx-auto px-4 mb-6">
            <button
              onClick={() => setShowDashboard(false)}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Back to Questions
            </button>
          </div>
          <UserDashboard user={user} bets={bets} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header 
        user={user} 
        onSignOut={signOut} 
        onAuthClick={() => setShowAuthModal(true)} 
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            Predict. Bet. Win.
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Test your knowledge across Finance, Sports, and World Politics. 
            Make predictions on challenging questions and win Roën tokens from the community pool.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Predictions</h3>
              <p className="text-blue-100 text-sm">
                Answer challenging questions across three exciting categories
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Pool</h3>
              <p className="text-blue-100 text-sm">
                Your winnings come from the shared betting pool of all players
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Results</h3>
              <p className="text-blue-100 text-sm">
                Results determined within one week, winnings distributed instantly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Today's Questions</h2>
            <p className="text-gray-600">Choose your category and make your predictions</p>
          </div>
          {user && (
            <button
              onClick={() => setShowDashboard(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              View Dashboard
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleQuestions.map((question) => (
            <CategoryCard
              key={question.id}
              question={question}
              onViewDetails={setSelectedQuestion}
            />
          ))}
        </div>

        {!user && (
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start?</h3>
              <p className="text-gray-600 mb-6">
                Sign up now and get 1,000 Roën tokens to start betting!
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Get Your 1,000 R Welcome Bonus
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSignUp={handleSignUp}
        onSignIn={handleSignIn}
      />

      {selectedQuestion && user && (
        <BettingModal
          isOpen={!!selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
          question={selectedQuestion}
          user={user}
          onPlaceBet={handlePlaceBet}
          userBets={getUserBetsForQuestion(selectedQuestion.id)}
        />
      )}
    </div>
  );
}

export default App;