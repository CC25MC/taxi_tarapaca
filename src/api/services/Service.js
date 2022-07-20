import { request } from '../base';

const endpoints = {
  get: '/api/servicio',
};

export const getService = async () => {
  const res = await request.get(endpoints.get);
  return res.data;
};

export const postService = async payload => {
  const res = await request.post(endpoints.get, payload);
  return res.data;
};

export const putService = async payload => {
  const res = await request.put(
    endpoints.get + `/${payload.id}`,
    payload
  );
  return res.data;
};
export const BulkService = async payload => {
  const res = await request.post(endpoints.get+"/bulk", payload);
  return res.data;
};

export const deleteService = async id => {
  const res = await request.delete(endpoints.get + `/${id}`);
  return res.data;
};
