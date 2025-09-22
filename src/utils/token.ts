// Small in-memory token store. Token will be lost when the page reloads.
// Use this for short-lived in-memory storage. For persistence use localStorage/sessionStorage or cookies.
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = null;
};

const tokenStore = { getAccessToken, setAccessToken, clearAccessToken };
export default tokenStore;
