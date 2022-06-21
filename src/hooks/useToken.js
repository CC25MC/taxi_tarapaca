import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { persistState, getPersistedState } from "../utils";

const tokenAtom = atom(getPersistedState("token") ?? "");

export const useToken = () => {
  const [token, setToken] = useAtom(tokenAtom);

  useEffect(() => persistState("token", token), [token]);

  const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    const values = name + "=" + (value || "") + expires + "; path=/";
    const parts = values.split(`=`);
    setToken(parts[1]);
  };
  return {
    token,
    setCookie,
    setToken
  };
};
