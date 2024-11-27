import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  status: boolean;
}> = ({ children, status }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!status) {
      navigate('/login');
    }
  }, [navigate, status]);

  return children;
};
