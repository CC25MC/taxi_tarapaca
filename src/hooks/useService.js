import {request} from '../api';
import { useMutation, useQuery } from 'react-query';
import { useToken } from './useToken';
import { useToast } from '@chakra-ui/react';

export const useServiceGet = () => {
  const { token } = useToken();
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const { isLoading, data, error } = useQuery(
    '/api/service',
    () => request.service.getService(),
    { refetchInterval: 5000 }
  );
  return {
    isLoading,
    data: data || {},
    error,
  };
};

export const useServiceSaveData = () => {
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
        ? request.service.putService(payload)
        : request.service.postService(payload),
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

export const useServiceDestroy = () => {
  const toast = useToast();
  const { token } = useToken();
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const {
    mutate: destroy,
    isLoading,
    error,
  } = useMutation(id => request.service.deleteService(id), {
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
