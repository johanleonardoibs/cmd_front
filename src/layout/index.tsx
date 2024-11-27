import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Logout, Menu as MenuIcon } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SideBar } from './sideBar.tsx';
import { useLocalStorage } from '../hooks';

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { clearUserData, getUserData } = useLocalStorage();

  const userName = getUserData()?.username;
  const [open, setOpen] = useState<boolean>(false);
  const userButton = useRef<HTMLButtonElement>(null);

  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <IconButton
            sx={{ marginRight: '1rem' }}
            onClick={() => setOpenSideBar((current) => !current)}
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Consultorio Medico Dermatológico Q&M
          </Typography>
          <Button
            ref={userButton}
            variant="contained"
            onClick={() => setOpen(true)}
          >
            {userName}
          </Button>
          {userButton && (
            <Menu
              open={open}
              anchorEl={userButton.current}
              onClose={() => setOpen(false)}
            >
              <MenuItem
                sx={{ gap: 2, fontSize: '12px' }}
                onClick={() => {
                  clearUserData();
                  navigate('/login');
                }}
              >
                <Typography>Cerrar sesión</Typography>
                <Logout />
              </MenuItem>
            </Menu>
          )}
        </Toolbar>
      </AppBar>
      <SideBar open={openSideBar} onClose={() => setOpenSideBar(false)} />
      <Box
        sx={{ marginTop: '64px', display: 'flex', justifyContent: 'center' }}
      >
        {children}
      </Box>
    </Box>
  );
};
