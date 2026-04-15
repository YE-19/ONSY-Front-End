import Cookies from 'js-cookie';

const TOKEN_NAME = 'onsy_auth_token';

export const setToken = (token) => {
  Cookies.set(TOKEN_NAME, token, { expires: 10, secure: true, sameSite: 'strict' });
};

export const getToken = () => {
  return Cookies.get(TOKEN_NAME);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_NAME);
};