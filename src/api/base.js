import { create } from "axios";

export const request = create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000
});

export const requestMensajeria = create({
	baseURL: process.env.REACT_APP_MESSAGE,
	timeout: 30000,
});