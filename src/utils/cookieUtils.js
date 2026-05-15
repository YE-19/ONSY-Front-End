import Cookies from 'js-cookie';

const TOKEN_NAME = 'onsy_auth_token';

/**
 * Store the token in a cookie that expires exactly when the JWT expires.
 * Falls back to 1 day if the exp claim can't be read.
 */
export const setToken = (token) => {
  let expires = 1; // default: 1 day
  try {
    // JWT payload is the second segment, base64url-encoded
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (payload.exp) {
      // Convert Unix timestamp → JS Date (what js-cookie accepts)
      expires = new Date(payload.exp * 1000);
    }
  } catch {
    // malformed token — use default
  }
  Cookies.set(TOKEN_NAME, token, { expires, secure: true, sameSite: 'strict' });
};

export const getToken = () => {
  return Cookies.get(TOKEN_NAME);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_NAME);
};