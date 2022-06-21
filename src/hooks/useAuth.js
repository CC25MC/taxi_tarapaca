import {request} from '../api';
import { useMutation } from 'react-query';
import { atom, useAtom } from 'jotai';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { persistState, getPersistedState } from '../utils';
import { PERSISTOR_KEYS } from '../variables';
import { useToken } from './useToken';
import { useToast } from '@chakra-ui/react';

const authAtom = atom(
  getPersistedState(PERSISTOR_KEYS.auth) ?? { isAuthenticated: false }
);

const userAtom = atom(getPersistedState(PERSISTOR_KEYS.user) ?? {});

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => persistState(PERSISTOR_KEYS.auth, auth), [auth]);
  useEffect(() => persistState(PERSISTOR_KEYS.user, user), [user]);

  return {
    auth,
    setAuth,
    user,
    setUser,
  };
};

export const useLogin = () => {
  const toast = useToast();
  const { setAuth, setUser } = useAuth();
  const { setToken } = useToken();
  const navigate = useNavigate();

  const {
    mutate: signIn,
    isLoading,
    error,
  } = useMutation(payload => request.auth.signIn(payload), {
    onSuccess: data => {
      if (data.access_token) {
        setToken(data.access_token);
        setUser(data.user)
        setAuth({ isAuthenticated: true });
        navigate('/inicio/movimientos', { replace: true });
        toast({
          title: 'Exito',
          description: data?.msg,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });

  return {
    isLoadingSigningIn: isLoading,
    errorSigningIn: error,
    signIn,
  };
};

export const useLogout = () => {
  const toast = useToast();
  const { setAuth, setUser } = useAuth();
  const { setToken, token } = useToken();
  const navigate = useNavigate();

  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const {
    mutate: logOut,
    isLoading,
    error,
  } = useMutation(() => request.auth.logOut(), {
    onSuccess: data => {
      setAuth({ isAuthenticated: false });
      setToken('');
      setUser({})
      navigate('/', { replace: true });
      toast({
        title: 'Exito',
        description: data?.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return {
    isLoadinglogOut: isLoading,
    errorlogOut: error,
    logOut,
  };
};
