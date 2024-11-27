import { useCallback, useEffect, useState } from 'react';
import { Roles } from '../enums';
import { useInterceptor, useLocalStorage } from '../hooks';
import { RoleContext } from '../context';

type RoleProviderProps = {
  children: React.ReactNode;
};

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const { interceptor } = useInterceptor();
  const { getUserData } = useLocalStorage();

  const [role, setRole] = useState<Roles>();

  const fetchRole = useCallback(async () => {
    const { data } = await interceptor<{ role: Roles }>('GET', '/role');

    if (data) {
      setRole(data.role);
    }
  }, [interceptor]);

  useEffect(() => {
    if (getUserData() && !role) void fetchRole();
  }, [fetchRole, getUserData, role]);

  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
};
