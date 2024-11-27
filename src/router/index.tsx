import { redirect, Route, Routes } from 'react-router-dom';
import { Dashboard, Login } from '../pages';
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { ProtectedRoute } from './protectedRoute.tsx';
import { useLocalStorage } from '../hooks';
import { Procedures } from '../pages/procedures';

export const RoutesProvider = () => {
  const { isLogged } = useLocalStorage();

  return (
    <Routes>
      <Route
        path={'/login'}
        element={
          <Suspense fallback={<CircularProgress />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path={'/dashboard'}
        element={
          <Suspense fallback={<CircularProgress />}>
            <ProtectedRoute status={isLogged()}>
              <Dashboard />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route
        path={'/procedures'}
        element={
          <Suspense fallback={<CircularProgress />}>
            <ProtectedRoute status={isLogged()}>
              <Procedures />
            </ProtectedRoute>
          </Suspense>
        }
      />
      <Route path={'*'} action={() => redirect('/login')} />
    </Routes>
  );
};
