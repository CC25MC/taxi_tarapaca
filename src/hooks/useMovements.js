import { request } from '../api';
import { useMutation, useQuery } from 'react-query';
import { useToken } from './useToken';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

export const useMovementsData = () => {
  const [movements, setMovements] = useState([]);
  return {
    movements,
    setMovements,
  };
};

export const useMovementsGet = () => {
  const { token } = useToken();
  const { setMovements } = useMovementsData();
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const { isLoading, data, error } = useQuery(
    '/api/movimiento',
    () => request.movements.getMovements(),
    {
      refetchInterval: 5000,
      onSuccess: data => {
        if (data) {
          setMovements(data);
        }
      },
    }
  );

  return {
    isLoading,
    data: data || {},
    error,
  };
};

export const useMovementsSaveData = () => {
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
        ? request.movements.putMovements(payload)
        : request.movements.postMovements(payload),
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

export const useMovementsBulkSaveData = () => {
  const toast = useToast();
  const { token } = useToken();
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const {
    mutate: saveData,
    isLoading,
    error,
  } = useMutation(payload => request.movements.BulkMovements(payload), {
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
    isLoadingUserPost: isLoading,
    errorUserPost: error,
    saveData,
  };
};
export const useMovementsDestroy = () => {
  const toast = useToast();
  const { token } = useToken();
  request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const {
    mutate: destroy,
    isLoading,
    error,
  } = useMutation(id => request.movements.deleteMovements(id), {
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
