import { request } from '../base';

const endpoints = {
  get: '/api/convenio',
};

export const getAgreements = async () => {
  const res = await request.get(endpoints.get);
  return res.data;
};

export const postAgreements = async payload => {
  const res = await request.post(endpoints.get, payload);
  return res.data;
};

export const putAgreements = async payload => {
  const res = await request.put(
    endpoints.get + `/${payload.id}`,
    payload
  );
  return res.data;
};

export const deleteAgreements = async id => {
  const res = await request.delete(endpoints.get + `/${id}`);
  return res.data;
};
