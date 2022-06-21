import { request } from '../base';

const endpoints = {
  get: '/api/viaje',
};

export const getTravel = async () => {
  const res = await request.get(endpoints.get);
  return res.data;
};

export const postTravel = async payload => {
  const res = await request.post(endpoints.get, payload);
  return res.data;
};

export const putTravel = async payload => {
  const res = await request.put(
    endpoints.get + `/${payload.id}`,
    payload
  );
  return res.data;
};

export const deleteTravel = async id => {
  const res = await request.delete(endpoints.get + `/${id}`);
  return res.data;
};
