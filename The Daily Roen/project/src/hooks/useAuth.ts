import { useState, useEffect } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing user session
    const existingUser = localStorage.getItem('dailyRoenUser');
    if (existingUser) {
      setUser(JSON.parse(existingUser));
    }
    setIsLoading(false);
  }, []);

  const signUp = async (email: string, username: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      username,
      tokenBalance: 1000, // Welcome bonus
      totalWinnings: 0,
      registrationDate: new Date()
    };
    
    localStorage.setItem('dailyRoenUser', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const signIn = async (email: string) => {
    // Simulate sign in - in production, this would validate credentials
    const existingUser = localStorage.getItem('dailyRoenUser');
    if (existingUser) {
      const user = JSON.parse(existingUser);
      setUser(user);
      return user;
    }
    throw new Error('User not found');
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('dailyRoenUser');
  };

  const updateTokenBalance = (newBalance: number) => {
    if (user) {
      const updatedUser = { ...user, tokenBalance: newBalance };
      setUser(updatedUser);
      localStorage.setItem('dailyRoenUser', JSON.stringify(updatedUser));
    }
  };

  return {
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateTokenBalance
  };
};