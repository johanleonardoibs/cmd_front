import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useLocalStorage } from './localStorage.ts';

const CoreUrl = import.meta.env.VITE_CORE_API;

export const useInterceptor = () => {
  const navigate = useNavigate();
  const { clearUserData, getUserData } = useLocalStorage();

  const interceptor = useCallback(
    async <T>(method: 'POST' | 'GET' | 'PATCH', path: string, body?: any) => {
      const response = await fetch(`${CoreUrl}${path}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          authorization: 'bearer ' + getUserData()?.token,
        },
        body: JSON.stringify(body), // Convierte los datos a JSON
      });

      const data = response.headers.get('Content-Type')?.includes('text/plain')
        ? null
        : ((await response.json()) as T);

      if (response.status === 403) {
        clearUserData();
        navigate('/login');
      }

      return {
        data: data,
        code: response.status,
      };
    },
    [clearUserData, getUserData, navigate]
  );

  return { interceptor };
};
