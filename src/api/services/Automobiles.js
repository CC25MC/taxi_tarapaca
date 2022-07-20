import { request } from '../base';

const endpoints = {
  get: '/api/automovil',
};

export const getAutomobiles= async () => {
  const res = await request.get(endpoints.get);
  return res.data;
};

export const postAutomobiles = async payload => {
  const res = await request.post(endpoints.get, payload);
  return res.data;
};

export const BulkAutomobiles = async payload => {
  const res = await request.post(endpoints.get+"/bulk", payload);
  return res.data;
};
export const putAutomobiles = async payload => {
  const res = await request.put(
    endpoints.get + `/${payload.id}`,
    payload
  );
  return res.data;
};

export const deleteAutomobiles = async id => {
  const res = await request.delete(endpoints.get + `/${id}`);
  return res.data;
};
