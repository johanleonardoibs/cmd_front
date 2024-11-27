import { Box, Button } from '@mui/material';
import { Colors } from '../../utils';
import { TextInput } from '../../components';
import { useForm } from 'react-hook-form';
import { LoginResponse } from '../../types/login.ts';
import { useInterceptor, useLocalStorage } from '../../hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type LoginType = { email: string; password: string };

export const Login = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginType>();
  const { interceptor } = useInterceptor();
  const { getUserData, saveUserData } = useLocalStorage();

  const [logged, setLogged] = useState<boolean>(false);

  const submit = async (data: LoginType) => {
    const { data: response } = await interceptor<LoginResponse>(
      'POST',
      '/login',
      data
    );

    if (response && response.token && response.username) {
      saveUserData(response.token, response.username);
      setLogged(true);
    }
  };

  useEffect(() => {
    if (getUserData()) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 200);
    }
  }, [getUserData, logged, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <Box
        sx={{
          border: '1px solid',
          borderColor: Colors.main,
          boxShadow: '1px 5px 5px #00000040',
          padding: 3,
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextInput
          label={'Correo electrónico'}
          control={methods.control}
          name={'email'}
        />
        <TextInput
          control={methods.control}
          label={'Contraseña'}
          name={'password'}
          type="password"
        />
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
          onClick={methods.handleSubmit(submit)}
        >
          <Button variant="contained">Login</Button>
        </Box>
      </Box>
    </Box>
  );
};
