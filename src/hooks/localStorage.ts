import { LoginResponse } from '../types/login.ts';
import { useCallback } from 'react';

export const useLocalStorage = () => {
  const saveUserData = (token: string, userName: string) => {
    localStorage.setItem('session', token);
    localStorage.setItem('username', userName);
  };

  const getUserData = useCallback((): LoginResponse | undefined => {
    const token = localStorage.getItem('session');
    const username = localStorage.getItem('username');

    if (token && username) {
      return { token, username };
    }
  }, []);

  const clearUserData = useCallback(() => {
    localStorage.removeItem('session');
    localStorage.removeItem('username');
  }, []);

  const isLogged = () => {
    return !!localStorage.getItem('session');
  };

  return { saveUserData, getUserData, clearUserData, isLogged };
};
