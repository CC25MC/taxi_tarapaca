import { request } from "../base";

const endpoints = {
    post: "/api/login",
    logout: "/api/logout",
};

export const signIn = async (payload) => {
    const res = await request.post(endpoints.post, payload);
    return res.data;
};

export const logOut = async () => {
    const res = await request.post(endpoints.logout);
    return res.data;
};