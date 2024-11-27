import { createContext } from 'react';
import { Roles } from '../enums';

export const RoleContext = createContext<Roles | undefined>(undefined);
