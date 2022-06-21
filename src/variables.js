import { atom } from 'jotai'
export const listArticles = atom([])
export const PERSISTOR_KEYS = {
  user: 'user',
  auth: 'auth',
}

export const titles = {
  '/inicio': 'Contratos',
  '/configuracion': 'Configuración',
  '/withdrawal': 'Withdrawal',
}