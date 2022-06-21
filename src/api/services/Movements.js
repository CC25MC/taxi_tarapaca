import { request } from '../base';

const endpoints = {
  get: '/api/movimiento',
};

export const getMovements = async () => {
  const res = await request.get(endpoints.get);
  return res.data;
};

export const postMovements = async payload => {
  const res = await request.post(endpoints.get, payload);
  return res.data;
};

export const putMovements = async payload => {
  const res = await request.put(
    endpoints.get + `/${payload.id}`,
    payload
  );
  return res.data;
};

export const deleteMovements= async id => {
  const res = await request.delete(endpoints.get + `/${id}`);
  return res.data;
};
