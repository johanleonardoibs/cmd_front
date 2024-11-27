import { Roles } from '../enums';
import { Home, MedicalServices } from '@mui/icons-material';

export type SideMenuItems = {
  title: string;
  route: string;
  icon: React.ReactNode;
  roles: Roles[];
};

const views: SideMenuItems[] = [
  {
    title: 'Inicio',
    route: '/dashboard',
    icon: <Home />,
    roles: [Roles.Admin],
  },
  {
    title: 'Procedimientos',
    route: '/procedures',
    icon: <MedicalServices />,
    roles: [Roles.Admin],
  },
];

export const getViews = (role: Roles) => {
  return views.filter((view) => {
    return view.roles.includes(role);
  });
};
