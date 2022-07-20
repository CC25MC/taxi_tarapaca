import {request} from '../api';
import { useMutation, useQuery } from 'react-query';
import { useToken } from './useToken';
import { useToast } from '@chakra-ui/react';

export const useAutomobilesGet = () => {
  const { token } = useToken();
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const { isLoading, data, error } = useQuery(
    '/api/Automobiles',
    () => request.automobiles.getAutomobiles(),
    { refetchInterval: 5000 }
  );
  return {
    isLoading,
    data: data || {},
    error,
  };
};
export const useAutomobilesBulkSaveData = () => {
  const toast = useToast();
  const { token } = useToken();
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const {
    mutate: saveData,
    isLoading,
    error,
  } = useMutation(payload => request.automobiles.BulkAutomobiles(payload), {
    onSuccess: data => {
      if (data) {
        toast({
          title: 'Exito',
          description: data?.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });

  return {
    isLoading,
    error,
    saveData,
  };
};

export const useAutomobilesSaveData = () => {
  const toast = useToast();
  const { token } = useToken();
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const {
    mutate: saveData,
    isLoading,
    error,
  } = useMutation(
    payload =>
      payload?.id
        ? request.automobiles.putAutomobiles(payload)
        : request.automobiles.postAutomobiles(payload),
    {
      onSuccess: data => {
        if (data) {
          toast({
            title: 'Exito',
            description: data?.message,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
      },
    }
  );

  return {
    isLoadingUserPost: isLoading,
    errorUserPost: error,
    saveData,
  };
};

export const useAutomobilesDestroy = () => {
  const toast = useToast();
  const { token } = useToken();
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const {
    mutate: destroy,
    isLoading,
    error,
  } = useMutation(id => request.automobiles.deleteAutomobiles(id), {
    onSuccess: data => {
      if (data) {
        toast({
          title: 'Exito',
          description: data?.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });
  return {
    isLoading,
    error,
    destroy,
  };
};
