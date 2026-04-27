export const ACCESS_TOKEN_KEY = "pylearn_access_token";
export const REFRESH_TOKEN_KEY = "pylearn_refresh_token";
export const AUTH_LOGOUT_EVENT = "auth:logout";

export function getStoredAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setStoredTokens(accessToken, refreshToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearStoredTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function notifyForcedLogout() {
  window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
}
