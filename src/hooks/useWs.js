import { useMutation, useQuery } from 'react-query';
import { requestMensajeria } from '../api';

export const useGetQr = () => {
  const { isLoading, data, error } = useQuery(
    '/ws/qr',
    () => requestMensajeria.ws.Qr(),
    { refetchInterval: 5000 }
  );
  return {
    isLoading,
    data: data || {},
    error,
  };
};

export const useGetStatus = () => {
  const { isLoading, data, error } = useQuery(
    '/ws/Status',
    () => requestMensajeria.ws.Status()
  );
  return {
    isLoading,
    data: data || {},
    error,
  };
};

export const useMessage = () => {
  const { mutate, isLoading, error } = useMutation(
    payload => requestMensajeria.ws.Message(payload)
    // {
    //   onSuccess: data => {
    //     if (data?.data) {
    //       enqueueSnackbar(`Cliente ${data?.message}`, {
    //         variant: 'success'
    //       })
    //       setPath('/client')
    //       setTimeout(() => {
    //         window.location.reload(true)
    //       }, 3000)
    //     }
    //   }
    // }
  );
  return {
    isLoading,
    error,
    mutate,
  };
};
