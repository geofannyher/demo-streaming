export const saveSession = (token: string) => {
  localStorage.setItem("operator", token);
};

export const getSession = () => {
  return localStorage.getItem("operator");
};

export const clearSession = () => {
  localStorage.clear();
};
