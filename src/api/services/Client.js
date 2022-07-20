import { request } from '../base';

const endpoints = {
  get: '/api/cliente',
};

export const getClient = async () => {
  const res = await request.get(endpoints.get);
  return res.data;
};

export const postClient = async payload => {
  const res = await request.post(endpoints.get, payload);
  return res.data;
};

export const BulkClient = async payload => {
  const res = await request.post(endpoints.get+"/bulk", payload);
  return res.data;
};

export const putClient = async payload => {
  const res = await request.put(
    endpoints.get + `/${payload.id}`,
    payload
  );
  return res.data;
};

export const deleteClient = async id => {
  const res = await request.delete(endpoints.get + `/${id}`);
  return res.data;
};
