export const saveSession = (token: string) => {
  localStorage.setItem("user", token);
};

export const getSession = () => {
  return localStorage.getItem("user");
};

export const clearSession = () => {
  localStorage.removeItem("user");
};
