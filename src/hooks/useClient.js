import {request} from '../api';
import { useMutation, useQuery } from 'react-query';
import { useToken } from './useToken';
import { useToast } from '@chakra-ui/react';

export const useClientGet = () => {
  const { token } = useToken();
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const { isLoading, data, error } = useQuery(
    '/api/cliente',
    () => request.client.getClient(),
    { refetchInterval: 5000 }
  );
  return {
    isLoading,
    data: data || {},
    error,
  };
};

export const useClientBulkSaveData = () => {
  const toast = useToast();
  const { token } = useToken();
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const {
    mutate: saveData,
    isLoading,
    error,
  } = useMutation(payload => request.client.BulkClient(payload), {
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

export const useClientSaveData = () => {
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
        ? request.client.putClient(payload)
        : request.client.postClient(payload),
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

export const useClientDestroy = () => {
  const toast = useToast();
  const { token } = useToken();
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const {
    mutate: destroy,
    isLoading,
    error,
  } = useMutation(id => request.client.deleteClient(id), {
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
