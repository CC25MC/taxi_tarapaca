import { requestMensajeria } from '../base'

const endpoints = {
  qr: '/ws/qr',
  message: '/ws/message',
  status: '/ws/status',
}

export const Message = async payload => {
  const res = await requestMensajeria.post(endpoints.message, payload)
  return res.data
}

export const Qr = async () => {
  const res = await requestMensajeria.get(endpoints.qr)
  return res.data
}

export const Status = async () => {
  const res = await requestMensajeria.get(endpoints.status)
  return res.data
}
