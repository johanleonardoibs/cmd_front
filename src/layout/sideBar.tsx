import { Box, Drawer, MenuItem, MenuList, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { getViews, SideMenuItems } from './menuItems.tsx';
import { Colors } from '../utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoleContext } from '../context';

type SideBarProps = {
  open: boolean;
  onClose: () => void;
};

export const SideBar: React.FC<SideBarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const role = useContext(RoleContext);

  const [views, setViews] = useState<SideMenuItems[]>([]);

  useEffect(() => {
    if (role) {
      setViews(getViews(role));
    }
  }, [role]);

  return (
    <Drawer
      sx={{
        '.MuiPaper-root.MuiPaper-elevation': {
          marginTop: '64px',
          height: 'calc(100% - 64px)',
          boxShadow: '1px 5px 5px #00000040',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: '250px' }}>
        <MenuList>
          {views.map((view, index) => (
            <MenuItem
              key={index}
              sx={{
                display: 'flex',
                paddingX: '2rem',
                gap: 2,
                fontWeight: 'bold',
                svg: {
                  color: Colors.secondary,
                },
                '&.active': {
                  color: 'white',
                  background: Colors.main,
                  svg: {
                    color: 'white',
                  },
                },
              }}
              className={pathname === view.route ? 'active' : ''}
              onClick={() => {
                navigate(view.route);
                onClose();
              }}
            >
              {view.icon}
              <Typography>{view.title}</Typography>
            </MenuItem>
          ))}
        </MenuList>
      </Box>
    </Drawer>
  );
};
